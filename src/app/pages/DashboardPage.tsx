import { useState } from 'react';
import { getAttendanceFeed, getCompanyMetrics, getDepartments, getMetricsData } from '../api/mock';
import { DashboardMetricsCard } from '../components/dashboard/DashboardMetricsCard';
import { DateTimeCard } from '../components/dashboard/DateTimeCard';
import { DepartmentAttendancePanel } from '../components/dashboard/DepartmentAttendancePanel';
import { DepartmentOverviewPanel } from '../components/dashboard/DepartmentOverviewPanel';
import NavBar from '../components/NavBar';
import { MetricsModal } from '../components/dashboard/MetricsModal';

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<{ title: string; employees: any[] }>({
    title: '',
    employees: [],
  });
  return (
    <div className="dark min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <div className="absolute inset-0 bg-black/20" />
      <div className="mx-auto max-w-[1800px]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <NavBar />
            <DateTimeCard />
            <DashboardMetricsCard
              data={getCompanyMetrics()}
              metricsData={getMetricsData()}
              onOpenModal={(data) => {
                setModalData(data);
                setShowModal(true);
              }}
            />
            <MetricsModal show={showModal} onClose={() => setShowModal(false)} modalData={modalData} />
            <DepartmentOverviewPanel data={getDepartments()} />
          </div>
          <DepartmentAttendancePanel data={getAttendanceFeed()} />
        </div>
      </div>
    </div>
  );
}
