import React from "react";
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
        <div className="flex flex-col gap-8">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Our Strategic Partners</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {partnerLogos.map((partner) => (
              <div 
                key={partner.id}
                className="group relative aspect-square bg-white/5 flex items-center justify-center overflow-hidden transition-all duration-500 rounded-xl"
                style={{ '--glow-color': partner.color }}
              >
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
