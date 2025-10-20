import React, { useState, useRef } from 'react';
import { Upload, FileText, Download, CheckCircle, AlertCircle, Loader, Sparkles, ArrowRight } from 'lucide-react';
import { portfolioOrchestrator } from '../services/portfolioGenerationOrchestrator';
import { extractTextFromPDF, validatePDFFile } from '../utils/pdfTextExtractor';
import TemplatePreview from './TemplatePreview';

export default function EnhancedPortfolioGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;
    
    setError(null);
    setResult(null);
    setProgress(null);
    setSelectedTemplate(null);
    
    // Validate file
    const validation = validatePDFFile(file);
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
    portfolioOrchestrator.setProgressCallback((progressData) => {
      setProgress(progressData);
    });
    
    try {
      // Step 1: Extract text from PDF
      console.log('📄 Extracting text from PDF...');
      const extractionResult = await extractTextFromPDF(file);
      if (!extractionResult.success) {
        throw new Error(`PDF text extraction failed: ${extractionResult.error}`);
      }

      // Step 2: Generate portfolio from CV text
      console.log('🎨 Generating portfolio templates...');
      console.log('📄 Extracted CV Text:', extractionResult.text); // Debug log
      const result = await portfolioOrchestrator.generatePortfolioFromCV(extractionResult.text);
      
      if (result.success) {
        console.log('✅ Portfolio generation successful:', result); // Debug log
        setResult(result);
        setError(null);
      } else {
        console.error('❌ Portfolio generation failed:', result.error); // Debug log
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

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleDownload = async (template, folderName) => {
    if (!template || !result) return;
    
    try {
      const downloadResult = await portfolioOrchestrator.downloadTemplate(template, result.cvData, folderName);
      
      if (downloadResult.success) {
        // Trigger download
        const url = URL.createObjectURL(downloadResult.zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = downloadResult.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        setError(`Download failed: ${downloadResult.error}`);
      }
    } catch (error) {
      setError(`Download failed: ${error.message}`);
    }
  };

  const resetGenerator = () => {
    setResult(null);
    setError(null);
    setProgress(null);
    setSelectedTemplate(null);
    setIsGenerating(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // If we have templates, show the template preview
  if (result && result.templates) {
    return (
      <TemplatePreview
        templates={result.templates}
        cvData={result.cvData}
        onTemplateSelect={handleTemplateSelect}
        onDownload={handleDownload}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI Portfolio Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Upload your CV PDF and get 5 professional portfolio templates
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

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
            <Sparkles className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              5 Unique Templates
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Choose from modern, creative, corporate, tech, and artistic designs
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
            <FileText className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Complete Website
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Get HTML, CSS, JS, and assets ready for deployment
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
            <Download className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Easy Download
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Download as ZIP with custom folder name
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            How It Works
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Upload CV</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Upload your PDF CV and we'll extract all the text content
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">AI Analysis</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Our AI analyzes your CV and structures all the information
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Choose & Download</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Select your favorite template and download your portfolio
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
