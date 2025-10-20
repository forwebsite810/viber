import React, { useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { useCV } from '../contexts/NewCVContext';
import { useCV as useLegacyCV } from '../contexts/CVContext';

const UploadCV = ({ onExtracted }) => {
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { loadExtractedData } = useCV();
  const { setExtractedData } = useLegacyCV?.() || { setExtractedData: null };

  const analyzeCVWithBackend = async (file) => {
    const formData = new FormData();
    formData.append('cv', file);

    const response = await fetch('http://localhost:5000/api/analyze-cv', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to analyze CV');
    }

    const result = await response.json();
    console.log('✅ Backend analysis result:', result);
    return result;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Reset states
    setError('');
    setSuccess(false);
    setFileName(file.name);
    setIsProcessing(true);

    try {
      // Validate file type
      if (file.type !== 'application/pdf') {
        throw new Error('Please select a PDF file');
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB');
      }

      const result = await analyzeCVWithBackend(file);
      if (onExtracted) onExtracted(result.excerpt);
      if (setExtractedData) {
        setExtractedData(result.parsed);
      }
      if (loadExtractedData && result.parsed) {
        loadExtractedData(result.parsed);
      }

      setSuccess(true);
    } catch (error) {
      console.error('PDF extraction error:', error);
      setError(error.message || 'Failed to extract text from PDF');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetUpload = () => {
    setFileName('');
    setError('');
    setSuccess(false);
    setIsProcessing(false);
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-8">
        <div className="text-center">
          <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Upload Your CV PDF
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Select a PDF file to extract all text content
          </p>
          
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-upload"
          />
          <label
            htmlFor="pdf-upload"
            className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer font-semibold"
          >
            <FileText className="w-5 h-5 mr-2" />
            Choose PDF File
          </label>
          
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
            Maximum file size: 10MB
          </p>
        </div>
      </div>

      {/* Processing Status */}
      {isProcessing && (
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <div className="flex items-center">
            <Loader className="w-6 h-6 text-blue-500 animate-spin mr-3" />
            <div>
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">
                Processing PDF...
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Extracting text from all pages
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Success Status */}
      {success && (
        <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              <div>
                <h4 className="font-semibold text-green-900 dark:text-green-100">
                  Text Extraction Complete!
                </h4>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Successfully extracted text from {fileName}
                </p>
              </div>
            </div>
            <button
              onClick={resetUpload}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              Upload Another
            </button>
          </div>
        </div>
      )}

      {/* Error Status */}
      {error && (
        <div className="mt-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-500 mr-3" />
              <div>
                <h4 className="font-semibold text-red-900 dark:text-red-100">
                  Extraction Failed
                </h4>
                <p className="text-sm text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
            </div>
            <button
              onClick={resetUpload}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadCV;
