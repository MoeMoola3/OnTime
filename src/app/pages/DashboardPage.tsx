import { getAttendanceFeed, getCompanyMetrics, getDepartments } from '../api/mock';
import { DashboardMetricsCard } from '../components/dashboard/DashboardMetricsCard';
import { DateTimeCard } from '../components/dashboard/DateTimeCard';
import { DepartmentAttendancePanel } from '../components/dashboard/DepartmentAttendancePanel';
import { DepartmentOverviewPanel } from '../components/dashboard/DepartmentOverviewPanel';
import NavBar from '../components/NavBar';

export default function DashboardPage() {
  return (
    <div className="dark min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="absolute inset-0 bg-black/20" />
      <div className="mx-auto max-w-[1800px]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <NavBar />
            <DateTimeCard />
            <DashboardMetricsCard data={getCompanyMetrics()} />
            <DepartmentOverviewPanel data={getDepartments()} />
          </div>
          <DepartmentAttendancePanel data={getAttendanceFeed()} />
        </div>
      </div>
    </div>
  );
}
