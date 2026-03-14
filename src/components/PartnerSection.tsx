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
    servantLeaders: [],
    geoLeaders: [],
    superheros: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name, role, image_url');

      if (!error && data) {
        setPeople({
          servantLeaders: data.filter(p => p.role === 'SuperFarmer'),
          geoLeaders: data.filter(p => p.role === 'Angel'),
          superheros: data.filter(p => p.role === 'SuperHero')
        });
      }
      setLoading(false);
    };
    fetchPeople();
  }, []);

  if (loading) return <div className="py-24 text-center text-white">Loading Leaders...</div>;

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

        {/* SERVANT LEADERS */}
        <div className="mb-32">
          <h2 className="text-6xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white mb-12">Servant <span className="text-orange-600">Leaders</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {people.servantLeaders.map((p: any, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-3xl">
                <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-zinc-100 dark:border-zinc-800">
                  <img src={p.image_url || defaultAvatar} alt={p.display_name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-black uppercase italic dark:text-white">{p.display_name}</h3>
                <p className="text-orange-600 font-black uppercase text-sm">Servant Leader</p>
              </div>
            ))}
          </div>
        </div>

        {/* GEO LEADERS */}
        <div className="mb-32">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white mb-12">Geo <span className="text-orange-600">Leaders</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8">
            {people.geoLeaders.map((p: any, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
                <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-orange-600/20">
                  <img src={p.image_url || defaultAvatar} alt={p.display_name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-md font-black uppercase dark:text-white">{p.display_name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* SUPERHEROS */}
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white mb-12"><span className="text-orange-600">Super</span>heros</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {people.superheros.map((p: any, i) => (
              <div key={i} className="flex flex-col items-center text-center p-4 bg-zinc-50 dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-800 rounded-2xl">
                <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-zinc-200 dark:border-zinc-700">
                  <img src={p.image_url || defaultAvatar} alt={p.display_name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xs font-black uppercase dark:text-white">{p.display_name}</h3>
              </div>
            ))}
            <a href="/login" className="flex flex-col items-center justify-center text-center p-4 bg-orange-600/5 border-2 border-dashed border-orange-600/20 rounded-2xl hover:bg-orange-600/10 transition-all">
              <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center bg-orange-600 text-white shadow-lg shadow-orange-600/20">
                <UserPlus size={32} />
              </div>
              <h3 className="text-xs font-black uppercase dark:text-white">Join Them</h3>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
