import React, { useState, useCallback } from 'react';
import { analyzeCVFile } from '../utils/analyzeCVWithAI';
import { useCV } from '../contexts/NewCVContext';
import { useSmartAuth } from '../contexts/SmartAuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Loader,
  Edit3,
  Eye,
  Download,
  Sparkles
} from 'lucide-react';

export default function UploadCV() {
  const { currentUser } = useSmartAuth();
  const { darkMode, toggleTheme } = useTheme();
  const { loadExtractedData } = useCV();
  
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const [error, setError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);


  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (file) => {
    setError(null);
    
    // Validate file type
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file only.');
      return;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB.');
      return;
    }
    
    setUploadedFile(file);
    startAnalysis(file);
  };

  const startAnalysis = async (file) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const result = await analyzeCVFile(file);
      if (!result.parsed || Object.keys(result.parsed).length === 0) {
        throw new Error("Sorry, we couldn't analyze this CV. Please try another one.");
      }
      setExtractedData(result.parsed);
      setAnalysisComplete(true);
    } catch (err) {
      setError(err?.message || "Sorry, we couldn't analyze this CV. Please try another one.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleLoadData = () => {
    if (!extractedData) return;
    
    // Load extracted data into CV context
    loadExtractedData(extractedData);
    
    // Navigate to portfolio generation
    window.location.href = '/portfolio-generated';
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setAnalysisComplete(false);
    setExtractedData(null);
    setError(null);
    setShowPreview(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full opacity-20 blur-3xl floating-animation"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20 blur-3xl floating-animation" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-poppins font-bold text-gray-900 dark:text-white mb-6 text-shadow-lg">
            Upload Your CV
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Upload your PDF CV and let our AI extract all the information automatically
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Upload Section */}
          <div className="space-y-8">
            {/* Upload Area */}
            <Card variant="glass" className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4">
                  <Upload className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
                  Upload PDF CV
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Drag and drop your PDF file here or click to browse
                </p>
              </div>

              {!uploadedFile && !isAnalyzing && (
                <div
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                    dragActive
                      ? 'border-blue-500 bg-blue-500/10 scale-105'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-500/5'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    Drag your PDF file here
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
                    or
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileInput}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 cursor-pointer"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
                    Maximum file size: 10MB
                  </p>
                </div>
              )}

              {/* Loading State */}
              {isAnalyzing && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-6 animate-pulse">
                    <Loader className="w-8 h-8 animate-spin" />
                  </div>
                  <h3 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
                    Analyzing your CV...
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Our AI is extracting information from your CV
                  </p>
                  <div className="flex justify-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              )}

              {/* Success State */}
              {analysisComplete && extractedData && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
                    Analysis Complete!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Successfully extracted information from your CV
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button
                      onClick={() => setShowPreview(!showPreview)}
                      variant="secondary"
                      className="flex items-center space-x-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
                    </Button>
                    <Button
                      onClick={resetUpload}
                      variant="secondary"
                      className="flex items-center space-x-2"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Another</span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
                    Upload Error
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {error}
                  </p>
                  <Button
                    onClick={resetUpload}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Try Again</span>
                  </Button>
                </div>
              )}
            </Card>

            {/* Action Buttons */}
            {analysisComplete && (
              <div className="flex justify-center">
                <Button
                  onClick={handleLoadData}
                  size="xl"
                  className="flex items-center space-x-3"
                >
                  <Sparkles className="w-6 h-6" />
                  <span>Generate Portfolio</span>
                </Button>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className={`lg:sticky lg:top-8 transition-all duration-500 ${
            showPreview && analysisComplete ? 'block' : 'hidden lg:block'
          }`}>
            {analysisComplete && extractedData && (
              <Card variant="glass" className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white">
                    Extracted Data
                  </h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Ready</span>
                  </div>
                </div>
                
                <div className="space-y-6 max-h-[600px] overflow-y-auto">
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Personal Information
                    </h3>
                    <div className="bg-white/5 rounded-lg p-4">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {extractedData.personalInfo.fullName}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {extractedData.personalInfo.email}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {extractedData.personalInfo.phone}
                      </p>
                    </div>
                  </div>

                  {/* Experience */}
                  {extractedData.experience.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Experience ({extractedData.experience.length})
                      </h3>
                      <div className="space-y-3">
                        {extractedData.experience.map((exp, index) => (
                          <div key={index} className="bg-white/5 rounded-lg p-4">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {exp.position}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {exp.company} • {exp.startDate} - {exp.endDate}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {extractedData.skills.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Skills ({extractedData.skills.length})
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {extractedData.skills.slice(0, 10).map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                        {extractedData.skills.length > 10 && (
                          <span className="px-3 py-1 bg-gray-500/10 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                            +{extractedData.skills.length - 10} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {extractedData.projects.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Projects ({extractedData.projects.length})
                      </h3>
                      <div className="space-y-3">
                        {extractedData.projects.map((project, index) => (
                          <div key={index} className="bg-white/5 rounded-lg p-4">
                            <p className="font-medium text-gray-900 dark:text-white">
                              {project.title}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {project.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}