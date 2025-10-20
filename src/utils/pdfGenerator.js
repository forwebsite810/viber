import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (filename = 'My_CV.pdf') => {
  try {
    // Get the CV preview element
    const cvSection = document.getElementById('cv-preview');
    if (!cvSection) {
      throw new Error('CV preview section not found');
    }

    // Show loading state
    const originalContent = cvSection.innerHTML;
    cvSection.innerHTML = `
      <div class="flex items-center justify-center h-64">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p class="text-gray-600">Generating PDF...</p>
        </div>
      </div>
    `;

    // Wait a moment for the loading state to be visible
    await new Promise(resolve => setTimeout(resolve, 500));

    // Restore original content
    cvSection.innerHTML = originalContent;

    // Wait for fonts and images to load
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Configure html2canvas options for high quality
    const canvas = await html2canvas(cvSection, {
      scale: 3, // Higher resolution for better quality
      useCORS: true, // Allow cross-origin images
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: cvSection.scrollWidth,
      height: cvSection.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      windowWidth: cvSection.scrollWidth,
      windowHeight: cvSection.scrollHeight,
      foreignObjectRendering: true, // Better text rendering
      removeContainer: true // Remove container styling
    });

    // Get canvas dimensions
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Create PDF with A4 dimensions
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate scaling to fit content
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    // Center the content on the page
    const xOffset = (pdfWidth - scaledWidth) / 2;
    const yOffset = (pdfHeight - scaledHeight) / 2;

    // Convert canvas to image data
    const imgData = canvas.toDataURL('image/png', 1.0);

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', xOffset, yOffset, scaledWidth, scaledHeight);

    // Handle multi-page content if needed
    if (scaledHeight > pdfHeight) {
      const totalPages = Math.ceil(scaledHeight / pdfHeight);
      
      for (let i = 1; i < totalPages; i++) {
        pdf.addPage();
        const yPosition = -i * pdfHeight;
        pdf.addImage(imgData, 'PNG', xOffset, yPosition, scaledWidth, scaledHeight);
      }
    }

    // Save the PDF
    pdf.save(filename);

    return { success: true, filename };
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
};

export const generatePDFWithProgress = async (filename = 'My_CV.pdf', onProgress) => {
  try {
    onProgress?.(10, 'Preparing CV content...');
    
    const cvSection = document.getElementById('cv-preview');
    if (!cvSection) {
      throw new Error('CV preview section not found');
    }

    onProgress?.(30, 'Capturing CV preview...');
    
    // Configure html2canvas for high quality
    const canvas = await html2canvas(cvSection, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: cvSection.scrollWidth,
      height: cvSection.scrollHeight
    });

    onProgress?.(60, 'Processing image data...');

    // Get canvas dimensions
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // Calculate scaling
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    // Center content
    const xOffset = (pdfWidth - scaledWidth) / 2;
    const yOffset = (pdfHeight - scaledHeight) / 2;

    onProgress?.(80, 'Generating PDF...');

    // Add image to PDF
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', xOffset, yOffset, scaledWidth, scaledHeight);

    // Handle multi-page content
    if (scaledHeight > pdfHeight) {
      const totalPages = Math.ceil(scaledHeight / pdfHeight);
      
      for (let i = 1; i < totalPages; i++) {
        pdf.addPage();
        const yPosition = -i * pdfHeight;
        pdf.addImage(imgData, 'PNG', xOffset, yPosition, scaledWidth, scaledHeight);
      }
    }

    onProgress?.(95, 'Finalizing PDF...');

    // Save PDF
    pdf.save(filename);

    onProgress?.(100, 'PDF generated successfully!');
    return { success: true, filename };
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error(`Failed to generate PDF: ${error.message}`);
  }
};
