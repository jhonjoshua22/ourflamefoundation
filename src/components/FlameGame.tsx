import React from "react";
import { Shield, Target, Flame, ChevronRight, Zap, Video, Star } from "lucide-react";

const FlameGame = () => {
  const tiers = [
    {
      role: "Scouts",
      icon: <Zap className="text-blue-500" />,
      image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=300", // Space Scout Theme
      price: "Forever Free",
      benefit: "Target: $1/mo pay-out",
      color: "border-border bg-card/50", 
      glow: "shadow-[0_0_30px_rgba(205,127,50,0.4)]", // Bronze Glow
      button: "Join Scouts",
    },
    {
      role: "Stormtroopers",
      icon: <Target className="text-orange-600" />,
      image: "https://images.unsplash.com/photo-1585366119957-e556f4002a0c?auto=format&fit=crop&q=80&w=300", // Soldier Theme
      price: "From $10 pm",
      benefit: "7% Revenue Share",
      color: "border-orange-600 bg-orange-600/10 shadow-[0_0_20px_rgba(234,88,12,0.1)]",
      glow: "shadow-[0_0_30px_rgba(192,192,192,0.4)]", // Silver Glow
      button: "Recruit Me",
      featured: true,
    },
    {
      role: "Angels",
      icon: <Shield className="text-yellow-500" />,
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=300", // Celestial Theme
      price: "From $100 pm",
      benefit: "0.7% Revenue Share",
      color: "border-border bg-card/50",
      glow: "shadow-[0_0_40px_rgba(255,215,0,0.5)]", // Gold Glow
      button: "Become Angel",
    },
  ];

  const steps = [
    { step: "01", title: "1-Click Entry", desc: "Sign up instantly with SSO or Video verification.", icon: <Video />, link: "/login" },
    { step: "02", title: "Daily Mission", desc: "Follow AI-monitored task programs with smart prompts.", icon: <Flame />, link: "#tiers" },
    { step: "03", title: "Claim Rewards", desc: "Saturday 0700 UTC: Enjoy your magical rewards.", icon: <Star />, link: null }
  ];

  return (
    <section id="flame-game" className="relative py-24 px-6 overflow-hidden bg-white dark:bg-black">
      {/* Global Style for the Breathing Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        .animate-breathe {
          animation: breathe 4s ease-in-out infinite;
        }
      `}} />

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
        </div>

        {/* 3 Steps Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((item, idx) => {
            const CardContent = (
              <div className={`relative h-full p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 backdrop-blur-sm group transition-all duration-300 ${item.link ? 'hover:border-orange-600 hover:scale-[1.02] cursor-pointer' : ''}`}>
                <span className="text-6xl font-black text-zinc-900/5 dark:text-white/5 absolute top-4 right-4 group-hover:text-orange-600/10 transition-colors">
                  {item.step}
                </span>
                <div className="text-orange-600 mb-4 transition-transform group-hover:scale-110 duration-300">{item.icon}</div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 uppercase group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                {item.link && (
                   <div className="mt-4 flex items-center text-[10px] font-black uppercase tracking-widest text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity">
                     Proceed <ChevronRight size={12} />
                   </div>
                )}
              </div>
            );

            return item.link ? (
              <a key={idx} href={item.link} className="block h-full">
                {CardContent}
              </a>
            ) : (
              <div key={idx} className="block h-full">
                {CardContent}
              </div>
            );
          })}
        </div>

        {/* 3x3 Ticket Grid */}
        <div id="tiers" className="scroll-mt-24 grid grid-cols-1 md:grid-cols-3 gap-0 border border-zinc-100 dark:border-zinc-800 overflow-hidden">
          {tiers.map((tier, i) => (
            <div 
              key={i} 
              className={`p-10 flex flex-col items-center text-center transition-all border-zinc-100 dark:border-zinc-800 border ${tier.color}`}
            >
              {/* Breathing Avatar Photo */}
              <div className="relative mb-8">
                <div className={`w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 animate-breathe ${tier.glow}`}>
                  <img 
                    src={tier.image} 
                    alt={tier.role} 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                {/* Small overlay icon */}
                <div className="absolute -bottom-2 -right-2 p-2 bg-black rounded-full border border-white/10">
                  {tier.icon}
                </div>
              </div>

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
      </div>
    </section>
  );
};

export default FlameGame;
