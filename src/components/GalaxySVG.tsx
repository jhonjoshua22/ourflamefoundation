import React from "react";

const GalaxySVG = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-30 z-[-1] bg-black">
      <svg
        className="animate-galaxy-rotate w-[1000px] h-[1000px] md:w-[1600px] md:h-[1600px]"
        viewBox="0 0 800 800"
        fill="none"
      >
        {/* Spiral arms */}
        {[0, 72, 144, 216, 288].map((rotation, i) => (
          <g key={i} transform={`rotate(${rotation} 400 400)`}>
            <path
              d={`M 400 400 Q ${450 + i * 10} ${300 - i * 5} ${500 + i * 15} ${200 - i * 10} Q ${550 + i * 10} ${100} ${600} ${80}`}
              stroke={`hsl(${210 + i * 30}, 80%, 60%)`}
              strokeWidth="2"
              fill="none"
              opacity="0.6"
            />
            <path
              d={`M 400 400 Q ${460 + i * 8} ${320 - i * 4} ${520 + i * 12} ${220 - i * 8} Q ${560 + i * 8} ${120} ${620} ${100}`}
              stroke={`hsl(${45}, 100%, 56%)`}
              strokeWidth="1"
              fill="none"
              opacity="0.3"
            />
          </g>
        ))}
        {/* Core glow */}
        <circle cx="400" cy="400" r="30" fill="url(#coreGlow)" />
        <circle cx="400" cy="400" r="80" fill="url(#coreGlow2)" />
        {/* Scattered dots */}
        {Array.from({ length: 120 }).map((_, i) => {
          const angle = (i / 120) * Math.PI * 6;
          const dist = 50 + (i / 120) * 350;
          const x = 400 + Math.cos(angle) * dist + (Math.random() - 0.5) * 60;
          const y = 400 + Math.sin(angle) * dist + (Math.random() - 0.5) * 60;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={Math.random() * 2 + 0.5}
              fill="hsl(45, 100%, 80%)"
              opacity={Math.random() * 0.7 + 0.2}
            />
          );
        })}
        <defs>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="hsl(45, 100%, 80%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(45, 100%, 56%)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="coreGlow2">
            <stop offset="0%" stopColor="hsl(210, 100%, 70%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default GalaxySVG;
