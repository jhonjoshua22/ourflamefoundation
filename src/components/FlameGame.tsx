import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Play } from "lucide-react";
import clickSound from "../assets/button.m4a"; 

// Asset Imports (Double check these exact filenames/paths in your project!)
import scoutImg from "../assets/scout.png";
import stormtrooperImg from "../assets/superheroes.png";
import angelImg from "../assets/angel.png";
import farmerImg from "../assets/superfarmer.png"; 

const FlameGame = () => {
  const playClickSound = () => {
    try {
      new Audio(clickSound).play();
    } catch (e) {
      console.log("Audio playback failed", e);
    }
  };

  // One single array for all tiers so the design is locked in 100% identical
  const tiers = [
    {
      role: "Partner",
      image: scoutImg,
      price: "Forever Free",
      benefit: "We Just Want To Help ALL Our Stakeholders Ethically.",
      color: "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50", 
      button: "I'm Partner",
    },
    {
      role: "Normies",
      image: scoutImg,
      price: "From $1 pm • Concessions Available",
      benefit: "We just want to enjoy our lives via work, family, hobbies & friends.",
      color: "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50", 
      button: "I'm Normal",
    },
    {
      role: "Superheros",
      image: stormtrooperImg,
      price: "From $5 pm • 50-99% Profit Pay",
      benefit: "We want to use our 10x Superbot powers to do good and earn rewards.",
      color: "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50",
      button: "I'm SuperHero",
    },
    {
      role: "Angels",
      image: angelImg,
      price: "From $50 pm • 50-99% Profit Pay",
      benefit: "We want to provide the funds to fuel the mission and share in the magic.",
      color: "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50",
      button: "I'm Angel",
    },
    {
      role: "SuperFarmers",
      image: farmerImg,
      price: "From $500 pm • 50-99% Profit Pay",
      benefit: "We want to boost the ecosystem, plant seeds for growth, and invite our friends.",
      color: "border-green-600/20 bg-green-600/5",
      button: "I'm SuperFarmer",
    },
  ];

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
          <div className="aspect-video w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl flex flex-col items-center justify-center gap-4 relative overflow-hidden group hover:border-orange-600/50 transition-colors shadow-2xl shadow-black/5">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-orange-600/20 group-hover:scale-110 transition-transform cursor-pointer">
              <Play size={28} fill="white" className="ml-1" />
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                Intro Video Placeholder
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Insert approved video here (Ask John which one is best)
              </p>
            </div>
          </div>
        </div>

        {/* TIERS CONTAINER - Custom 6-Column Grid to safely yield a 3+2 visual flow */}
        <div id="tiers" className="scroll-mt-24 mb-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-6">
          {tiers.map((tier, i) => {
            // Cards 1, 2, 3 take up 2 grid columns each (Total 6 = perfectly fits 1 row)
            // Cards 4, 5 take up 2 grid columns each, but we push card 4 over by 1 column on desktop to center the bottom row
            const gridClasses = 
              i < 3 
                ? "md:col-span-2" 
                : i === 3 
                ? "md:col-span-2 md:col-start-2" 
                : "md:col-span-2";

            return (
              <div key={i} className={`${gridClasses} p-8 border rounded-2xl flex flex-col justify-between transition-all hover:shadow-lg ${tier.color}`}>
                <div>
                  <div className="flex flex-col items-center text-center mb-6">
                    {/* Big centered circle pictures */}
                    <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl mb-6 bg-zinc-100 dark:bg-zinc-800">
                      <img 
                        src={tier.image} 
                        alt={tier.role} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                      />
                    </div>
                    <h4 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white uppercase italic">{tier.role}</h4>
                    <div className="text-orange-600 font-bold text-xs mt-1">{tier.price}</div>
                  </div>
                  
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm text-center italic leading-relaxed mb-8 min-h-[60px]">
                    "{tier.benefit}"
                  </p>
                </div>
                
                <Link 
                  to="/login"
                  onClick={playClickSound}
                  className="w-full py-3.5 font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 rounded-lg bg-zinc-900/10 dark:bg-white/10 text-zinc-900 dark:text-white hover:bg-zinc-900/20 dark:hover:bg-white/20"
                >
                  {tier.button} <ChevronRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>      
      </div>
    </section>
  );
};

export default FlameGame;
