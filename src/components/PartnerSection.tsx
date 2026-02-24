import React from "react";

// Replace these paths with your actual partner logo assets
const partnerLogos = [
  { id: 1, src: "../assets/google.png", alt: "Partner 1" },
  { id: 2, src: "../assets/x.png", alt: "Partner 2" },
  { id: 3, src: "../assets/meta.png", alt: "Partner 3" },
  { id: 4, src: "../assets/microsoft.png", alt: "Partner 4" },
  { id: 5, src: "../assets/nhs.png", alt: "Partner 5" },
];

const PartnerSection = () => {
  return (
    <section className="bg-background py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-4">
          {partnerLogos.map((partner) => (
            <div 
              key={partner.id}
              className="group relative aspect-square w-full max-w-[200px] border border-border bg-white/5 flex items-center justify-center overflow-hidden transition-all duration-500 hover:border-orange-600/50"
            >
              <img
                src={partner.src}
                alt={partner.alt}
                className="w-1/2 h-1/2 object-contain filter grayscale opacity-40 contrast-[0.8] transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100"
              />
              {/* Optional subtle corner accent to reinforce the "Foundation" industrial look */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-orange-600 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
