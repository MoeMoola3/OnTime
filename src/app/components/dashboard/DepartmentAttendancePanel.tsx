import { Clock } from 'lucide-react';
import { motion } from 'motion/react';

type AttendanceFeedItem = {
  id: number;
  name: string;
  department: string;
  minutesAgo: number;
  avatar: string;
};

interface DepartmentAttendancePanelProps {
  data: AttendanceFeedItem[];
}

export function DepartmentAttendancePanel({ data }: DepartmentAttendancePanelProps) {
  return (
    <div className="relative h-[1157px] overflow-hidden rounded-2xl border border-white/10 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 p-2">
          <Clock className="h-5 w-5 text-orange-400" />
        </div>
        <h2 className="text-white">Recent Clock-ins</h2>
      </div>

      <div className="custom-scrollbar max-h-[calc(174vh-220px)] space-y-3.5 overflow-y-auto pr-2 pb-2">
        {data.map((item, index) => (
          <AttendanceFeedItem
            key={item.id}
            name={item.name}
            department={item.department}
            minutesAgo={item.minutesAgo}
            avatar={item.avatar}
          />
        ))}
      </div>
    </div>
  );
}

function AttendanceFeedItem({
  name,
  department,
  minutesAgo,
  avatar,
}: {
  name: string;
  department: string;
  minutesAgo: number;
  avatar: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl transition-all duration-300 hover:bg-white/10"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white backdrop-blur-xl">
        {avatar}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-white">{name}</div>
        <div className="text-xs text-gray-400">{department}</div>
      </div>
      <div className="text-xs whitespace-nowrap text-gray-500">{minutesAgo}m ago</div>
    </motion.div>
  );
}
