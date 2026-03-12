import React from "react";
import { ExternalLink, Users, UserPlus } from "lucide-react";

import google from "../assets/google.png";
import xLogo from "../assets/x.png";
import meta from "../assets/meta.png";
import microsoft from "../assets/microsoft.png";
import nhs from "../assets/nhs.png";

import MauriceB from "../assets/MauriceB.jpg";
import MartinH from "../assets/MartinH.jpg";
import GrahamR from "../assets/GrahamR.jpg";
import JoshuaH from "../assets/JoshuaH.jpg";
import defaultAvatar from "../assets/default-user.jpg";

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

const servantLeaders = [
  { id: 1, name: "Maurice Flynn", position: "CEO / COO", image: MauriceB, linkedin: "https://www.linkedin.com/in/mauricebigmoflynn/" },
  { id: 2, name: "Martin Hall", position: "CGO / CMO", image: MartinH, linkedin: "https://www.linkedin.com/in/martin-hall-bbb9082/" },
  { id: 3, name: "Graham Richard", position: "CFO", image: GrahamR, linkedin: "https://www.linkedin.com/in/richardsonjgraham/" },
  { id: 4, name: "Alwin Stephen", position: "CTO / CPO", image: null, linkedin: "https://www.linkedin.com/in/alwinstephen/" },
  { id: 5, name: "Peter Terziev", position: "Chair", image: null, linkedin: null },
  { id: 6, name: "Joshua H.", position: "Investor Relations", image: JoshuaH, linkedin: "https://www.linkedin.com/in/joshuah1/" }
];

const geoLeaders = [
  { id: 101, name: "Amar", position: "Geo Leader", image: null },
  { id: 102, name: "Moyasi", position: "Geo Leader", image: null },
  { id: 103, name: "Eddy", position: "Geo Leader", image: null },
];

const superheros = [
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
  { id: 17, name: "David Flynn", position: "Founder", image: null, linkedin: "https://www.linkedin.com/in/david-flynn-485ab61/" },
  { id: 18, name: "Veronie", position: "Superhero", image: null },
  { id: 19, name: "John", position: "Superhero", image: null },
  { id: 20, name: "Joshua", position: "Superhero", image: null }
];

const PartnerSection = () => {
  return (
    <section id="people" className="bg-white dark:bg-black py-24 transition-colors duration-500">
      <div className="container mx-auto px-6">
        
        {/* PARTNERS LOGO GRID */}
        <div className="flex flex-col gap-8 mb-16">
          <div className="flex items-center gap-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 whitespace-nowrap">Official Partners</h4>
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

        {/* PARTNER ACTION LINKS */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-32 p-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-100 dark:border-zinc-800">
          <a href="https://drive.google.com/drive/folders/1aFXb-glex8tp_zs3Ltf6KoMN8nYH7xen" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-6 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-orange-600 transition-all group">
            <ExternalLink size={14} className="group-hover:text-orange-600" />
            View Partner Assets
          </a>
          <a href="#contacts" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest px-6 py-3 bg-orange-600 text-white hover:bg-orange-500 transition-all shadow-lg shadow-orange-600/20">
            <Users size={14} />
            Become a Partner
          </a>
        </div>

        {/* SERVANT LEADERS */}
        <div className="mb-32">
          <h2 className="text-6xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white mb-12">Servant <span className="text-orange-600">Leaders</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servantLeaders.map((p) => (
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

        {/* GEO LEADERS */}
        <div className="mb-32">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white mb-12">Geo <span className="text-orange-600">Leaders</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8">
            {geoLeaders.map((p) => (
              <div key={p.id} className="flex flex-col items-center text-center p-6 bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
                <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-orange-600/20">
                  <img src={p.image || defaultAvatar} alt={p.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
                </div>
                <h3 className="text-md font-black uppercase dark:text-white">{p.name}</h3>
                <p className="text-orange-600 font-bold uppercase text-[10px]">{p.position}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SUPERHEROS */}
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white mb-12"><span className="text-orange-600">Super</span>heros</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {superheros.map((p) => (
              <div key={p.id} className="flex flex-col items-center text-center p-4 bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-800 rounded-2xl group">
                <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-700 group-hover:border-orange-600 transition-colors">
                  <img src={p.image || defaultAvatar} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xs font-black uppercase dark:text-white">{p.name}</h3>
                <p className="text-orange-600 font-bold uppercase text-[9px] mb-2">{p.position}</p>
                {p.linkedin && <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="text-[9px] uppercase font-bold text-zinc-500 hover:text-blue-500">LinkedIn</a>}
              </div>
            ))}
            
            {/* CTA Member Card */}
            <a href="/login" className="flex flex-col items-center justify-center text-center p-4 bg-orange-600/5 border-2 border-dashed border-orange-600/20 rounded-2xl hover:bg-orange-600/10 transition-all group">
              <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center bg-orange-600 text-white shadow-lg shadow-orange-600/20 group-hover:scale-110 transition-transform">
                <UserPlus size={32} />
              </div>
              <h3 className="text-xs font-black uppercase dark:text-white">Join Them</h3>
              <p className="text-orange-600 font-bold uppercase text-[9px]">Become a Member</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
