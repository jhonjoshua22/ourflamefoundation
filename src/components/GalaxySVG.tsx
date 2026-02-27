const GalaxySVG = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-30">
      <svg
        className="animate-galaxy-rotate w-[1000px] h-[1000px] lg:w-[1500px] lg:h-[1500px]"
        viewBox="0 0 800 800"
        fill="none"
      >
        <defs>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="hsl(25, 100%, 70%)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(5, 85%, 48%)" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Spiral Arms - Using your Flame Charity Colors */}
        {[0, 72, 144, 216, 288].map((rotation, i) => (
          <g key={i} transform={`rotate(${rotation} 400 400)`}>
            <path
              d="M 400 400 Q 450 300 600 100"
              stroke="hsl(var(--flame-orange))"
              strokeWidth="1"
              opacity="0.3"
              fill="none"
            />
          </g>
        ))}
        
        <circle cx="400" cy="400" r="50" fill="url(#coreGlow)" />
      </svg>
    </div>
  );
};

export default GalaxySVG;
