import React from "react";
import { Shield, Target, Flame, ChevronRight, Zap, Video, Star } from "lucide-react";

const FlameGame = () => {
  const tiers = [
    {
      role: "Scouts",
      icon: <Zap className="text-blue-500" />,
      price: "Forever Free",
      benefit: "Target: $1/mo pay-out",
      // Light: bg-white | Dark: bg-white/5
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
    <section id="flame-game" className="relative py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase text-foreground">
            Welcome to the <span className="text-orange-600">Flame Game</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light tracking-wide">
            Help your family save the universe(s) & enjoy magical rewards. 
            <span className="block text-orange-600 font-bold mt-2 italic">Forever Free & Open Source.</span>
          </p>
          <div className="flex items-center justify-center gap-2 text-sm uppercase tracking-[0.3em] text-muted-foreground/60 pt-4">
            <Star size={14} className="animate-pulse" />
            Recruiting: Scouts, Stormtroopers & Angels
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
            <div key={idx} className="relative p-8 bg-card border border-border backdrop-blur-sm group hover:border-orange-600 transition-all">
              <span className="text-6xl font-black text-foreground/5 absolute top-4 right-4 group-hover:text-orange-600/10 transition-colors">
                {item.step}
              </span>
              <div className="text-orange-600 mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-foreground mb-2 uppercase">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 3x3 Ticket Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border overflow-hidden">
          {tiers.map((tier, i) => (
            <div 
              key={i} 
              className={`p-10 flex flex-col items-center text-center transition-all border-border border ${tier.color}`}
            >
              <div className="mb-6 p-4 bg-foreground/5 rounded-full">{tier.icon}</div>
              <h4 className="text-3xl font-black text-foreground uppercase italic mb-2">{tier.role}</h4>
              <div className="text-orange-600 font-bold text-lg mb-1">{tier.price}</div>
              <p className="text-muted-foreground text-sm mb-8">{tier.benefit}</p>
              
              <button className={`w-full py-4 font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 ${
                tier.featured ? "bg-orange-600 text-white hover:bg-orange-500" : "bg-foreground/10 text-foreground hover:bg-foreground/20"
              }`}>
                {tier.button} <ChevronRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Join Queue Footer */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground/40 uppercase tracking-[0.5em] text-[10px] font-black">
            Join your queues please ... Recruitment is Active
          </p>
        </div>
      </div>
    </section>
  );
};

export default FlameGame;
