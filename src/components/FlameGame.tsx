import React from "react";
import { Link } from "react-router-dom";
import { Flame, ChevronRight, Video, Star, Play } from "lucide-react";
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
    {
      role: "I'm Partner",
      image: scoutImg, // You can swap this to a partner-specific asset later
      price: "Forever Free",
      benefit: "We Just Want To Help ALL Our Stakeholders Ethically.",
      color: "border-zinc-200 dark:border-zinc-800 bg-card/50", 
      glowClass: "shadow-[0_0_40px_rgba(56,189,248,0.3)]",
      button: "Join Partners",
    },
    {
      role: "I'm Normal",
      image: scoutImg,
      price: "From $1 pm • Concessions Available",
      benefit: "We just want to enjoy our lives via work, family, hobbies & friends.",
      color: "border-zinc-200 dark:border-zinc-800 bg-card/50", 
      glowClass: "shadow-[0_0_40px_rgba(161,161,170,0.3)]",
      button: "Join Normies",
    },
    {
      role: "I'm Superhero",
      image: stormtrooperImg,
      price: "From $5 pm • 50-99% Profit Pay",
      benefit: "We want to use our 10x Superbot powers to do good and earn rewards.",
      color: "border-orange-600 bg-orange-600/10 shadow-[0_0_20px_rgba(234,88,12,0.1)]",
      glowClass: "shadow-[0_0_50px_rgba(255,255,255,0.5),0_0_20px_rgba(148,163,184,0.4)]",
      button: "Recruit Me",
      featured: true,
    },
    {
      role: "I'm Angel",
      image: angelImg,
      price: "From $50 pm • 50-99% Profit Pay",
      benefit: "We want to provide the funds to fuel the mission and share in the magic.",
      color: "border-zinc-200 dark:border-zinc-800 bg-card/50",
      glowClass: "shadow-[0_0_60px_rgba(255,215,0,0.7),0_0_25px_rgba(255,165,0,0.4)]",
      button: "Become Angel",
    },
    {
      role: "I'm SuperFarmer",
      image: farmerImg,
      price: "From $500 pm • 50-99% Profit Pay",
      benefit: "We want to boost the ecosystem, plant seeds for growth, and invite our friends.",
      color: "border-green-600/30 bg-green-600/5",
      glowClass: "shadow-[0_0_60px_rgba(34,197,94,0.4),0_0_25px_rgba(34,197,94,0.2)]",
      button: "Plant Seeds",
    },
  ];

  const steps = [
    { step: "01", title: "1-Click Entry", desc: "Sign up instantly with SSO or Video verification.", icon: <Video />, link: "/login" },
    { step: "02", title: "Daily Mission", desc: "Follow AI-monitored task programs with smart prompts.", icon: <Flame />, link: "/login" },
    { step: "03", title: "Claim Rewards", desc: "Saturday 0700 UTC: Enjoy your magical rewards.", icon: <Star />, link: "https://calendar.google.com" }
  ];

  return (
    <section id="flame-game" className="relative pt-40 pb-24 px-6 overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes breathe {
          0%, 100% { transform: scale(1); filter: brightness(100%); }
          50% { transform: scale(1.08); filter: brightness(115%); }
        }
        .animate-breathe { animation: breathe 4s ease-in-out infinite; }
      `}} />

      <div className="container mx-auto max-w-7xl relative z-10">
        
        {/* 1. INTRO VIDEO BOX (Placeholder for when you ask John) */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="aspect-video w-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl flex flex-col items-center justify-center gap-4 relative overflow-hidden group hover:border-orange-600/50 transition-colors">
            {/* Subtle radial backdrop to look purposeful */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="w-20 h-20 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-orange-600/30 group-hover:scale-110 transition-transform cursor-pointer">
              <Play size={36} fill="white" className="ml-1" />
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                Intro Video Placeholder
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Insert approved video here (Ask John which one is best)
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-zinc-900 dark:text-white">
            Welcome to the <span className="text-orange-600">Flame Game</span>
          </h2>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-light tracking-wide">
            Help your family save the universe(s) & enjoy magical rewards. 
            <span className="block text-orange-600 font-bold mt-2 italic">Forever Free & Open Source.</span>
          </p>
        </div>

        {/* 3. Photos and Text much bigger / Grid fits 5 columns on large displays */}
        <div id="tiers" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 border-none mb-24">
          {tiers.map((tier, i) => (
            <div key={i} className={`p-8 flex flex-col items-center text-center transition-all border border-zinc-100 dark:border-zinc-800 ${tier.color}`}>
              
              <div className="relative mb-8 mt-2">
                {/* Images increased from w-24/w-44 to massive w-36/w-56 */}
                <div className={`w-36 h-36 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-white/20 animate-breathe ${tier.glowClass}`}>
                  <img src={tier.image} alt={tier.role} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Title Text enlarged to 3xl */}
              <h4 className="text-xl md:text-3xl font-black text-zinc-900 dark:text-white uppercase italic mb-2">{tier.role}</h4>
              
              {/* Pricing text enlarged */}
              <div className="text-orange-600 font-bold text-sm md:text-base mb-3">{tier.price}</div>
              
              {/* Benefit quote enlarged */}
              <p className="text-zinc-600 dark:text-zinc-300 text-xs md:text-sm mb-8 min-h-[60px] italic leading-relaxed">
                "{tier.benefit}"
              </p>
              
              <Link 
                to="/login"
                onClick={playClickSound}
                className={`w-full py-4 md:py-5 font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 mt-auto ${
                  tier.featured ? "bg-orange-600 text-white hover:bg-orange-500 shadow-[0_0_20px_rgba(234,88,12,0.4)]" : "bg-zinc-900/10 dark:bg-white/10 text-zinc-900 dark:text-white hover:bg-zinc-900/20 dark:hover:bg-white/20"
                }`}
              >
                {tier.button} <ChevronRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((item, idx) => {
            const isExternal = item.link?.startsWith('http');
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
              </div>
            );
            return isExternal ? <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">{CardContent}</a> : <Link key={idx} to={item.link || "#"} className="block h-full">{CardContent}</Link>;
          })}
        </div>
      </div>
    </section>
  );
};

export default FlameGame;
