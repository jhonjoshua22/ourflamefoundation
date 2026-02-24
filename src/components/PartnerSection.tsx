import React from "react";

// Individual imports for bundling
import google from "../assets/google.png";
import xLogo from "../assets/x.png";
import meta from "../assets/meta.png";
import microsoft from "../assets/microsoft.png";
import nhs from "../assets/nhs.png";

const partnerLogos = [
  { id: 1, src: google, alt: "Google", tier: "gold", color: "rgba(251,191,36,0.4)" },
  { id: 2, src: xLogo, alt: "X", tier: "silver", color: "rgba(203,213,225,0.4)" },
  { id: 3, src: meta, alt: "Meta", tier: "silver", color: "rgba(203,213,225,0.4)" },
  { id: 4, src: microsoft, alt: "Microsoft", tier: "bronze", color: "rgba(180,83,9,0.4)" },
  { id: 5, src: nhs, alt: "NHS", tier: "bronze", color: "rgba(180,83,9,0.4)" },
];

const PartnerSection = () => {
  return (
    <section className="bg-background py-16 transition-colors duration-500">
      <div className="container mx-auto px-6">
        {/* items-center ensures vertical alignment between the legend and the grid */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* LEFT SIDE: TIER LEGEND */}
          <div className="flex flex-col gap-8 shrink-0 lg:w-48">
            <div className="space-y-6">
              {/* Gold Tier */}
              <div className="flex items-center gap-4 group">
                <div className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Gold Partner</span>
                  <span className="text-xs font-mono font-bold text-orange-600">100% Committed</span>
                </div>
              </div>

              {/* Silver Tier */}
              <div className="flex items-center gap-4 group">
                <div className="w-3 h-3 rounded-full bg-slate-300 shadow-[0_0_12px_rgba(203,213,225,0.8)]" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Silver Partner</span>
                  <span className="text-xs font-mono font-bold text-zinc-500">50% Committed</span>
                </div>
              </div>

              {/* Bronze Tier */}
              <div className="flex items-center gap-4 group">
                <div className="w-3 h-3 rounded-full bg-amber-700 shadow-[0_0_12px_rgba(180,83,9,0.8)]" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Bronze Partner</span>
                  <span className="text-xs font-mono font-bold text-amber-900/70">1% Committed</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: PARTNER GRID */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
            {partnerLogos.map((partner) => (
              <div 
                key={partner.id}
                className="group relative aspect-square bg-white/5 flex items-center justify-center overflow-hidden transition-all duration-500 rounded-xl"
                style={{
                  '--glow-color': partner.color
                }}
              >
                {/* Background Glow Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
                  style={{ backgroundColor: partner.color }}
                />

                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="relative z-10 w-1/2 h-1/2 object-contain filter grayscale opacity-40 contrast-[0.8] transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
