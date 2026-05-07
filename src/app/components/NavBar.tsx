import { useState } from 'react';
import { LayoutDashboard, FileText, Users, Settings } from 'lucide-react';
import IconLogo from './ui/IconLogo';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: FileText, label: 'Reports' },
  { icon: Users, label: 'Employees' },
  { icon: Settings, label: 'Settings' },
];

export default function NavBar() {
  const [active, setActive] = useState<string>('');
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-between gap-30">
      <div className="flex shrink-0 items-center gap-3">
        <IconLogo />
        <div>
          <h1 className="leading-tight font-semibold tracking-tight text-white">Time & Attendance</h1>
          <p className="text-xs font-medium tracking-wide text-orange-400 uppercase">Real-time workforce monitoring</p>
        </div>
      </div>
      <div className="flex-1">
        <nav className="relative rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            {navItems.map((item) => {
              const isActive = active === item.label;
              const isHovered = hovered === item.label;
              const showLabel = isActive || isHovered;

              return (
                <button
                  key={item.label}
                  onClick={() => setActive(item.label)}
                  onMouseEnter={() => setHovered(item.label)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-300 ${
                    isActive
                      ? 'border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 text-white'
                      : isHovered
                        ? 'bg-white/10 text-white'
                        : 'text-gray-400'
                  }`}
                >
                  <item.icon className="h-5 w-5 shrink-0 text-orange-400" />
                  <span
                    className="overflow-hidden text-sm font-medium whitespace-nowrap transition-all duration-300 ease-in-out"
                    style={{
                      maxWidth: showLabel ? '100px' : '0px',
                      opacity: showLabel ? 1 : 0,
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
