import { Clock } from "lucide-react";
import { motion } from "motion/react";

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

export function DepartmentAttendancePanel({
  data,
}: DepartmentAttendancePanelProps) {
  return (
    <div className="relative p-6 rounded-2xl h-[1157px] backdrop-blur-xl border border-white/10 overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20">
          <Clock className="w-5 h-5 text-orange-400" />
        </div>
        <h2 className="text-white">Recent Clock-ins</h2>
      </div>

      <div className="max-h-[calc(174vh-220px)] pb-2 space-y-3.5 overflow-y-auto pr-2 custom-scrollbar">
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
      className="flex items-center gap-3 p-3 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
    >
      <div className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white text-sm font-medium">
        {avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-white truncate">{name}</div>
        <div className="text-xs text-gray-400">{department}</div>
      </div>
      <div className="text-xs text-gray-500 whitespace-nowrap">
        {minutesAgo}m ago
      </div>
    </motion.div>
  );
}
