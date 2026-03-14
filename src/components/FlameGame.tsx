import React from "react";
import { Link } from "react-router-dom";
import { Flame, ChevronRight, Video, Star } from "lucide-react";
import clickSound from "../assets/button.m4a"; 

// Asset Imports
import scoutImg from "../assets/scout.png";
import stormtrooperImg from "../assets/superheroes.png";
import angelImg from "../assets/angel.png";
import farmerImg from "../assets/superfarmer.png"; 

const FlameGame = () => {
  // Added sound helper function
  const playClickSound = () => {
    new Audio(clickSound).play().catch(e => console.log("Audio playback failed", e));
  };

  const tiers = [
    {
      role: "Normies",
      image: scoutImg,
      price: "Forever Free",
      benefit: "Enjoy hobbies, Claim prizes, Get educated",
      color: "border-zinc-200 dark:border-zinc-800 bg-card/50", 
      glowClass: "shadow-[0_0_40px_rgba(161,161,170,0.3)]",
      button: "Join Normies",
    },
    {
      role: "SuperHeros",
      image: stormtrooperImg,
      price: "From $5 pm est",
      benefit: "Do Good, Enjoy Rewards, Get Superbot 10x Powers",
      color: "border-orange-600 bg-orange-600/10 shadow-[0_0_20px_rgba(234,88,12,0.1)]",
      glowClass: "shadow-[0_0_50px_rgba(255,255,255,0.5),0_0_20px_rgba(148,163,184,0.4)]",
      button: "Recruit Me",
      featured: true,
    },
    {
      role: "Angels",
      image: angelImg,
      price: "From $50 pm est",
      benefit: "Provide Funds, Enjoy Rewards, Get SuperBot 10x Powers",
      color: "border-zinc-200 dark:border-zinc-800 bg-card/50",
      glowClass: "shadow-[0_0_60px_rgba(255,215,0,0.7),0_0_25px_rgba(255,165,0,0.4)]",
      button: "Become Angel",
    },
    {
      role: "SuperFarmers",
      image: farmerImg,
      price: "From $500 pm est",
      benefit: "Boost Funds, Enjoy Rewards, Share Friends",
      color: "border-green-600/30 bg-green-600/5",
      glowClass: "shadow-[0_0_60px_rgba(34,197,94,0.4),0_0_25px_rgba(34,197,94,0.2)]",
      button: "Plant Seeds",
    },
  ];

  const steps = [
    { 
      step: "01", 
      title: "1-Click Entry", 
      desc: "Sign up instantly with SSO or Video verification.", 
      icon: <Video />, 
      link: "/login" 
    },
    { 
      step: "02", 
      title: "Daily Mission", 
      desc: "Follow AI-monitored task programs with smart prompts.", 
      icon: <Flame />, 
      link: "/login"
    },
    { 
      step: "03", 
      title: "Claim Rewards", 
      desc: "Saturday 0700 UTC: Enjoy your magical rewards.", 
      icon: <Star />, 
      link: "https://calendar.google.com" 
    }
  ];

  return (
    <section id="flame-game" className="relative pt-40 pb-24 px-6 overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes breathe {
          0%, 100% { transform: scale(1); filter: brightness(100%); }
          50% { transform: scale(1.12); filter: brightness(125%); }
        }
        .animate-breathe {
          animation: breathe 4s ease-in-out infinite;
        }
      `}} />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-zinc-900 dark:text-white">
            Welcome to the <span className="text-orange-600">Flame Game</span>
          </h2>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-light tracking-wide">
            Help your family save the universe(s) & enjoy magical rewards. 
            <span className="block text-orange-600 font-bold mt-2 italic">Forever Free & Open Source.</span>
          </p>
        </div>

        {/* Tiers Grid Moved to the Top */}
        <div id="tiers" className="scroll-mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-zinc-100 dark:border-zinc-800 overflow-hidden mb-20">
          {tiers.map((tier, i) => (
            <div key={i} className={`p-8 flex flex-col items-center text-center transition-all border-zinc-100 dark:border-zinc-800 border ${tier.color}`}>
              <div className="relative mb-8 mt-4">
                <div className={`w-44 h-44 rounded-full overflow-hidden border-2 border-white/20 animate-breathe ${tier.glowClass}`}>
                  <img src={tier.image} alt={tier.role} className="w-full h-full object-cover" />
                </div>
              </div>

              <h4 className="text-2xl font-black text-zinc-900 dark:text-white uppercase italic mb-2">{tier.role}</h4>
              <div className="text-orange-600 font-bold text-sm mb-1">{tier.price}</div>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs mb-8 min-h-[40px]">{tier.benefit}</p>
              
              <Link 
                to="/login"
                onClick={playClickSound}
                className={`w-full py-4 font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 ${
                  tier.featured ? "bg-orange-600 text-white hover:bg-orange-500 shadow-[0_0_20px_rgba(234,88,12,0.4)]" : "bg-zinc-900/10 dark:bg-white/10 text-zinc-900 dark:text-white hover:bg-zinc-900/20 dark:hover:bg-white/20"
                }`}
              >
                {tier.button} <ChevronRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        {/* Steps Grid Moved Below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((item, idx) => {
            const isExternal = item.link?.startsWith('http');
            const isAnchor = item.link?.startsWith('#');

            const CardContent = (
              <div onClick={playClickSound} className="relative h-full p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 backdrop-blur-sm group transition-all duration-300 hover:border-orange-600 hover:scale-[1.02] cursor-pointer">
                <span className="text-6xl font-black text-zinc-900/5 dark:text-white/5 absolute top-4 right-4 group-hover:text-orange-600/10 transition-colors">
                  {item.step}
                </span>
                <div className="text-orange-600 mb-4 transition-transform group-hover:scale-110 duration-300">{item.icon}</div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 uppercase group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-4 flex items-center text-[10px] font-black uppercase tracking-widest text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.title === "Claim Rewards" ? "Open Calendar" : "Proceed"} <ChevronRight size={12} />
                </div>
              </div>
            );

            return isExternal ? (
              <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">{CardContent}</a>
            ) : isAnchor ? (
              <a key={idx} href={item.link} className="block h-full">{CardContent}</a>
            ) : (
              <Link key={idx} to={item.link || "#"} className="block h-full">{CardContent}</Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FlameGame;
