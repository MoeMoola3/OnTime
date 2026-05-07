import { Calendar, Clock, UserCheck, Users, UserX } from "lucide-react";

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
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20">
          <Users className="w-5 h-5 text-orange-400" />
        </div>
        <h2 className="text-white">Company Metrics</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Attendance"
          value={data.attendance}
          icon={Users}
          trend="2.1"
        />
        <MetricCard
          title="On Time"
          value={data.onTime}
          icon={UserCheck}
          trend="1.5"
        />
        <MetricCard title="Late" value={data.late} icon={Clock} />
        <MetricCard title="On Leave" value={data.onLeave} icon={Calendar} />
        <MetricCard
          title="Early Departure"
          value={data.earlyDeparture}
          icon={UserX}
        />
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
}: {
  title: string;
  value: number;
  icon: any;
  trend?: string;
}) {
  return (
    <div className="relative p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20">
          <Icon className="w-5 h-5 text-orange-400" />
        </div>
        {trend && <span className="text-xs text-green-400">+{trend}%</span>}
      </div>
      <div className="text-3xl font-semibold text-white mb-1">{value}%</div>
      <div className="text-sm text-gray-400">{title}</div>
    </div>
  );
}
