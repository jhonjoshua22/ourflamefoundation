import React from "react";

// Partner Assets
import google from "../assets/google.png";
import xLogo from "../assets/x.png";
import meta from "../assets/meta.png";
import microsoft from "../assets/microsoft.png";
import nhs from "../assets/nhs.png";

// Core People Assets
import MauriceB from "../assets/MauriceB.jpg";
import MartinH from "../assets/MartinH.jpg";
import GrahamR from "../assets/GrahamR.jpg";
import JoshuaH from "../assets/JoshuaH.jpg";
import defaultAvatar from "../assets/default-user.jpg";

const partnerLogos = [
  { id: 1, src: google, alt: "Google", color: "rgba(251,191,36,0.4)" },
  { id: 2, src: xLogo, alt: "X", color: "rgba(203,213,225,0.4)" },
  { id: 3, src: meta, alt: "Meta", color: "rgba(203,213,225,0.4)" },
  { id: 4, src: microsoft, alt: "Microsoft", color: "rgba(180,83,9,0.4)" },
  { id: 5, src: nhs, alt: "NHS", color: "rgba(180,83,9,0.4)" },
];

const corePeople = [
  { id: 1, name: "Maurice Flynn", position: "CEO / COO", image: MauriceB, linkedin: "https://www.linkedin.com/in/mauricebigmoflynn/" },
  { id: 2, name: "Martin Hall", position: "CGO / CMO", image: MartinH, linkedin: "https://www.linkedin.com/in/martin-hall-bbb9082/" },
  { id: 3, name: "Graham Richard", position: "CFO", image: GrahamR, linkedin: "https://www.linkedin.com/in/richardsonjgraham/" },
  { id: 4, name: "Alwin Stephen", position: "CTO / CPO", image: null, linkedin: "https://www.linkedin.com/in/alwinstephen/" },
  { id: 5, name: "Peter Terziev", position: "Chair", image: null, linkedin: null },
  { id: 6, name: "Joshua H.", position: "Investor Relations", image: JoshuaH, linkedin: "https://www.linkedin.com/in/joshuah1/" }
];

const PartnerSection = () => {
  return (
    <section className="bg-white dark:bg-black py-24 transition-colors duration-500">
      <div className="container mx-auto px-6">
        
        {/* PARTNERS SECTION */}
        <div className="flex flex-col gap-8 mb-32">
          <div className="flex items-center gap-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Strategic Alliance</h4>
            <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {partnerLogos.map((partner) => (
              <div key={partner.id} className="group relative aspect-square bg-zinc-50 dark:bg-white/5 flex items-center justify-center overflow-hidden transition-all duration-500 rounded-xl border border-zinc-100 dark:border-white/5 hover:border-orange-600/30">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" style={{ backgroundColor: partner.color }} />
                <img src={partner.src} alt={partner.alt} className="relative z-10 w-1/2 h-1/2 object-contain opacity-60 transition-all duration-500 hover:opacity-100 hover:scale-110" />
              </div>
            ))}
          </div>
        </div>

        {/* CORE PEOPLE SECTION */}
        <div className="flex flex-col gap-12">
          <div className="flex items-end gap-4 mb-8">
            <h2 className="text-6xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white leading-none">
              Core <span className="text-orange-600">Command</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corePeople.map((person) => (
              <div key={person.id} className="flex flex-col items-center text-center p-8 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
                
                {/* Circular Photo */}
                <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-zinc-100 dark:border-zinc-800 shadow-xl">
                  <img 
                    src={person.image || defaultAvatar} 
                    alt={person.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                {/* Info */}
                <div className="space-y-1 mb-6">
                  <h3 className="text-xl font-black uppercase italic tracking-tighter dark:text-white">
                    {person.name}
                  </h3>
                  <p className="text-orange-600 text-[14px] font-black uppercase tracking-widest">
                    {person.position}
                  </p>
                </div>
                
                {/* LinkedIn Link */}
                {person.linkedin ? (
                  <a 
                    href={person.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-blue-500 transition-colors border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-lg"
                  >
                    LinkedIn
                  </a>
                ) : (
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-lg cursor-not-allowed">
                    No Profile
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
