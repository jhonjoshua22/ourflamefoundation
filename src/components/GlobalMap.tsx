import React, { useState } from "react";
import logo from "../assets/ourflamelogo.png";

const locations = [
  { id: "UK", name: "United Kingdom", x: "48%", y: "24%", details: "Strategic HQ" },
  { id: "GE", name: "Georgia", x: "57%", y: "32%", details: "Regional Hub" },
  { id: "PK", name: "Pakistan", x: "67%", y: "42%", details: "Community Outreach" },
  { id: "IN", name: "India", x: "71%", y: "48%", details: "Impact Programs" },
  { id: "BD", name: "Bangladesh", x: "74%", y: "46%", details: "Education Center" },
  { id: "PH", name: "Philippines", x: "85%", y: "58%", details: "Innovation Lab" },
];

const GlobalMap = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="bg-background py-20 border-t border-border transition-colors duration-500">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12 border-l-4 border-orange-600 pl-6">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-foreground">
            Global <span className="text-orange-600 not-italic">Presence</span>
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground mt-2">
            Foundation Nodes & Active Zones
          </p>
        </div>

        <div className="relative w-full aspect-[16/9] border border-border bg-white/5 backdrop-blur-sm overflow-hidden group/map">
          
          {/* THE SVG WORLD MAP DATA */}
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full fill-zinc-300 dark:fill-zinc-800 transition-colors duration-700"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Highly simplified World Path to ensure it loads instantly on GitHub */}
            <path d="M194,136 L201,130 L219,134 L233,121 L246,128 L254,124 L264,135 L281,133 L293,122 L310,123 L325,116 L333,122 L347,117 L367,126 L384,124 L396,112 L414,115 L433,108 L452,118 L475,115 L491,118 L506,107 L535,110 L563,111 L585,106 L609,114 L627,111 L642,122 L662,118 L684,121 L715,118 L738,118 L754,124 L771,119 L793,127 L818,124 L844,133 L858,129 L877,137 L892,136 L892,154 L879,166 L867,175 L863,186 L867,202 L859,219 L849,235 L825,244 L799,248 L775,251 L755,259 L734,264 L710,266 L689,261 L664,261 L643,264 L623,273 L611,288 L608,311 L608,328 L599,343 L584,352 L570,361 L555,364 L539,360 L527,351 L519,335 L516,316 L511,299 L503,285 L490,277 L475,274 L458,271 L439,271 L421,274 L400,274 L378,266 L356,260 L336,252 L314,244 L290,237 L270,229 L251,219 L234,208 L221,194 L211,177 L204,162 L198,148 L194,136 Z" />
            
            {/* Industrial Overlay Grid */}
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-500/10" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* FLAME MARKERS */}
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              style={{ left: loc.x, top: loc.y }}
              onMouseEnter={() => setHovered(loc)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Pulse / Glow Effect */}
              <div className="absolute inset-0 w-8 h-8 bg-orange-600/30 blur-xl scale-150 animate-pulse rounded-none" />
              
              {/* Logo Marker */}
              <img 
                src={logo} 
                alt="Flame" 
                className="w-6 h-6 md:w-8 md:h-8 object-contain relative z-10 brightness-110 drop-shadow-[0_0_8px_rgba(234,88,12,0.6)] group-hover:scale-125 transition-all duration-300" 
              />

              {/* Tooltip Label */}
              <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-[#0a0a0a] border border-orange-600/50 text-white text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 shadow-2xl ${hovered?.id === loc.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                <span className="text-orange-600 mr-2">{loc.id}</span> {loc.name}
                <div className="text-[8px] text-zinc-400 font-light lowercase mt-1 tracking-normal">{loc.details}</div>
              </div>
            </div>
          ))}

          {/* Map Coordinates UI */}
          <div className="absolute bottom-4 right-6 text-right opacity-30 pointer-events-none">
            <p className="font-mono text-[8px] uppercase tracking-widest text-foreground">Lat: 51.5074 N</p>
            <p className="font-mono text-[8px] uppercase tracking-widest text-foreground">Long: 0.1278 W</p>
          </div>
        </div>

        {/* Footer List (Mobile Friendly) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-4">
          {locations.map((loc) => (
            <div key={loc.id} className="border border-border p-3 bg-white/5 flex items-center gap-3">
              <div className="w-1 h-4 bg-orange-600" />
              <div>
                <span className="block text-[10px] font-black text-foreground leading-none">{loc.id}</span>
                <span className="block text-[8px] uppercase text-muted-foreground tracking-tighter mt-1">{loc.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalMap;
