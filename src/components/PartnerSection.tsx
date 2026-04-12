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
    SuperFounder: [],
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

    const getPriority = (url: string | null) => {
      if (!url) return 0;
      if (url.includes("supabase.co")) return 2;
      return 1;
    };

    const sortedData = [...(data || [])].sort((a, b) => {
      const priorityA = getPriority(a.photo_url);
      const priorityB = getPriority(b.photo_url);
      if (priorityA !== priorityB) return priorityB - priorityA; 
      return (a.display_name || "").localeCompare(b.display_name || "");
    });

    const categorized: { [key: string]: any[] } = {
      SuperFounder: [], SuperFarmer: [], Angel: [], SuperHero: [], Normie: [], Partner: []
    };

    sortedData.forEach((user) => {
      const member = {
        id: user.id,
        name: user.display_name || "Anonymous",
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
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6 gap-2">
        <h2 className="text-3xl font-black uppercase italic text-zinc-900 dark:text-white">
          {displayTitle}
        </h2>
        <Link to="/login" className="bg-orange-600 text-white text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-full hover:bg-black transition-all">
          Join <Plus size={10} className="inline ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {members.map((p) => (
          <div key={p.id} className="flex items-center gap-4 p-4 bg-zinc-50 dark:bg-zinc-900/40 rounded-xl border border-transparent hover:border-orange-600/20 transition-all">
            <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 border-2 border-zinc-200 dark:border-zinc-700">
              <img 
                src={p.image || defaultAvatar} 
                alt={p.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => { (e.target as HTMLImageElement).src = defaultAvatar; }}
              />
            </div>
            <div className="flex items-center gap-2 min-w-0 overflow-hidden">
              <h3 className="text-[12px] font-black uppercase dark:text-white truncate">
                {p.name}
              </h3>
              <a 
                href={p.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-zinc-400 hover:text-orange-600 transition-colors shrink-0"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>
        ))}
        {members.length === 0 && (
          <div className="col-span-full py-8 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
            <p className="text-zinc-400 font-bold uppercase text-[8px] tracking-widest">Awaiting {displayTitle}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section id="people" className="bg-white dark:bg-black py-24">
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-350px * ${partnerLogos.length})); }
        }
        .animate-infinite-scroll { animation: scroll 50s linear infinite; }
      `}</style>

      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <h2 className="text-5xl font-black uppercase italic text-zinc-900 dark:text-white">
            Work <span className="text-orange-600 not-italic">With</span>
          </h2>
          <a href="https://uk.pinterest.com/mauricebigmoflynn/we-work-with/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-orange-600 font-black uppercase text-xs tracking-widest hover:text-orange-700 transition-colors">
            Full List <ExternalLink size={14} />
          </a>
        </div>

        {/* Scroller */}
        <div className="relative w-full overflow-hidden mb-24 py-8">
          <div className="flex w-max animate-infinite-scroll">
            {[...partnerLogos, ...partnerLogos].map((p, idx) => (
              <div key={`${p.id}-${idx}`} className="w-[300px] flex items-center justify-center px-8">
                <img src={p.src} alt={p.alt} className="max-h-12 w-auto grayscale hover:grayscale-0 transition-all" />
              </div>
            ))}
          </div>
        </div>

        {/* 2 CATEGORIES PER ROW LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <GroupDisplay displayTitle="SuperFounders" members={groups.SuperFounder} />
          <GroupDisplay displayTitle="SuperFarmers" members={groups.SuperFarmer} />
          <GroupDisplay displayTitle="Angels" members={groups.Angel} />
          <GroupDisplay displayTitle="SuperHeroes" members={groups.SuperHero} />
          <GroupDisplay displayTitle="Normies" members={groups.Normie} />
          <GroupDisplay displayTitle="Partners" members={groups.Partner} />
        </div>

        <div className="mt-24 p-10 bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-3xl relative overflow-hidden shadow-2xl">
          <Sparkles className="absolute -top-4 -right-4 w-32 h-32 opacity-10 rotate-12" />
          <h4 className="flex items-center gap-2 text-orange-500 font-black uppercase tracking-[0.3em] text-[10px] mb-6">
            <Users size={14}/> Incubator of Incubators
          </h4>
          <p className="text-2xl md:text-3xl font-black leading-tight uppercase italic mb-8">
            A global collective of 100+ engineers building in public. We 10x every 2 months via AI, Blockchain, and Creative Hardware.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
