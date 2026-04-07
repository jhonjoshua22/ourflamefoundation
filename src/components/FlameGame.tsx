import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Users, Flag, ThumbsUp, CheckCircle, Rocket } from "lucide-react";
import clickSound from "../assets/button.m4a"; 

// Asset Imports
import magicWorlds from "../assets/magicworlds.mp4";

const FlameGame = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    { id: 1, src: magicWorlds, title: "Magic Worlds Intro" },
    { id: 2, src: magicWorlds, title: "Ecosystem Overview" },
    { id: 3, src: magicWorlds, title: "Member Rewards" },
    { id: 4, src: magicWorlds, title: "Global Impact" },
    { id: 5, src: magicWorlds, title: "Future Vision" },
  ];

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
        <div className="relative mb-12 group">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-orange-600 text-white p-4 rounded-r-2xl transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={32} />
          </button>

          {/* Video Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
          >
            {videoList.map((video) => (
              <div 
                key={video.id} 
                className="min-w-[90%] md:min-w-[70%] lg:min-w-[60%] aspect-video bg-black rounded-3xl relative overflow-hidden border-2 border-black dark:border-white snap-center shadow-2xl"
              >
                <video controls className="w-full h-full object-cover">
                  <source src={video.src} type="video/mp4" />
                </video>
                <div className="absolute bottom-4 left-6">
                  <span className="bg-orange-600 text-white text-[10px] font-black uppercase px-3 py-1 tracking-widest">
                    {video.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-orange-600 text-white p-4 rounded-l-2xl transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={32} />
          </button>
        </div>

        {/* Scrolling Quotes */}
        <div className="relative mb-24 max-w-5xl mx-auto">
          <div className="animate-marquee flex gap-8 py-4">
            {infiniteTestimonials.map((item, index) => (
              <div 
                key={index} 
                className={`w-[260px] p-6 border-l-[3px] flex flex-col justify-between transition-all
                  ${item.isHighlight 
                    ? 'bg-orange-50/50 dark:bg-orange-900/20 border-orange-600' 
                    : 'bg-white dark:bg-black border-black dark:border-white border-2'}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div />
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-4">
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
    </section>
  );
};

export default FlameGame;
