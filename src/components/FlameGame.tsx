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
  LifeBuoy
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
    members: "0",
    engagements: "0",
    pay: "$2.4M", 
    revenue: "$5.8M", 
    donations: "$1.1M",
    livesSaved: "12.8K" // Physical + Spiritual combined for the big number
  });

  useEffect(() => {
    const fetchStats = async () => {
      // 1. Fetch Total Members
      const { count: memberCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // 2. Fetch Total Engagements
      const { data: socialData } = await supabase
        .from('social_stats')
        .select('followers_count');
      
      const totalEngagements = socialData?.reduce((acc, curr) => acc + (curr.followers_count || 0), 0) || 0;

      setLiveStats(prev => ({
        ...prev,
        members: memberCount ? `${(memberCount / 1000).toFixed(1)}K+` : "50K+",
        engagements: totalEngagements > 0 ? `${(totalEngagements / 1000).toFixed(1)}K+` : "120K+"
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

  // Updated Stats Configuration to include 6 items (or 3x2 on mobile)
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
        
        {/* Title Section */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase text-black dark:text-white">
            Welcome to the <span className="text-orange-600">Flame Game</span>
          </h2>       
        </div>

        {/* Video Carousel */}
        <div className="relative mb-24 group">
          <button onClick={() => scroll("left")} className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-orange-600 text-white p-4 rounded-r-2xl transition-all opacity-0 group-hover:opacity-100">
            <ChevronLeft size={32} />
          </button>
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
            {videoList.map((video) => (
              <div key={video.id} className="min-w-[90%] md:min-w-[70%] lg:min-w-[60%] aspect-video bg-black rounded-3xl relative overflow-hidden border-2 border-black dark:border-white snap-center shadow-2xl cursor-pointer group/video" onClick={() => setSelectedVideo(video)}>
                <video muted playsInline poster={video.poster} className="w-full h-full object-cover opacity-80 group-hover/video:opacity-100 transition-opacity">
                  <source src={video.src} type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity bg-black/40">
                    <Maximize2 size={48} className="text-white animate-pulse" />
                </div>
                <div className="absolute bottom-4 left-6">
                  <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-3 py-1 tracking-widest">{video.title}</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => scroll("right")} className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-orange-600 text-white p-4 rounded-l-2xl transition-all opacity-0 group-hover:opacity-100">
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Stats Grid - Now 6 items (3 per row on small, 6 per row on large) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 border-t border-zinc-100 dark:border-zinc-900 pt-24">
          {statItems.map((stat, index) => (
            <div key={index} className="text-center flex flex-col items-center group">
              <stat.icon className="w-8 h-8 text-orange-600 mb-4 group-hover:scale-110 transition-transform" />
              <span className="text-4xl md:text-5xl font-black text-black dark:text-white mb-2">
                {stat.value}
              </span>
              <p className="uppercase text-[10px] font-black tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div> 
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl">
          <button onClick={() => setSelectedVideo(null)} className="absolute top-8 right-8 text-white hover:text-orange-600 z-[110]">
            <X size={48} strokeWidth={3} />
          </button>
          <div className="w-full max-w-6xl aspect-video rounded-2xl overflow-hidden border-2 border-white/20 bg-black">
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
