import React from 'react';

const GalaxySVG = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-30 select-none">
      <svg
        className="animate-galaxy-rotate w-[1000px] h-[1000px] lg:w-[1600px] lg:h-[1600px]"
        viewBox="0 0 800 800"
        fill="none"
      >
        <defs>
          {/* Flame gradient for the galaxy core */}
          <radialGradient id="flameCore">
            <stop offset="0%" stopColor="hsl(25, 100%, 70%)" stopOpacity="0.8" />
            <stop offset="50%" stopColor="hsl(12, 90%, 50%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Core Glow */}
        <circle cx="400" cy="400" r="100" fill="url(#flameCore)" />

        {/* 5 Spiral Arms */}
        {[0, 72, 144, 216, 288].map((rotation, i) => (
          <g key={i} transform={`rotate(${rotation} 400 400)`}>
            {/* The main arm path */}
            <path
              d="M 400 400 Q 450 300 650 150 Q 780 100 790 130"
              stroke="hsl(25, 100%, 55%)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.4"
              fill="none"
            />
            {/* Scattered star clusters within the arms */}
            {Array.from({ length: 12 }).map((_, j) => (
              <circle
                key={j}
                cx={450 + j * 25}
                cy={300 - j * 12 + (Math.random() * 30)}
                r={Math.random() * 2}
                fill="white"
                opacity={Math.random() * 0.5}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default GalaxySVG;
