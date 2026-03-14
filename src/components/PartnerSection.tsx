import React, { useEffect, useState } from "react";
import { ExternalLink, Users, UserPlus } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

// Assets Imports
import google from "../assets/google.png";
import xLogo from "../assets/x.png";
import meta from "../assets/meta.png";
import microsoft from "../assets/microsoft.png";
import nhs from "../assets/nhs.png";
import defaultAvatar from "../assets/default-user.jpg";

import MauriceB from "../assets/MauriceB.jpg";
import MartinH from "../assets/MartinH.jpg";
import GrahamR from "../assets/GrahamR.jpg";
import JoshuaH from "../assets/JoshuaH.jpg";
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
  { id: 1, src: google, alt: "Google" },
  { id: 2, src: xLogo, alt: "X" },
  { id: 3, src: meta, alt: "Meta" },
  { id: 4, src: microsoft, alt: "Microsoft" },
  { id: 5, src: nhs, alt: "NHS" },
];

const PartnerSection = () => {
  const [people, setPeople] = useState({
    servantLeaders: [
      { name: "Maurice Flynn", position: "CEO / COO", image: MauriceB },
      { name: "Martin Hall", position: "CGO / CMO", image: MartinH },
      { name: "Graham Richard", position: "CFO", image: GrahamR },
      { name: "Joshua H.", position: "Investor Relations", image: JoshuaH }
    ],
    geoLeaders: [],
    superheros: [
      { name: "Claire Newman", position: "Recruitment Specialist", image: ClaireN },
      { name: "Reem Elfeitury", position: "Managing Director", image: ReemE },
      { name: "Patrick Shalow", position: "Founder & CEO", image: PatrickS },
      { name: "Sharon D'Cruz", position: "Head of Marketing", image: SharonD },
      { name: "Martin Gormley", position: "Marketing Director", image: MartinG },
      { name: "Dave Brewis", position: "Project Manager", image: DaveB },
      { name: "Graham Teece", position: "Managing Partner", image: GrahamT },
      { name: "Andrei Bgatov", position: "Sales Director", image: AndreiB },
      { name: "Richard Skinner", position: "Agency Owner", image: RichardS },
      { name: "John Thew", position: "Founder/MD", image: JohnT }
    ]
  });

  useEffect(() => {
    const fetchDBPeople = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name, role, image_url');

      if (!error && data) {
        setPeople(prev => ({
          servantLeaders: [...prev.servantLeaders, ...data.filter(p => p.role === 'SuperFarmer').map(p => ({ name: p.display_name, position: 'Servant Leader', image: p.image_url }))],
          geoLeaders: data.filter(p => p.role === 'Angel').map(p => ({ name: p.display_name, position: 'Geo Leader', image: p.image_url })),
          superheros: [...prev.superheros, ...data.filter(p => p.role === 'SuperHero').map(p => ({ name: p.display_name, position: 'Superhero', image: p.image_url }))]
        }));
      }
    };
    fetchDBPeople();
  }, []);

  return (
    <section id="people" className="bg-white dark:bg-black py-24">
      <div className="container mx-auto px-6">
        {/* Partners */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-16">
          {partnerLogos.map((p) => (
            <div key={p.id} className="bg-zinc-50 dark:bg-white/5 flex items-center justify-center rounded-xl p-4 border border-zinc-100 dark:border-zinc-800">
              <img src={p.src} alt={p.alt} className="h-12 object-contain opacity-60" />
            </div>
          ))}
        </div>

        {/* SERVANT LEADERS */}
        <div className="mb-32">
          <h2 className="text-6xl font-black uppercase italic text-zinc-900 dark:text-white mb-12">Servant <span className="text-orange-600">Leaders</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {people.servantLeaders.map((p: any, i) => (
              <div key={i} className="flex flex-col items-center p-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-zinc-200 dark:border-zinc-800">
                <img src={p.image || defaultAvatar} alt={p.name} className="w-32 h-32 mb-6 rounded-full object-cover border-4 border-zinc-100" />
                <h3 className="text-xl font-black uppercase italic dark:text-white">{p.name}</h3>
                <p className="text-orange-600 font-black uppercase text-sm">{p.position}</p>
              </div>
            ))}
          </div>
        </div>

        {/* GEO LEADERS */}
        <div className="mb-32">
          <h2 className="text-4xl font-black uppercase italic text-zinc-900 dark:text-white mb-12">Geo <span className="text-orange-600">Leaders</span></h2>
          <div className="grid grid-cols-3 gap-8">
            {people.geoLeaders.map((p: any, i) => (
              <div key={i} className="flex flex-col items-center p-6 bg-zinc-50 dark:bg-zinc-900/20 rounded-2xl border border-zinc-800">
                <img src={p.image || defaultAvatar} alt={p.name} className="w-24 h-24 mb-4 rounded-full object-cover" />
                <h3 className="text-md font-black uppercase dark:text-white">{p.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* SUPERHEROS */}
        <div>
          <h2 className="text-4xl font-black uppercase italic text-zinc-900 dark:text-white mb-12"><span className="text-orange-600">Super</span>heros</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {people.superheros.map((p: any, i) => (
              <div key={i} className="flex flex-col items-center p-4 bg-zinc-50 dark:bg-zinc-900/20 rounded-2xl border border-zinc-800">
                <img src={p.image || defaultAvatar} alt={p.name} className="w-20 h-20 mb-4 rounded-full object-cover" />
                <h3 className="text-xs font-black uppercase dark:text-white">{p.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
