import React, { useEffect, useState } from "react";
import { ExternalLink, Users, UserPlus } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

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
  { id: 1, src: google, alt: "Google" },
  { id: 2, src: xLogo, alt: "X" },
  { id: 3, src: meta, alt: "Meta" },
  { id: 4, src: microsoft, alt: "Microsoft" },
  { id: 5, src: nhs, alt: "NHS" },
];

const defaultServantLeaders = [
  { id: 1, name: "Maurice Flynn", position: "CEO / COO", image: MauriceB },
  { id: 2, name: "Martin Hall", position: "CGO / CMO", image: MartinH },
  { id: 3, name: "Graham Richard", position: "CFO", image: GrahamR },
  { id: 4, name: "Alwin Stephen", position: "CTO / CPO", image: null },
  { id: 5, name: "Peter Terziev", position: "Chair", image: null },
  { id: 6, name: "Joshua H.", position: "Investor Relations", image: JoshuaH }
];

const defaultSuperheros = [
  { id: 7, name: "Claire Newman", position: "Recruitment Specialist", image: ClaireN },
  { id: 8, name: "Reem Elfeitury", position: "Managing Director", image: ReemE },
  { id: 9, name: "Patrick Shalow", position: "Founder & CEO", image: PatrickS },
  { id: 10, name: "Sharon D'Cruz", position: "Head of Marketing", image: SharonD },
  { id: 11, name: "Martin Gormley", position: "Marketing Director", image: MartinG },
  { id: 12, name: "Dave Brewis", position: "Project Manager", image: DaveB },
  { id: 13, name: "Graham Teece", position: "Managing Partner", image: GrahamT },
  { id: 14, name: "Andrei Bgatov", position: "Sales Director", image: AndreiB },
  { id: 15, name: "Richard Skinner", position: "Agency Owner", image: RichardS },
  { id: 16, name: "John Thew", position: "Founder/MD", image: JohnT }
];

const PartnerSection = () => {

  const [servantLeaders, setServantLeaders] = useState(defaultServantLeaders);
  const [geoLeaders, setGeoLeaders] = useState<any[]>([]);
  const [superheros, setSuperheros] = useState(defaultSuperheros);

  useEffect(() => {
    fetchMembers();

    const channel = supabase
      .channel("live-people")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        fetchMembers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);

  const fetchMembers = async () => {

    const { data, error } = await supabase
      .from("profiles")
      .select("id, display_name, rank");

    if (error) {
      console.error("Error loading members", error);
      return;
    }

    const farmers:any[] = [];
    const angels:any[] = [];
    const heroes:any[] = [];

    data?.forEach((user) => {

      if (user.rank === "SuperFarmer") {
        farmers.push({
          id: user.id,
          name: user.display_name,
          position: "Servant Leader",
          image: null
        });
      }

      if (user.rank === "Angel") {
        angels.push({
          id: user.id,
          name: user.display_name,
          position: "Geo Leader",
          image: null
        });
      }

      if (user.rank === "SuperHero") {
        heroes.push({
          id: user.id,
          name: user.display_name,
          position: "Superhero",
          image: null
        });
      }

    });

    setServantLeaders([...defaultServantLeaders, ...farmers]);
    setGeoLeaders(angels);
    setSuperheros([...defaultSuperheros, ...heroes]);
  };

  return (
    <section id="people" className="bg-white dark:bg-black py-24">

      <div className="container mx-auto px-6">

        {/* PARTNERS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-20">
          {partnerLogos.map((p) => (
            <div key={p.id} className="aspect-square flex items-center justify-center bg-zinc-50 dark:bg-white/5 rounded-xl">
              <img src={p.src} alt={p.alt} className="w-1/2 opacity-60 hover:opacity-100 transition"/>
            </div>
          ))}
        </div>

        {/* SERVANT LEADERS */}
        <h2 className="text-6xl font-black uppercase italic mb-12">
          Servant <span className="text-orange-600">Leaders</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
          {servantLeaders.map((p:any) => (
            <div key={p.id} className="flex flex-col items-center text-center p-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl">
              <div className="w-32 h-32 mb-6 rounded-full overflow-hidden">
                <img src={p.image || defaultAvatar} alt={p.name} className="w-full h-full object-cover"/>
              </div>
              <h3 className="text-xl font-black uppercase italic dark:text-white">{p.name}</h3>
              <p className="text-orange-600 font-black uppercase text-sm">{p.position}</p>
            </div>
          ))}
        </div>

        {/* GEO LEADERS */}
        <h2 className="text-4xl font-black uppercase italic mb-12">
          Geo <span className="text-orange-600">Leaders</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-32">
          {geoLeaders.map((p:any) => (
            <div key={p.id} className="flex flex-col items-center text-center p-6 bg-zinc-50 dark:bg-zinc-900/20 rounded-2xl">
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden">
                <img src={defaultAvatar} alt={p.name} className="w-full h-full object-cover"/>
              </div>
              <h3 className="text-md font-black uppercase dark:text-white">{p.name}</h3>
              <p className="text-orange-600 font-bold uppercase text-[10px]">{p.position}</p>
            </div>
          ))}
        </div>

        {/* SUPERHEROS */}
        <h2 className="text-4xl font-black uppercase italic mb-12">
          <span className="text-orange-600">Super</span>heros
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {superheros.map((p:any) => (
            <div key={p.id} className="flex flex-col items-center text-center p-4 bg-zinc-50 dark:bg-zinc-900/20 rounded-2xl">
              <div className="w-20 h-20 mb-4 rounded-full overflow-hidden">
                <img src={p.image || defaultAvatar} alt={p.name} className="w-full h-full object-cover"/>
              </div>
              <h3 className="text-xs font-black uppercase dark:text-white">{p.name}</h3>
              <p className="text-orange-600 font-bold uppercase text-[9px]">{p.position}</p>
            </div>
          ))}

          <a href="/login" className="flex flex-col items-center justify-center text-center p-4 bg-orange-600/5 border-2 border-dashed border-orange-600/20 rounded-2xl">
            <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center bg-orange-600 text-white">
              <UserPlus size={32} />
            </div>
            <h3 className="text-xs font-black uppercase dark:text-white">Join Them</h3>
            <p className="text-orange-600 font-bold uppercase text-[9px]">Become a Member</p>
          </a>
        </div>

      </div>
    </section>
  );
};

export default PartnerSection;
