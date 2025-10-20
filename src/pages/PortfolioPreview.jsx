import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { 
  ArrowLeft, 
  Download, 
  Eye, 
  Share2, 
  Palette,
  Sun,
  Moon,
  CheckCircle,
  Code,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';

const portfolioTemplates = [
  {
    id: 1,
    name: "Modern Minimal",
    description: "Clean and professional design perfect for developers",
    preview: "/api/placeholder/400/300",
    colors: ["#3B82F6", "#1E40AF", "#F3F4F6"],
    features: ["Responsive", "Dark Mode", "Animations"]
  },
  {
    id: 2,
    name: "Creative Portfolio",
    description: "Bold and creative design for designers and artists",
    preview: "/api/placeholder/400/300",
    colors: ["#8B5CF6", "#EC4899", "#F59E0B"],
    features: ["Interactive", "Portfolio Gallery", "Contact Form"]
  },
  {
    id: 3,
    name: "Corporate Professional",
    description: "Elegant and sophisticated for business professionals",
    preview: "/api/placeholder/400/300",
    colors: ["#1F2937", "#374151", "#F9FAFB"],
    features: ["Professional", "SEO Optimized", "Fast Loading"]
  }
];

export default function PortfolioPreview() {
  const { currentUser } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);

  const generatePortfolio = async () => {
    setIsGenerating(true);
    
    // Simulate portfolio generation
    setTimeout(() => {
      setGenerationComplete(true);
      setIsGenerating(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-500">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/dashboard" className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Choose Your Portfolio Template
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Select a stunning template that best represents your professional brand and style.
          </p>
        </div>

        {!generationComplete ? (
          <div className="space-y-12">
            {/* Template Selection */}
            <div className="grid md:grid-cols-3 gap-8">
              {portfolioTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`relative overflow-hidden bg-white/10 backdrop-blur-sm border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    selectedTemplate === template.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-white/20 hover:border-blue-400'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  {selectedTemplate === template.id && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className="space-y-4">
                    <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl flex items-center justify-center">
                      <Monitor className="w-12 h-12 text-gray-400" />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {template.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {template.description}
                      </p>
                      
                      <div className="flex items-center space-x-2 mb-4">
                        {template.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {template.features.map((feature, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white/20 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Customization Options */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-6">
                Customization Options
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Color Scheme</h4>
                  <div className="flex space-x-4">
                    <button className="w-12 h-12 bg-blue-500 rounded-lg border-2 border-blue-500"></button>
                    <button className="w-12 h-12 bg-purple-500 rounded-lg border-2 border-white/20 hover:border-purple-500"></button>
                    <button className="w-12 h-12 bg-green-500 rounded-lg border-2 border-white/20 hover:border-green-500"></button>
                    <button className="w-12 h-12 bg-red-500 rounded-lg border-2 border-white/20 hover:border-red-500"></button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Layout Style</h4>
                  <div className="flex space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg text-gray-700 dark:text-gray-300">
                      <Monitor className="w-4 h-4" />
                      <span>Desktop</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-lg text-gray-700 dark:text-gray-300">
                      <Smartphone className="w-4 h-4" />
                      <span>Mobile</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center">
              <button
                onClick={generatePortfolio}
                disabled={isGenerating}
                className="inline-flex items-center space-x-3 px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold text-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Generating Portfolio...</span>
                  </>
                ) : (
                  <>
                    <Palette className="w-6 h-6" />
                    <span>Generate My Portfolio</span>
                  </>
                )}
              </button>
            </div>

            {/* Generation Progress */}
            {isGenerating && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                      Creating Your Portfolio
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      This may take a few moments...
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-900 dark:text-white">Setting up project structure</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-900 dark:text-white">Applying selected template</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-gray-900 dark:text-white">Generating content sections</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                      <span className="text-gray-600 dark:text-gray-400">Optimizing for performance</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Generation Complete */
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Portfolio Generated Successfully!
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Your stunning portfolio is ready. Preview it below or download the complete package.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
                  <Eye className="w-5 h-5" />
                  <span>Preview Portfolio</span>
                </button>
                
                <button className="flex items-center space-x-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-gray-900 dark:text-white rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300">
                  <Download className="w-5 h-5" />
                  <span>Download ZIP</span>
                </button>
                
                <button className="flex items-center space-x-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-gray-900 dark:text-white rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Portfolio Preview */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8">
              <h3 className="text-2xl font-display font-semibold text-gray-900 dark:text-white mb-6">
                Live Preview
              </h3>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">JD</span>
                  </div>
                  <h4 className="text-3xl font-bold text-gray-900 dark:text-white">John Doe</h4>
                  <p className="text-xl text-gray-600 dark:text-gray-400">Senior Software Engineer</p>
                  <p className="text-gray-500 dark:text-gray-500">San Francisco, CA</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">About Me</h5>
                    <p className="text-gray-600 dark:text-gray-400">
                      Experienced software engineer with 5+ years in full-stack development, specializing in React, Node.js, and cloud technologies.
                    </p>
                  </div>
                  
                  <div>
                    <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Skills</h5>
                    <div className="flex flex-wrap gap-2">
                      {["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"].map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
