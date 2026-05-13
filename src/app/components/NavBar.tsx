import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Blocks, Settings } from 'lucide-react';
import IconLogo from './ui/IconLogo';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
  { icon: FileText, label: 'Reports', to: '/reports' },
  { icon: Blocks, label: 'Operations', to: '/operations' },
  { icon: Settings, label: 'Settings', to: '/settings' },
];

export default function NavBar() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-between gap-30">
      <div className="flex shrink-0 items-center gap-3">
        <IconLogo />
        <div>
          <h1 className="leading-tight font-semibold tracking-tight text-white">Excellent Meat</h1>
          <p className="text-xs font-medium tracking-wide text-orange-400 uppercase">Commited to Excellence</p>
        </div>
      </div>
      <div className="flex-1">
        <nav className="relative rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3">
            {navItems.map((item) => {
              const isHovered = hovered === item.label;

              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === '/'}
                  onMouseEnter={() => setHovered(item.label)}
                  onMouseLeave={() => setHovered(null)}
                  className={({ isActive }) =>
                    `relative flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 transition-all duration-300 ${
                      isActive
                        ? 'border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-red-500/20 text-white'
                        : isHovered
                          ? 'bg-white/10 text-white'
                          : 'text-gray-400'
                    }`
                  }
                >
                  {({ isActive }) => {
                    const showLabel = isActive || isHovered;
                    return (
                      <>
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
                      </>
                    );
                  }}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
