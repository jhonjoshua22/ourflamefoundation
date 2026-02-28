import React from "react";
import { Shield, Target, Flame, ChevronRight, Zap, Video, Star } from "lucide-react";

const FlameGame = () => {
  const tiers = [
    {
      role: "Scouts",
      icon: <Zap className="text-blue-500" />,
      price: "Forever Free",
      benefit: "Target: $1/mo pay-out",
      color: "border-border bg-card/50", 
      button: "Join Scouts",
    },
    {
      role: "Stormtroopers",
      icon: <Target className="text-orange-600" />,
      price: "From $10 pm",
      benefit: "7% Revenue Share",
      color: "border-orange-600 bg-orange-600/10 shadow-[0_0_20px_rgba(234,88,12,0.1)]",
      button: "Recruit Me",
      featured: true,
    },
    {
      role: "Angels",
      icon: <Shield className="text-yellow-500" />,
      price: "From $100 pm",
      benefit: "0.7% Revenue Share",
      color: "border-border bg-card/50",
      button: "Become Angel",
    },
  ];

  return (
    <section id="flame-game" className="relative py-24 px-6 overflow-hidden bg-white dark:bg-black">
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-zinc-900 dark:text-white">
            Welcome to the <span className="text-orange-600">Flame Game</span>
          </h2>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-light tracking-wide">
            Help your family save the universe(s) & enjoy magical rewards. 
            <span className="block text-orange-600 font-bold mt-2 italic">Forever Free & Open Source.</span>
          </p>
          <div className="flex items-center justify-center gap-2 text-sm uppercase tracking-[0.3em] text-zinc-400 pt-4">
            <Star size={14} className="animate-pulse" />
            Recruiting: Scouts, Stormtroopers & Angels
            <Star size={14} className="animate-pulse" />
          </div>
        </div>

        {/* 3 Steps Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { step: "01", title: "1-Click Entry", desc: "Sign up instantly with SSO or Video verification.", icon: <Video />, link: "/login" },
            { step: "02", title: "Daily Mission", desc: "Follow AI-monitored task programs with smart prompts.", icon: <Flame />, link: "#tiers" },
            { step: "03", title: "Claim Rewards", desc: "Saturday 0700 UTC: Enjoy your magical rewards.", icon: <Star />, link: null }
          ].map((item, idx) => (
            <div key={idx} className="relative p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 backdrop-blur-sm group hover:border-orange-600 transition-all cursor-pointer">
              <span className="text-6xl font-black text-zinc-900/5 dark:text-white/5 absolute top-4 right-4 group-hover:text-orange-600/10 transition-colors">
                {item.step}
              </span>
              <div className="text-orange-600 mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 uppercase">
                {item.link ? (
                  <a href={item.link} className="hover:text-orange-600 transition-colors">{item.title}</a>
                ) : item.title}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 3x3 Ticket Grid */}
        <div id="tiers" className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-100 dark:border-zinc-800 overflow-hidden">
          {tiers.map((tier, i) => (
            <div 
              key={i} 
              className={`p-10 flex flex-col items-center text-center transition-all border-zinc-100 dark:border-zinc-800 border ${tier.color}`}
            >
              <div className="mb-6 p-4 bg-zinc-900/5 dark:bg-white/5 rounded-full">{tier.icon}</div>
              <h4 className="text-3xl font-black text-zinc-900 dark:text-white uppercase italic mb-2">{tier.role}</h4>
              <div className="text-orange-600 font-bold text-lg mb-1">{tier.price}</div>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-8">{tier.benefit}</p>
              
              <button className={`w-full py-4 font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${
                tier.featured ? "bg-orange-600 text-white hover:bg-orange-500" : "bg-zinc-900/10 dark:bg-white/10 text-zinc-900 dark:text-white hover:bg-zinc-900/20 dark:hover:bg-white/20"
              }`}>
                {tier.button} <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Join Queue Footer */}
        <div className="mt-16 text-center">
          <p className="text-zinc-400 uppercase tracking-[0.5em] text-[10px] font-black">
            Join your queues please ... Recruitment is Active
          </p>
        </div>
      </div>
    </section>
  );
};

export default FlameGame;
