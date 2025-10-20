import React, { useState } from 'react';
import UploadCV from './components/UploadCV';
import { FileText, Copy, CheckCircle } from 'lucide-react';

function AppStandalone() {
  const [extractedText, setExtractedText] = useState('');
  const [fileName, setFileName] = useState('');
  const [copied, setCopied] = useState(false);

  const handleTextExtracted = (text) => {
    setExtractedText(text);
    // Get filename from the file input if available
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput && fileInput.files[0]) {
      setFileName(fileInput.files[0].name);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            PDF CV Text Extractor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Upload your CV PDF and extract all text content
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Upload CV
            </h2>
            <UploadCV onExtracted={handleTextExtracted} />
          </div>

          {/* Results Section */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Extracted Text
            </h2>
            
            {extractedText ? (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-6">
                {/* File Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {fileName}
                    </span>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-1" />
                        Copy Text
                      </>
                    )}
                  </button>
                </div>

                {/* Text Stats */}
                <div className="mb-4 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Characters:</span>
                      <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                        {extractedText.length.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Words:</span>
                      <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                        {extractedText.split(/\s+/).filter(word => word.length > 0).length.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Lines:</span>
                      <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                        {extractedText.split('\n').length.toLocaleString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Pages:</span>
                      <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                        {Math.ceil(extractedText.length / 2000)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Extracted Text */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Extracted Content:
                  </h3>
                  <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words max-h-96 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    {extractedText}
                  </pre>
                </div>

                {/* Next Steps */}
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    🚀 Next Steps
                  </h4>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    The extracted text is ready for AI analysis, portfolio generation, or any other processing you need!
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-2xl p-8 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Text Extracted Yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Upload a PDF file to see the extracted text content here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Built with React, PDF.js, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}

export default AppStandalone;
