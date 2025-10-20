import jsPDF from 'jspdf';

export const generateCVPDF = (cvData) => {
  const doc = new jsPDF();
  
  // Set font
  doc.setFont('helvetica');
  
  // Colors
  const black = '#000000';
  const darkGray = '#333333';
  const lightGray = '#666666';
  
  let yPosition = 20;
  const leftMargin = 20;
  const rightMargin = 20;
  const pageWidth = doc.internal.pageSize.width;
  const contentWidth = pageWidth - leftMargin - rightMargin;
  
  // Helper function to add text with word wrap
  const addText = (text, x, y, options = {}) => {
    const {
      fontSize = 12,
      fontStyle = 'normal',
      color = black,
      maxWidth = contentWidth,
      align = 'left'
    } = options;
    
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', fontStyle);
    doc.setTextColor(color);
    
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + (lines.length * fontSize * 0.4) + 2;
  };
  
  // Helper function to add section header
  const addSectionHeader = (title, y) => {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(black);
    doc.text(title, leftMargin, y);
    
    // Add underline
    doc.setLineWidth(0.5);
    doc.setDrawColor(black);
    doc.line(leftMargin, y + 1, pageWidth - rightMargin, y + 1);
    
    return y + 8;
  };
  
  // Header Section
  if (cvData.personalInfo?.fullName) {
    yPosition = addText(cvData.personalInfo.fullName, leftMargin, yPosition, {
      fontSize: 18,
      fontStyle: 'bold',
      color: black
    });
  }
  
  if (cvData.personalInfo?.title) {
    yPosition = addText(cvData.personalInfo.title, leftMargin, yPosition, {
      fontSize: 14,
      color: darkGray
    });
  }
  
  // Contact Information
  const contactInfo = [];
  if (cvData.personalInfo?.email) contactInfo.push(cvData.personalInfo.email);
  if (cvData.personalInfo?.phone) contactInfo.push(cvData.personalInfo.phone);
  if (cvData.personalInfo?.location) contactInfo.push(cvData.personalInfo.location);
  if (cvData.personalInfo?.linkedin) contactInfo.push(cvData.personalInfo.linkedin);
  if (cvData.personalInfo?.github) contactInfo.push(cvData.personalInfo.github);
  if (cvData.personalInfo?.website) contactInfo.push(cvData.personalInfo.website);
  
  if (contactInfo.length > 0) {
    yPosition = addText(contactInfo.join(' • '), leftMargin, yPosition, {
      fontSize: 10,
      color: lightGray
    });
  }
  
  yPosition += 10;
  
  // Professional Summary
  if (cvData.personalInfo?.summary) {
    yPosition = addSectionHeader('PROFESSIONAL SUMMARY', yPosition);
    yPosition = addText(cvData.personalInfo.summary, leftMargin, yPosition, {
      fontSize: 11,
      color: black
    });
    yPosition += 5;
  }
  
  // Work Experience
  if (cvData.jobExperience && cvData.jobExperience.length > 0) {
    yPosition = addSectionHeader('WORK EXPERIENCE', yPosition);
    
    cvData.jobExperience.forEach((exp, index) => {
      if (exp.position || exp.company) {
        const title = exp.position ? exp.position : '';
        const company = exp.company ? exp.company : '';
        const positionText = title && company ? `${title} at ${company}` : title || company;
        
        yPosition = addText(positionText, leftMargin, yPosition, {
          fontSize: 12,
          fontStyle: 'bold',
          color: black
        });
        
        if (exp.duration) {
          yPosition = addText(exp.duration, leftMargin, yPosition, {
            fontSize: 10,
            color: lightGray
          });
        }
        
        if (exp.description) {
          yPosition = addText(exp.description, leftMargin, yPosition, {
            fontSize: 11,
            color: black
          });
        }
        
        yPosition += 3;
      }
    });
  }
  
  // Education
  if (cvData.education && cvData.education.length > 0) {
    yPosition = addSectionHeader('EDUCATION', yPosition);
    
    cvData.education.forEach((edu, index) => {
      if (edu.degree || edu.institution) {
        const degree = edu.degree ? edu.degree : '';
        const institution = edu.institution ? edu.institution : '';
        const educationText = degree && institution ? `${degree} from ${institution}` : degree || institution;
        
        yPosition = addText(educationText, leftMargin, yPosition, {
          fontSize: 12,
          fontStyle: 'bold',
          color: black
        });
        
        if (edu.year) {
          yPosition = addText(edu.year, leftMargin, yPosition, {
            fontSize: 10,
            color: lightGray
          });
        }
        
        if (edu.details) {
          yPosition = addText(edu.details, leftMargin, yPosition, {
            fontSize: 11,
            color: black
          });
        }
        
        yPosition += 3;
      }
    });
  }
  
  // Skills
  if (cvData.skills && cvData.skills.length > 0) {
    yPosition = addSectionHeader('SKILLS', yPosition);
    yPosition = addText(cvData.skills.join(', '), leftMargin, yPosition, {
      fontSize: 11,
      color: black
    });
    yPosition += 5;
  }
  
  // Tools
  if (cvData.tools && cvData.tools.length > 0) {
    yPosition = addSectionHeader('TOOLS', yPosition);
    yPosition = addText(cvData.tools.join(', '), leftMargin, yPosition, {
      fontSize: 11,
      color: black
    });
    yPosition += 5;
  }
  
  // Projects
  if (cvData.projects && cvData.projects.length > 0) {
    yPosition = addSectionHeader('PROJECTS', yPosition);
    
    cvData.projects.forEach((project, index) => {
      if (project.name) {
        yPosition = addText(project.name, leftMargin, yPosition, {
          fontSize: 12,
          fontStyle: 'bold',
          color: black
        });
        
        if (project.description) {
          yPosition = addText(project.description, leftMargin, yPosition, {
            fontSize: 11,
            color: black
          });
        }
        
        if (project.technologies) {
          yPosition = addText(`Technologies: ${project.technologies}`, leftMargin, yPosition, {
            fontSize: 10,
            color: lightGray
          });
        }
        
        yPosition += 3;
      }
    });
  }
  
  // Achievements
  if (cvData.achievements && cvData.achievements.length > 0) {
    yPosition = addSectionHeader('ACHIEVEMENTS', yPosition);
    
    cvData.achievements.forEach((achievement, index) => {
      if (achievement.title) {
        yPosition = addText(achievement.title, leftMargin, yPosition, {
          fontSize: 12,
          fontStyle: 'bold',
          color: black
        });
        
        if (achievement.date) {
          yPosition = addText(achievement.date, leftMargin, yPosition, {
            fontSize: 10,
            color: lightGray
          });
        }
        
        if (achievement.description) {
          yPosition = addText(achievement.description, leftMargin, yPosition, {
            fontSize: 11,
            color: black
          });
        }
        
        yPosition += 3;
      }
    });
  }
  
  // Languages
  if (cvData.languages && cvData.languages.length > 0) {
    yPosition = addSectionHeader('LANGUAGES', yPosition);
    yPosition = addText(cvData.languages.join(', '), leftMargin, yPosition, {
      fontSize: 11,
      color: black
    });
    yPosition += 5;
  }
  
  // Custom Section
  if (cvData.custom?.title && cvData.custom?.content) {
    yPosition = addSectionHeader(cvData.custom.title.toUpperCase(), yPosition);
    yPosition = addText(cvData.custom.content, leftMargin, yPosition, {
      fontSize: 11,
      color: black
    });
  }
  
  return doc;
};