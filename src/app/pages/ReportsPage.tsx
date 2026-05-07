import NavBar from '../components/NavBar';
import { useRef, useState } from 'react';
import { FileText, Calendar, Download, Filter, X, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { CustomDropdown } from '../components/ui/CustomDropdown';
const mockEmployees = [
  {
    id: 1,
    name: 'John Smith',
    department: 'Processing',
    date: '2026-05-07',
    clockIn: '08:00',
    clockOut: '16:30',
    hours: 8.5,
    status: 'Present',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    department: 'Cold Storage',
    date: '2026-05-07',
    clockIn: '07:55',
    clockOut: '16:25',
    hours: 8.5,
    status: 'Present',
  },
  {
    id: 3,
    name: 'David Chen',
    department: 'Dispatch',
    date: '2026-05-07',
    clockIn: '08:15',
    clockOut: '16:45',
    hours: 8.5,
    status: 'Late',
  },
  { id: 4, name: 'Sarah Williams', department: 'Slaughter', date: '2026-05-07', clockIn: '-', clockOut: '-', hours: 0, status: 'Absent' },
  {
    id: 5,
    name: 'Michael Brown',
    department: 'Processing',
    date: '2026-05-07',
    clockIn: '08:05',
    clockOut: '16:35',
    hours: 8.5,
    status: 'Present',
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    department: 'Cold Storage',
    date: '2026-05-07',
    clockIn: '08:20',
    clockOut: '16:50',
    hours: 8.5,
    status: 'Late',
  },
  {
    id: 7,
    name: 'James Taylor',
    department: 'Dispatch',
    date: '2026-05-07',
    clockIn: '08:00',
    clockOut: '16:30',
    hours: 8.5,
    status: 'Present',
  },
  {
    id: 8,
    name: 'Emma Martinez',
    department: 'Slaughter',
    date: '2026-05-07',
    clockIn: '07:58',
    clockOut: '16:28',
    hours: 8.5,
    status: 'Present',
  },
];

const absenteeismData = [
  { name: 'Sarah Williams', department: 'Slaughter', missedShifts: 3, lastShift: '2026-05-07', severity: 'high' },
  { name: 'David Chen', department: 'Dispatch', missedShifts: 2, lastShift: '2026-05-06', severity: 'medium' },
  { name: 'Lisa Anderson', department: 'Cold Storage', missedShifts: 1, lastShift: '2026-05-05', severity: 'low' },
];

const absenteeismTrend = [
  { day: 'Mon', count: 5 },
  { day: 'Tue', count: 3 },
  { day: 'Wed', count: 7 },
  { day: 'Thu', count: 4 },
  { day: 'Fri', count: 6 },
];

const shiftCoverageData = [
  { shift: 'Morning Shift', scheduled: 45, actual: 42, gap: 3 },
  { shift: 'Night Shift', scheduled: 25, actual: 27, gap: -2 },
];

export default function ReportsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedEmployees, setSelectedEmployees] = useState('All Employees');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 7 Days');

  const navigate = useNavigate();
  const itemsPerPage = 5;

  // Filter employees based on selected filters
  const filteredEmployees = mockEmployees.filter((employee) => {
    const departmentMatch = selectedDepartment === 'All Departments' || employee.department === selectedDepartment;
    const employeeMatch =
      selectedEmployees === 'All Employees' ||
      (selectedEmployees === 'Active Only' && employee.status !== 'Absent') ||
      (selectedEmployees === 'On Leave' && employee.status === 'Absent');
    return departmentMatch && employeeMatch;
  });

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  const handleClearFilters = () => {
    setSelectedDepartment('All Departments');
    setSelectedEmployees('All Employees');
    setSelectedDateRange('Last 7 Days');
    setCurrentPage(1);
  };

  const exportToExcel = () => {
    const htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <head>
          <meta charset="utf-8">
          <!--[if gte mso 9]>
          <xml>
            <x:ExcelWorkbook>
              <x:ExcelWorksheets>
                <x:ExcelWorksheet>
                  <x:Name>Attendance Report</x:Name>
                  <x:WorksheetOptions>
                    <x:DisplayGridlines/>
                  </x:WorksheetOptions>
                </x:ExcelWorksheet>
              </x:ExcelWorksheets>
            </x:ExcelWorkbook>
          </xml>
          <![endif]-->
          <style>
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th {
              background-color: #f97316;
              color: white;
              font-weight: bold;
              padding: 12px;
              text-align: left;
              border: 1px solid #ddd;
            }
            td {
              padding: 10px;
              border: 1px solid #ddd;
              text-align: left;
            }
            .status-present {
              background-color: #d1fae5;
              color: #065f46;
              font-weight: 500;
            }
            .status-late {
              background-color: #fef3c7;
              color: #92400e;
              font-weight: 500;
            }
            .status-absent {
              background-color: #fee2e2;
              color: #991b1b;
              font-weight: 500;
            }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Date</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Hours Worked</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEmployees
                .map(
                  (emp) => `
                <tr>
                  <td>${emp.name}</td>
                  <td>${emp.department}</td>
                  <td>${emp.date}</td>
                  <td>${emp.clockIn}</td>
                  <td>${emp.clockOut}</td>
                  <td>${emp.hours}</td>
                  <td class="status-${emp.status.toLowerCase()}">${emp.status}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance_report_${new Date().toISOString().split('T')[0]}.xls`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowExportMenu(false);
  };

  const exportToPDF = () => {
    const printWindow = window.open('', '', 'height=800,width=1000');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Attendance Report - ${new Date().toLocaleDateString()}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              color: #333;
            }
            h1 {
              color: #1a1a1a;
              margin-bottom: 10px;
            }
            .subtitle {
              color: #666;
              margin-bottom: 30px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            th {
              background-color: #f3f4f6;
              padding: 12px;
              text-align: left;
              border-bottom: 2px solid #ddd;
              font-weight: 600;
            }
            td {
              padding: 10px 12px;
              border-bottom: 1px solid #eee;
            }
            tr:hover {
              background-color: #f9fafb;
            }
            .status {
              padding: 4px 12px;
              border-radius: 12px;
              font-size: 12px;
              font-weight: 500;
            }
            .status-present {
              background-color: #d1fae5;
              color: #065f46;
            }
            .status-late {
              background-color: #fef3c7;
              color: #92400e;
            }
            .status-absent {
              background-color: #fee2e2;
              color: #991b1b;
            }
            @media print {
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          <h1>Attendance Report</h1>
          <p class="subtitle">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          <table>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Date</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Hours Worked</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${filteredEmployees
                .map(
                  (emp) => `
                <tr>
                  <td>${emp.name}</td>
                  <td>${emp.department}</td>
                  <td>${emp.date}</td>
                  <td>${emp.clockIn}</td>
                  <td>${emp.clockOut}</td>
                  <td>${emp.hours}h</td>
                  <td><span class="status status-${emp.status.toLowerCase()}">${emp.status}</span></td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
    setShowExportMenu(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Late':
        return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      case 'Absent':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'border-l-red-500 bg-red-500/5';
      case 'medium':
        return 'border-l-amber-500 bg-amber-500/5';
      case 'low':
        return 'border-l-orange-500 bg-orange-500/5';
      default:
        return 'border-l-gray-500 bg-gray-500/5';
    }
  };

  const exportButtonRef = useRef<HTMLButtonElement>(null);
  const departments = ['All Departments', 'Processing', 'Cold Storage', 'Dispatch', 'Slaughter'];
  const employees = ['All Employees', 'Active Only', 'On Leave'];
  const dateRange = ['Last 7 Days', 'Last 30 Days', 'This Month'];

  return (
    <div className="mx-auto max-w-[1800px] p-6">
      <div className="space-y-6">
        <NavBar />
        {/* Header */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>
              <div className="rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-3">
                <FileText className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <h1 className="mb-1 text-white">Reports</h1>
                <p className="text-sm text-gray-400">Track workforce activity across departments</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-white backdrop-blur-xl transition-all duration-300 hover:bg-white/10">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">May 1 - May 7, 2026</span>
              </button>

              <div className="relative">
                <button
                  ref={exportButtonRef}
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="flex items-center gap-2 rounded-xl border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-red-500/20 px-4 py-2.5 text-white transition-all duration-300 hover:from-orange-500/30 hover:to-red-500/30"
                >
                  <Download className="h-4 w-4" />
                  <span className="text-sm">Export</span>
                </button>

                {showExportMenu &&
                  createPortal(
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        position: 'absolute',
                        top: exportButtonRef.current?.getBoundingClientRect().bottom ?? 0,
                        right: window.innerWidth - (exportButtonRef.current?.getBoundingClientRect().right ?? 0),
                      }}
                      className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-gray-900/95 p-2 shadow-lg backdrop-blur-xl"
                    >
                      <button
                        onClick={exportToExcel}
                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left text-sm text-white transition-all hover:bg-white/10"
                      >
                        <Download className="h-4 w-4" />
                        Export as Excel
                      </button>
                      <button
                        onClick={exportToPDF}
                        className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left text-sm text-white transition-all hover:bg-white/10"
                      >
                        <Download className="h-4 w-4" />
                        Export as PDF
                      </button>
                    </motion.div>,
                    document.body
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-lg border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-2">
              <Filter className="h-4 w-4 text-orange-400" />
            </div>

            <CustomDropdown
              value={selectedDepartment}
              options={departments}
              onChange={(val) => {
                setSelectedDepartment(val);
                setCurrentPage(1);
              }}
            />
            <CustomDropdown
              value={selectedEmployees}
              options={employees}
              onChange={(val) => {
                setSelectedEmployees(val);
                setCurrentPage(1);
              }}
            />
            <CustomDropdown
              value={selectedDateRange}
              options={dateRange}
              onChange={(val) => {
                setSelectedDateRange(val);
                setCurrentPage(1);
              }}
            />

            <button onClick={handleClearFilters} className="px-4 py-2 text-sm text-gray-400 transition-all duration-300 hover:text-white">
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Attendance Report Table */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-2">
                <FileText className="h-5 w-5 text-orange-400" />
              </div>
              <h2 className="text-white">Attendance Report</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-3 text-left text-sm font-medium text-gray-400">Employee Name</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-400">Department</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-400">Date</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-400">Clock In</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-400">Clock Out</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-400">Hours</th>
                    <th className="pb-3 text-left text-sm font-medium text-gray-400">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b border-white/5 transition-all duration-300 hover:bg-white/5">
                      <td className="py-4 text-sm text-white">{employee.name}</td>
                      <td className="py-4 text-sm text-gray-300">{employee.department}</td>
                      <td className="py-4 text-sm text-gray-300">{employee.date}</td>
                      <td className="py-4 text-sm text-gray-300">{employee.clockIn}</td>
                      <td className="py-4 text-sm text-gray-300">{employee.clockOut}</td>
                      <td className="py-4 text-sm text-gray-300">{employee.hours}h</td>
                      <td className="py-4">
                        <span className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(employee.status)}`}>
                          {employee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="text-sm text-gray-400">
                Showing {filteredEmployees.length === 0 ? 0 : startIndex + 1} to{' '}
                {Math.min(startIndex + itemsPerPage, filteredEmployees.length)} of {filteredEmployees.length} entries
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-white/10 bg-white/5 p-2 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4 text-white" />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`rounded-lg px-3 py-1.5 text-sm transition-all duration-300 ${
                      currentPage === i + 1
                        ? 'border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-red-500/20 text-white'
                        : 'border border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-white/10 bg-white/5 p-2 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Absenteeism Tracking Panel */}
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg border border-red-500/20 bg-gradient-to-br from-red-500/20 to-amber-500/20 p-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <h2 className="text-white">Absenteeism Tracking</h2>
            </div>

            <div className="mb-6 space-y-3">
              {absenteeismData.map((employee, index) => (
                <div key={index} className={`rounded-xl border-l-4 bg-white/5 p-4 backdrop-blur-xl ${getSeverityColor(employee.severity)}`}>
                  <div className="mb-1 text-sm font-medium text-white">{employee.name}</div>
                  <div className="mb-2 text-xs text-gray-400">{employee.department}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Missed: {employee.missedShifts}</span>
                    <span className="text-xs text-gray-500">Last: {employee.lastShift}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
              <h3 className="mb-4 text-sm font-medium text-white">Weekly Trend</h3>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={absenteeismTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                  <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Bar dataKey="count" fill="rgba(251, 146, 60, 0.8)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Shift Coverage Chart */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-2">
              <Calendar className="h-5 w-5 text-orange-400" />
            </div>
            <h2 className="text-white">Shift Coverage</h2>
          </div>

          <div className="space-y-6">
            {shiftCoverageData.map((shift, index) => (
              <div key={index}>
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-sm font-medium text-white">{shift.shift}</div>
                  <div className="text-sm text-gray-400">
                    {shift.actual} / {shift.scheduled} employees
                    {shift.gap > 0 && <span className="ml-2 text-red-400">(-{shift.gap} short)</span>}
                    {shift.gap < 0 && <span className="ml-2 text-yellow-400">(+{Math.abs(shift.gap)} over)</span>}
                  </div>
                </div>
                <div className="relative h-8 overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500/40 to-green-500/60 transition-all duration-500"
                    style={{ width: `${(shift.actual / shift.scheduled) * 100}%` }}
                  ></div>
                  {shift.gap > 0 && (
                    <div
                      className="absolute top-0 right-0 h-full bg-red-500/40"
                      style={{ width: `${(shift.gap / shift.scheduled) * 100}%` }}
                    ></div>
                  )}
                  {shift.gap < 0 && (
                    <div
                      className="absolute top-0 h-full bg-yellow-500/40"
                      style={{
                        left: `${(shift.scheduled / shift.scheduled) * 100}%`,
                        width: `${(Math.abs(shift.gap) / shift.scheduled) * 100}%`,
                      }}
                    ></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-6 border-t border-white/10 pt-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500/60"></div>
              <span className="text-xs text-gray-400">Actual Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/60"></div>
              <span className="text-xs text-gray-400">Shortage</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500/60"></div>
              <span className="text-xs text-gray-400">Excess</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
