
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Message } from '@/components/chat/ChatMessage';

export const exportChatToPdf = (messages: Message[], patientName: string = 'Patient') => {
  try {
    // Create a new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const currentDate = new Date().toLocaleDateString();
    
    // Add header
    doc.setFontSize(18);
    doc.setTextColor(44, 82, 130);
    doc.text('HealthLynk Consultation Summary', pageWidth / 2, 20, { align: 'center' });
    
    // Add patient information
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Patient: ${patientName}`, 20, 30);
    doc.text(`Date: ${currentDate}`, 20, 38);
    
    // Prepare data for the table
    const tableData = messages.map((message) => {
      return [
        message.role === 'user' ? 'You' : 'Healthcare Assistant',
        message.content,
        message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      ];
    });
    
    // Skip the first message if it's the standard greeting
    const startIndex = 
      messages.length > 0 && 
      messages[0].role === 'assistant' && 
      messages[0].content === "Hello! I'm your healthcare assistant. How can I help you today?" 
        ? 1 : 0;
    
    // Create table with chat messages
    autoTable(doc, {
      startY: 45,
      head: [['Sender', 'Message', 'Time']],
      body: tableData.slice(startIndex),
      headStyles: {
        fillColor: [44, 82, 130],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 30 },
      },
      styles: {
        overflow: 'linebreak',
        cellPadding: 4,
      },
      didDrawPage: (data) => {
        // Add footer on each page
        const pageCount = doc.internal.pages.length;
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(
          `Page ${data.pageNumber} of ${pageCount} - HealthLynk ${new Date().getFullYear()}`,
          pageWidth / 2, 
          doc.internal.pageSize.getHeight() - 10, 
          { align: 'center' }
        );
      },
    });
    
    // Save the PDF
    doc.save(`HealthLynk_Consultation_${currentDate.replace(/\//g, '-')}.pdf`);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};
