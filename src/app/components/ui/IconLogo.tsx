export default function IconLogo() {
  return (
    <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500 shadow-2xl shadow-orange-500/30">
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Clock face */}
        <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.5" />
        {/* Hour hand */}
        <line
          x1="12"
          y1="12"
          x2="12"
          y2="7"
          stroke="white"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        {/* Minute hand */}
        <line
          x1="12"
          y1="12"
          x2="15.5"
          y2="12"
          stroke="white"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        {/* Center dot */}
        <circle cx="12" cy="12" r="1.2" fill="white" />
        {/* Tick marks */}
        <line
          x1="12"
          y1="4"
          x2="12"
          y2="5.5"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />
        <line
          x1="12"
          y1="18.5"
          x2="12"
          y2="20"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />
        <line
          x1="4"
          y1="12"
          x2="5.5"
          y2="12"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />
        <line
          x1="18.5"
          y1="12"
          x2="20"
          y2="12"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
