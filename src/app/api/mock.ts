const companyMetrics = {
  attendance: 94.2,
  onTime: 87.5,
  late: 6.7,
  onLeave: 4.1,
  earlyDeparture: 1.7,
};

const departments = [
  {
    name: "Processing",
    data: [
      { name: "On Time", value: 45, color: "rgba(134, 239, 172, 0.8)" },
      { name: "Late", value: 8, color: "rgba(251, 146, 60, 0.8)" },
      { name: "Absent", value: 38, color: "rgba(248, 113, 113, 0.8)" },
      { name: "On Leave", value: 2, color: "rgba(147, 197, 253, 0.8)" },
    ],
  },
  {
    name: "Cold Storage",
    data: [
      { name: "On Time", value: 32, color: "rgba(134, 239, 172, 0.8)" },
      { name: "Late", value: 5, color: "rgba(251, 146, 60, 0.8)" },
      { name: "Absent", value: 2, color: "rgba(248, 113, 113, 0.8)" },
      { name: "On Leave", value: 1, color: "rgba(147, 197, 253, 0.8)" },
    ],
  },
  {
    name: "Dispatch",
    data: [
      { name: "On Time", value: 28, color: "rgba(134, 239, 172, 0.8)" },
      { name: "Late", value: 4, color: "rgba(251, 146, 60, 0.8)" },
      { name: "Absent", value: 1, color: "rgba(248, 113, 113, 0.8)" },
      { name: "On Leave", value: 2, color: "rgba(147, 197, 253, 0.8)" },
    ],
  },
  {
    name: "Slaughter",
    data: [
      { name: "On Time", value: 38, color: "rgba(134, 239, 172, 0.8)" },
      { name: "Late", value: 6, color: "rgba(251, 146, 60, 0.8)" },
      { name: "Absent", value: 2, color: "rgba(248, 113, 113, 0.8)" },
      { name: "On Leave", value: 3, color: "rgba(147, 197, 253, 0.8)" },
    ],
  },
];

const attendanceFeed = [
  {
    id: 1,
    name: "John Smith",
    department: "Processing",
    minutesAgo: 2,
    avatar: "JS",
  },
  {
    id: 2,
    name: "Maria Garcia",
    department: "Cold Storage",
    minutesAgo: 5,
    avatar: "MG",
  },
  {
    id: 3,
    name: "David Chen",
    department: "Dispatch",
    minutesAgo: 8,
    avatar: "DC",
  },
  {
    id: 4,
    name: "Sarah Williams",
    department: "Slaughter",
    minutesAgo: 12,
    avatar: "SW",
  },
  {
    id: 5,
    name: "Michael Brown",
    department: "Processing",
    minutesAgo: 15,
    avatar: "MB",
  },
  {
    id: 6,
    name: "Lisa Anderson",
    department: "Cold Storage",
    minutesAgo: 18,
    avatar: "LA",
  },
  {
    id: 7,
    name: "James Taylor",
    department: "Dispatch",
    minutesAgo: 22,
    avatar: "JT",
  },
  {
    id: 8,
    name: "Emma Martinez",
    department: "Slaughter",
    minutesAgo: 25,
    avatar: "EM",
  },
  {
    id: 9,
    name: "Robert Johnson",
    department: "Processing",
    minutesAgo: 28,
    avatar: "RJ",
  },
  {
    id: 10,
    name: "Jennifer Lee",
    department: "Cold Storage",
    minutesAgo: 32,
    avatar: "JL",
  },
  {
    id: 11,
    name: "Jennifer Lee",
    department: "Cold Storage",
    minutesAgo: 32,
    avatar: "JL",
  },
  {
    id: 12,
    name: "Jennifer Lee",
    department: "Cold Storage",
    minutesAgo: 32,
    avatar: "JL",
  },
  {
    id: 13,
    name: "Jennifer Lee",
    department: "Cold Storage",
    minutesAgo: 32,
    avatar: "JL",
  },
  {
    id: 14,
    name: "Jennifer Lee",
    department: "Cold Storage",
    minutesAgo: 32,
    avatar: "JL",
  },
  {
    id: 15,
    name: "Robert Johnson",
    department: "Cold Storage",
    minutesAgo: 32,
    avatar: "JL",
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
