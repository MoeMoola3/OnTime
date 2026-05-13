import { Calendar, Clock, UserCheck, Users, UserX } from 'lucide-react';

type CompanyMetrics = {
  attendance: number;
  onTime: number;
  late: number;
  onLeave: number;
  earlyDeparture: number;
};

interface DashboardMetricsCardProps {
  data: CompanyMetrics;
  metricsData: any[];
  onOpenModal: (data: { title: string; employees: any[] }) => void;
}

export function DashboardMetricsCard({ data, metricsData, onOpenModal }: DashboardMetricsCardProps) {
  const handleMetricClick = (metric: string) => {
    let filteredEmployees: any[] = [];
    let title = '';

    switch (metric) {
      case 'late':
        filteredEmployees = metricsData.filter((emp) => emp.status === 'Late');
        title = 'Late Arrivals';
        break;
      case 'onLeave':
        filteredEmployees = metricsData.filter((emp) => emp.status === 'On Leave');
        title = 'Employees On Leave';
        break;
      case 'earlyDeparture':
        filteredEmployees = metricsData.filter((emp) => emp.status === 'Early Departure');
        title = 'Early Departures';
        break;
      case 'onTime':
        filteredEmployees = metricsData.filter((emp) => emp.status === 'On Time');
        title = 'On Time';
        break;
      case 'attendance':
        filteredEmployees = metricsData.filter((emp) => emp.clockIn != '-');
        title = 'Attendance';
        break;
      default:
        return;
    }

    onOpenModal({ title, employees: filteredEmployees });
  };

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-2">
          <Users className="h-5 w-5 text-orange-400" />
        </div>
        <h2 className="text-white">Company Metrics</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <MetricCard title="Attendance" value={data.attendance} icon={Users} onClick={() => handleMetricClick('attendance')} />
        <MetricCard title="On Time" value={data.onTime} icon={UserCheck} onClick={() => handleMetricClick('onTime')} />
        <MetricCard title="Late" value={data.late} icon={Clock} onClick={() => handleMetricClick('late')} />
        <MetricCard title="On Leave" value={data.onLeave} icon={Calendar} onClick={() => handleMetricClick('onLeave')} />
        <MetricCard title="Early Departure" value={data.earlyDeparture} icon={UserX} onClick={() => handleMetricClick('earlyDeparture')} />
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, onClick }: { title: string; value: number; icon: any; onClick?: () => void }) {
  return (
    <div
      className="relative cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
      onClick={onClick}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-3">
          <Icon className="h-5 w-5 text-orange-400" />
        </div>
      </div>
      <div className="mb-1 text-3xl font-semibold text-white">{value}%</div>
      <div className="text-sm text-gray-400">{title}</div>
    </div>
  );
}
