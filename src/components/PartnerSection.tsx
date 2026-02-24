import React from "react";
import { Medal } from "lucide-react";

// Individual imports for bundling
import google from "../assets/google.png";
import xLogo from "../assets/x.png";
import meta from "../assets/meta.png";
import microsoft from "../assets/microsoft.png";
import nhs from "../assets/nhs.png";

const partnerLogos = [
  { id: 1, src: google, alt: "Google", tier: "gold" },
  { id: 2, src: xLogo, alt: "X", tier: "silver" },
  { id: 3, src: meta, alt: "Meta", tier: "silver" },
  { id: 4, src: microsoft, alt: "Microsoft", tier: "bronze" },
  { id: 5, src: nhs, alt: "NHS", tier: "bronze" },
];

const PartnerSection = () => {
  return (
    <section className="bg-background py-16 border-t border-border transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* LEFT SIDE: TIER LEGEND */}
          <div className="flex flex-col gap-8 shrink-0 lg:w-48">
            <div className="space-y-6">
              {/* Gold Tier */}
              <div className="flex items-center gap-4 group">
                <Medal className="w-6 h-6 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Gold Partner</span>
                  <span className="text-xs font-mono font-bold text-orange-600">100% Committed</span>
                </div>
              </div>

              {/* Silver Tier */}
              <div className="flex items-center gap-4 group">
                <Medal className="w-6 h-6 text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.3)]" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Silver Partner</span>
                  <span className="text-xs font-mono font-bold text-zinc-500">50% Committed</span>
                </div>
              </div>

              {/* Bronze Tier */}
              <div className="flex items-center gap-4 group">
                <Medal className="w-6 h-6 text-amber-700 drop-shadow-[0_0_8px_rgba(180,83,9,0.3)]" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-foreground">Bronze Partner</span>
                  <span className="text-xs font-mono font-bold text-amber-900/70">1% Committed</span>
                </div>
              </div>
            </div>
            
            {/* Minimalist Divider for Mobile */}
            <div className="h-px w-full bg-border lg:hidden" />
          </div>

          {/* RIGHT SIDE: PARTNER GRID */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
            {partnerLogos.map((partner) => (
              <div 
                key={partner.id}
                className="group relative aspect-square border border-border bg-white/5 flex items-center justify-center overflow-hidden transition-all duration-500 hover:border-orange-600/50 rounded-none"
              >
                {/* Status Indicator in corner */}
                <div className="absolute top-3 left-3 z-10">
                  <Medal className={`w-4 h-4 ${
                    partner.tier === 'gold' ? 'text-amber-400' : 
                    partner.tier === 'silver' ? 'text-slate-300' : 'text-amber-700'
                  } opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0`} />
                </div>

                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="w-1/2 h-1/2 object-contain filter grayscale opacity-40 contrast-[0.8] transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                />
                
                {/* Industrial Corner Accent */}
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-transparent group-hover:border-orange-600 transition-colors" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
