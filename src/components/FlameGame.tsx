import React, { useRef, useState, useEffect } from "react";
import { 
  ChevronRight, 
  ChevronLeft, 
  Users, 
  Globe, 
  X, 
  Maximize2, 
  Zap, 
  Gem, 
  HeartHandshake 
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";
import clickSound from "../assets/button.m4a"; 

interface VideoItem {
  id: string;
  video_url: string;
  thumbnail_url: string;
  title: string;
  description: string;
  families_impacted: number;
  reach_count: number;
  engagement: number;
  paid: number;
  saved: number;
  value: number;
}

const FlameGame = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Stats States
  const [stats, setStats] = useState({
    families: "0",
    reach: "0",
    engagement: "0",
    invested: "$0",
    saved: "0",
    value: "$0"
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // 1. Fetch Video List from flame_game table
      const { data: videoData, error: videoError } = await supabase
        .from('flame_game')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (!videoError && videoData) {
        setVideos(videoData);

        // 2. Aggregate Stats from the fetched videos
        const totals = videoData.reduce((acc, curr) => ({
          families: acc.families + (Number(curr.families_impacted) || 0),
          reach: acc.reach + (Number(curr.reach_count) || 0),
          engagement: acc.engagement + (Number(curr.engagement) || 0),
          invested: acc.invested + (Number(curr.paid) || 0),
          saved: acc.saved + (Number(curr.saved) || 0),
          value: acc.value + (Number(curr.value) || 0),
        }), { families: 0, reach: 0, engagement: 0, invested: 0, saved: 0, value: 0 });

        // Formatters
        const compact = (val: number) => new Intl.NumberFormat('en-US', {
          notation: "compact", compactDisplay: "short", maximumFractionDigits: 1
        }).format(val);

        const currency = (val: number) => new Intl.NumberFormat('en-US', {
          style: 'currency', currency: 'USD', notation: "compact", compactDisplay: "short", maximumFractionDigits: 1
        }).format(val);

        setStats({
          families: compact(totals.families),
          reach: compact(totals.reach),
          engagement: compact(totals.engagement),
          invested: currency(totals.invested),
          saved: compact(totals.saved),
          value: currency(totals.value)
        });
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const playClickSound = () => {
    try {
      new Audio(clickSound).play();
    } catch (e) { console.log("Audio error", e); }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (loading && videos.length === 0) return null;

  return (
    <section id="flame-game" className="relative pt-32 pb-24 px-6 overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase text-black dark:text-white">
            Welcome to the <span className="text-orange-600">Flame Game</span>
          </h2>
          <p className="text-lg text-black dark:text-white max-w-2xl mx-auto font-light tracking-wide">
            Help your family save the universe(s) & enjoy magical rewards. 
            <span className="block text-orange-600 font-bold mt-1 italic">Forever Free & Open Source.</span>
          </p>
        </div>

        {/* Video Scroller */}
        <div className="relative mb-24 group">
          <button 
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-orange-600 text-white p-4 rounded-r-2xl transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={32} />
          </button>

          <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
            {videos.map((video) => (
              <div 
                key={video.id} 
                className="min-w-[90%] md:min-w-[70%] lg:min-w-[60%] aspect-video bg-black rounded-3xl relative overflow-hidden border-2 border-black dark:border-white snap-center shadow-2xl cursor-pointer group/video"
                onClick={() => { playClickSound(); setSelectedVideo(video); }}
              >
                {video.thumbnail_url && (
                  <img 
                    src={video.thumbnail_url} 
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover/video:opacity-100 transition-opacity duration-500"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity bg-black/40">
                    <Maximize2 size={48} className="text-white animate-pulse" />
                </div>
                <div className="absolute bottom-6 left-8">
                  <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-4 py-2 tracking-[0.2em]">
                    {video.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-orange-600 text-white p-4 rounded-l-2xl transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 border-t border-zinc-100 dark:border-zinc-900 pt-24">
          {[
            { icon: Users, label: "Families", val: stats.families },
            { icon: Globe, label: "Reach", val: stats.reach },
            { icon: HeartHandshake, label: "Engagements", val: stats.engagement },
            { icon: Zap, label: "Invested", val: stats.invested },
            { icon: Users, label: "Saved", val: stats.saved },
            { icon: Gem, label: "Value", val: stats.value },
          ].map((item, idx) => (
            <div key={idx} className="text-center flex flex-col items-center">
              <item.icon className="w-6 h-6 text-orange-600 mb-2" />
              <span className="text-4xl font-black text-black dark:text-white tabular-nums">{item.val}</span>
              <p className="text-[10px] uppercase font-bold tracking-widest text-black dark:text-white">{item.label}</p>
            </div>
          ))}
        </div> 
      </div>

      {/* Video Overlay Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl transition-all duration-300">
          <button 
            onClick={() => setSelectedVideo(null)}
            className="absolute top-8 right-8 text-white hover:text-orange-600 transition-colors z-[110]"
          >
            <X size={48} strokeWidth={3} />
          </button>
          
          <div className="w-full max-w-6xl aspect-video rounded-2xl overflow-hidden border-2 border-white/20 shadow-[0_0_50px_rgba(234,88,12,0.3)] bg-black">
             <video 
                autoPlay 
                controls 
                poster={selectedVideo.thumbnail_url}
                className="w-full h-full"
                onEnded={() => setSelectedVideo(null)}
             >
                <source src={selectedVideo.video_url} type="video/mp4" />
             </video>
          </div>
          
          <div className="absolute bottom-8 text-center px-6">
            <h3 className="text-white text-2xl font-black uppercase italic tracking-widest mb-2">
                Mission Intel: <span className="text-orange-600">{selectedVideo.title}</span>
            </h3>
            <p className="text-white/60 text-sm max-w-xl mx-auto uppercase font-bold tracking-tighter">
              {selectedVideo.description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default FlameGame;
