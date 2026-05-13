import NavBar from '../components/NavBar';
import { useEffect, useRef, useState } from 'react';
import { FileText, Calendar, Download, Filter, X, ChevronLeft, ChevronRight, Grid3x3 } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { CustomDropdown } from '../components/ui/CustomDropdown';
import { exportExcel } from '../utils/exportExcel';
import { exportPdf } from '../utils/exportPdf';
import {
  getAttendanceData,
  getLeaveBalancesData,
  getLeaveRequestsData,
  getPayrollData,
  getShiftAssignmentData,
  getShiftCoverageData,
} from '../api/mock';

export default function ReportsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedEmployees, setSelectedEmployees] = useState('All Employees');
  const [selectedDateRange, setSelectedDateRange] = useState('Last 7 Days');

  const navigate = useNavigate();
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;

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
  const exportMenuRef = useRef<HTMLDivElement>(null);
  const departments = ['All Departments', 'Processing', 'Cold Storage', 'Dispatch', 'Slaughter'];
  const employees = ['All Employees', 'Active Only', 'On Leave'];
  const dateRange = ['Last 7 Days', 'Last 30 Days', 'This Month'];

  const [activeTab, setActiveTab] = useState<'attendance' | 'shifts' | 'leaveRequests' | 'leaveBalances' | 'payroll'>('attendance');

  const getCurrentData = () => {
    switch (activeTab) {
      case 'attendance':
        return getAttendanceData();
      case 'shifts':
        return getShiftAssignmentData();
      case 'leaveRequests':
        return getLeaveRequestsData();
      case 'leaveBalances':
        return getLeaveBalancesData();
      case 'payroll':
        return getPayrollData();
      default:
        return getAttendanceData();
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        exportButtonRef.current &&
        !exportButtonRef.current.contains(event.target as Node) &&
        exportMenuRef.current &&
        !exportMenuRef.current.contains(event.target as Node)
      ) {
        setShowExportMenu(false);
      }
    };

    if (showExportMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showExportMenu]);

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
                <p className="text-sm text-gray-400">Track Workforce Activity Across Departments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => handleTabChange('attendance')}
              className={`rounded-xl px-6 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === 'attendance'
                  ? 'border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-red-500/20 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              Attendance
            </button>
            <button
              onClick={() => handleTabChange('shifts')}
              className={`rounded-xl px-6 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === 'shifts'
                  ? 'border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-red-500/20 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              Shift Assignment
            </button>
            <button
              onClick={() => handleTabChange('leaveRequests')}
              className={`rounded-xl px-6 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === 'leaveRequests'
                  ? 'border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-red-500/20 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              Leave Requests
            </button>
            <button
              onClick={() => handleTabChange('leaveBalances')}
              className={`rounded-xl px-6 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === 'leaveBalances'
                  ? 'border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-red-500/20 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              Leave Balances
            </button>
            <button
              onClick={() => handleTabChange('payroll')}
              className={`rounded-xl px-6 py-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeTab === 'payroll'
                  ? 'border border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-red-500/20 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              Payroll
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
                    ref={exportMenuRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                      position: 'absolute',
                      top: (exportButtonRef.current?.getBoundingClientRect().bottom ?? 0) + window.scrollY,
                      right: window.innerWidth - (exportButtonRef.current?.getBoundingClientRect().right ?? 0) + window.scrollX,
                    }}
                    className="absolute right-0 mt-2 w-48 rounded-xl border border-white/10 bg-gray-900/95 p-2 shadow-lg backdrop-blur-xl"
                  >
                    <button
                      onClick={() => exportExcel(getAttendanceData())}
                      className="flex w-full items-center gap-2 rounded-lg px-4 py-2.5 text-left text-sm text-white transition-all hover:bg-white/10"
                    >
                      <Download className="h-4 w-4" />
                      Export as Excel
                    </button>
                    <button
                      onClick={() => exportPdf(getAttendanceData())}
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
              <Grid3x3 className="h-5 w-5 text-orange-400" />
            </div>
            <h2 className="text-white">
              {activeTab === 'attendance' && 'Attendance Report'}
              {activeTab === 'shifts' && 'Shift Assignment'}
              {activeTab === 'leaveRequests' && 'Leave Requests'}
              {activeTab === 'leaveBalances' && 'Leave Balances'}
              {activeTab === 'payroll' && 'Payroll Report'}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {activeTab === 'attendance' && (
                    <>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Employee Name</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Department</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Date</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Clock In</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Clock Out</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Hours</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Status</th>
                    </>
                  )}
                  {activeTab === 'shifts' && (
                    <>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Employee Name</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Department</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Shift</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Date</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Role</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Status</th>
                    </>
                  )}
                  {activeTab === 'leaveRequests' && (
                    <>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Employee Name</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Department</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Leave Type</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Start Date</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">End Date</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Days</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Status</th>
                    </>
                  )}
                  {activeTab === 'leaveBalances' && (
                    <>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Employee Name</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Department</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Vacation</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Sick</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Personal</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Medical</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Total</th>
                    </>
                  )}
                  {activeTab === 'payroll' && (
                    <>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Employee Name</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Department</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Position</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Hours Worked</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Hourly Rate</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Gross Pay</th>
                      <th className="pb-3 text-left text-sm font-medium text-gray-400">Net Pay</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentData.map((item: any) => (
                  <tr key={item.id} className="border-b border-white/5 transition-all duration-300 hover:bg-white/5">
                    {activeTab === 'attendance' && (
                      <>
                        <td className="py-4 text-sm text-white">{item.name}</td>
                        <td className="py-4 text-sm text-gray-300">{item.department}</td>
                        <td className="py-4 text-sm text-gray-300">{item.date}</td>
                        <td className="py-4 text-sm text-gray-300">{item.clockIn}</td>
                        <td className="py-4 text-sm text-gray-300">{item.clockOut}</td>
                        <td className="py-4 text-sm text-gray-300">{item.hours}h</td>
                        <td className="py-4">
                          <span className={`rounded-full border px-3 py-1 text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                      </>
                    )}
                    {activeTab === 'shifts' && (
                      <>
                        <td className="py-4 text-sm text-white">{item.name}</td>
                        <td className="py-4 text-sm text-gray-300">{item.department}</td>
                        <td className="py-4 text-sm text-gray-300">{item.shift}</td>
                        <td className="py-4 text-sm text-gray-300">{item.date}</td>
                        <td className="py-4 text-sm text-gray-300">{item.role}</td>
                        <td className="py-4 text-sm text-gray-300">{item.status}</td>
                      </>
                    )}
                    {activeTab === 'leaveRequests' && (
                      <>
                        <td className="py-4 text-sm text-white">{item.name}</td>
                        <td className="py-4 text-sm text-gray-300">{item.department}</td>
                        <td className="py-4 text-sm text-gray-300">{item.leaveType}</td>
                        <td className="py-4 text-sm text-gray-300">{item.startDate}</td>
                        <td className="py-4 text-sm text-gray-300">{item.endDate}</td>
                        <td className="py-4 text-sm text-gray-300">{item.days}</td>
                        <td className="py-4">
                          <select
                            value={getLeaveStatus(item)}
                            onChange={(e) =>
                              setEditedStatuses((prev) => ({
                                ...prev,
                                [item.id]: e.target.value,
                              }))
                            }
                            className={`cursor-pointer appearance-none rounded-full border px-3 py-1 text-center text-xs font-medium transition outline-none ${
                              getLeaveStatus(item) === 'Approved'
                                ? 'border-green-400/20 bg-green-400/10 text-green-400'
                                : getLeaveStatus(item) === 'Pending'
                                  ? 'border-amber-400/20 bg-amber-400/10 text-amber-400'
                                  : 'border-red-400/20 bg-red-400/10 text-red-400'
                            }`}
                          >
                            <option value="Approved" className="bg-gray-900 text-green-400">
                              Approved
                            </option>
                            <option value="Pending" className="bg-gray-900 text-amber-400">
                              Pending
                            </option>
                            <option value="Rejected" className="bg-gray-900 text-red-400">
                              Rejected
                            </option>
                          </select>
                        </td>
                      </>
                    )}
                    {activeTab === 'leaveBalances' && (
                      <>
                        <td className="py-4 text-sm text-white">{item.name}</td>
                        <td className="py-4 text-sm text-gray-300">{item.department}</td>
                        <td className="py-4 text-sm text-gray-300">{item.vacation}</td>
                        <td className="py-4 text-sm text-gray-300">{item.sick}</td>
                        <td className="py-4 text-sm text-gray-300">{item.personal}</td>
                        <td className="py-4 text-sm text-gray-300">{item.medical}</td>
                        <td className="py-4 text-sm font-medium text-white">{item.total}</td>
                      </>
                    )}
                    {activeTab === 'payroll' && (
                      <>
                        <td className="py-4 text-sm text-white">{item.name}</td>
                        <td className="py-4 text-sm text-gray-300">{item.department}</td>
                        <td className="py-4 text-sm text-gray-300">{item.position}</td>
                        <td className="py-4 text-sm text-gray-300">{item.hoursWorked}</td>

                        {/* Editable Hourly Rate */}
                        <td className="py-4 text-sm text-gray-300">
                          <div className="flex items-center gap-1">
                            <span className="text-gray-400">R</span>
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={getHourlyRate(item)}
                              onChange={(e) =>
                                setEditedRates((prev) => ({
                                  ...prev,
                                  [item.id]: parseFloat(e.target.value) || 0,
                                }))
                              }
                              className="w-20 [appearance:textfield] rounded-md border border-white/10 bg-white/10 px-2 py-1 text-sm text-white transition outline-none focus:border-orange-500/50 focus:bg-white/15 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                          </div>
                        </td>

                        {/* Recalculated Gross & Net Pay */}
                        <td className="py-4 text-sm text-gray-300">R {getCalculatedPay(item).gross}</td>
                        <td className="py-4 text-sm font-medium text-white">R {getCalculatedPay(item).net}</td>
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

        {/* Shift Coverage Chart */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-2">
              <Calendar className="h-5 w-5 text-orange-400" />
            </div>
            <h2 className="text-white">Shift Coverage</h2>
          </div>

          <div className="space-y-6">
            {getShiftCoverageData().map((shift, index) => (
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
