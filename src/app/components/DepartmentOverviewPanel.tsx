import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Cell, Pie, ResponsiveContainer, PieChart } from 'recharts';

type DepartmentData = {
  name: string;
  data: {
    name: string;
    value: number;
    color: string;
  }[];
};

interface DepartmentOverviewPanelProps {
  data: DepartmentData[];
}

export function DepartmentOverviewPanel({ data }: DepartmentOverviewPanelProps) {
  const [currentDeptIndex, setCurrentDeptIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextDepartment = () => {
    setDirection(1);
    setCurrentDeptIndex((prev) => (prev + 1) % data.length);
  };

  const prevDepartment = () => {
    setDirection(-1);
    setCurrentDeptIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const currentDept = data[currentDeptIndex];

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <h2 className="mb-6 text-white">Department Attendance</h2>

      <div className="relative">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={prevDepartment}
            className="cursor-pointer rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>

          <div className="relative mx-8 h-[320px] flex-1 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center gap-8">
              {/* Left Department (Previous) */}
              <AnimatePresence mode="popLayout">
                {currentDeptIndex > 0 && (
                  <motion.div
                    key={`left-${currentDeptIndex - 1}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="pointer-events-none relative flex-shrink-0"
                    style={{ width: '180px', height: '180px' }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data[currentDeptIndex - 1].data}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={65}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="rgba(255, 255, 255, 0.1)"
                          strokeWidth={1}
                        >
                          {data[currentDeptIndex - 1].data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-sm font-medium text-white/70">{data[currentDeptIndex - 1].name}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Center Department (Current) */}
              <AnimatePresence mode="popLayout" custom={direction}>
                <motion.div
                  // key={`center-${currentDeptIndex}`}
                  key="center"
                  custom={direction}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10 flex-shrink-0"
                  style={{ width: '280px', height: '280px' }}
                >
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="h-40 w-40 rounded-full bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 blur-3xl"></div>
                  </div>

                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <defs>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <Pie
                        data={currentDept.data}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={115}
                        paddingAngle={3}
                        dataKey="value"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth={2}
                        filter="url(#glow)"
                      >
                        {currentDept.data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            style={{
                              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.2))',
                            }}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="mb-1 text-2xl font-semibold text-white">{currentDept.name}</div>
                      <div className="text-sm text-gray-400">{currentDept.data.reduce((acc, item) => acc + item.value, 0)} Total</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Right Department (Next) */}
              <AnimatePresence mode="popLayout">
                {currentDeptIndex < data.length - 1 && (
                  <motion.div
                    key={`right-${currentDeptIndex - 1}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.4, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="pointer-events-none relative flex-shrink-0"
                    style={{ width: '180px', height: '180px' }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data[currentDeptIndex + 1].data}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={65}
                          paddingAngle={2}
                          dataKey="value"
                          stroke="rgba(255, 255, 255, 0.1)"
                          strokeWidth={1}
                        >
                          {data[currentDeptIndex + 1].data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-sm font-medium text-white/70">{data[currentDeptIndex + 1].name}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={nextDepartment}
            className="cursor-pointer rounded-xl border border-white/10 bg-white/10 p-3 backdrop-blur-xl transition-all duration-300 hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6">
          {currentDept.data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl">
              <div
                className="h-3 w-3 rounded-full shadow-lg"
                style={{
                  backgroundColor: entry.color,
                  boxShadow: `0 0 10px ${entry.color}`,
                }}
              ></div>
              <span className="text-sm text-gray-300">{entry.name}</span>
              <span className="text-sm font-medium text-white">({entry.value})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
