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

const partnerLogos = [
  { id: 1, src: google, alt: "Google", color: "rgba(251,191,36,0.4)" },
  { id: 2, src: xLogo, alt: "X", color: "rgba(203,213,225,0.4)" },
  { id: 3, src: meta, alt: "Meta", color: "rgba(203,213,225,0.4)" },
  { id: 4, src: microsoft, alt: "Microsoft", color: "rgba(180,83,9,0.4)" },
  { id: 5, src: nhs, alt: "NHS", color: "rgba(180,83,9,0.4)" },
];

const corePeople = [
  {
    id: 1,
    name: "Maurice Flynn",
    position: "CEO / COO",
    image: MauriceB,
    linkedin: "https://www.linkedin.com/in/mauricebigmoflynn/",
    bio: "Driving the operational excellence and long-term vision of the ecosystem."
  },
  {
    id: 2,
    name: "Martin Hall",
    position: "CGO / CMO",
    image: MartinH,
    linkedin: "https://www.linkedin.com/in/martin-hall-bbb9082/",
    bio: "Architect of global growth strategies and market-disrupting campaigns."
  },
  {
    id: 3,
    name: "Graham Richard",
    position: "CFO",
    image: GrahamR,
    linkedin: "https://www.linkedin.com/in/richardsonjgraham/",
    bio: "Managing the economic foundations and fiscal integrity of our mission."
  },
  {
    id: 4,
    name: "Alwin Stephen",
    position: "CTO / CPO",
    image: null,
    initials: "AS",
    linkedin: "https://www.linkedin.com/in/alwinstephen/",
    bio: "Leading product innovation and the core AI technical stack."
  },
  {
    id: 5,
    name: "Peter Terziev",
    position: "Chair",
    image: null,
    initials: "PT",
    linkedin: null, // No link yet
    bio: "Governing the strategic direction and high-level partnerships."
  },
  {
    id: 6,
    name: "Joshua H.",
    position: "Investor Relations",
    image: JoshuaH,
    linkedin: "https://www.linkedin.com/in/joshuah1/",
    bio: "Building bridges between institutional capital and the future of AI."
  }
];

const PartnerSection = () => {
  return (
    <section className="bg-white dark:bg-black py-24 transition-colors duration-500 overflow-hidden">
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
                <img src={partner.src} alt={partner.alt} className="relative z-10 w-1/2 h-1/2 object-contain filter grayscale opacity-40 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110" />
              </div>
            ))}
          </div>
        </div>

        {/* CORE PEOPLE SECTION */}
        <div className="flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">The Architects</h4>
              <h2 className="text-6xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white leading-none">
                Core <span className="text-orange-600">Command</span>
              </h2>
            </div>
            <p className="max-w-xs text-zinc-500 text-[10px] font-black uppercase tracking-widest leading-relaxed italic">
              Governing the transition into the next generation of OtherWorld AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corePeople.map((person) => (
              <div key={person.id} className="group relative flex flex-col bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden hover:border-orange-600/50 transition-all duration-500 shadow-xl">
                
                {/* Image or Avatar Container */}
                <div className="w-full aspect-[16/10] overflow-hidden bg-zinc-200 dark:bg-zinc-800 relative flex items-center justify-center">
                  {person.image ? (
                    <img src={person.image} alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center relative">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-600 via-transparent to-transparent animate-pulse" />
                      <span className="text-6xl font-black italic text-zinc-700 dark:text-zinc-600 tracking-tighter select-none">
                        {person.initials}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 z-20">
                    <p className="text-[8px] font-black text-white uppercase tracking-tighter italic">Verified Core</p>
                  </div>
                </div>
                
                {/* Text Content */}
                <div className="p-8 flex flex-col flex-1 space-y-4">
                  <div>
                    <h3 className="text-2xl font-black uppercase italic tracking-tighter dark:text-white group-hover:text-orange-600 transition-colors">
                      {person.name}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1 leading-none">
                      {person.position}
                    </p>
                  </div>
                  
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs font-bold leading-relaxed border-t border-zinc-200 dark:border-zinc-800 pt-4 italic">
                    {person.bio}
                  </p>
                  
                  <div className="pt-2 flex gap-2">
                    <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-black dark:text-white hover:bg-orange-600 hover:text-white transition-all cursor-pointer">X</div>
                    
                    {person.linkedin ? (
                      <a 
                        href={person.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-[10px] font-black dark:text-white hover:bg-[#0077B5] hover:text-white transition-all cursor-pointer"
                      >
                        IN
                      </a>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-[10px] font-black text-zinc-300 dark:text-zinc-700 cursor-not-allowed">
                        IN
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PartnerSection;
