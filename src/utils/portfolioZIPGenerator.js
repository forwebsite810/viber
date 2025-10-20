import JSZip from 'jszip';

export const generatePortfolioZIP = async (portfolioFiles, userData) => {
  try {
    console.log('📦 Starting portfolio ZIP generation...');
    
    const zip = new JSZip();
    
    // Add HTML files
    if (portfolioFiles['index.html']) {
      zip.file('index.html', portfolioFiles['index.html']);
    }
    if (portfolioFiles['about.html']) {
      zip.file('about.html', portfolioFiles['about.html']);
    }
    if (portfolioFiles['experience.html']) {
      zip.file('experience.html', portfolioFiles['experience.html']);
    }
    if (portfolioFiles['projects.html']) {
      zip.file('projects.html', portfolioFiles['projects.html']);
    }
    if (portfolioFiles['contact.html']) {
      zip.file('contact.html', portfolioFiles['contact.html']);
    }
    
    // Add CSS file
    if (portfolioFiles['styles.css']) {
      zip.file('css/styles.css', portfolioFiles['styles.css']);
    }
    
    // Add JavaScript file
    const mainJS = generateMainJS(userData);
    zip.file('js/main.js', mainJS);
    
    // Add README
    const readme = generateREADME(userData);
    zip.file('README.md', readme);
    
    // Add package.json for easy deployment
    const packageJson = generatePackageJson();
    zip.file('package.json', packageJson);
    
    // Add favicon
    const favicon = generateFavicon();
    zip.file('favicon.ico', favicon);
    
    // Add placeholder images
    const placeholderImages = generatePlaceholderImages();
    Object.entries(placeholderImages).forEach(([filename, data]) => {
      zip.file(`images/${filename}`, data);
    });
    
    // Generate ZIP file
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    console.log('✅ Portfolio ZIP generated successfully');
    
    return {
      success: true,
      zipBlob,
      filename: `${userData.name?.replace(/\s+/g, '_') || 'Portfolio'}_Website.zip`
    };
  } catch (error) {
    console.error('❌ Portfolio ZIP generation failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

const generateMainJS = (userData) => {
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

    // Contact form handling (placeholder)
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
};

const generateREADME = (userData) => {
  return `# ${userData.name || 'Portfolio'} - Professional Portfolio Website

## 🚀 Quick Start

This is a complete, professional portfolio website generated from your CV data.

### 📁 Files Included

- \`index.html\` - Home page with hero section and overview
- \`about.html\` - Detailed about page with bio and education
- \`experience.html\` - Professional experience and work history
- \`projects.html\` - Portfolio projects and case studies
- \`contact.html\` - Contact information and form
- \`css/styles.css\` - Professional responsive styling
- \`js/main.js\` - Interactive JavaScript functionality
- \`images/\` - Profile and project images
- \`favicon.ico\` - Website icon

### 🌐 Deployment Options

#### Option 1: GitHub Pages (Free)
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings > Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be live at: \`https://yourusername.github.io/repository-name\`

#### Option 2: Netlify (Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop this entire folder to deploy
3. Your site will be live instantly with a custom URL

#### Option 3: Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository or upload files
3. Deploy with one click

#### Option 4: Any Web Hosting
1. Upload all files to your web hosting provider
2. Ensure \`index.html\` is in the root directory
3. Your site will be live immediately

### 🎨 Customization

- Edit HTML files to modify content
- Update \`css/styles.css\` to change colors and styling
- Add your own images to the \`images/\` folder
- Modify \`js/main.js\` for additional functionality

### 📱 Features

- ✅ Fully responsive design
- ✅ Modern, professional styling
- ✅ Smooth animations and transitions
- ✅ SEO optimized
- ✅ Fast loading
- ✅ Mobile-friendly
- ✅ Cross-browser compatible

### 🔧 Technical Details

- **HTML5** semantic markup
- **CSS3** with modern features
- **Vanilla JavaScript** (no dependencies)
- **Responsive design** for all devices
- **Optimized** for performance

### 📞 Support

If you need help with deployment or customization, refer to the documentation of your chosen hosting platform.

---

**Generated by Vibe Coding Portfolio Builder** 🎉
`;
};

const generatePackageJson = () => {
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
    "author": "Generated by Vibe Coding",
    "license": "MIT",
    "devDependencies": {
      "serve": "^14.0.0"
    }
  }, null, 2);
};

const generateFavicon = () => {
  // Create a simple favicon data URL (1x1 pixel ICO)
  const canvas = document.createElement('canvas');
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#2563eb';
  ctx.fillRect(0, 0, 16, 16);
  return canvas.toDataURL('image/x-icon');
};

const generatePlaceholderImages = () => {
  return {
    'profile.jpg': generatePlaceholderImage(300, 300, 'Profile Image'),
    'project1.jpg': generatePlaceholderImage(400, 300, 'Project 1'),
    'project2.jpg': generatePlaceholderImage(400, 300, 'Project 2'),
    'project3.jpg': generatePlaceholderImage(400, 300, 'Project 3')
  };
};

const generatePlaceholderImage = (width, height, text) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#f3f4f6';
  ctx.fillRect(0, 0, width, height);
  
  // Border
  ctx.strokeStyle = '#d1d5db';
  ctx.lineWidth = 2;
  ctx.strokeRect(1, 1, width - 2, height - 2);
  
  // Text
  ctx.fillStyle = '#6b7280';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);
  
  return canvas.toDataURL('image/jpeg');
};
