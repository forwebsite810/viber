// Sample data for development and testing

export const sampleCVData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    summary: "Experienced software engineer with 5+ years in full-stack development, specializing in React, Node.js, and cloud technologies. Passionate about building scalable applications and leading development teams.",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    website: "https://johndoe.dev"
  },
  education: [
    {
      institution: "Stanford University",
      degree: "Master of Science",
      field: "Computer Science",
      startDate: "2016",
      endDate: "2018",
      gpa: "3.8",
      description: "Specialized in Machine Learning and Distributed Systems"
    },
    {
      institution: "UC Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2012",
      endDate: "2016",
      gpa: "3.7",
      description: "Graduated Magna Cum Laude"
    }
  ],
  experience: [
    {
      company: "Tech Corp",
      position: "Senior Software Engineer",
      startDate: "2020",
      endDate: "Present",
      description: "Led development of scalable web applications using React and Node.js. Managed a team of 5 developers and improved application performance by 40%.",
      achievements: [
        "Improved application performance by 40%",
        "Led a team of 5 developers",
        "Implemented CI/CD pipeline"
      ]
    },
    {
      company: "StartupXYZ",
      position: "Full Stack Developer",
      startDate: "2018",
      endDate: "2020",
      description: "Developed and maintained web applications using modern JavaScript frameworks. Collaborated with design team to implement responsive user interfaces.",
      achievements: [
        "Built 10+ web applications",
        "Reduced page load time by 60%",
        "Implemented automated testing"
      ]
    }
  ],
  skills: [
    { name: "JavaScript", level: "Expert" },
    { name: "React", level: "Expert" },
    { name: "Node.js", level: "Advanced" },
    { name: "Python", level: "Advanced" },
    { name: "AWS", level: "Intermediate" },
    { name: "Docker", level: "Intermediate" },
    { name: "MongoDB", level: "Advanced" },
    { name: "PostgreSQL", level: "Advanced" }
  ],
  projects: [
    {
      name: "E-commerce Platform",
      description: "Built a full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment processing, and inventory management.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API", "Docker"],
      github: "https://github.com/johndoe/ecommerce",
      liveUrl: "https://ecommerce-demo.com",
      image: "/api/placeholder/400/300"
    },
    {
      name: "Task Management App",
      description: "A collaborative task management application with real-time updates using WebSockets and React.",
      technologies: ["React", "Socket.io", "Express", "PostgreSQL"],
      github: "https://github.com/johndoe/taskmanager",
      liveUrl: "https://taskmanager-demo.com",
      image: "/api/placeholder/400/300"
    }
  ]
};

export const portfolioTemplates = [
  {
    id: 1,
    name: "Modern Minimal",
    description: "Clean and professional design perfect for developers",
    preview: "/api/placeholder/400/300",
    colors: ["#3B82F6", "#1E40AF", "#F3F4F6"],
    features: ["Responsive", "Dark Mode", "Animations", "SEO Optimized"],
    category: "Professional"
  },
  {
    id: 2,
    name: "Creative Portfolio",
    description: "Bold and creative design for designers and artists",
    preview: "/api/placeholder/400/300",
    colors: ["#8B5CF6", "#EC4899", "#F59E0B"],
    features: ["Interactive", "Portfolio Gallery", "Contact Form", "Animations"],
    category: "Creative"
  },
  {
    id: 3,
    name: "Corporate Professional",
    description: "Elegant and sophisticated for business professionals",
    preview: "/api/placeholder/400/300",
    colors: ["#1F2937", "#374151", "#F9FAFB"],
    features: ["Professional", "SEO Optimized", "Fast Loading", "Accessible"],
    category: "Corporate"
  },
  {
    id: 4,
    name: "Tech Startup",
    description: "Modern and dynamic design for tech entrepreneurs",
    preview: "/api/placeholder/400/300",
    colors: ["#10B981", "#059669", "#ECFDF5"],
    features: ["Dynamic", "Tech-focused", "Modern", "Fast"],
    category: "Tech"
  }
];

export const sampleAnalysisResult = {
  extractedData: {
    personalInfo: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      location: "San Francisco, CA",
      summary: "Experienced software engineer with 5+ years in full-stack development, specializing in React, Node.js, and cloud technologies."
    },
    education: [
      {
        institution: "Stanford University",
        degree: "Master of Science",
        field: "Computer Science",
        year: "2018"
      }
    ],
    experience: [
      {
        company: "Tech Corp",
        position: "Senior Software Engineer",
        duration: "2020 - Present",
        description: "Led development of scalable web applications using React and Node.js"
      },
      {
        company: "StartupXYZ",
        position: "Full Stack Developer",
        duration: "2018 - 2020",
        description: "Developed and maintained web applications using modern JavaScript frameworks"
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
    projects: [
      {
        name: "E-commerce Platform",
        description: "Built a full-stack e-commerce solution with React and Node.js",
        technologies: ["React", "Node.js", "MongoDB", "Stripe API"]
      }
    ]
  },
  confidence: 0.95,
  processingTime: "2.3s",
  extractedSections: ["Personal Info", "Education", "Experience", "Skills", "Projects"]
};
