import NavBar from '../components/NavBar';
import { useEffect, useRef, useState } from 'react';
import { FileText, Calendar, Download, Filter, X, ChevronLeft, ChevronRight, Blocks, Grid3x3 } from 'lucide-react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { CustomDropdown } from '../components/ui/CustomDropdown';
import { exportExcel } from '../utils/exportExcel';
import { exportPdf } from '../utils/exportPdf';
import { getAttendanceData, getDepartmentsData, getShiftsData, getStaffData, getTerminalsData } from '../api/mock';

export default function OperationsPage() {
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

  const exportButtonRef = useRef<HTMLButtonElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  const departments = ['All Departments', 'Processing', 'Cold Storage', 'Dispatch', 'Slaughter'];
  const employees = ['All Employees', 'Active Only', 'On Leave'];
  const dateRange = ['Last 7 Days', 'Last 30 Days', 'This Month'];

  const [activeTab, setActiveTab] = useState<'staff' | 'departments' | 'terminals' | 'shifts'>('staff');

  const getCurrentData: any = () => {
    switch (activeTab) {
      case 'staff':
        return getStaffData();
      case 'departments':
        return getDepartmentsData();
      case 'terminals':
        return getTerminalsData();
      case 'shifts':
        return getShiftsData();
      default:
        return getStaffData();
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
                <Blocks className="h-6 w-6 text-orange-400" />
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
