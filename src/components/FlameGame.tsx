import React from "react";
import { Link } from "react-router-dom";
import { Flame, ChevronRight, Video, Star, Zap } from "lucide-react";
import clickSound from "../assets/button.m4a"; 

// Asset Imports
import scoutImg from "../assets/scout.png";
import stormtrooperImg from "../assets/superheroes.png";
import angelImg from "../assets/angel.png";
import farmerImg from "../assets/superfarmer.png"; 

const FlameGame = () => {
  const playClickSound = () => {
    new Audio(clickSound).play().catch(e => console.log("Audio playback failed", e));
  };

  const tiers = [
    { role: "Normies", image: scoutImg, price: "Free", color: "border-zinc-200" },
    { role: "SuperHeros", image: stormtrooperImg, price: "$5/mo", featured: true },
    { role: "Angels", image: angelImg, price: "$50/mo" },
    { role: "Farmers", image: farmerImg, price: "$500/mo" },
  ];

  const steps = [
    { title: "Entry", desc: "1-Click SSO", icon: <Video />, link: "/login" },
    { title: "Mission", desc: "AI-Tasks", icon: <Flame />, link: "/login" },
    { title: "Reward", desc: "Claim Prizes", icon: <Star />, link: "https://calendar.google.com" }
  ];

  return (
    <section id="flame-game" className="pt-24 pb-16 px-6 bg-white dark:bg-black transition-colors">
      <div className="container mx-auto max-w-6xl">
        {/* Header - Compact */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white mb-2">
            The <span className="text-orange-600">Flame Game</span>
          </h2>
          <p className="text-zinc-500 text-sm tracking-widest uppercase">Global Access & Magical Rewards</p>
        </div>

        {/* Combined Grid: Tiers and Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Tiers (8 Columns) */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {tiers.map((t, i) => (
              <div key={i} className={`p-4 border ${t.featured ? 'border-orange-600 bg-orange-600/5' : 'border-zinc-100 dark:border-zinc-800'} transition-all hover:scale-[1.02] cursor-pointer`}>
                <img src={t.image} alt={t.role} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover" />
                <h4 className="text-[10px] font-black uppercase text-center">{t.role}</h4>
                <p className="text-[10px] text-orange-600 font-bold text-center mt-1">{t.price}</p>
              </div>
            ))}
          </div>

          {/* Steps (4 Columns) - Compact Cards */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {steps.map((s, i) => (
              <a key={i} href={s.link} onClick={playClickSound} className="flex items-center gap-4 p-4 border border-zinc-100 dark:border-zinc-800 hover:border-orange-600 transition-colors group">
                <div className="text-orange-600">{s.icon}</div>
                <div className="flex-1">
                  <h4 className="text-[11px] font-bold uppercase group-hover:text-orange-600">{s.title}</h4>
                  <p className="text-[9px] text-zinc-500">{s.desc}</p>
                </div>
                <ChevronRight size={14} className="text-zinc-400" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlameGame;
