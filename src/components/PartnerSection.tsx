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
        <div className="flex flex-col md:flex-row gap-8 items-start">
          
          {/* LEFT SIDE: MEDAL LEGEND (Tier Track) */}
          <div className="flex md:flex-col gap-6 py-4 border-b md:border-b-0 md:border-r border-border pr-8">
            <div className="group flex items-center gap-3">
              <Medal className="w-6 h-6 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]" />
              <div className="h-px w-4 bg-border group-hover:w-8 transition-all hidden md:block" />
            </div>
            <div className="group flex items-center gap-3">
              <Medal className="w-6 h-6 text-slate-300 drop-shadow-[0_0_8px_rgba(203,213,225,0.4)]" />
              <div className="h-px w-4 bg-border group-hover:w-8 transition-all hidden md:block" />
            </div>
            <div className="group flex items-center gap-3">
              <Medal className="w-6 h-6 text-amber-700 drop-shadow-[0_0_8px_rgba(180,83,9,0.4)]" />
              <div className="h-px w-4 bg-border group-hover:w-8 transition-all hidden md:block" />
            </div>
          </div>

          {/* RIGHT SIDE: PARTNER GRID */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {partnerLogos.map((partner) => (
              <div 
                key={partner.id}
                className="group relative aspect-square border border-border bg-white/5 flex items-center justify-center overflow-hidden transition-all duration-500 hover:border-orange-600/50 rounded-none"
              >
                {/* Subtle Tier Indicator in corner of square */}
                <div className="absolute top-2 left-2 z-10">
                  <Medal className={`w-3 h-3 ${
                    partner.tier === 'gold' ? 'text-amber-400' : 
                    partner.tier === 'silver' ? 'text-slate-300' : 'text-amber-700'
                  } opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>

                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="w-3/5 h-3/5 object-contain filter grayscale opacity-40 contrast-[0.8] transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100"
                />
                
                {/* Industrial Accent */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-orange-600 transition-colors" />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
