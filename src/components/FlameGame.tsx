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

interface FlameGameItem {
  id: string;
  title: string;
  video_url: string;
  thumbnail_url: string;
  families_impacted: number;
  reach_count: number;
  description: string;
}

const FlameGame = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [games, setGames] = useState<FlameGameItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string, title: string, poster?: string } | null>(null);
  
  // Stats States
  const [memberCount, setMemberCount] = useState<string>("10K");
  const [totalReach, setTotalReach] = useState<string>("0");
  const [totalImpact, setTotalImpact] = useState<string>("0");
  const [totalValue, setTotalValue] = useState<string>("$0");
  const [totalSaved, setTotalSaved] = useState<string>("0"); 
  const [totalPaid, setTotalPaid] = useState<string>("$0");

  useEffect(() => {
    const fetchData = async () => {
      // 1. Fetch Flame Game Videos/Data
      const { data: gameData, error: gameError } = await supabase
        .from('flame_game')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (!gameError && gameData) {
        setGames(gameData);
        
        // Aggregate totals from the flame_game table entries
        const sumReach = gameData.reduce((acc, curr) => acc + (Number(curr.reach_count) || 0), 0);
        const sumImpact = gameData.reduce((acc, curr) => acc + (Number(curr.families_impacted) || 0), 0);
        
        setTotalReach(formatNumber(sumReach));
        setTotalImpact(formatNumber(sumImpact));
      }

      // 2. Fetch Profiles for Member Count and financial stats
      const { data: profileData, count, error: profileError } = await supabase
        .from('profiles')
        .select('value, saved, paid', { count: 'exact' });

      if (count !== null) {
        const displayCount = count < 10000 ? 10000 : count;
        setMemberCount(formatNumber(displayCount));
      }

      if (!profileError && profileData) {
        const totalV = profileData.reduce((acc, curr) => acc + Math.abs(Number(curr.value) || 0), 0);
        const totalS = profileData.reduce((acc, curr) => acc + Math.abs(Number(curr.saved) || 0), 0);
        const totalP = profileData.reduce((acc, curr) => acc + Math.abs(Number(curr.paid) || 0), 0);

        setTotalValue(moneyFormatter(totalV));
        setTotalSaved(formatNumber(totalS)); 
        setTotalPaid(moneyFormatter(totalP));
      }
    };

    fetchData();
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      notation: "compact",
      compactDisplay: "short",
      maximumFractionDigits: 1
    }).format(num);
  };

  const moneyFormatter = (val: number) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 1,
    notation: "compact",
    compactDisplay: "short"
  }).format(val);

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
            {games.map((game) => (
              <div 
                key={game.id} 
                className="min-w-[90%] md:min-w-[70%] lg:min-w-[60%] aspect-video bg-black rounded-3xl relative overflow-hidden border-2 border-black dark:border-white snap-center shadow-2xl cursor-pointer group/video"
                onClick={() => { playClickSound(); setSelectedVideo({ src: game.video_url, title: game.title, poster: game.thumbnail_url }); }}
              >
                {/* We use an image/poster for the slider to save bandwidth, or a muted video preview */}
                <img 
                  src={game.thumbnail_url || ""} 
                  alt={game.title}
                  className="w-full h-full object-cover opacity-80 group-hover/video:opacity-100 transition-opacity"
                />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/video:opacity-100 transition-opacity bg-black/40">
                    <Maximize2 size={48} className="text-white animate-pulse" />
                </div>
                <div className="absolute bottom-4 left-6">
                  <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-3 py-1 tracking-widest">
                    {game.title}
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
            <span className="text-4xl font-black text-black dark:text-white">{totalReach}</span>
            <p className="text-[10px] uppercase font-bold tracking-widest text-black dark:text-white">Reach</p>
          </div>

          <div className="text-center flex flex-col items-center">
            <HeartHandshake className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-4xl font-black text-black dark:text-white">{totalImpact}</span>
            <p className="text-[10px] uppercase font-bold tracking-widest text-black dark:text-white">Impacted</p>
          </div>

          <div className="text-center flex flex-col items-center">
            <Zap className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-4xl font-black text-black dark:text-white">{totalPaid}</span>
            <p className="text-[10px] uppercase font-bold tracking-widest text-black dark:text-white">Invested</p>
          </div>

          <div className="text-center flex flex-col items-center">
            <Users className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-4xl font-black text-black dark:text-white">{totalSaved}</span>
            <p className="text-[10px] uppercase font-bold tracking-widest text-black dark:text-white">Saved</p>
          </div>

          <div className="text-center flex flex-col items-center">
            <Gem className="w-6 h-6 text-orange-600 mb-2" />
            <span className="text-4xl font-black text-black dark:text-white">{totalValue}</span>
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
                poster={selectedVideo.poster}
                className="w-full h-full"
                onEnded={() => setSelectedVideo(null)}
             >
                <source src={selectedVideo.src} type="video/mp4" />
             </video>
          </div>
          
          <div className="absolute bottom-8 text-center">
            <h3 className="text-white text-2xl font-black uppercase italic tracking-widest">
                Mission Intel: <span className="text-orange-600">{selectedVideo.title}</span>
            </h3>
          </div>
        </div>
      )}
    </section>
  );
};

export default FlameGame;
