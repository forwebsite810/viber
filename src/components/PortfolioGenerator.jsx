import React, { useState, useRef } from 'react';
import { Upload, FileText, Download, CheckCircle, AlertCircle, Loader, Sparkles } from 'lucide-react';
import { portfolioService } from '../services/portfolioGenerationService';

export default function PortfolioGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;
    
    setError(null);
    setResult(null);
    setProgress(null);
    
    // Validate file
    const validation = portfolioService.validatePDFFile(file);
    if (!validation.valid) {
      setError(`File validation failed: ${validation.errors.join(', ')}`);
      return;
    }
    
    // Start generation
    generatePortfolio(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const generatePortfolio = async (file) => {
    setIsGenerating(true);
    
    // Set up progress callback
    portfolioService.setProgressCallback((progressData) => {
      setProgress(progressData);
    });
    
    try {
      const result = await portfolioService.generatePortfolioFromPDF(file);
      
      if (result.success) {
        setResult(result);
        setError(null);
      } else {
        setError(result.error);
        setResult(null);
      }
    } catch (error) {
      setError(`Generation failed: ${error.message}`);
      setResult(null);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPortfolio = async () => {
    if (!result?.zipBlob) return;
    
    try {
      await portfolioService.downloadPortfolioZip(result.zipBlob, result.filename);
    } catch (error) {
      setError(`Download failed: ${error.message}`);
    }
  };

  const resetGenerator = () => {
    setResult(null);
    setError(null);
    setProgress(null);
    setIsGenerating(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Portfolio Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Upload your CV PDF and get a complete professional portfolio website
          </p>
        </div>

        {/* Upload Area */}
        {!result && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-8 mb-8">
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                dragActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Drop your CV PDF here
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                or click to browse files
              </p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Choose PDF File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                Maximum file size: 10MB
              </p>
            </div>
          </div>
        )}

        {/* Progress */}
        {isGenerating && progress && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-8 mb-8">
            <div className="flex items-center mb-4">
              <Loader className="w-6 h-6 text-blue-500 animate-spin mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Generating Portfolio...
              </h3>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Step {progress.step} of {progress.totalSteps}</span>
                <span>{Math.round(progress.progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress.progress}%` }}
                ></div>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300">
              {progress.message}
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 mb-8">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
              <h3 className="text-xl font-semibold text-red-800 dark:text-red-200">
                Generation Failed
              </h3>
            </div>
            <p className="text-red-700 dark:text-red-300 mb-4">
              {error}
            </p>
            <button
              onClick={resetGenerator}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Success Result */}
        {result && (
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Portfolio Generated Successfully!
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  📄 CV Analysis
                </h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p><strong>Name:</strong> {result.cvData.name}</p>
                  <p><strong>Title:</strong> {result.cvData.title}</p>
                  <p><strong>Pages:</strong> {result.pageCount}</p>
                  <p><strong>Experience:</strong> {result.cvData.experience?.length || 0} positions</p>
                  <p><strong>Education:</strong> {result.cvData.education?.length || 0} entries</p>
                  <p><strong>Projects:</strong> {result.cvData.projects?.length || 0} projects</p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  🎨 Portfolio Files
                </h4>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>✅ Home page (index.html)</p>
                  <p>✅ About page (about.html)</p>
                  <p>✅ Experience page (experience.html)</p>
                  <p>✅ Projects page (projects.html)</p>
                  <p>✅ Contact page (contact.html)</p>
                  <p>✅ Styling (styles.css)</p>
                  <p>✅ JavaScript (main.js)</p>
                  <p>✅ Images and assets</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={downloadPortfolio}
                className="flex items-center justify-center px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Portfolio ZIP
              </button>
              
              <button
                onClick={resetGenerator}
                className="flex items-center justify-center px-8 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
              >
                Generate Another Portfolio
              </button>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                🚀 Next Steps
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                After downloading, extract the ZIP file and upload the contents to any web hosting service 
                (GitHub Pages, Netlify, Vercel, or your preferred host) to make your portfolio live!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
