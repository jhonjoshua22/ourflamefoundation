import React, { useRef, useState } from "react";
import { ChevronRight, ChevronLeft, Users, Flag, ThumbsUp, X, Maximize2 } from "lucide-react";
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

  const videoList = [
    { id: 1, src: video5, title: "Money World", poster: moneyPlaceholder }, 
    { id: 2, src: magicWorlds, title: "Magic Worlds Intro" },
    { id: 3, src: video2, title: "Play2Help" },
    { id: 4, src: video3, title: "2026 I Dream For" },
    { id: 5, src: video4, title: "Avatars" },
  ];

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
        
        {/* Title Section */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase text-black dark:text-white">
            Welcome to the <span className="text-orange-600">Flame Game</span>
          </h2>
          <p className="text-lg text-black dark:text-white max-w-2xl mx-auto font-light tracking-wide">
            Help your family save the universe(s) & enjoy magical rewards. 
            <span className="block text-orange-600 font-bold mt-1 italic">Forever Free & Open Source.</span>
          </p>
        </div>

        {/* Video Carousel with Arrows */}
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
                <video 
                  muted 
                  playsInline 
                  poster={video.poster}
                  className="w-full h-full object-cover opacity-80 group-hover/video:opacity-100 transition-opacity"
                >
                  <source src={video.src} type="video/mp4" />
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-4 border-t border-zinc-100 dark:border-zinc-900 pt-24">
          <div className="text-center flex flex-col items-center">
            <Users className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-5xl md:text-8xl font-black text-black dark:text-white">50K+</span>
            <p className="uppercase font-bold tracking-widest text-black dark:text-white">Followers</p>
          </div>
          <div className="text-center flex flex-col items-center">
            <Flag className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-5xl md:text-8xl font-black text-black dark:text-white">100K+</span>
            <p className="uppercase font-bold tracking-widest text-black dark:text-white">Supported</p>
          </div>
          <div className="text-center col-span-2 md:col-span-1 flex flex-col items-center">
            <ThumbsUp className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-5xl md:text-8xl font-black text-black dark:text-white">3.5M</span>
            <p className="uppercase font-bold tracking-widest text-black dark:text-white">2026 Goal</p>
          </div>
        </div> 
      </div>

      {/* Video Modal */}
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
