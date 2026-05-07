import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

export function DateTimeCard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden">
      {/* <div className="relative p-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-[rgba(234,88,12,0.25)] overflow-hidden"> */}
      <div className="relative grid grid-cols-2 gap-8 items-center">
        {/* LEFT: Time */}
        <div className="flex items-center gap-6">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xl">
            <Calendar className="w-8 h-8 text-orange-400" />
          </div>
          <div>
            <div className="text-4xl font-semibold text-white mb-2">
              {currentTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>
            <div className="text-lg text-gray-300">
              {currentTime.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Notifications */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-2 h-2 mt-2 rounded-full bg-orange-400" />
            <div className="text-sm text-gray-200">
              3 employees have not clocked in for their scheduled shift
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-2 h-2 mt-2 rounded-full bg-red-400" />
            <div className="text-sm text-gray-200">
              Late clock-ins detected across multiple departments
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-2 h-2 mt-2 rounded-full bg-yellow-400" />
            <div className="text-sm text-gray-200">
              Missing attendance records for current shift personnel
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
