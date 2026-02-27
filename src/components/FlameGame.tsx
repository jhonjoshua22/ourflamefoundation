import React from "react";
import { Shield, Target, Flame, ChevronRight, Zap, Video, Star } from "lucide-react";

const FlameGame = () => {
  const tiers = [
    {
      role: "Scouts",
      icon: <Zap className="text-blue-400" />,
      price: "Forever Free",
      benefit: "We aim to pay you $1/mo",
      color: "border-blue-500/30 bg-blue-500/5",
      button: "Join Scouts",
    },
    {
      role: "Stormtroopers",
      icon: <Target className="text-orange-500" />,
      price: "From $10 pm",
      benefit: "Earn 7% of Revenue",
      color: "border-orange-600 bg-orange-600/10 shadow-[0_0_20px_rgba(234,88,12,0.2)]",
      button: "Recruit Me",
      featured: true,
    },
    {
      role: "Angels",
      icon: <Shield className="text-yellow-400" />,
      price: "From $100 pm",
      benefit: "Earn 0.7% of Revenue",
      color: "border-yellow-500/30 bg-yellow-500/5",
      button: "Become Angel",
    },
  ];

  return (
    <section id="flame-game" className="relative py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-white">
            Welcome to the <span className="text-orange-600">Flame Game</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light tracking-wide">
            Help your family save the universe(s) & enjoy magical rewards. 
            <span className="block text-orange-500 font-bold mt-2 italic">Forever Free & Open Source.</span>
          </p>
          <div className="flex items-center justify-center gap-2 text-sm uppercase tracking-[0.3em] text-white/60 pt-4">
            <Star size={14} className="animate-pulse" />
            Recruiting Today: Scouts, Stormtroopers & Angels
            <Star size={14} className="animate-pulse" />
          </div>
        </div>

        {/* 3 Steps Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { step: "01", title: "1-Click Entry", desc: "Sign up instantly with SSO or Video verification.", icon: <Video /> },
            { step: "02", title: "Daily Mission", desc: "Follow AI-monitored task programs with smart prompts.", icon: <Flame /> },
            { step: "03", title: "Claim Rewards", desc: "Saturday 0700 UTC: Enjoy your magical rewards.", icon: <Star /> }
          ].map((item, idx) => (
            <div key={idx} className="relative p-8 bg-white/5 border border-white/10 backdrop-blur-sm group hover:border-orange-500 transition-all">
              <span className="text-6xl font-black text-white/5 absolute top-4 right-4 group-hover:text-orange-600/20 transition-colors">
                {item.step}
              </span>
              <div className="text-orange-600 mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2 uppercase">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 3x3 Ticket Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 overflow-hidden">
          {tiers.map((tier, i) => (
            <div 
              key={i} 
              className={`p-10 flex flex-col items-center text-center transition-all border-white/10 border ${tier.color}`}
            >
              <div className="mb-6 p-4 bg-white/5 rounded-full">{tier.icon}</div>
              <h4 className="text-3xl font-black text-white uppercase italic mb-2">{tier.role}</h4>
              <div className="text-orange-500 font-bold text-lg mb-1">{tier.price}</div>
              <p className="text-gray-400 text-sm mb-8">{tier.benefit}</p>
              
              <button className={`w-full py-4 font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${
                tier.featured ? "bg-orange-600 text-white hover:bg-orange-500" : "bg-white/10 text-white hover:bg-white/20"
              }`}>
                {tier.button} <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Join Queue Text */}
        <div className="mt-16 text-center">
          <button className="text-white/40 hover:text-orange-500 uppercase tracking-[0.5em] text-[10px] font-black transition-all">
            Join your queues please ... Recruitment is Active
          </button>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/5 rounded-full blur-[120px] -z-10" />
    </section>
  );
};

export default FlameGame;
