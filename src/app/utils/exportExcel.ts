import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportExcel = (data: any[]) => {
  const rows = data.map((record) => ({
    ID: record.id,
    Name: record.name,
    Department: record.department,
    Date: record.date,
    'Clock In': record.clockIn,
    'Clock Out': record.clockOut,
    'Hours Worked': record.hours,
    Status: record.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet['!cols'] = [{ wch: 5 }, { wch: 20 }, { wch: 15 }, { wch: 12 }, { wch: 10 }, { wch: 10 }, { wch: 14 }, { wch: 10 }];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
  });

  saveAs(blob, 'attendance-report.xlsx');
};
