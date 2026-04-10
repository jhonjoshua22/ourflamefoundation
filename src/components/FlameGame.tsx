import React, { useRef, useState, useEffect } from "react";
import { 
  ChevronRight, 
  ChevronLeft, 
  Users, 
  Flag, 
  X, 
  Maximize2, 
  DollarSign, 
  TrendingUp, 
  Heart,
  Activity,
  LifeBuoy,
  LogIn,
  Share2
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import clickSound from "../assets/button.m4a"; 

// Asset Imports
import magicWorlds from "../assets/magicworlds.mp4";
import video2 from "../assets/video2.mp4";
import video3 from "../assets/video3.mp4";
import video4 from "../assets/video4.mp4";
import video5 from "../assets/video5.mp4";
import moneyPlaceholder from "../assets/money.jpeg";

const FlameGame = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string, title: string, poster?: string } | null>(null);
  
  // Dynamic Stats State
  const [liveStats, setLiveStats] = useState({
    members: "Loading...",
    engagements: "0",
    pay: "$2.4M", 
    revenue: "$5.8M", 
    donations: "$1.1M",
    livesSaved: "12,842"
  });

  useEffect(() => {
    const fetchStats = async () => {
      // 1. Fetch Exact Member Count
      const { count: memberCount, error: memberError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // 2. Fetch Exact Engagement Count
      const { data: socialData, error: socialError } = await supabase
        .from('social_stats')
        .select('followers_count');
      
      if (memberError) console.error("Member fetch error:", memberError);

      const totalEngagements = socialData?.reduce((acc, curr) => acc + (curr.followers_count || 0), 0) || 0;

      setLiveStats(prev => ({
        ...prev,
        // Using locale string to add commas (e.g., 1,234) but keeping the exact number
        members: memberCount !== null ? memberCount.toLocaleString() : "0",
        engagements: totalEngagements.toLocaleString()
      }));
    };

    fetchStats();
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const videoList = [
    { id: 1, src: video5, title: "Money World", poster: moneyPlaceholder }, 
    { id: 2, src: magicWorlds, title: "Magic Worlds Intro" },
    { id: 3, src: video2, title: "Play2Help" },
    { id: 4, src: video3, title: "2026 I Dream For" },
    { id: 5, src: video4, title: "Avatars" },
  ];

  const statItems = [
    { label: "Members", value: liveStats.members, icon: Users },
    { label: "Engagements", value: liveStats.engagements, icon: Flag },
    { label: "Pay", value: liveStats.pay, icon: DollarSign },
    { label: "Revenue", value: liveStats.revenue, icon: TrendingUp },
    { label: "Donations", value: liveStats.donations, icon: Heart },
    { label: "Lives Saved", value: liveStats.livesSaved, icon: LifeBuoy },
  ];

  return (
    <section id="flame-game" className="relative pt-32 pb-24 px-6 overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* TOP HEADER: 1000x More Exciting */}
        <div className="text-center mb-20 space-y-4">
          <div className="flex items-center justify-center gap-2 text-orange-600 mb-2">
            <Activity size={18} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Global Mission Terminal Active</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter italic uppercase text-black dark:text-white leading-none">
            FLAME <span className="text-orange-600">GAME</span>
          </h2>
          
          <div className="flex flex-col items-center justify-center pt-6">
            <div className="bg-orange-600 text-white px-8 py-4 rounded-2xl flex flex-wrap items-center justify-center gap-x-8 gap-y-2 shadow-[0_20px_50px_rgba(234,88,12,0.3)]">
              <span className="text-sm font-black uppercase italic tracking-widest">
                Physical: <span className="text-black">842</span>
              </span>
              <span className="text-sm font-black uppercase italic tracking-widest">
                Spiritual: <span className="text-black">12,000</span>
              </span>
              <span className="text-sm font-black uppercase italic tracking-widest">
                Ethical RoR: <span className="text-black">142%</span>
              </span>
            </div>
          </div>
        </div>

        {/* 3 SIMPLE TASKS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          <div className="p-8 border-2 border-zinc-100 dark:border-zinc-900 rounded-[2rem] hover:border-emerald-500 transition-all group bg-zinc-50/50 dark:bg-zinc-900/20">
            <div className="flex justify-between items-start mb-10">
              <LogIn className="text-emerald-500" size={40} />
              <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]" />
            </div>
            <h3 className="text-2xl font-black uppercase italic mb-2 text-black dark:text-white">1. Login</h3>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-tight">Establish Secure Neural Link</p>
          </div>

          <div className="p-8 border-2 border-zinc-100 dark:border-zinc-900 rounded-[2rem] hover:border-amber-500 transition-all group bg-zinc-50/50 dark:bg-zinc-900/20">
            <div className="flex justify-between items-start mb-10">
              <Activity className="text-amber-500" size={40} />
              <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_12px_#f59e0b] animate-pulse" />
            </div>
            <h3 className="text-2xl font-black uppercase italic mb-2 text-black dark:text-white">2. Track Deeds</h3>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-tight">Log Earthbound Milestones</p>
          </div>

          <div className="p-8 border-2 border-zinc-100 dark:border-zinc-900 rounded-[2rem] hover:border-red-500 transition-all group bg-zinc-50/50 dark:bg-zinc-900/20">
            <div className="flex justify-between items-start mb-10">
              <Share2 className="text-red-500" size={40} />
              <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_#ef4444]" />
            </div>
            <h3 className="text-2xl font-black uppercase italic mb-2 text-black dark:text-white">3. Spread Word</h3>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-tight">Amplify Global Signal</p>
          </div>
        </div>

        {/* VIDEO CAROUSEL */}
        <div className="relative mb-32 group">
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10">
            {videoList.map((video) => (
              <div key={video.id} className="min-w-[90%] md:min-w-[60%] aspect-video bg-black rounded-[3rem] relative overflow-hidden border-2 border-black dark:border-white snap-center shadow-2xl cursor-pointer" onClick={() => setSelectedVideo(video)}>
                <video muted playsInline poster={video.poster} className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity">
                  <source src={video.src} type="video/mp4" />
                </video>
                <div className="absolute bottom-8 left-10">
                  <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-4 py-2 tracking-[0.2em] italic">
                    {video.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EXACT STATS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 border-t border-zinc-100 dark:border-zinc-900 pt-20">
          {statItems.map((stat, index) => (
            <div key={index} className="text-center flex flex-col items-center">
              <stat.icon className="w-6 h-6 text-zinc-400 mb-4 group-hover:text-orange-600 transition-colors" />
              <span className="text-4xl md:text-5xl font-black text-black dark:text-white mb-1 tabular-nums">
                {stat.value}
              </span>
              <p className="uppercase text-[9px] font-black tracking-[0.3em] text-orange-600 italic">
                {stat.label}
              </p>
            </div>
          ))}
        </div> 
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-3xl">
          <button onClick={() => setSelectedVideo(null)} className="absolute top-8 right-8 text-white hover:text-orange-600 z-[110]">
            <X size={48} strokeWidth={3} />
          </button>
          <div className="w-full max-w-6xl aspect-video rounded-[2rem] overflow-hidden border-2 border-white/20 bg-black shadow-[0_0_100px_rgba(234,88,12,0.4)]">
             <video autoPlay controls poster={selectedVideo.poster} className="w-full h-full">
                <source src={selectedVideo.src} type="video/mp4" />
             </video>
          </div>
        </div>
      )}
    </section>
  );
};

export default FlameGame;
