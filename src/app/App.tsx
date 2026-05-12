import { HashRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ReportsPage from './pages/ReportsPage';

export default function App() {
  return (
    <HashRouter>
      <div className="dark min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <style>{`
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(249,115,22,0.3); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(249,115,22,0.5); }
        `}</style>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}
