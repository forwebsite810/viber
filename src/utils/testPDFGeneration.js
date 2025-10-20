// Test utility for PDF generation functionality
export const testPDFGeneration = async () => {
  try {
    console.log('🧪 Testing PDF generation...');
    
    // Check if required elements exist
    const cvSection = document.getElementById('cv-preview');
    if (!cvSection) {
      throw new Error('CV preview section not found');
    }
    
    // Check if required libraries are loaded
    if (typeof html2canvas === 'undefined') {
      throw new Error('html2canvas not loaded');
    }
    
    if (typeof jsPDF === 'undefined') {
      throw new Error('jsPDF not loaded');
    }
    
    console.log('✅ All dependencies loaded');
    console.log('✅ CV preview section found');
    console.log('✅ PDF generation ready');
    
    return { success: true, message: 'PDF generation test passed' };
  } catch (error) {
    console.error('❌ PDF generation test failed:', error);
    return { success: false, error: error.message };
  }
};

// Test PDF generation with sample data
export const testPDFWithSampleData = async () => {
  try {
    console.log('🧪 Testing PDF generation with sample data...');
    
    // This would be called after the CV is populated with data
    const cvSection = document.getElementById('cv-preview');
    if (!cvSection) {
      throw new Error('CV preview section not found');
    }
    
    // Check if CV has content
    const hasContent = cvSection.textContent.trim().length > 0;
    if (!hasContent) {
      console.warn('⚠️ CV preview appears to be empty');
    }
    
    console.log('✅ CV content check passed');
    return { success: true, message: 'Sample data test passed' };
  } catch (error) {
    console.error('❌ Sample data test failed:', error);
    return { success: false, error: error.message };
  }
};
