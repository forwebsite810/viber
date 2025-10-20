import { cvAnalysisService } from './cvAnalysisService';
import { portfolioTemplateService } from './portfolioTemplateService';
import JSZip from 'jszip';

export class PortfolioGenerationOrchestrator {
  constructor() {
    this.currentStep = 0;
    this.totalSteps = 3;
    this.onProgress = null;
  }

  setProgressCallback(callback) {
    this.onProgress = callback;
  }

  updateProgress(step, message) {
    this.currentStep = step;
    const progress = (step / this.totalSteps) * 100;
    
    if (this.onProgress) {
      this.onProgress({
        step,
        totalSteps: this.totalSteps,
        progress,
        message
      });
    }
    
    console.log(`📊 Progress: ${step}/${this.totalSteps} (${Math.round(progress)}%) - ${message}`);
  }

  async generatePortfolioFromCV(cvText) {
    try {
      // Step 1: Analyze CV text
      this.updateProgress(1, 'Analyzing CV content...');
      const analysisResult = await cvAnalysisService.analyzeCV(cvText);
      
      if (!analysisResult.success) {
        throw new Error(`CV analysis failed: ${analysisResult.error}`);
      }

      // Step 2: Generate portfolio templates
      this.updateProgress(2, 'Generating portfolio templates...');
      const templateResult = await portfolioTemplateService.generatePortfolioTemplates(analysisResult.data);
      
      if (!templateResult.success) {
        throw new Error(`Template generation failed: ${templateResult.error}`);
      }

      // Step 3: Prepare templates for preview
      this.updateProgress(3, 'Preparing templates for preview...');
      const preparedTemplates = templateResult.templates.map(template => 
        portfolioTemplateService.generateTemplatePreview(template, analysisResult.data)
      );

      this.updateProgress(3, 'Portfolio generation complete!');
      
      return {
        success: true,
        cvData: analysisResult.data,
        templates: preparedTemplates,
        rawTemplates: templateResult.templates
      };
    } catch (error) {
      console.error('❌ Portfolio generation failed:', error);
      return {
        success: false,
        error: error.message,
        step: this.currentStep
      };
    }
  }

  async downloadTemplate(template, cvData, folderName = 'Portfolio') {
    try {
      console.log('📦 Starting template download...');
      
      const zip = new JSZip();
      
      // Add HTML files
      const htmlFiles = ['index.html', 'about.html', 'experience.html', 'projects.html', 'contact.html'];
      htmlFiles.forEach(fileName => {
        if (template.files[fileName]) {
          zip.file(fileName, template.files[fileName]);
        }
      });
      
      // Add CSS file
      if (template.files['styles.css']) {
        zip.file('styles.css', template.files['styles.css']);
      }
      
      // Add README
      if (template.files['README.md']) {
        zip.file('README.md', template.files['README.md']);
      }
      
      // Add assets
      if (template.files.assets) {
        const assetsFolder = zip.folder('assets');
        Object.entries(template.files.assets).forEach(([fileName, content]) => {
          assetsFolder.file(fileName, content);
        });
      }
      
      // Add JavaScript file
      const mainJS = this.generateMainJS();
      zip.file('js/main.js', mainJS);
      
      // Add package.json for easy deployment
      const packageJson = this.generatePackageJson();
      zip.file('package.json', packageJson);
      
      // Generate ZIP file
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      console.log('✅ Template ZIP generated successfully');
      
      return {
        success: true,
        zipBlob,
        filename: `${folderName}_${template.name.replace(/\s+/g, '_')}.zip`
      };
    } catch (error) {
      console.error('❌ Template download failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  generateMainJS() {
    return `
// Portfolio Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add animation classes on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Contact form submitted! (This is a demo - form submission not configured)');
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Add loading animation
    const loadingElements = document.querySelectorAll('.loading');
    loadingElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    });
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
window.addEventListener('scroll', debounce(function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    if (scrollToTopBtn) {
        if (scrollTop > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    }
}, 100));
`;
  }

  generatePackageJson() {
    return JSON.stringify({
      "name": "portfolio-website",
      "version": "1.0.0",
      "description": "Professional portfolio website generated from CV data",
      "main": "index.html",
      "scripts": {
        "start": "npx serve .",
        "build": "echo 'No build process needed - static HTML/CSS/JS'",
        "deploy": "echo 'Upload files to your hosting provider'"
      },
      "keywords": ["portfolio", "website", "cv", "resume", "professional"],
      "author": "Generated by Vibe Coding Portfolio Builder",
      "license": "MIT",
      "devDependencies": {
        "serve": "^14.0.0"
      }
    }, null, 2);
  }

  getSupportedFileTypes() {
    return [
      {
        type: 'application/pdf',
        extensions: ['.pdf'],
        description: 'PDF documents'
      }
    ];
  }

  getMaxFileSize() {
    return 10 * 1024 * 1024; // 10MB
  }
}

// Create singleton instance
export const portfolioOrchestrator = new PortfolioGenerationOrchestrator();
