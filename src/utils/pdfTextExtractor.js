import * as pdfjsLib from 'pdfjs-dist';
import { WorkerMessageHandler } from 'pdfjs-dist/build/pdf.worker.mjs';
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString();

export const extractTextFromPDF = async (file) => {
  try {
    console.log('📄 Starting PDF text extraction...');
    
    // Convert file to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    
    // Load PDF document
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    console.log(`✅ PDF loaded: ${pdf.numPages} pages`);
    
    let fullText = '';
    
    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      
      // Combine text items
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      fullText += pageText + '\n';
      console.log(`📄 Page ${pageNum} extracted: ${pageText.length} characters`);
    }
    
    // Clean the extracted text
    const cleanedText = cleanExtractedText(fullText);
    console.log(`✅ Text extraction complete: ${cleanedText.length} characters`);
    
    return {
      success: true,
      text: cleanedText,
      pageCount: pdf.numPages
    };
  } catch (error) {
    console.error('❌ PDF text extraction failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

const cleanExtractedText = (text) => {
  return text
    // Remove excessive whitespace
    .replace(/\s+/g, ' ')
    // Remove extra line breaks
    .replace(/\n\s*\n/g, '\n')
    // Clean up common PDF artifacts
    .replace(/\f/g, '') // Form feed characters
    .replace(/\r/g, '') // Carriage returns
    // Remove page numbers and headers/footers (basic cleanup)
    .replace(/^\d+\s*$/gm, '') // Lines with just numbers
    .replace(/^Page \d+$/gm, '') // "Page X" lines
    // Trim whitespace
    .trim();
};

export const validatePDFFile = (file) => {
  const errors = [];
  
  if (!file) {
    errors.push('No file selected');
    return { valid: false, errors };
  }
  
  if (file.type !== 'application/pdf') {
    errors.push('File must be a PDF');
  }
  
  if (file.size > 10 * 1024 * 1024) { // 10MB limit
    errors.push('File size must be less than 10MB');
  }
  
  if (file.size < 1024) { // 1KB minimum
    errors.push('File appears to be empty or corrupted');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};
