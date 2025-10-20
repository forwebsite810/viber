import React, { useState } from 'react';
import { generateAdvancedPDF } from '../utils/advancedPDFGenerator';
import { generateFallbackPDF } from '../utils/fallbackPDFGenerator';
import { Download, CheckCircle, AlertCircle } from 'lucide-react';

export default function PDFDownloadButton({ cvData, className = '', children }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState(null);

  const handleDownload = async () => {
    setIsGenerating(true);
    setStatus(null);

    try {
      // Generate filename based on user's name
      const filename = cvData?.header?.fullName 
        ? `${cvData.header.fullName.replace(/\s+/g, '_')}_CV.pdf`
        : 'My_CV.pdf';
      
      // Try advanced PDF generation first
      try {
        await generateAdvancedPDF(filename);
      } catch (advancedError) {
        console.warn('Advanced PDF generation failed, trying fallback:', advancedError);
        await generateFallbackPDF(filename);
      }
      
      setStatus({
        type: 'success',
        message: 'PDF downloaded successfully!'
      });
      
      // Clear status after 3 seconds
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setStatus({
        type: 'error',
        message: `Error: ${error.message}`
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className={`flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Generating PDF...
          </>
        ) : (
          <>
            <Download className="w-4 h-4 mr-2" />
            {children || 'Download PDF'}
          </>
        )}
      </button>

      {/* Status Message */}
      {status && (
        <div className={`absolute top-full left-0 mt-2 p-3 rounded-lg shadow-lg z-50 ${
          status.type === 'success' 
            ? 'bg-green-100 text-green-800 border border-green-200' 
            : 'bg-red-100 text-red-800 border border-red-200'
        }`}>
          <div className="flex items-center">
            {status.type === 'success' ? (
              <CheckCircle className="w-4 h-4 mr-2" />
            ) : (
              <AlertCircle className="w-4 h-4 mr-2" />
            )}
            <span className="text-sm font-medium">{status.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
