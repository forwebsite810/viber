// Simple PDF generation test
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const testSimplePDF = async () => {
  try {
    console.log('🧪 Testing simple PDF generation...');
    
    const preview = document.getElementById('cv-preview');
    if (!preview) {
      throw new Error('CV preview not found');
    }
    
    console.log('✅ CV preview found:', preview);
    console.log('📏 Preview dimensions:', {
      width: preview.scrollWidth,
      height: preview.scrollHeight,
      offsetWidth: preview.offsetWidth,
      offsetHeight: preview.offsetHeight
    });
    
    // Wait for fonts and styles to load
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('📸 Capturing canvas...');
    const canvas = await html2canvas(preview, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
      windowWidth: preview.scrollWidth,
      windowHeight: preview.scrollHeight,
    });
    
    console.log('✅ Canvas captured:', {
      width: canvas.width,
      height: canvas.height
    });
    
    const imgData = canvas.toDataURL('image/png');
    console.log('✅ Image data generated, length:', imgData.length);
    
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    console.log('📄 PDF dimensions:', {
      pdfWidth,
      pdfHeight,
      canvasWidth: canvas.width,
      canvasHeight: canvas.height
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('Test_CV.pdf');
    
    console.log('✅ PDF generated successfully!');
    return { success: true };
  } catch (error) {
    console.error('❌ PDF generation test failed:', error);
    return { success: false, error: error.message };
  }
};
