import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Users, Flag, ThumbsUp, CheckCircle, Rocket } from "lucide-react";
import clickSound from "../assets/button.m4a"; 

// Asset Imports (Double check these exact filenames/paths in your project!)
import partnerImg from "../assets/partners.jpg"; 
import scoutImg from "../assets/scout.png";
import stormtrooperImg from "../assets/superheroes.png";
import angelImg from "../assets/angel.png";
import farmerImg from "../assets/superfarmer.png"; 
import magicWorlds from "../assets/magicworlds.mp4";

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

  // Duplicating the array to create a seamless infinite scrolling loop
  const infiniteTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="flame-game" className="relative pt-32 pb-24 px-6 overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      
      {/* Styles for the infinite scrolling marquee */}
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
      `}</style>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* Title is FIRST */}
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase text-zinc-900 dark:text-white">
            Welcome to the <span className="text-orange-600">Flame Game</span>
          </h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto font-light tracking-wide">
            Help your family save the universe(s) & enjoy magical rewards. 
            <span className="block text-orange-600 font-bold mt-1 italic">Forever Free & Open Source.</span>
          </p>
        </div>

        {/* Intro Video Box is SECOND */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="aspect-video w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl relative overflow-hidden group hover:border-orange-600/50 transition-colors shadow-2xl shadow-black/5">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10" />
            
            <video 
              controls 
              className="w-full h-full object-cover"
            >
              <source src={magicWorlds} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* AUTO SCROLLING QUOTES (New Addition) */}
        <div className="relative mb-24 max-w-5xl mx-auto">
          {/* Edge gradients to softly fade out text at the borders */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex gap-8 py-4">
            {infiniteTestimonials.map((item, index) => (
              <div 
                key={index} 
                className={`w-[260px] p-6 border-l-[3px] flex flex-col justify-between transition-all hover:scale-[1.02] shadow-sm
                  ${item.isHighlight 
                    ? 'bg-orange-50/50 dark:bg-orange-950/10 border-orange-600' 
                    : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800'}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-1"></div>
                    {item.isHighlight && <Rocket size={14} className="text-orange-600 animate-pulse" />}
                  </div>
                  <blockquote className="text-zinc-800 dark:text-zinc-100 text-xl font-black uppercase tracking-tight italic mb-4">
                    "{item.content}"
                  </blockquote>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-zinc-900 dark:text-zinc-100 text-xs tracking-wide uppercase">{item.name}</p>
                  <CheckCircle size={10} className="text-orange-600" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-16 pt-4">
          {/* Followers Stat */}
          <div className="space-y-3 text-center flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Users className="w-8 h-8 text-orange-600" />
              <span className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white">
                50K+
              </span>
            </div>
            <p className="text-base uppercase font-bold tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              Followers
            </p>
          </div>
        
          {/* Supported Stat */}
          <div className="space-y-3 text-center flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Flag className="w-8 h-8 text-orange-600" />
              <span className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white">
                100K+
              </span>
            </div>
            <p className="text-base uppercase font-bold tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              Supported
            </p>
          </div>
        
          {/* Goal Stat */}
          <div className="space-y-3 text-center col-span-2 md:col-span-1 flex flex-col items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <ThumbsUp className="w-8 h-8 text-orange-600" />
              <span className="text-5xl md:text-8xl font-black tracking-tighter text-zinc-900 dark:text-white">
                3.5M
              </span>
            </div>
            <p className="text-base uppercase font-bold tracking-[0.3em] text-zinc-500 dark:text-zinc-400">
              2026 Foundation Goal
            </p>
          </div>
        </div> 
      </div>
    </section>
  );
};

export default FlameGame;
