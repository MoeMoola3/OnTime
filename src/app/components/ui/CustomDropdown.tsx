import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface CustomDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export function CustomDropdown({ value, onChange, options }: CustomDropdownProps) {
  const [open, setOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: 'fixed',
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = () => setOpen(false);
    window.addEventListener('scroll', handler, true);
    return () => window.removeEventListener('scroll', handler, true);
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        className="relative flex min-w-[160px] cursor-pointer items-center rounded-xl border border-white/10 bg-gray-900/80 px-4 py-2 pr-8 text-sm text-white backdrop-blur-xl transition-all focus:border-orange-500/50 focus:outline-none"
      >
        <span className="flex-1 text-left">{value}</span>
        <svg
          className={`absolute right-2 h-4 w-4 text-white transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              ...dropdownStyle,
              background: 'rgba(10, 10, 20, 0.55)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
            className="overflow-hidden rounded-xl border border-white/15"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2.5 text-left text-sm transition-all duration-150 hover:bg-white/10 ${
                  value === option ? 'bg-orange-500/20 text-orange-300' : 'text-white/80 hover:text-white'
                }`}
              >
                {option}
              </button>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
