import { useState, useEffect } from 'react';
import { Clock, Users, UserCheck, UserX, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import NavBar from './components/NavBar';
import { getCompanyMetrics, getDepartments, getAttendanceFeed } from './api/mock';
import { DateTimeCard } from './components/DateTimeCard';
import { DashboardMetricsCard } from './components/DashboardMetricsCard';
import { DepartmentAttendancePanel } from './components/DepartmentAttendancePanel';
import { DepartmentOverviewPanel } from './components/DepartmentOverviewPanel';

export default function App() {
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
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(249, 115, 22, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(249, 115, 22, 0.5);
        }
      `}</style>
    </div>
  );
}
