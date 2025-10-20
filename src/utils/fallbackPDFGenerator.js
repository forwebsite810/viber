import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateFallbackPDF = async (filename = 'My_Formal_CV.pdf') => {
  try {
    const preview = document.getElementById('cv-preview');
    if (!preview) {
      throw new Error('Preview not found!');
    }

    // Wait to ensure all fonts and styles are loaded
    await new Promise((resolve) => setTimeout(resolve, 500));

    const canvas = await html2canvas(preview, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
      windowWidth: preview.scrollWidth,
      windowHeight: preview.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);

    return { success: true, filename };
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
};
