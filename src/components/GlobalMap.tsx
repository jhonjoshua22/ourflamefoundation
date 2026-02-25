import React, { useState } from "react";
import logo from "../assets/ourflamelogo.png";

const locations = [
  { id: "UK", name: "United Kingdom", x: "47%", y: "18%", details: "HQ & Strategy" },
  { id: "PH", name: "Philippines", x: "85%", y: "55%", details: "Tech Hub" },
  { id: "IN", name: "India", x: "72%", y: "45%", details: "Community Outreach" },
  { id: "PK", name: "Pakistan", x: "68%", y: "40%", details: "Education Programs" },
  { id: "BD", name: "Bangladesh", x: "75%", y: "45%", details: "Impact Projects" },
  { id: "GE", name: "Georgia", x: "58%", y: "30%", details: "Regional Support" },
];

const GlobalMap = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="bg-background py-20 border-t border-border transition-colors duration-500">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-12 border-l-4 border-orange-600 pl-6">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-foreground">
            Global <span className="text-orange-600 not-italic">Presence</span>
          </h2>
          <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-muted-foreground mt-2">
            Strategic Flamepoints Established
          </p>
        </div>

        <div className="relative w-full aspect-[16/9] border border-border bg-white/5 overflow-hidden">
          {/* World Map Background (Minimalist Flat SVG) */}
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full fill-zinc-200 dark:fill-zinc-900 opacity-50 transition-colors duration-500"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Simple World Path - This represents the world shape without external APIs */}
            <path d="M150,100 L850,100 L850,400 L150,400 Z" fill="none" /> 
            {/* Note: In a real app, you can paste a full World SVG Path here */}
            <text x="50%" y="50%" textAnchor="middle" className="text-[150px] font-black opacity-5 select-none uppercase italic">FOUNDATION</text>
          </svg>

          {/* Flame Markers */}
          {locations.map((loc) => (
            <div
              key={loc.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: loc.x, top: loc.y }}
              onMouseEnter={() => setHovered(loc)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 w-8 h-8 bg-orange-600/40 blur-xl scale-150 animate-pulse rounded-none" />
              
              {/* Flame Logo */}
              <img 
                src={logo} 
                alt="Flame" 
                className="w-6 h-6 md:w-10 md:h-10 object-contain relative z-10 brightness-110 grayscale group-hover:grayscale-0 transition-all duration-300" 
              />

              {/* Label */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-foreground text-background text-[10px] font-black uppercase tracking-tighter whitespace-nowrap transition-all duration-300 ${hovered?.id === loc.id ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                {loc.name}: {loc.details}
              </div>
            </div>
          ))}

          {/* Corner Data Overlay */}
          <div className="absolute top-6 right-6 text-right hidden md:block">
            <div className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-widest">Active Status</div>
            <div className="text-2xl font-black text-foreground italic">LIVE_TRACKING</div>
          </div>
        </div>

        {/* List for Mobile View */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-8">
          {locations.map((loc) => (
            <div key={loc.id} className="border border-border p-4 hover:border-orange-600 transition-colors">
              <span className="block text-[10px] font-mono text-zinc-500">{loc.id}</span>
              <span className="block text-sm font-black uppercase text-foreground italic">{loc.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalMap;
