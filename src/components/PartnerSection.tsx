import React from "react";

import google from "../assets/google.png";
import xLogo from "../assets/x.png";
import meta from "../assets/meta.png";
import microsoft from "../assets/microsoft.png";
import nhs from "../assets/nhs.png";

const partnerLogos = [
  { id: 1, src: google, alt: "Google" },
  { id: 2, src: xLogo, alt: "X" },
  { id: 3, src: meta, alt: "Meta" },
  { id: 4, src: microsoft, alt: "Microsoft" },
  { id: 5, src: nhs, alt: "NHS" },
];

const PartnerSection = () => {
  return (
    <section className="bg-background py-12 border-t border-border transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-4">
          {partnerLogos.map((partner) => (
            <div 
              key={partner.id}
              className="group relative aspect-square w-full max-w-[180px] border border-border bg-white/5 flex items-center justify-center overflow-hidden transition-all duration-500 hover:border-orange-600/50 rounded-none"
            >
              <img
                src={partner.src}
                alt={partner.alt}
                className="w-3/5 h-3/5 object-contain filter grayscale opacity-40 contrast-[0.8] transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100"
              />
              
              {/* Industrial Accent - Top Right */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-orange-600 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
