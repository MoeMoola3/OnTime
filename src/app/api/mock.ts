const companyMetrics = {
  attendance: 94.2,
  onTime: 87.5,
  late: 6.7,
  onLeave: 4.1,
  earlyDeparture: 1.7,
};

const departments = [
  {
    name: 'Processing',
    data: [
      { name: 'On Time', value: 45, color: 'rgba(134, 239, 172, 0.8)' },
      { name: 'Late', value: 8, color: 'rgba(251, 146, 60, 0.8)' },
      { name: 'Absent', value: 38, color: 'rgba(248, 113, 113, 0.8)' },
      { name: 'On Leave', value: 2, color: 'rgba(147, 197, 253, 0.8)' },
    ],
  },
  {
    name: 'Cold Storage',
    data: [
      { name: 'On Time', value: 32, color: 'rgba(134, 239, 172, 0.8)' },
      { name: 'Late', value: 5, color: 'rgba(251, 146, 60, 0.8)' },
      { name: 'Absent', value: 2, color: 'rgba(248, 113, 113, 0.8)' },
      { name: 'On Leave', value: 1, color: 'rgba(147, 197, 253, 0.8)' },
    ],
  },
  {
    name: 'Dispatch',
    data: [
      { name: 'On Time', value: 28, color: 'rgba(134, 239, 172, 0.8)' },
      { name: 'Late', value: 4, color: 'rgba(251, 146, 60, 0.8)' },
      { name: 'Absent', value: 1, color: 'rgba(248, 113, 113, 0.8)' },
      { name: 'On Leave', value: 2, color: 'rgba(147, 197, 253, 0.8)' },
    ],
  },
  {
    name: 'Slaughter',
    data: [
      { name: 'On Time', value: 38, color: 'rgba(134, 239, 172, 0.8)' },
      { name: 'Late', value: 6, color: 'rgba(251, 146, 60, 0.8)' },
      { name: 'Absent', value: 2, color: 'rgba(248, 113, 113, 0.8)' },
      { name: 'On Leave', value: 3, color: 'rgba(147, 197, 253, 0.8)' },
    ],
  },
];

const attendanceFeed = [
  {
    id: 1,
    name: 'John Smith',
    department: 'Processing',
    minutesAgo: 2,
    avatar: 'JS',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    department: 'Cold Storage',
    minutesAgo: 5,
    avatar: 'MG',
  },
  {
    id: 3,
    name: 'David Chen',
    department: 'Dispatch',
    minutesAgo: 8,
    avatar: 'DC',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    department: 'Slaughter',
    minutesAgo: 12,
    avatar: 'SW',
  },
  {
    id: 5,
    name: 'Michael Brown',
    department: 'Processing',
    minutesAgo: 15,
    avatar: 'MB',
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    department: 'Cold Storage',
    minutesAgo: 18,
    avatar: 'LA',
  },
  {
    id: 7,
    name: 'James Taylor',
    department: 'Dispatch',
    minutesAgo: 22,
    avatar: 'JT',
  },
  {
    id: 8,
    name: 'Emma Martinez',
    department: 'Slaughter',
    minutesAgo: 25,
    avatar: 'EM',
  },
  {
    id: 9,
    name: 'Robert Johnson',
    department: 'Processing',
    minutesAgo: 28,
    avatar: 'RJ',
  },
  {
    id: 10,
    name: 'Jennifer Lee',
    department: 'Cold Storage',
    minutesAgo: 32,
    avatar: 'JL',
  },
  {
    id: 11,
    name: 'Jennifer Lee',
    department: 'Cold Storage',
    minutesAgo: 32,
    avatar: 'JL',
  },
  {
    id: 12,
    name: 'Jennifer Lee',
    department: 'Cold Storage',
    minutesAgo: 32,
    avatar: 'JL',
  },
  {
    id: 13,
    name: 'Jennifer Lee',
    department: 'Cold Storage',
    minutesAgo: 32,
    avatar: 'JL',
  },
  {
    id: 14,
    name: 'Jennifer Lee',
    department: 'Cold Storage',
    minutesAgo: 32,
    avatar: 'JL',
  },
  {
    id: 15,
    name: 'Robert Johnson',
    department: 'Cold Storage',
    minutesAgo: 32,
    avatar: 'JL',
  },
];

const shiftCoverageData = [
  { shift: 'Morning Shift', scheduled: 45, actual: 42, gap: 3 },
  { shift: 'Night Shift', scheduled: 25, actual: 27, gap: -2 },
];

const attendanceData = [
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
  {
    id: 9,
    name: 'Robert Johnson',
    department: 'Processing',
    date: '2026-05-07',
    clockIn: '08:02',
    clockOut: '16:32',
    hours: 8.5,
    status: 'Present',
  },
  {
    id: 10,
    name: 'Jennifer Lee',
    department: 'Cold Storage',
    date: '2026-05-07',
    clockIn: '08:10',
    clockOut: '16:40',
    hours: 8.5,
    status: 'Late',
  },
  {
    id: 11,
    name: 'Carlos Rodriguez',
    department: 'Dispatch',
    date: '2026-05-07',
    clockIn: '08:00',
    clockOut: '16:30',
    hours: 8.5,
    status: 'Present',
  },
  {
    id: 12,
    name: 'Patricia Kim',
    department: 'Slaughter',
    date: '2026-05-07',
    clockIn: '07:58',
    clockOut: '16:28',
    hours: 8.5,
    status: 'Present',
  },
];

const shiftAssignmentData = [
  {
    id: 1,
    name: 'John Smith',
    department: 'Processing',
    shift: 'Morning (6AM-2PM)',
    date: '2026-05-08',
    role: 'Shift Lead',
    status: 'Confirmed',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    department: 'Cold Storage',
    shift: 'Afternoon (2PM-10PM)',
    date: '2026-05-08',
    role: 'Operator',
    status: 'Confirmed',
  },
  {
    id: 3,
    name: 'David Chen',
    department: 'Dispatch',
    shift: 'Morning (6AM-2PM)',
    date: '2026-05-08',
    role: 'Coordinator',
    status: 'Confirmed',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    department: 'Slaughter',
    shift: 'Night (10PM-6AM)',
    date: '2026-05-08',
    role: 'Technician',
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Michael Brown',
    department: 'Processing',
    shift: 'Afternoon (2PM-10PM)',
    date: '2026-05-08',
    role: 'Operator',
    status: 'Confirmed',
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    department: 'Cold Storage',
    shift: 'Morning (6AM-2PM)',
    date: '2026-05-08',
    role: 'Shift Lead',
    status: 'Confirmed',
  },
  {
    id: 7,
    name: 'James Taylor',
    department: 'Dispatch',
    shift: 'Afternoon (2PM-10PM)',
    date: '2026-05-08',
    role: 'Coordinator',
    status: 'Confirmed',
  },
  {
    id: 8,
    name: 'Emma Martinez',
    department: 'Slaughter',
    shift: 'Morning (6AM-2PM)',
    date: '2026-05-08',
    role: 'Operator',
    status: 'Confirmed',
  },
  {
    id: 9,
    name: 'Robert Johnson',
    department: 'Processing',
    shift: 'Night (10PM-6AM)',
    date: '2026-05-08',
    role: 'Operator',
    status: 'Pending',
  },
  {
    id: 10,
    name: 'Jennifer Lee',
    department: 'Cold Storage',
    shift: 'Afternoon (2PM-10PM)',
    date: '2026-05-08',
    role: 'Operator',
    status: 'Confirmed',
  },
  {
    id: 10,
    name: 'Jennifer Lee',
    department: 'Cold Storage',
    shift: 'Afternoon (2PM-10PM)',
    date: '2026-05-08',
    role: 'Operator',
    status: 'Confirmed',
  },
];

const leaveRequestsData = [
  {
    id: 1,
    name: 'John Smith',
    department: 'Processing',
    leaveType: 'Vacation',
    startDate: '2026-05-15',
    endDate: '2026-05-18',
    days: 4,
    status: 'Approved',
  },
  {
    id: 2,
    name: 'Maria Garcia',
    department: 'Cold Storage',
    leaveType: 'Sick Leave',
    startDate: '2026-05-10',
    endDate: '2026-05-11',
    days: 2,
    status: 'Approved',
  },
  {
    id: 3,
    name: 'David Chen',
    department: 'Dispatch',
    leaveType: 'Personal',
    startDate: '2026-05-20',
    endDate: '2026-05-20',
    days: 1,
    status: 'Pending',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    department: 'Slaughter',
    leaveType: 'Vacation',
    startDate: '2026-05-22',
    endDate: '2026-05-25',
    days: 4,
    status: 'Pending',
  },
  {
    id: 5,
    name: 'Michael Brown',
    department: 'Processing',
    leaveType: 'Medical',
    startDate: '2026-05-12',
    endDate: '2026-05-14',
    days: 3,
    status: 'Approved',
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    department: 'Cold Storage',
    leaveType: 'Vacation',
    startDate: '2026-05-28',
    endDate: '2026-05-31',
    days: 4,
    status: 'Rejected',
  },
  {
    id: 7,
    name: 'James Taylor',
    department: 'Dispatch',
    leaveType: 'Personal',
    startDate: '2026-05-16',
    endDate: '2026-05-16',
    days: 1,
    status: 'Approved',
  },
  {
    id: 8,
    name: 'Emma Martinez',
    department: 'Slaughter',
    leaveType: 'Sick Leave',
    startDate: '2026-05-09',
    endDate: '2026-05-09',
    days: 1,
    status: 'Approved',
  },
  {
    id: 9,
    name: 'Robert Johnson',
    department: 'Processing',
    leaveType: 'Vacation',
    startDate: '2026-06-01',
    endDate: '2026-06-05',
    days: 5,
    status: 'Pending',
  },
  {
    id: 10,
    name: 'Jennifer Lee',
    department: 'Cold Storage',
    leaveType: 'Medical',
    startDate: '2026-05-13',
    endDate: '2026-05-15',
    days: 3,
    status: 'Approved',
  },
];

const leaveBalancesData = [
  { id: 1, name: 'John Smith', department: 'Processing', vacation: 12, sick: 8, personal: 3, medical: 5, total: 28 },
  { id: 2, name: 'Maria Garcia', department: 'Cold Storage', vacation: 15, sick: 6, personal: 5, medical: 7, total: 33 },
  { id: 3, name: 'David Chen', department: 'Dispatch', vacation: 10, sick: 10, personal: 2, medical: 4, total: 26 },
  { id: 4, name: 'Sarah Williams', department: 'Slaughter', vacation: 18, sick: 7, personal: 4, medical: 6, total: 35 },
  { id: 5, name: 'Michael Brown', department: 'Processing', vacation: 8, sick: 9, personal: 3, medical: 5, total: 25 },
  { id: 6, name: 'Lisa Anderson', department: 'Cold Storage', vacation: 14, sick: 8, personal: 5, medical: 6, total: 33 },
  { id: 7, name: 'James Taylor', department: 'Dispatch', vacation: 11, sick: 7, personal: 4, medical: 5, total: 27 },
  { id: 8, name: 'Emma Martinez', department: 'Slaughter', vacation: 16, sick: 6, personal: 3, medical: 7, total: 32 },
  { id: 9, name: 'Robert Johnson', department: 'Processing', vacation: 9, sick: 10, personal: 2, medical: 4, total: 25 },
  { id: 10, name: 'Jennifer Lee', department: 'Cold Storage', vacation: 13, sick: 8, personal: 5, medical: 6, total: 32 },
];

const payrollData = [
  {
    id: 1,
    name: 'John Smith',
    department: 'Processing',
    position: 'Shift Lead',
    hoursWorked: 170,
    hourlyRate: 28.5,
    grossPay: 4845,
    netPay: 3876,
  },
  {
    id: 2,
    name: 'Maria Garcia',
    department: 'Cold Storage',
    position: 'Operator',
    hoursWorked: 168,
    hourlyRate: 24.0,
    grossPay: 4032,
    netPay: 3225.6,
  },
  {
    id: 3,
    name: 'David Chen',
    department: 'Dispatch',
    position: 'Coordinator',
    hoursWorked: 172,
    hourlyRate: 26.75,
    grossPay: 4601,
    netPay: 3680.8,
  },
  {
    id: 4,
    name: 'Sarah Williams',
    department: 'Slaughter',
    position: 'Technician',
    hoursWorked: 160,
    hourlyRate: 27.5,
    grossPay: 4400,
    netPay: 3520,
  },
  {
    id: 5,
    name: 'Michael Brown',
    department: 'Processing',
    position: 'Operator',
    hoursWorked: 170,
    hourlyRate: 24.0,
    grossPay: 4080,
    netPay: 3264,
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    department: 'Cold Storage',
    position: 'Shift Lead',
    hoursWorked: 168,
    hourlyRate: 29.0,
    grossPay: 4872,
    netPay: 3897.6,
  },
  {
    id: 7,
    name: 'James Taylor',
    department: 'Dispatch',
    position: 'Coordinator',
    hoursWorked: 172,
    hourlyRate: 26.75,
    grossPay: 4601,
    netPay: 3680.8,
  },
  {
    id: 8,
    name: 'Emma Martinez',
    department: 'Slaughter',
    position: 'Operator',
    hoursWorked: 170,
    hourlyRate: 25.5,
    grossPay: 4335,
    netPay: 3468,
  },
  {
    id: 9,
    name: 'Robert Johnson',
    department: 'Processing',
    position: 'Operator',
    hoursWorked: 165,
    hourlyRate: 24.0,
    grossPay: 3960,
    netPay: 3168,
  },
  {
    id: 10,
    name: 'Jennifer Lee',
    department: 'Cold Storage',
    position: 'Operator',
    hoursWorked: 168,
    hourlyRate: 24.5,
    grossPay: 4116,
    netPay: 3292.8,
  },
];

{
  /* Operations Page */
}
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

export function getCompanyMetrics() {
  return companyMetrics;
}

export function getDepartments() {
  return departments;
}

export function getAttendanceFeed() {
  return attendanceFeed;
}

export function getShiftCoverageData() {
  return shiftCoverageData;
}

export function getAttendanceData() {
  return attendanceData;
}

export function getShiftAssignmentData() {
  return shiftAssignmentData;
}

export function getLeaveRequestsData() {
  return leaveRequestsData;
}

export function getLeaveBalancesData() {
  return leaveBalancesData;
}

export function getPayrollData() {
  return payrollData;
}

{
  /* Operations Page */
}
export function getStaffData() {
  return staffData;
}

export function getDepartmentsData() {
  return departmentsData;
}

export function getTerminalsData() {
  return terminalsData;
}

export function getShiftsData() {
  return shiftsData;
}
