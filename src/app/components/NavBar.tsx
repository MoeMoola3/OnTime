import { useState } from "react";
import { LayoutDashboard, FileText, Users, Settings } from "lucide-react";
import IconLogo from "./ui/IconLogo";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: FileText, label: "Reports" },
  { icon: Users, label: "Employees" },
  { icon: Settings, label: "Settings" },
];

export default function NavBar() {
  const [active, setActive] = useState<string>("");
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex items-center justify-between gap-30">
      <div className="shrink-0 flex items-center gap-3">
        <IconLogo />
        <div>
          <h1 className="text-white font-semibold leading-tight tracking-tight">
            Time & Attendance
          </h1>
          <p className="text-orange-400 text-xs font-medium tracking-wide uppercase">
            Real-time workforce monitoring
          </p>
        </div>
      </div>
      <div className="flex-1">
        <nav className="relative px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
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
                  className={`relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/20 text-white"
                      : isHovered
                        ? "bg-white/10 text-white"
                        : "text-gray-400"
                  }`}
                >
                  <item.icon className="w-5 h-5 shrink-0 text-orange-400" />
                  <span
                    className="text-sm font-medium overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out"
                    style={{
                      maxWidth: showLabel ? "100px" : "0px",
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
