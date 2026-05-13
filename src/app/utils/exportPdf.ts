import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportPdf = (data: any[]) => {
  const doc = new jsPDF({ orientation: 'landscape' });

  doc.setFontSize(14);
  doc.text('Attendance Report', 14, 15);
  doc.setFontSize(10);
  doc.text(`Date: ${data[0].date}`, 14, 22);

  autoTable(doc, {
    startY: 28,
    head: [['ID', 'Name', 'Department', 'Date', 'Clock In', 'Clock Out', 'Hours Worked', 'Status']],
    body: data.map((record) => [
      record.id,
      record.name,
      record.department,
      record.date,
      record.clockIn,
      record.clockOut,
      record.hours,
      record.status,
    ]),
    headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [240, 240, 240] },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 48 },
      2: { cellWidth: 42 },
      3: { cellWidth: 42 },
      4: { cellWidth: 22 },
      5: { cellWidth: 25 },
      6: { cellWidth: 30 },
      7: { cellWidth: 22 },
    },
  });

  doc.save('attendance-report.pdf');
};
