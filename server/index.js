// server/index.js
import express from "express";
import multer from "multer";
import pdfParse from "pdf-parse";
import tesseract from "node-tesseract-ocr";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_KEY}`;

// helper: extract text using pdf-parse
async function extractTextPDF(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  return data.text || "";
}

// helper: OCR fallback using tesseract
async function ocrFile(filePath) {
  const config = {
    lang: "eng",
    oem: 1,
    psm: 3,
  };
  try {
    const text = await tesseract.recognize(filePath, config);
    return text || "";
  } catch (err) {
    console.error("OCR error:", err);
    return "";
  }
}

// helper: call Gemini
async function callGemini(prompt) {
  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  const res = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Gemini error ${res.status}: ${text}`);
  }

  const data = await res.json();
  return data;
}

// parse AI response safely: try to extract JSON substring or return raw text
function parseAIResponse(data) {
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
  // try to extract JSON object from raw text
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.warn("Failed to JSON.parse candidate text:", e);
    }
  }
  // fallback: return text in a summary field
  return { summary: raw };
}

app.post("/api/analyze-cv", upload.single("cv"), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  const filePath = path.resolve(file.path);
  try {
    // Step 1: PDF text extraction
    let text = await extractTextPDF(filePath);
    console.log("Extracted text length:", text.length);

    // Step 2: If extractTextPDF returned little/empty text, do OCR fallback
    if (!text || text.trim().length < 50) {
      console.log("Falling back to OCR for file:", file.originalname);
      text = await ocrFile(filePath);
    }

    // Debug: include excerpt in response for verification
    const excerpt = text.slice(0, 1000);

    // Step 3: Build a deterministic prompt for Gemini:
    const prompt = `
You are a highly precise CV/Resume parser. Extract only the information that is explicitly present in the text below.
Return a JSON object with these keys: fullName, email, phone, location, title, summary, education (array of {degree,institution,year,details}), experience (array of {company,position,duration,description}), projects (array), skills (array), certifications (array), languages (array), tools (array), achievements (array), extraText (string).
If a field is not present, set it to "Not provided". Do NOT invent any details.
Text to analyze:
${text}
`;

    // Step 4: Call Gemini
    const aiRaw = await callGemini(prompt);
    console.log("Gemini raw response object:", aiRaw);

    // Step 5: Parse AI response safely
    const parsed = parseAIResponse(aiRaw);

    // Step 6: return result and the text excerpt for debugging
    res.json({ parsed, excerpt });
  } catch (err) {
    console.error("Server analyze error:", err);
    res.status(500).json({ error: err.message });
  } finally {
    // cleanup uploaded file
    fs.unlink(filePath, () => {});
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
