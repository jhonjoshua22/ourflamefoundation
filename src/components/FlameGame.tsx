import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Users, Flag, ThumbsUp } from "lucide-react";
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

  return (
    <section id="flame-game" className="relative pt-32 pb-24 px-6 overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      
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
        <div className="max-w-4xl mx-auto mb-20">
          <div className="aspect-video w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl relative overflow-hidden group hover:border-orange-600/50 transition-colors shadow-2xl shadow-black/5">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10" />
            
            {/* ✅ Swapped out the mock layout for the real imported video */}
            <video 
              controls 
              className="w-full h-full object-cover"
            >
              <source src={magicWorlds} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

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
