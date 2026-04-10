import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { ExternalLink, UserPlus, Linkedin, ArrowRight, Plus } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

// Asset Imports
import google from "../assets/google.png";
import xLogo from "../assets/x.png";
import meta from "../assets/meta.png";
import microsoft from "../assets/microsoft.png";
import nhs from "../assets/nhs.png";
import defaultAvatar from "../assets/default-user.jpg";

const partnerLogos = [
  { id: 1, src: google, alt: "Google" },
  { id: 2, src: xLogo, alt: "X" },
  { id: 3, src: meta, alt: "Meta" },
  { id: 4, src: microsoft, alt: "Microsoft" },
  { id: 5, src: nhs, alt: "NHS" },
];

const PartnerSection = () => {
  const [groups, setGroups] = useState<{ [key: string]: any[] }>({
    SuperFarmer: [],
    Angel: [],
    SuperHero: [],
    Normie: [],
    Partner: []
  });

  useEffect(() => {
    fetchMembers();

    const channel = supabase
      .channel("live-groups")
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
      .select("id, display_name, rank, photo_url, linkedin_link")
      .order('display_name', { ascending: true });

    if (error) {
      console.error("Error loading members", error);
      return;
    }

    const categorized: { [key: string]: any[] } = {
      SuperFarmer: [],
      Angel: [],
      SuperHero: [],
      Normie: [],
      Partner: []
    };

    data?.forEach((user) => {
      const member = {
        id: user.id,
        name: user.display_name,
        image: user.photo_url,
        linkedin: user.linkedin_link || "#",
      };

      const rankKey = user.rank; 
      if (categorized[rankKey] && categorized[rankKey].length < 6) {
        categorized[rankKey].push(member);
      }
    });

    setGroups(categorized);
  };

  const GroupDisplay = ({ title, members, displayTitle }: { title: string, members: any[], displayTitle: string }) => (
    <div className="mb-24">
      <div className="flex items-center justify-between mb-12 gap-4 flex-wrap">
        <h2 className="text-5xl font-black uppercase italic text-zinc-900 dark:text-white">
          {displayTitle}
        </h2>
        <Link 
          to="/login"
          className="flex items-center gap-2 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all shadow-lg shadow-orange-600/20"
        >
          Join Us <Plus size={14} />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {members.map((p) => (
          <div key={p.id} className="group flex flex-col items-center text-center p-6 bg-zinc-50 dark:bg-zinc-900/20 rounded-2xl border-2 border-transparent hover:border-orange-600/20 transition-all">
            <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-transparent group-hover:border-orange-600 transition-all duration-300">
              <img src={p.image || defaultAvatar} alt={p.name} className="w-full h-full object-cover"/>
            </div>
            <h3 className="text-xs font-black uppercase dark:text-white mb-1 line-clamp-1">{p.name}</h3>
            <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-orange-600 transition-colors">
              <Linkedin size={14} />
            </a>
          </div>
        ))}
        {members.length === 0 && (
          <div className="col-span-full py-10 text-center border-2 border-dashed border-zinc-100 dark:border-zinc-900 rounded-2xl">
            <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest">No {displayTitle} Active Yet</p>
          </div>
        )}
      </div>
    </div>
  );

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

        {/* DYNAMIC GROUPS */}
        <GroupDisplay title="SuperFarmer" displayTitle="SuperFarmers" members={groups.SuperFarmer} />
        <GroupDisplay title="Angel" displayTitle="Angels" members={groups.Angel} />
        <GroupDisplay title="SuperHero" displayTitle="SuperHeroes" members={groups.SuperHero} />
        <GroupDisplay title="Normie" displayTitle="Normies" members={groups.Normie} />
        <GroupDisplay title="Partner" displayTitle="Partners" members={groups.Partner} />

        <div className="flex flex-col items-center justify-center py-12 border-t border-zinc-100 dark:border-zinc-900">
          <Link 
            to="/login" 
            className="group flex flex-col items-center gap-4 mb-8"
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center bg-orange-600 text-white shadow-lg shadow-orange-600/20 group-hover:scale-110 transition-transform">
              <UserPlus size={32} />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-black uppercase italic dark:text-white">Join The Mission</h3>
              <p className="text-orange-600 font-bold uppercase text-xs tracking-widest">Become a member today</p>
            </div>
          </Link>

          <Link 
            to="/#contacts" 
            className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black text-xs font-black uppercase tracking-widest px-10 py-4 hover:bg-orange-600 hover:text-white dark:hover:bg-orange-600 dark:hover:text-white transition-all rounded-lg shadow-xl"
          >
            Contact Us <ArrowRight size={14} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PartnerSection;
