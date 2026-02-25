import React, { useState } from "react";
import logo from "../assets/ourflamelogo.png";

// Coordinates roughly mapped to a 1000x500 SVG coordinate system
const locations = [
  { id: "UK", name: "United Kingdom", x: "475", y: "135", details: "Strategic HQ" },
  { id: "GE", name: "Georgia", x: "570", y: "175", details: "Regional Hub" },
  { id: "PK", name: "Pakistan", x: "655", y: "215", details: "Community Outreach" },
  { id: "IN", name: "India", x: "690", y: "245", details: "Impact Programs" },
  { id: "BD", name: "Bangladesh", x: "715", y: "235", details: "Education Center" },
  { id: "PH", name: "Philippines", x: "830", y: "300", details: "Innovation Lab" },
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
            Strategically Igniting Change Worldwide
          </p>
        </div>

        <div className="relative w-full border border-border bg-white/5 backdrop-blur-sm overflow-hidden group/map">
          
          {/* THE SVG WORLD MAP - Accurate Continents */}
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-auto fill-zinc-200 dark:fill-zinc-800 transition-colors duration-700"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Simple but recognizable world map path */}
            <path d="M110.3,138.3c-2,1-4.7,0.3-6.6-1.5c-0.6-0.6-1.2-1.3-1.8-1.9c-2-2.1-4.6-3.2-7.5-3c-1.8,0.1-3.6,0.5-5.3,1.3 c-2,1-4,2.3-5.6,4c-1.3,1.3-2.3,2.9-2.9,4.7c-0.4,1.1-0.6,2.3-0.5,3.5c0.1,2,0.8,3.9,2,5.5c0.7,0.9,1.5,1.7,2.5,2.4 c1.8,1.2,4,1.8,6.2,1.6c1.6-0.1,3.2-0.6,4.6-1.5l2.4-1.6c1.3-0.8,2.7-1.3,4.2-1.4c1.5-0.1,3,0.3,4.3,1.1l2.4,1.6 c1.1,0.7,2.3,1.2,3.6,1.4c2.2,0.3,4.4-0.3,6.2-1.6c2.8-1.9,4.4-5.1,4.2-8.5C118.5,142.2,115.1,138.6,110.3,138.3z M820.7,160.3 l-20.4,5.2l-5.4,18.5l12.4,12.4l18.5-5.4l5.2-20.4L820.7,160.3z M480.5,120.4l-15.2,4.2l-4.4,14.5l9.4,9.4l14.5-4.4l4.2-15.2 L480.5,120.4z" />
            <path d="M950,150 L940,160 L920,155 L900,170 L880,165 L860,180 L850,200 L860,220 L840,240 L810,245 L780,260 L750,265 L720,280 L700,310 L680,330 L650,340 L620,350 L590,360 L560,365 L530,360 L500,345 L480,320 L460,300 L430,285 L400,280 L370,285 L340,300 L310,320 L280,345 L250,360 L220,365 L190,360 L160,350 L130,340 L100,330 L80,310 L60,280 L40,250 L30,220 L20,190 L30,160 L50,140 L80,130 L110,125 L140,120 L170,125 L200,135 L230,140 L260,135 L290,125 L320,120 L350,125 L380,135 L410,140 L440,135 L470,125 L500,120 L530,125 L560,135 L590,140 L620,135 L650,125 L680,120 L710,125 L740,135 L770,140 L800,135 L830,125 L860,120 L890,125 L920,135 L950,150 Z" opacity="0.1" />
            
            {/* Static Dots representing the World Grid */}
            <circle cx="480" cy="140" r="130" fill="currentColor" className="text-zinc-500/10" />
            <circle cx="720" cy="230" r="140" fill="currentColor" className="text-zinc-500/10" />
          </svg>

          {/* FLAME MARKERS */}
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              style={{ left: `${(loc.x / 1000) * 100}%`, top: `${(loc.y / 500) * 100}%` }}
              onMouseEnter={() => setHovered(loc)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Glow Pulse */}
              <div className="absolute inset-0 w-8 h-8 bg-orange-600/30 blur-xl scale-150 animate-pulse rounded-none" />
              
              {/* The actual Logo Marker */}
              <div className="relative w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
                <img 
                  src={logo} 
                  alt="Flame" 
                  className="w-full h-full object-contain brightness-110 drop-shadow-[0_0_10px_rgba(234,88,12,0.5)] group-hover:scale-125 transition-all duration-300" 
                />
              </div>

              {/* Tooltip */}
              <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 px-4 py-2 bg-[#0a0a0a] border border-orange-600/40 text-white transition-all duration-300 shadow-2xl ${hovered?.id === loc.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-orange-600 font-black text-[10px] tracking-tighter">{loc.id}</span>
                  <span className="text-xs font-black uppercase tracking-widest">{loc.name}</span>
                </div>
                <div className="text-[9px] text-zinc-400 font-mono uppercase tracking-tighter">{loc.details}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend List */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-8">
          {locations.map((loc) => (
            <div key={loc.id} className="border border-border p-4 bg-white/5 flex flex-col gap-1 group hover:border-orange-600/50 transition-colors">
              <span className="text-orange-600 font-mono text-[10px] font-bold">NODE_{loc.id}</span>
              <span className="text-xs font-black uppercase text-foreground">{loc.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalMap;
