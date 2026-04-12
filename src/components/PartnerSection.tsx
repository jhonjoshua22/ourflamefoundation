import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { 
  ExternalLink, Linkedin, Plus, Sparkles, Users 
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

// Asset Imports
import google from "../assets/google.png";
import xLogo from "../assets/x.png";
import meta from "../assets/meta.png";
import microsoft from "../assets/microsoft.png";
import nhs from "../assets/nhs.png";
import defaultAvatar from "../assets/default-user.jpg";

// New JPG Imports
import wap from "../assets/wap.jpg";
import zoom from "../assets/zoom.jpg";
import pinterest from "../assets/pinterest.jpg";
import whatsapp from "../assets/whatsapp.jpg";
import facebook from "../assets/facebook.jpg";
import instagram from "../assets/instagram.jpg";
import mi from "../assets/mi.jpg";
import youtube from "../assets/youtube.jpg";
import tiktok from "../assets/tiktok.jpg";
import dell from "../assets/dell.jpg";

const partnerLogos = [
  { id: 1, src: google, alt: "Google" },
  { id: 2, src: xLogo, alt: "X" },
  { id: 3, src: meta, alt: "Meta" },
  { id: 4, src: microsoft, alt: "Microsoft" },
  { id: 5, src: nhs, alt: "NHS" },
  { id: 6, src: wap, alt: "WAP" },
  { id: 7, src: zoom, alt: "Zoom" },
  { id: 8, src: pinterest, alt: "Pinterest" },
  { id: 9, src: whatsapp, alt: "WhatsApp" },
  { id: 10, src: facebook, alt: "Facebook" },
  { id: 11, src: instagram, alt: "Instagram" },
  { id: 12, src: mi, alt: "Mi" },
  { id: 13, src: youtube, alt: "YouTube" },
  { id: 14, src: tiktok, alt: "TikTok" },
  { id: 15, src: dell, alt: "Dell" },
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

    if (error) return;

    const categorized: { [key: string]: any[] } = {
      SuperFarmer: [], Angel: [], SuperHero: [], Normie: [], Partner: []
    };

    data?.forEach((user) => {
      const member = {
        id: user.id,
        name: user.display_name,
        // This photo_url typically stores the Google avatar URL from auth meta-data
        image: user.photo_url, 
        linkedin: user.linkedin_link || "#",
      };
      if (categorized[user.rank] && categorized[user.rank].length < 6) {
        categorized[user.rank].push(member);
      }
    });
    setGroups(categorized);
  };

  const GroupDisplay = ({ members, displayTitle }: { members: any[], displayTitle: string }) => (
    <div className="mb-24">
      <div className="flex items-center justify-between mb-12 gap-4 flex-wrap">
        <h2 className="text-5xl font-black uppercase italic text-zinc-900 dark:text-white">
          {displayTitle}
        </h2>
        <Link to="/login" className="flex items-center gap-2 bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all shadow-lg shadow-orange-600/20">
          Join Us <Plus size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {members.map((p) => (
          <div key={p.id} className="group flex flex-col items-center text-center p-6 bg-zinc-50 dark:bg-zinc-900/20 rounded-2xl border-2 border-transparent hover:border-orange-600/20 transition-all">
            <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border-2 border-transparent group-hover:border-orange-600 transition-all duration-300 bg-zinc-200 dark:bg-zinc-800">
              <img 
                src={p.image || defaultAvatar} 
                alt={p.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer" // Critical for Google profile images to load correctly across domains
              />
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
    <section id="people" className="bg-white dark:bg-black py-24 overflow-hidden">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-350px * ${partnerLogos.length})); }
        }
        .animate-infinite-scroll {
          animation: scroll 50s linear infinite;
        }
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <h2 className="text-6xl font-black uppercase italic text-zinc-900 dark:text-white leading-none">
            Work <span className="text-orange-600 not-italic">With</span>
          </h2>
          <a href="https://uk.pinterest.com/mauricebigmoflynn/we-work-with/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-orange-600 font-black uppercase text-xs tracking-widest hover:text-orange-700 transition-colors">
            Full List <ExternalLink size={14} />
          </a>
        </div>

        {/* Infinite Scroller */}
        <div className="relative w-full overflow-hidden mb-32 py-12">
          <div className="flex w-max animate-infinite-scroll">
            {[...partnerLogos, ...partnerLogos].map((p, idx) => (
              <div key={`${p.id}-${idx}`} className="w-[350px] flex items-center justify-center px-12">
                <img 
                  src={p.src} 
                  alt={p.alt} 
                  className="max-h-20 w-auto object-contain rounded-sm"
                />
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-white dark:from-black"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-white dark:from-black"></div>
        </div>

        <GroupDisplay displayTitle="SuperFarmers" members={groups.SuperFarmer} />
        <GroupDisplay displayTitle="Angels" members={groups.Angel} />
        <GroupDisplay displayTitle="SuperHeroes" members={groups.SuperHero} />
        <GroupDisplay displayTitle="Normies" members={groups.Normie} />
        <GroupDisplay displayTitle="Partners" members={groups.Partner} />

        <div className="mt-32 p-10 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-3xl relative overflow-hidden shadow-2xl">
          <Sparkles className="absolute -top-4 -right-4 w-32 h-32 opacity-10 rotate-12" />
          <h4 className="flex items-center gap-2 text-orange-500 font-black uppercase tracking-[0.3em] text-[10px] mb-6">
            <Users size={14}/> Incubator of Incubators
          </h4>
          <p className="text-3xl md:text-4xl font-black leading-tight uppercase italic mb-8 max-w-4xl">
            A global collective of 100+ engineers building in public. We 10x every 2 months via AI, Blockchain, and Creative Hardware.
          </p>
          <div className="flex flex-wrap gap-2 pt-8 border-t border-white/10 dark:border-zinc-200">
            {["Prediction", "Trustless", "Engaging", "Protection"].map(tag => (
              <span key={tag} className="px-4 py-2 border border-white/20 dark:border-zinc-400 text-[10px] font-black uppercase tracking-widest rounded-lg">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
