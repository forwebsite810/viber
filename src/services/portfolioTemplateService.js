const GEMINI_API_KEY = "AIzaSyB_JcwyyvAk77_FO1ik3pEKi43FiemAAdg";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

export class PortfolioTemplateService {
  constructor() {
    this.apiKey = GEMINI_API_KEY;
    this.apiUrl = GEMINI_API_URL;
  }

  async generatePortfolioTemplates(cvData) {
    try {
      console.log('🎨 Starting portfolio template generation...');
      
      const systemPrompt = `You are an expert AI assistant for creating professional portfolio websites. 

TASK: Generate 5 distinct, professional portfolio templates from the provided CV data.

REQUIREMENTS:
1. Create 5 visually distinct templates with different layouts, color schemes, and styles
2. Each template should be professional, modern, responsive, with clean typography
3. Include smooth animations and semantic HTML
4. Populate ALL fields from the CV data, including "extraText"
5. Generate complete HTML/CSS files for each template
6. Include placeholder images and assets
7. Return STRICT JSON ONLY - no explanations

CV DATA:
${JSON.stringify(cvData, null, 2)}

OUTPUT JSON STRUCTURE:
{
  "templates": [
    {
      "name": "Template 1 - Modern Minimal",
      "description": "Clean, minimalist design with focus on typography",
      "files": {
        "index.html": "<HTML CONTENT>",
        "about.html": "<HTML CONTENT>",
        "experience.html": "<HTML CONTENT>",
        "projects.html": "<HTML CONTENT>",
        "contact.html": "<HTML CONTENT>",
        "styles.css": "<CSS CONTENT>",
        "assets": {
          "images": ["profile.jpg", "project1.jpg", "project2.jpg"],
          "favicon.ico": "...",
          "logo.png": "..."
        },
        "README.md": "Deployment instructions..."
      }
    },
    {
      "name": "Template 2 - Creative Professional",
      "description": "Creative layout with bold colors and modern design",
      "files": { ... }
    },
    {
      "name": "Template 3 - Corporate Classic",
      "description": "Traditional corporate style with professional layout",
      "files": { ... }
    },
    {
      "name": "Template 4 - Tech Modern",
      "description": "Technology-focused design with dark theme option",
      "files": { ... }
    },
    {
      "name": "Template 5 - Creative Portfolio",
      "description": "Artistic layout perfect for creative professionals",
      "files": { ... }
    }
  ]
}

TEMPLATE REQUIREMENTS:
- Each template must have unique visual identity
- All templates must be fully responsive
- Include all CV data fields in appropriate sections
- Use modern CSS (Grid, Flexbox, CSS Variables)
- Include smooth animations and transitions
- Semantic HTML structure
- SEO-friendly markup
- Professional typography
- Clean, modern design
- Include "extraText" content in appropriate sections

HTML PAGES REQUIRED:
- index.html (Home page with hero section)
- about.html (Detailed about page)
- experience.html (Work experience showcase)
- projects.html (Portfolio projects)
- contact.html (Contact information and form)

CSS REQUIREMENTS:
- Responsive design (mobile-first)
- Modern CSS features (Grid, Flexbox, CSS Variables)
- Smooth animations and transitions
- Professional color schemes
- Clean typography
- Cross-browser compatibility

Return valid JSON only, no explanations or commentary.`;

      const requestBody = {
        contents: [{
          parts: [{
            text: systemPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 32,
          topP: 1,
          maxOutputTokens: 16384,
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
        throw new Error(`Portfolio Template API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response from Portfolio Template API');
      }

      const aiResponse = data.candidates[0].content.parts[0].text;
      console.log('✅ Portfolio template generation complete');
      
      // Parse the JSON response
      const templateData = JSON.parse(aiResponse);
      
      return {
        success: true,
        templates: templateData.templates || []
      };
    } catch (error) {
      console.error('❌ Portfolio template generation failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  generateTemplatePreview(template, cvData) {
    // Generate a preview object for the frontend
    return {
      id: template.name.toLowerCase().replace(/\s+/g, '-'),
      name: template.name,
      description: template.description,
      preview: {
        hero: cvData.name || 'Your Name',
        title: cvData.title || 'Professional Title',
        summary: cvData.summary || 'Professional summary...',
        skills: cvData.skills?.technical?.slice(0, 5) || [],
        projects: cvData.projects?.slice(0, 3) || []
      },
      files: template.files
    };
  }

  generateDownloadableFiles(template, cvData) {
    // Prepare files for download
    const files = {
      'index.html': template.files['index.html'],
      'about.html': template.files['about.html'],
      'experience.html': template.files['experience.html'],
      'projects.html': template.files['projects.html'],
      'contact.html': template.files['contact.html'],
      'styles.css': template.files['styles.css'],
      'README.md': template.files['README.md']
    };

    // Add assets if they exist
    if (template.files.assets) {
      Object.keys(template.files.assets).forEach(assetName => {
        files[`assets/${assetName}`] = template.files.assets[assetName];
      });
    }

    return files;
  }
}

// Create singleton instance
export const portfolioTemplateService = new PortfolioTemplateService();
