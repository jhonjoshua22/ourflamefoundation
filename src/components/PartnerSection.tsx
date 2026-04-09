import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { ExternalLink, UserPlus, Linkedin, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

// Asset Imports
import google from "../assets/google.png";
import xLogo from "../assets/x.png";
import meta from "../assets/meta.png";
import microsoft from "../assets/microsoft.png";
import nhs from "../assets/nhs.png";

import MauriceB from "../assets/MauriceB.jpg";
import MartinH from "../assets/MartinH.jpg";
import GrahamR from "../assets/GrahamR.jpg";
import JoshuaH from "../assets/JoshuaH.jpg";
import moyasiImg from "../assets/moyasi.jpg"; // Imported Moyasi's image
import defaultAvatar from "../assets/default-user.jpg";

const partnerLogos = [
  { id: 1, src: google, alt: "Google" },
  { id: 2, src: xLogo, alt: "X" },
  { id: 3, src: meta, alt: "Meta" },
  { id: 4, src: microsoft, alt: "Microsoft" },
  { id: 5, src: nhs, alt: "NHS" },
];

const defaultNedBoard = [
  { id: 1, name: "Maurice Flynn", image: MauriceB, linkedin: "https://www.linkedin.com/in/mauricebigmoflynn/" },
  { id: 2, name: "Martin Hall", image: MartinH, linkedin: "https://www.linkedin.com/in/martin-hall-bbb9082/" },
  { id: 3, name: "Antoaneta Yurykova", image: null, linkedin: "#" },
  { id: 4, name: "Alwin Stephen", image: null, linkedin: "#" },
  { id: 5, name: "Peter Terziev", image: null, linkedin: "#" },
  { id: 6, name: "Joshua H.", image: JoshuaH, linkedin: "https://www.linkedin.com/in/joshuah1/" }
];

const executiveBoard = [
  { id: 101, name: "Maurice", position: "CEO/CGO Chair", image: MauriceB, linkedin: "https://www.linkedin.com/in/mauricebigmoflynn/" },
  { id: 102, name: "Joshua Justice", position: "CMO/CPO Blockchain", linkedin: "https://www.linkedin.com/in/joshuah1/" },
  { id: 103, name: "Lasha", position: "CPO AI", linkedin: "#" },
  { id: 104, name: "Amar", position: "CPO Fintech", linkedin: "#" },
  { id: 105, name: "Moyasi", position: "CPO Gaming", image: moyasiImg, linkedin: "https://www.linkedin.com/in/moyasi" },
  { id: 106, name: "Bilal", position: "CPO AIWear", linkedin: "#" },
  { id: 107, name: "MohamedZ", position: "CFO", linkedin: "#" },
  { id: 108, name: "Livia", position: "AIHR", linkedin: "#" },
];

const PartnerSection = () => {
  const [nedBoard] = useState(defaultNedBoard);
  const [superheros, setSuperheros] = useState<any[]>([]);
  const [showAllHeroes, setShowAllHeroes] = useState(false);

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
      .select("id, display_name, rank, photo_url, linkedin_link");

    if (error) {
      console.error("Error loading members", error);
      return;
    }

    const heroes: any[] = [];

    data?.forEach((user) => {
      if (user.rank === "SuperHero") {
        heroes.push({
          id: user.id,
          name: user.display_name,
          position: "Superhero",
          image: user.photo_url,
          linkedin: user.linkedin_link || "#"
        });
      }
    });

    setSuperheros(heroes);
  };

  const visibleHeroes = showAllHeroes ? superheros : superheros.slice(0, 4);

  return (
    <section id="people" className="bg-white dark:bg-black py-24">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* WORK WITH SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-6xl font-black uppercase italic text-zinc-900 dark:text-white leading-none">
              Work <span className="text-orange-600 not-italic">With</span>
            </h2>
          </div>
          <a 
            href="https://uk.pinterest.com/mauricebigmoflynn/we-work-with/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-orange-600 font-black uppercase text-xs tracking-widest hover:text-orange-700 transition-colors"
          >
            Full List <ExternalLink size={14} />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-24">
          {partnerLogos.map((p) => (
            <div key={p.id} className="aspect-square flex items-center justify-center bg-zinc-50 dark:bg-zinc-900/40 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900/80 transition-colors">
              <img src={p.src} alt={p.alt} className="w-1/2 opacity-60 hover:opacity-100 transition duration-300"/>
            </div>
          ))}
        </div>

        {/* NED BOARD */}
        <h2 className="text-5xl font-black uppercase italic mb-12 text-zinc-900 dark:text-white">
          NED <span className="text-orange-600 not-italic">Board</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {nedBoard.map((p:any) => (
            <div key={p.id} className="group flex flex-col items-center text-center p-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl relative">
              <div className="w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-transparent group-hover:border-orange-600 transition-all duration-300">
                <img src={p.image || defaultAvatar} alt={p.name} className="w-full h-full object-cover"/>
              </div>
              <h3 className="text-xl font-black uppercase italic dark:text-white mb-2">{p.name}</h3>
              <a 
                href={p.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-orange-600 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          ))}
        </div>

        {/* EXECUTIVE BOARD */}
        <h2 className="text-5xl font-black uppercase italic mb-12 text-zinc-900 dark:text-white">
          Executive <span className="text-orange-600 not-italic">Board</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {executiveBoard.map((p:any) => (
            <div key={p.id} className="group flex flex-col items-center text-center p-6 bg-zinc-50 dark:bg-zinc-900/20 rounded-2xl">
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-2 border-transparent group-hover:border-orange-600 transition-all duration-300">
                <img src={p.image || defaultAvatar} alt={p.name} className="w-full h-full object-cover"/>
              </div>
              <h3 className="text-md font-black uppercase dark:text-white">{p.name}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[10px] mb-2">{p.position}</p>
              <a 
                href={p.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-orange-600 transition-colors"
              >
                <Linkedin size={16} />
              </a>
            </div>
          ))}
        </div>

        <div className="flex justify-center mb-24">
          <Link 
            to="/#contacts" 
            className="flex items-center gap-2 bg-orange-600 text-white text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-orange-700 transition-colors rounded-lg shadow-lg shadow-orange-600/20"
          >
            Contact Us <ArrowRight size={14} />
          </Link>
        </div>

        {/* SUPERHEROS */}
        <h2 className="text-5xl font-black uppercase italic mb-12 text-zinc-900 dark:text-white">
          <span className="text-orange-600 not-italic">Super</span>heros
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {visibleHeroes.map((p:any) => (
            <div key={p.id} className="group flex flex-col items-center text-center p-4 bg-zinc-50 dark:bg-zinc-900/20 rounded-2xl">
              <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-transparent group-hover:border-orange-600 transition-all duration-300">
                <img src={p.image || defaultAvatar} alt={p.name} className="w-full h-full object-cover"/>
              </div>
              <h3 className="text-xs font-black uppercase dark:text-white mb-1">{p.name}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase text-[9px] mb-2">{p.position}</p>
              <a 
                href={p.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-orange-600 transition-colors"
              >
                <Linkedin size={14} />
              </a>
            </div>
          ))}

          {(!showAllHeroes || superheros.length % 5 !== 0) && (
            <Link to="/login" className="flex flex-col items-center justify-center text-center p-4 bg-orange-600/5 border-2 border-dashed border-orange-600/20 rounded-2xl hover:bg-orange-600/10 hover:border-orange-600/40 transition-colors">
              <div className="w-20 h-20 mb-4 rounded-full flex items-center justify-center bg-orange-600 text-white">
                <UserPlus size={32} />
              </div>
              <h3 className="text-xs font-black uppercase dark:text-white">Join Them</h3>
              <p className="text-orange-600 font-bold uppercase text-[9px]">Become a Member</p>
            </Link>
          )}
        </div>

        {superheros.length > 4 && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAllHeroes(!showAllHeroes)}
              className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs font-black uppercase tracking-widest px-6 py-3 rounded-full hover:bg-orange-600 hover:text-white transition-colors"
            >
              {showAllHeroes ? (
                <>Show Less <ChevronUp size={14} /></>
              ) : (
                <>Show More ({superheros.length - 4} others) <ChevronDown size={14} /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnerSection;
