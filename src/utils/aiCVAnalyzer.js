const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const validateAndCleanCVData = (data) => {
  const defaultData = {
    name: "Not provided",
    title: "Not provided", 
    summary: "Not provided",
    contact: {
      email: "Not provided",
      phone: "Not provided",
      location: "Not provided",
      linkedin: "Not provided",
      github: "Not provided"
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
    interests: []
  };

  // Merge with defaults to ensure all fields exist
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
  
  return cleanedData;
};

export const generatePortfolioWithAI = async (cvData) => {
  try {
    console.log('🎨 Starting AI portfolio generation...');
    
    const systemPrompt = `You are an expert AI assistant for creating professional portfolio websites. 
Your job is to take the provided CV data and generate a **complete, visually appealing, highly professional portfolio** that a user can download and host.

Generate **all portfolio files**:
- HTML pages: index.html (home), about.html, experience.html, projects.html, contact.html
- CSS: styles.css (professional, responsive, clean design, modern typography, smooth animations)
- Assets: project images (placeholders if missing), profile image (if uploaded), favicon, logo
- README: instructions for hosting

HTML Pages:
- **Home:** Show user name, title, professional summary, main skills
- **About:** Detailed bio, education, achievements, interests
- **Experience:** List all work experience in clean cards/tables
- **Projects:** Each project with name, description, technologies
- **Contact:** Email, phone, LinkedIn, GitHub, contact form placeholder

Styling & Design:
- Use modern, minimal, professional design
- Responsive layout for mobile and desktop
- Include subtle animations for sections and hover effects
- Use readable fonts and harmonious color schemes
- Keep HTML semantic and accessible

Return a JSON object with filenames as keys and file contents as values.
Example structure:
{
  "index.html": "<HTML CONTENT>",
  "about.html": "<HTML CONTENT>",
  "experience.html": "<HTML CONTENT>",
  "projects.html": "<HTML CONTENT>",
  "contact.html": "<HTML CONTENT>",
  "styles.css": "<CSS CONTENT>",
  "README.md": "Instructions for deploying the portfolio website"
}

Return JSON only, no commentary, no explanations.`;

    const requestBody = {
      contents: [{
        parts: [{
          text: `${systemPrompt}\n\nCV DATA:\n${JSON.stringify(cvData, null, 2)}`
        }]
      }],
      generationConfig: {
        temperature: 0.3,
        topK: 32,
        topP: 1,
        maxOutputTokens: 8192,
      }
    };

    const response = await fetch(GEMINI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`AI API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response from AI API');
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    console.log('✅ AI portfolio generation complete');
    
    // Parse the JSON response
    const portfolioFiles = JSON.parse(aiResponse);
    
    return {
      success: true,
      files: portfolioFiles
    };
  } catch (error) {
    console.error('❌ AI portfolio generation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
