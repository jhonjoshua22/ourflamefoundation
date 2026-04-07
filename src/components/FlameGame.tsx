import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Users, Flag, ThumbsUp, CheckCircle, Rocket } from "lucide-react";
import clickSound from "../assets/button.m4a"; 

// Asset Imports
import magicWorlds from "../assets/magicworlds.mp4";
// Add your other video imports here:
// import video2 from "../assets/video2.mp4"; 

const FlameGame = () => {
  const playClickSound = () => {
    try {
      new Audio(clickSound).play();
    } catch (e) {
      console.log("Audio playback failed", e);
    }
  };

  const testimonials = [
    { name: "Fujitsu Exec", content: "Revolutionary" },
    { name: "Retailer PLC", content: "Fascinating" },
    { name: "Unique Games Exec", content: "Unique" },
    { name: "Ad Giant Global", content: "Love It" },
    { name: "Google Exec", content: "Compelling", isHighlight: true },
    { name: "Pharma UK", content: "Worthwhile" },
    { name: "Police UK", content: "Useful" },
    { name: "NHS London", content: "Wonderful" },
    { name: "Army UK", content: "Helpful" },
    { name: "School Group London", content: "Inspired" }
  ];

  // List of videos for the carousel (Add your 3-5 video assets here)
  const videoList = [
    { id: 1, src: magicWorlds, title: "Magic Worlds Intro" },
    { id: 2, src: magicWorlds, title: "Ecosystem Overview" },
    { id: 3, src: magicWorlds, title: "Member Rewards" },
    // { id: 4, src: video4, title: "Global Impact" },
  ];

  const infiniteTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="flame-game" className="relative pt-32 pb-24 px-6 overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        /* Custom scrollbar for the video carousel */
        .video-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .video-scrollbar::-webkit-scrollbar-thumb {
          background: #ea580c;
          border-radius: 10px;
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

        {/* Video Carousel Section (Scrollable 3-5 videos) */}
        <div className="relative mb-12">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory video-scrollbar">
            {videoList.map((video) => (
              <div 
                key={video.id} 
                className="min-w-[85%] md:min-w-[70%] lg:min-w-[60%] aspect-video bg-black rounded-3xl relative overflow-hidden group border-2 border-transparent hover:border-orange-600 transition-all snap-center shadow-2xl"
              >
                <video 
                  controls 
                  className="w-full h-full object-cover"
                >
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-4 left-6 z-20">
                  <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-3 py-1 tracking-widest">
                    {video.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AUTO SCROLLING QUOTES */}
        <div className="relative mb-24 max-w-5xl mx-auto">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex gap-8 py-4">
            {infiniteTestimonials.map((item, index) => (
              <div 
                key={index} 
                className={`w-[260px] p-6 border-l-[3px] flex flex-col justify-between transition-all hover:scale-[1.02] shadow-sm
                  ${item.isHighlight 
                    ? 'bg-orange-50/50 dark:bg-orange-900/20 border-orange-600' 
                    : 'bg-white dark:bg-black border-black dark:border-white border-2'}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-1"></div>
                    {item.isHighlight && <Rocket size={14} className="text-orange-600 animate-pulse" />}
                  </div>
                  <blockquote className="text-black dark:text-white text-xl font-black uppercase tracking-tight italic mb-4">
                    "{item.content}"
                  </blockquote>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-black dark:text-white text-xs tracking-wide uppercase">{item.name}</p>
                  <CheckCircle size={10} className="text-orange-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-16 pt-4">
          <div className="space-y-3 text-center flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Users className="w-8 h-8 text-orange-600" />
              <span className="text-5xl md:text-8xl font-black tracking-tighter text-black dark:text-white">
                50K+
              </span>
            </div>
            <p className="text-base uppercase font-bold tracking-[0.3em] text-black dark:text-white">
              Followers
            </p>
          </div>
        
          <div className="space-y-3 text-center flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Flag className="w-8 h-8 text-orange-600" />
              <span className="text-5xl md:text-8xl font-black tracking-tighter text-black dark:text-white">
                100K+
              </span>
            </div>
            <p className="text-base uppercase font-bold tracking-[0.3em] text-black dark:text-white">
              Supported
            </p>
          </div>
        
          <div className="space-y-3 text-center col-span-2 md:col-span-1 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <ThumbsUp className="w-8 h-8 text-orange-600" />
              <span className="text-5xl md:text-8xl font-black tracking-tighter text-black dark:text-white">
                3.5M
              </span>
            </div>
            <p className="text-base uppercase font-bold tracking-[0.3em] text-black dark:text-white">
              2026 Goal
            </p>
          </div>
        </div> 
      </div>
    </section>
  );
};

export default FlameGame;
