export default function IconLogo() {
  return (
    <div
      style={{
        position: 'relative',
        width: 48,
        height: 48,
        borderRadius: 12,
        background: 'linear-gradient(145deg, #7c1a00 0%, #c43b00 40%, #e85d20 75%, #f4854a 100%)',
        boxShadow: '0 0 0 1px rgba(255,120,50,0.25), 0 2px 8px rgba(180,60,0,0.45), 0 8px 24px rgba(140,40,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Subtle inner highlight rim */}
      <div
        style={{
          position: 'absolute',
          inset: 1,
          borderRadius: 8,
          background: 'linear-gradient(145deg, rgba(255,180,100,0.15) 0%, transparent 55%)',
          pointerEvents: 'none',
        }}
      />

      <svg
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Outer ring */}
        <circle cx="12" cy="12" r="9.5" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" />

        {/* Inner subtle ring */}
        <circle cx="12" cy="12" r="9.5" stroke="rgba(255,130,60,0.3)" strokeWidth="3" />

        {/* 12 tick marks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const isMajor = i % 3 === 0;
          const outerR = 9.5;
          const innerR = isMajor ? 7.8 : 8.4;
          const x1 = 12 + outerR * Math.sin(angle);
          const y1 = 12 - outerR * Math.cos(angle);
          const x2 = 12 + innerR * Math.sin(angle);
          const y2 = 12 - innerR * Math.cos(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(255,255,255,0.9)"
              strokeWidth={isMajor ? 1.3 : 0.8}
              strokeLinecap="round"
            />
          );
        })}

        {/* Hour hand */}
        <line x1="12" y1="12" x2="12" y2="7.2" stroke="white" strokeWidth="1.8" strokeLinecap="round" />

        {/* Minute hand */}
        <line x1="12" y1="12" x2="15.8" y2="12" stroke="white" strokeWidth="1.4" strokeLinecap="round" />

        {/* Center jewel */}
        <circle cx="12" cy="12" r="1.5" fill="white" />
        <circle cx="12" cy="12" r="0.7" fill="rgba(255,120,50,0.9)" />
      </svg>
    </div>
  );
}
