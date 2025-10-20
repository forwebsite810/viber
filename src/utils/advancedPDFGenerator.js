import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateAdvancedPDF = async (filename = 'My_Formal_CV.pdf') => {
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

export const generatePDFWithOptions = async (options = {}) => {
  const {
    filename = 'My_CV.pdf',
    scale = 2,
    quality = 1.0,
    format = 'a4',
    orientation = 'portrait'
  } = options;

  try {
    const cvSection = document.getElementById('cv-preview');
    if (!cvSection) {
      throw new Error('CV preview section not found');
    }

    // Capture with specified options
    const canvas = await html2canvas(cvSection, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: cvSection.scrollWidth,
      height: cvSection.scrollHeight,
      foreignObjectRendering: true,
      removeContainer: true
    });

    // Create PDF with specified format
    const pdf = new jsPDF(orientation, 'mm', format);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate scaling
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    // Center image
    const xOffset = (pdfWidth - scaledWidth) / 2;
    const yOffset = (pdfHeight - scaledHeight) / 2;

    // Add image with specified quality
    const imgData = canvas.toDataURL('image/png', quality);
    pdf.addImage(imgData, 'PNG', xOffset, yOffset, scaledWidth, scaledHeight);

    // Handle multiple pages
    if (scaledHeight > pdfHeight) {
      const totalPages = Math.ceil(scaledHeight / pdfHeight);
      
      for (let i = 1; i < totalPages; i++) {
        pdf.addPage();
        const yPosition = -i * pdfHeight;
        pdf.addImage(imgData, 'PNG', xOffset, yPosition, scaledWidth, scaledHeight);
      }
    }

    // Save PDF
    pdf.save(filename);

    return { success: true, filename };
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
};
