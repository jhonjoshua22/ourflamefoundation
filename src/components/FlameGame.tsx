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
  title: string;
  description?: string;
}

const FlameGame = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [videoList, setVideoList] = useState<VideoItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  
  // Stats States
  const [memberCount, setMemberCount] = useState<string>("10K");
  const [totalValue, setTotalValue] = useState<string>("$0");
  const [totalSaved, setTotalSaved] = useState<string>("0"); 
  const [totalPaid, setTotalPaid] = useState<string>("$0");

  useEffect(() => {
    const fetchData = async () => {
      // 1. Fetch Videos from flamegame_videos
      const { data: vData } = await supabase
        .from('flamegame_videos')
        .select('id, video_url, title, description') // Only select what we need
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (vData) setVideoList(vData);

      // 2. Fetch Member Count from profiles
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      const formatNumber = (num: number) => {
        return new Intl.NumberFormat('en-US', {
          notation: "compact",
          compactDisplay: "short",
          maximumFractionDigits: 1
        }).format(num);
      };

      if (count !== null) {
        const displayCount = count < 10000 ? 10000 : count;
        setMemberCount(formatNumber(displayCount));
      }

      // 3. Fetch Totals from profiles
      const { data, error } = await supabase
        .from('profiles')
        .select('value, saved, paid');

      if (!error && data) {
        const totalV = data.reduce((acc, curr) => acc + Math.abs(Number(curr.value) || 0), 0);
        const totalS = data.reduce((acc, curr) => acc + Math.abs(Number(curr.saved) || 0), 0);
        const totalP = data.reduce((acc, curr) => acc + Math.abs(Number(curr.paid) || 0), 0);

        const moneyFormatter = (val: number) => new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 1,
          notation: "compact",
          compactDisplay: "short"
        }).format(val);

        setTotalValue(moneyFormatter(totalV));
        setTotalSaved(formatNumber(totalS)); 
        setTotalPaid(moneyFormatter(totalP));
      }
    };

    fetchData();
  }, []);

  const playClickSound = () => {
    try {
      new Audio(clickSound).play();
    } catch (e) {
      console.log("Audio playback failed", e);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section id="flame-game" className="relative pt-32 pb-24 px-6 overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
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

        <div className="relative mb-24 group">
          <button 
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-orange-600 text-white p-4 rounded-r-2xl transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={32} />
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
          >
            {videoList.map((video) => (
              <div 
                key={video.id} 
                className="min-w-[90%] md:min-w-[70%] lg:min-w-[60%] aspect-video bg-black rounded-3xl relative overflow-hidden border-2 border-black dark:border-white snap-center shadow-2xl cursor-pointer group/video"
                onClick={() => { playClickSound(); setSelectedVideo(video); }}
              >
                {/* 
                  Using a small time offset (#t=0.001) forces the browser 
                  to load the video and show the first frame as the thumbnail 
                */}
                <video 
                  muted 
                  playsInline 
                  preload="metadata"
                  className="w-full h-full object-cover opacity-80 group-hover/video:opacity-100 transition-opacity"
                >
                  <source src={`${video.video_url}#t=0.001`} type="video/mp4" />
                </video>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity bg-black/40">
                    <Maximize2 size={48} className="text-white animate-pulse" />
                </div>
                
                <div className="absolute bottom-4 left-6">
                  <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-3 py-1 tracking-widest">
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 border-t border-zinc-100 dark:border-zinc-900 pt-24">
          <div className="text-center flex flex-col items-center">
            <Users className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-4xl font-black text-black dark:text-white tabular-nums">{memberCount}</span>
            <p className="text-[10px] uppercase font-bold tracking-widest text-black dark:text-white">Families</p>
          </div>
          
          <div className="text-center flex flex-col items-center">
            <Globe className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-4xl font-black text-black dark:text-white">1M+</span>
            <p className="text-[10px] uppercase font-bold tracking-widest text-black dark:text-white">Reach</p>
          </div>

          <div className="text-center flex flex-col items-center">
            <HeartHandshake className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-4xl font-black text-black dark:text-white">100M+</span>
            <p className="text-[10px] uppercase font-bold tracking-widest text-black dark:text-white">Engagements</p>
          </div>

          <div className="text-center flex flex-col items-center">
            <Zap className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-4xl font-black text-black dark:text-white">300K</span>
            <p className="text-[10px] uppercase font-bold tracking-widest text-black dark:text-white">Invested</p>
          </div>

          <div className="text-center flex flex-col items-center">
            <Users className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-4xl font-black text-black dark:text-white">4</span>
            <p className="text-[10px] uppercase font-bold tracking-widest text-black dark:text-white">Saved</p>
          </div>

          <div className="text-center flex flex-col items-center">
            <Gem className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-4xl font-black text-black dark:text-white">1.9B</span>
            <p className="text-[10px] uppercase font-bold tracking-widest text-black dark:text-white">Value</p>
          </div>
        </div> 
      </div>

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
                className="w-full h-full"
                onEnded={() => setSelectedVideo(null)}
             >
                <source src={selectedVideo.video_url} type="video/mp4" />
             </video>
          </div>
          
          <div className="absolute bottom-8 text-center px-6">
            <h3 className="text-white text-2xl font-black uppercase italic tracking-widest">
                Mission Intel: <span className="text-orange-600">{selectedVideo.title}</span>
            </h3>
            {selectedVideo.description && (
              <p className="text-white/60 text-sm mt-2 max-w-2xl mx-auto uppercase font-bold tracking-tighter">
                {selectedVideo.description}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default FlameGame;
