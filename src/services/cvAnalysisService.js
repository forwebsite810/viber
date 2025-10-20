const GEMINI_API_KEY = "AIzaSyB_JcwyyvAk77_FO1ik3pEKi43FiemAAdg";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export class CVAnalysisService {
  constructor() {
    this.apiKey = GEMINI_API_KEY;
    this.apiUrl = GEMINI_API_URL;
  }

  async analyzeCV(cvText) {
    try {
      console.log('🔍 Starting dynamic CV analysis...');
      
      const systemPrompt = `You are an expert career analyst.
Analyze the following CV text dynamically and return structured JSON:

${cvText}

Rules:
- Do not use any hard-coded data.
- Extract all fields: name, title, contact, experience, skills, education, projects, certifications, volunteering, languages, tools, achievements, interests, plus any extra text.
- Fill missing fields with "Not provided".
- Return JSON only, no explanations.

OUTPUT JSON STRUCTURE:
{
  "name": "",
  "title": "",
  "summary": "",
  "contact": {
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": "",
    "website": "",
    "twitter": ""
  },
  "education": [],
  "experience": [],
  "projects": [],
  "skills": {
    "technical": [],
    "soft": []
  },
  "certifications": [],
  "volunteering": [],
  "languages": [],
  "tools": [],
  "achievements": [],
  "interests": [],
  "extraText": ""
}

IMPORTANT: 
- Include ALL text from the CV, even if it doesn't fit standard fields
- Put any unmatched text in "extraText" field
- Ensure all arrays are properly formatted
- Return valid JSON only`;

      const requestBody = {
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          topK: 32,
          topP: 1,
          maxOutputTokens: 8192,
        }
      };

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`CV Analysis API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response from CV Analysis API');
      }

      const aiResponse = data.candidates[0].content.parts[0].text;
      console.log('✅ CV analysis complete');
      
      // Parse and validate the JSON response
      const structuredData = JSON.parse(aiResponse);
      const validatedData = this.validateAndCleanData(structuredData);
      
      return {
        success: true,
        data: validatedData
      };
    } catch (error) {
      console.error('❌ CV analysis failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  validateAndCleanData(data) {
    const defaultData = {
      name: "Not provided",
      title: "Not provided",
      summary: "Not provided",
      contact: {
        email: "Not provided",
        phone: "Not provided",
        location: "Not provided",
        linkedin: "Not provided",
        github: "Not provided",
        website: "Not provided",
        twitter: "Not provided"
      },
      education: [],
      experience: [],
      projects: [],
      skills: {
        technical: [],
        soft: []
      },
      certifications: [],
      volunteering: [],
      languages: [],
      tools: [],
      achievements: [],
      interests: [],
      extraText: ""
    };

    // Merge with defaults and ensure all fields exist
    const cleanedData = { ...defaultData, ...data };
    
    // Ensure arrays are arrays
    if (!Array.isArray(cleanedData.education)) cleanedData.education = [];
    if (!Array.isArray(cleanedData.experience)) cleanedData.experience = [];
    if (!Array.isArray(cleanedData.projects)) cleanedData.projects = [];
    if (!Array.isArray(cleanedData.certifications)) cleanedData.certifications = [];
    if (!Array.isArray(cleanedData.volunteering)) cleanedData.volunteering = [];
    if (!Array.isArray(cleanedData.languages)) cleanedData.languages = [];
    if (!Array.isArray(cleanedData.tools)) cleanedData.tools = [];
    if (!Array.isArray(cleanedData.achievements)) cleanedData.achievements = [];
    if (!Array.isArray(cleanedData.interests)) cleanedData.interests = [];
    
    // Ensure skills object has arrays
    if (!cleanedData.skills || typeof cleanedData.skills !== 'object') {
      cleanedData.skills = { technical: [], soft: [] };
    }
    if (!Array.isArray(cleanedData.skills.technical)) cleanedData.skills.technical = [];
    if (!Array.isArray(cleanedData.skills.soft)) cleanedData.skills.soft = [];
    
    // Ensure contact object exists
    if (!cleanedData.contact || typeof cleanedData.contact !== 'object') {
      cleanedData.contact = defaultData.contact;
    }
    
    // Ensure extraText is a string
    if (typeof cleanedData.extraText !== 'string') {
      cleanedData.extraText = cleanedData.extraText ? String(cleanedData.extraText) : "";
    }
    
    return cleanedData;
  }
}

// Create singleton instance
export const cvAnalysisService = new CVAnalysisService();
