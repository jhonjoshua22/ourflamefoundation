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

// Trusted People Assets
import ClaireN from "../assets/ClaireN.jpg";
import ReemE from "../assets/ReemE.jpg";
import PatrickS from "../assets/PatrickS.jpg";
import SharonD from "../assets/SharonD.jpg";
import MartinG from "../assets/MartinG.jpg";
import DaveB from "../assets/DaveB.jpg";
import GrahamT from "../assets/GrahamT.jpg";
import AndreiB from "../assets/AndreiB.jpg";
import RichardS from "../assets/RichardS.jpg";
import JohnT from "../assets/JohnT.jpg";

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

const trustedPeople = [
  { id: 7, name: "Claire Newman", position: "Recruitment Specialist", image: ClaireN, linkedin: "https://www.linkedin.com/in/clairenewmanbluetree/" },
  { id: 8, name: "Reem Elfeitury", position: "Managing Director", image: ReemE, linkedin: "https://www.linkedin.com/in/reem-elfeitury-31a42b3b/" },
  { id: 9, name: "Patrick Shalow", position: "Founder & CEO", image: PatrickS, linkedin: "https://www.linkedin.com/in/patrickshallow/" },
  { id: 10, name: "Sharon D'Cruz", position: "Head of Marketing", image: SharonD, linkedin: "https://www.linkedin.com/in/sharondcruz/" },
  { id: 11, name: "Martin Gormley", position: "Marketing Director", image: MartinG, linkedin: "https://www.linkedin.com/in/martin-gormley/" },
  { id: 12, name: "Dave Brewis", position: "Project Manager", image: DaveB, linkedin: "https://www.linkedin.com/in/davebrewis/" },
  { id: 13, name: "Graham Teece", position: "Managing Partner", image: GrahamT, linkedin: "https://www.linkedin.com/in/graham-teece-28211532/" },
  { id: 14, name: "Andrei Bgatov", position: "Sales Director", image: AndreiB, linkedin: "https://www.linkedin.com/in/andreibgatov/" },
  { id: 15, name: "Richard Skinner", position: "Agency Owner", image: RichardS, linkedin: "https://www.linkedin.com/in/richardskinner1/" },
  { id: 16, name: "John Thew", position: "Founder/MD", image: JohnT, linkedin: "https://www.linkedin.com/in/johnthew/" },
  { id: 17, name: "David Flynn", position: "Founder", image: null, linkedin: "https://www.linkedin.com/in/david-flynn-485ab61/" }
];

const PartnerSection = () => {
  return (
    <section id="people" className="bg-white dark:bg-black py-24 transition-colors duration-500">
      <div className="container mx-auto px-6">
        
        {/* STRATEGIC ALLIANCE */}
        <div className="flex flex-col gap-8 mb-32">
          <div className="flex items-center gap-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Partners</h4>
            <div className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {partnerLogos.map((p) => (
              <div key={p.id} className="group relative aspect-square bg-zinc-50 dark:bg-white/5 flex items-center justify-center rounded-xl border border-zinc-100 dark:border-white/5">
                <img src={p.src} alt={p.alt} className="w-1/2 h-1/2 object-contain opacity-60 transition-all duration-500 hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* CORE COMMAND */}
        <div className="mb-32">
          <h2 className="text-6xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white mb-12">Core <span className="text-orange-600">People</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {corePeople.map((p) => (
              <div key={p.id} className="flex flex-col items-center text-center p-8 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
                <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-zinc-100 dark:border-zinc-800">
                  <img src={p.image || defaultAvatar} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-black uppercase italic dark:text-white">{p.name}</h3>
                <p className="text-orange-600 font-black uppercase text-sm mb-4">{p.position}</p>
                {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="text-[10px] uppercase font-bold text-zinc-400 hover:text-blue-500">LinkedIn</a>}
              </div>
            ))}
          </div>
        </div>

        {/* TRUSTED PEOPLE */}
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white mb-12">Trusted <span className="text-orange-600">People</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {trustedPeople.map((p) => (
              <div key={p.id} className="flex flex-col items-center text-center p-4 bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
                <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-700">
                  <img src={p.image || defaultAvatar} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xs font-black uppercase dark:text-white">{p.name}</h3>
                <p className="text-orange-600 font-bold uppercase text-[9px] mb-2">{p.position}</p>
                {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="text-[9px] uppercase font-bold text-zinc-500 hover:text-blue-500">LinkedIn</a>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
