import React, { useState } from 'react';
import { generateAdvancedPDF } from '../utils/advancedPDFGenerator';
import { generateFallbackPDF } from '../utils/fallbackPDFGenerator';
import { Download, CheckCircle, AlertCircle, Loader } from 'lucide-react';

export default function PDFTestButton() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState(null);

  const testPDFGeneration = async () => {
    setIsGenerating(true);
    setStatus(null);

    try {
      // Test with sample filename
      const filename = `Test_CV_${new Date().getTime()}.pdf`;
      
      // Try advanced PDF generation first
      try {
        await generateAdvancedPDF(filename);
        setStatus({
          type: 'success',
          message: 'Advanced PDF generation successful!'
        });
      } catch (advancedError) {
        console.warn('Advanced PDF generation failed, trying fallback:', advancedError);
        await generateFallbackPDF(filename);
        setStatus({
          type: 'success',
          message: 'Fallback PDF generation successful!'
        });
      }
      
      // Clear status after 3 seconds
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      console.error('PDF generation test failed:', error);
      setStatus({
        type: 'error',
        message: `Test failed: ${error.message}`
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={testPDFGeneration}
            disabled={isGenerating}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Testing PDF...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Test PDF Generation
              </>
            )}
          </button>

          {status && (
            <div className={`flex items-center px-3 py-2 rounded-lg text-sm ${
              status.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {status.type === 'success' ? (
                <CheckCircle className="w-4 h-4 mr-2" />
              ) : (
                <AlertCircle className="w-4 h-4 mr-2" />
              )}
              <span>{status.message}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
