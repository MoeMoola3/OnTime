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

const staffData = [
  {
    id: 1,
    employeeId: 'EMP001',
    name: 'John Smith',
    department: 'Processing',
    position: 'Shift Lead',
    email: 'john.smith@company.com',
    phone: '(555) 123-4567',
    hireDate: '2023-01-15',
    status: 'Active',
  },
  {
    id: 2,
    employeeId: 'EMP002',
    name: 'Maria Garcia',
    department: 'Cold Storage',
    position: 'Operator',
    email: 'maria.garcia@company.com',
    phone: '(555) 234-5678',
    hireDate: '2023-03-20',
    status: 'Active',
  },
  {
    id: 3,
    employeeId: 'EMP003',
    name: 'David Chen',
    department: 'Dispatch',
    position: 'Coordinator',
    email: 'david.chen@company.com',
    phone: '(555) 345-6789',
    hireDate: '2022-11-10',
    status: 'Active',
  },
  {
    id: 4,
    employeeId: 'EMP004',
    name: 'Sarah Williams',
    department: 'Slaughter',
    position: 'Technician',
    email: 'sarah.williams@company.com',
    phone: '(555) 456-7890',
    hireDate: '2024-02-01',
    status: 'On Leave',
  },
  {
    id: 5,
    employeeId: 'EMP005',
    name: 'Michael Brown',
    department: 'Processing',
    position: 'Operator',
    email: 'michael.brown@company.com',
    phone: '(555) 567-8901',
    hireDate: '2023-06-15',
    status: 'Active',
  },
  {
    id: 6,
    employeeId: 'EMP006',
    name: 'Lisa Anderson',
    department: 'Cold Storage',
    position: 'Shift Lead',
    email: 'lisa.anderson@company.com',
    phone: '(555) 678-9012',
    hireDate: '2022-08-22',
    status: 'Active',
  },
  {
    id: 7,
    employeeId: 'EMP007',
    name: 'James Taylor',
    department: 'Dispatch',
    position: 'Coordinator',
    email: 'james.taylor@company.com',
    phone: '(555) 789-0123',
    hireDate: '2023-04-18',
    status: 'Active',
  },
  {
    id: 8,
    employeeId: 'EMP008',
    name: 'Emma Martinez',
    department: 'Slaughter',
    position: 'Operator',
    email: 'emma.martinez@company.com',
    phone: '(555) 890-1234',
    hireDate: '2024-01-10',
    status: 'Active',
  },
  {
    id: 9,
    employeeId: 'EMP009',
    name: 'Robert Johnson',
    department: 'Processing',
    position: 'Operator',
    email: 'robert.johnson@company.com',
    phone: '(555) 901-2345',
    hireDate: '2023-09-05',
    status: 'Active',
  },
  {
    id: 10,
    employeeId: 'EMP010',
    name: 'Jennifer Lee',
    department: 'Cold Storage',
    position: 'Operator',
    email: 'jennifer.lee@company.com',
    phone: '(555) 012-3456',
    hireDate: '2023-07-12',
    status: 'Active',
  },
];

const departmentsData = [
  {
    id: 1,
    name: 'Processing',
    manager: 'John Smith',
    employeeCount: 45,
    location: 'Building A - Floor 2',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Cold Storage',
    manager: 'Lisa Anderson',
    employeeCount: 32,
    location: 'Building B - Floor 1',

    status: 'Active',
  },
  { id: 3, name: 'Dispatch', manager: 'David Chen', employeeCount: 28, location: 'Building C - Floor 1', status: 'Active' },
  {
    id: 4,
    name: 'Slaughter',
    manager: 'Sarah Williams',
    employeeCount: 38,
    location: 'Building A - Floor 1',

    status: 'Active',
  },
  {
    id: 5,
    name: 'Quality Control',
    manager: 'Michael Brown',
    employeeCount: 15,
    location: 'Building B - Floor 2',

    status: 'Active',
  },
  { id: 6, name: 'Maintenance', manager: 'James Taylor', employeeCount: 12, location: 'Building D', status: 'Active' },
  { id: 7, name: 'Administration', manager: 'Emma Martinez', employeeCount: 8, location: 'Main Office', status: 'Active' },
];

const terminalsData = [
  {
    id: 1,
    terminalId: 'TERM001',
    name: 'Main Entrance - Building A',
    location: 'Building A - Entrance',
    status: 'Online',
    lastSync: '2026-05-12 08:30:15',
    assignedEmployees: 85,
  },
  {
    id: 2,
    terminalId: 'TERM002',
    name: 'Cold Storage Entry',
    location: 'Building B - Floor 1',
    status: 'Online',
    lastSync: '2026-05-12 08:29:45',
    assignedEmployees: 32,
  },
  {
    id: 3,
    terminalId: 'TERM003',
    name: 'Dispatch Hub',
    location: 'Building C - Floor 1',
    status: 'Online',
    lastSync: '2026-05-12 08:31:20',
    assignedEmployees: 28,
  },
  {
    id: 4,
    terminalId: 'TERM004',
    name: 'Secondary Entrance - Building A',
    location: 'Building A - Side Entrance',
    status: 'Offline',
    lastSync: '2026-05-12 06:15:30',
    assignedEmployees: 45,
  },
  {
    id: 5,
    terminalId: 'TERM005',
    name: 'QC Station',
    location: 'Building B - Floor 2',
    status: 'Online',
    lastSync: '2026-05-12 08:28:55',
    assignedEmployees: 15,
  },
  {
    id: 6,
    terminalId: 'TERM006',
    name: 'Maintenance Shop',
    location: 'Building D',
    status: 'Online',
    lastSync: '2026-05-12 08:30:40',
    assignedEmployees: 12,
  },
  {
    id: 7,
    terminalId: 'TERM007',
    name: 'Office Terminal',
    location: 'Main Office',
    status: 'Online',
    lastSync: '2026-05-12 08:29:10',
    assignedEmployees: 8,
  },
];

const shiftsData = [
  {
    id: 1,
    shiftName: 'Morning Shift',
    startTime: '06:00 AM',
    endTime: '02:00 PM',
    duration: '8 hours',
    days: 'Mon-Fri',
    department: 'All Departments',
    capacity: 120,
  },
  {
    id: 2,
    shiftName: 'Afternoon Shift',
    startTime: '02:00 PM',
    endTime: '10:00 PM',
    duration: '8 hours',
    days: 'Mon-Fri',
    department: 'All Departments',
    capacity: 95,
  },
  {
    id: 3,
    shiftName: 'Night Shift',
    startTime: '10:00 PM',
    endTime: '06:00 AM',
    duration: '8 hours',
    days: 'Mon-Fri',
    department: 'All Departments',
    capacity: 65,
  },
  {
    id: 4,
    shiftName: 'Weekend Morning',
    startTime: '06:00 AM',
    endTime: '02:00 PM',
    duration: '8 hours',
    days: 'Sat-Sun',
    department: 'Essential Only',
    capacity: 45,
  },
  {
    id: 5,
    shiftName: 'Weekend Afternoon',
    startTime: '02:00 PM',
    endTime: '10:00 PM',
    duration: '8 hours',
    days: 'Sat-Sun',
    department: 'Essential Only',
    capacity: 35,
  },
  {
    id: 6,
    shiftName: 'Extended Morning',
    startTime: '05:00 AM',
    endTime: '03:00 PM',
    duration: '10 hours',
    days: 'Mon-Fri',
    department: 'Processing, Slaughter',
    capacity: 50,
  },
  {
    id: 7,
    shiftName: 'Split Shift A',
    startTime: '07:00 AM',
    endTime: '11:00 AM',
    duration: '4 hours',
    days: 'Mon-Fri',
    department: 'Dispatch',
    capacity: 15,
  },
  {
    id: 8,
    shiftName: 'Split Shift B',
    startTime: '03:00 PM',
    endTime: '07:00 PM',
    duration: '4 hours',
    days: 'Mon-Fri',
    department: 'Dispatch',
    capacity: 15,
  },
];

export default function OperationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedEmployees, setSelectedEmployees] = useState('All Employees');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 7 Days');

  const navigate = useNavigate();
  const itemsPerPage = 10;

  const filteredEmployees = mockEmployees.filter((employee) => {
    const departmentMatch = selectedDepartment === 'All Departments' || employee.department === selectedDepartment;
    const employeeMatch =
      selectedEmployees === 'All Employees' ||
      (selectedEmployees === 'Active Only' && employee.status !== 'Absent') ||
      (selectedEmployees === 'On Leave' && employee.status === 'Absent');
    return departmentMatch && employeeMatch;
  });

  // const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, startIndex + itemsPerPage);

  const handleClearFilters = () => {
    setSelectedDepartment('All Departments');
    setSelectedEmployees('All Employees');
    setSelectedDateRange('Last 7 Days');
    setCurrentPage(1);
  };

  const [editedRates, setEditedRates] = useState<Record<string, number>>({});

  // Add this helper function
  const getHourlyRate = (item: any) => editedRates[item.id] ?? item.hourlyRate;

  const getCalculatedPay = (item: any) => {
    const rate = getHourlyRate(item);
    const gross: any = (item.hoursWorked * rate).toFixed(2);
    const net = (gross * 0.75).toFixed(2);
    return { gross, net };
  };

  const [editedStatuses, setEditedStatuses] = useState<Record<string, string>>({});

  const getLeaveStatus = (item: any) => editedStatuses[item.id] ?? item.status;

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

  const exportButtonRef = useRef<HTMLButtonElement>(null);
  const departments = ['All Departments', 'Processing', 'Cold Storage', 'Dispatch', 'Slaughter'];
  const employees = ['All Employees', 'Active Only', 'On Leave'];
  const dateRange = ['Last 7 Days', 'Last 30 Days', 'This Month'];

  const [activeTab, setActiveTab] = useState<'staff' | 'departments' | 'terminals' | 'shifts'>('staff');

  const getCurrentData: any = () => {
    switch (activeTab) {
      case 'staff':
        return staffData;
      case 'departments':
        return departmentsData;
      case 'terminals':
        return terminalsData;
      case 'shifts':
        return shiftsData;
      default:
        return staffData;
    }
  };

  const handleTabChange = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Filter data based on selected filters
  const filteredData = getCurrentData().filter((item) => {
    const departmentMatch = selectedDepartment === 'All Departments' || item.department === selectedDepartment;
    return departmentMatch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

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
                <h1 className="mb-1 text-white">Operations</h1>
                <p className="text-sm text-gray-400">Manage and Monitor Operational Activity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => handleTabChange('staff')}
              className={`rounded-xl px-6 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === 'staff'
                  ? 'border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-red-500/20 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              Staff
            </button>
            <button
              onClick={() => handleTabChange('departments')}
              className={`rounded-xl px-6 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === 'departments'
                  ? 'border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-red-500/20 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              Departments
            </button>
            <button
              onClick={() => handleTabChange('terminals')}
              className={`rounded-xl px-6 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === 'terminals'
                  ? 'border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-red-500/20 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              Terminals
            </button>
            <button
              onClick={() => handleTabChange('shifts')}
              className={`rounded-xl px-6 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === 'shifts'
                  ? 'border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-red-500/20 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              Shifts
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="relative flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
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

        {/* Data Table */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-2">
              <FileText className="h-5 w-5 text-orange-400" />
            </div>
            <h2 className="text-white">
              {activeTab === 'staff' && 'Staff'}
              {activeTab === 'departments' && 'Departments'}
              {activeTab === 'terminals' && 'Terminals'}
              {activeTab === 'shifts' && 'Shifts'}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {activeTab === 'staff' && (
                    <>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Employee ID</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Name</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Department</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Position</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Email</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Phone</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Hire Date</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Status</th>
                    </>
                  )}
                  {activeTab === 'departments' && (
                    <>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Department Name</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Manager</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Employee Count</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Location</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Status</th>
                    </>
                  )}
                  {activeTab === 'terminals' && (
                    <>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Terminal ID</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Name</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Location</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Status</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Last Sync</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Assigned Employees</th>
                    </>
                  )}
                  {activeTab === 'shifts' && (
                    <>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Shift Name</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Start Time</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">End Time</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Duration</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Days</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Department</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Capacity</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentData.map((item: any) => (
                  <tr key={item.id} className="border-b border-white/5 transition-all duration-300 hover:bg-white/5">
                    {activeTab === 'staff' && (
                      <>
                        <td className="py-4 text-sm text-gray-300">{item.employeeId}</td>
                        <td className="py-4 text-sm text-white">{item.name}</td>
                        <td className="py-4 text-sm text-gray-300">{item.department}</td>
                        <td className="py-4 text-sm text-gray-300">{item.position}</td>
                        <td className="py-4 text-sm text-gray-300">{item.email}</td>
                        <td className="py-4 text-sm text-gray-300">{item.phone}</td>
                        <td className="py-4 text-sm text-gray-300">{item.hireDate}</td>
                        <td className="py-4">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${
                              item.status === 'Active'
                                ? 'border-green-400/20 bg-green-400/10 text-green-400'
                                : 'border-amber-400/20 bg-amber-400/10 text-amber-400'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                      </>
                    )}
                    {activeTab === 'departments' && (
                      <>
                        <td className="py-4 text-sm text-white">{item.name}</td>
                        <td className="py-4 text-sm text-gray-300">{item.manager}</td>
                        <td className="py-4 text-sm text-gray-300">{item.employeeCount}</td>
                        <td className="py-4 text-sm text-gray-300">{item.location}</td>
                        <td className="py-4">
                          <span className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs font-medium text-green-400">
                            {item.status}
                          </span>
                        </td>
                      </>
                    )}
                    {activeTab === 'terminals' && (
                      <>
                        <td className="py-4 text-sm text-gray-300">{item.terminalId}</td>
                        <td className="py-4 text-sm text-white">{item.name}</td>
                        <td className="py-4 text-sm text-gray-300">{item.location}</td>
                        <td className="py-4">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${
                              item.status === 'Online'
                                ? 'border-green-400/20 bg-green-400/10 text-green-400'
                                : 'border-red-400/20 bg-red-400/10 text-red-400'
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-4 text-sm text-gray-300">{item.lastSync}</td>
                        <td className="py-4 text-sm text-gray-300">{item.assignedEmployees}</td>
                      </>
                    )}
                    {activeTab === 'shifts' && (
                      <>
                        <td className="py-4 text-sm text-white">{item.shiftName}</td>
                        <td className="py-4 text-sm text-gray-300">{item.startTime}</td>
                        <td className="py-4 text-sm text-gray-300">{item.endTime}</td>
                        <td className="py-4 text-sm text-gray-300">{item.duration}</td>
                        <td className="py-4 text-sm text-gray-300">{item.days}</td>
                        <td className="py-4 text-sm text-gray-300">{item.department}</td>
                        <td className="py-4 text-sm font-medium text-white">{item.capacity}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
            <div className="text-sm text-gray-400">
              Showing {filteredData.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of{' '}
              {filteredData.length} entries
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
      </div>
    </div>
  );
}
