import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DateTimeCard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <div className="relative grid grid-cols-2 items-center gap-8">
        {/* LEFT: Time */}
        <div className="flex items-center gap-6">
          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-xl">
            <Calendar className="h-8 w-8 text-orange-400" />
          </div>
          <div>
            <div className="mb-2 text-4xl font-semibold text-white">
              {currentTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </div>
            <div className="text-lg text-gray-300">
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Notifications */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mt-2 h-2 w-2 rounded-full bg-orange-400" />
            <div className="text-sm text-gray-200">3 employees have not clocked in for their scheduled shift</div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mt-2 h-2 w-2 rounded-full bg-red-400" />
            <div className="text-sm text-gray-200">Late clock-ins detected across multiple departments</div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mt-2 h-2 w-2 rounded-full bg-yellow-400" />
            <div className="text-sm text-gray-200">Missing attendance records for current shift personnel</div>
          </div>
        </div>
      </div>
    </div>
  );
}
