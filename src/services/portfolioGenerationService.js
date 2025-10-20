import { extractTextFromPDF, validatePDFFile } from '../utils/pdfTextExtractor';
import { analyzeCVFile } from '../utils/analyzeCVWithAI';
import { generatePortfolioWithAI } from '../utils/aiCVAnalyzer';
import { generatePortfolioZIP } from '../utils/portfolioZIPGenerator';

export class PortfolioGenerationService {
  constructor() {
    this.currentStep = 0;
    this.totalSteps = 5;
    this.onProgress = null;
  }

  setProgressCallback(callback) {
    this.onProgress = callback;
  }

  updateProgress(step, message) {
    this.currentStep = step;
    const progress = (step / this.totalSteps) * 100;
    
    if (this.onProgress) {
      this.onProgress({
        step,
        totalSteps: this.totalSteps,
        progress,
        message
      });
    }
    
    console.log(`📊 Progress: ${step}/${this.totalSteps} (${Math.round(progress)}%) - ${message}`);
  }

  async generatePortfolioFromPDF(pdfFile) {
    try {
      // Step 1: Validate PDF file
      this.updateProgress(1, 'Validating PDF file...');
      const validation = validatePDFFile(pdfFile);
      if (!validation.valid) {
        throw new Error(`PDF validation failed: ${validation.errors.join(', ')}`);
      }

      // Step 2: Extract text from PDF
      this.updateProgress(2, 'Extracting text from PDF...');
      const extractionResult = await extractTextFromPDF(pdfFile);
      if (!extractionResult.success) {
        throw new Error(`PDF text extraction failed: ${extractionResult.error}`);
      }

      // Step 3: Analyze CV with AI
      this.updateProgress(3, 'Analyzing CV with AI...');
      const analysisResult = await analyzeCVFile(extractionResult.text);
      if (!analysisResult.success) {
        throw new Error(`AI analysis failed: ${analysisResult.error}`);
      }

      // Step 4: Generate portfolio with AI
      this.updateProgress(4, 'Generating portfolio website...');
      const portfolioResult = await generatePortfolioWithAI(analysisResult.data);
      if (!portfolioResult.success) {
        throw new Error(`Portfolio generation failed: ${portfolioResult.error}`);
      }

      // Step 5: Create ZIP file
      this.updateProgress(5, 'Creating downloadable ZIP...');
      const zipResult = await generatePortfolioZIP(portfolioResult.files, analysisResult.data);
      if (!zipResult.success) {
        throw new Error(`ZIP generation failed: ${zipResult.error}`);
      }

      this.updateProgress(5, 'Portfolio generation complete!');
      
      return {
        success: true,
        cvData: analysisResult.data,
        portfolioFiles: portfolioResult.files,
        zipBlob: zipResult.zipBlob,
        filename: zipResult.filename,
        extractedText: extractionResult.text,
        pageCount: extractionResult.pageCount
      };
    } catch (error) {
      console.error('❌ Portfolio generation failed:', error);
      return {
        success: false,
        error: error.message,
        step: this.currentStep
      };
    }
  }

  async downloadPortfolioZip(zipBlob, filename) {
    try {
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      return { success: true };
    } catch (error) {
      console.error('❌ Download failed:', error);
      return { success: false, error: error.message };
    }
  }

  getSupportedFileTypes() {
    return [
      {
        type: 'application/pdf',
        extensions: ['.pdf'],
        description: 'PDF documents'
      }
    ];
  }

  getMaxFileSize() {
    return 10 * 1024 * 1024; // 10MB
  }

  getSupportedLanguages() {
    return [
      'English',
      'Spanish', 
      'French',
      'German',
      'Italian',
      'Portuguese',
      'Dutch',
      'Russian',
      'Chinese',
      'Japanese',
      'Korean',
      'Arabic'
    ];
  }
}

// Create singleton instance
export const portfolioService = new PortfolioGenerationService();
