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
}

export function DashboardMetricsCard({ data }: DashboardMetricsCardProps) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-2">
          <Users className="h-5 w-5 text-orange-400" />
        </div>
        <h2 className="text-white">Company Metrics</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        <MetricCard title="Attendance" value={data.attendance} icon={Users} trend="2.1" />
        <MetricCard title="On Time" value={data.onTime} icon={UserCheck} trend="1.5" />
        <MetricCard title="Late" value={data.late} icon={Clock} />
        <MetricCard title="On Leave" value={data.onLeave} icon={Calendar} />
        <MetricCard title="Early Departure" value={data.earlyDeparture} icon={UserX} />
      </div>
    </div>
  );
}

function MetricCard({ title, value, icon: Icon, trend }: { title: string; value: number; icon: any; trend?: string }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/10">
      <div className="mb-4 flex items-start justify-between">
        <div className="rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-3">
          <Icon className="h-5 w-5 text-orange-400" />
        </div>
        {trend && <span className="text-xs text-green-400">+{trend}%</span>}
      </div>
      <div className="mb-1 text-3xl font-semibold text-white">{value}%</div>
      <div className="text-sm text-gray-400">{title}</div>
    </div>
  );
}
