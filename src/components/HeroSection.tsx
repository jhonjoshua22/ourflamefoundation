import { ArrowRight, Users, Flag, ThumbsUp, Bot, Scale, Heart, Globe } from "lucide-react";
import heroImage from "@/assets/hero-professionals.png";
import clickSound from "@/assets/button.m4a"; 

const HeroSection = () => {
  // Sound helper function
  const playClickSound = () => {
    new Audio(clickSound).play().catch(e => console.log("Audio playback failed", e));
  };

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background transition-colors duration-500"
      >
        {/* Background Container */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Professionals"
            className="w-full h-full object-cover object-center 
                       brightness-[0.7] contrast-[1.1] 
                       dark:brightness-[0.4] dark:contrast-125 
                       transition-all duration-700"
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-none mb-8 backdrop-blur-sm">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">
                Empowering Communities Since 1876
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8 text-foreground uppercase italic tracking-tighter">
              Ignite <span className="text-orange-600 not-italic">Change</span>,<br />
              <span>Transform Lives</span>
            </h1>

            <div className="space-y-6 mb-12">
              <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed max-w-2xl">
                Unlock exclusive access to top-tier health resources, global networking tracks, and premium member perks. Our platform is built to recognize your drive and heavily reward your active community contributions.
              </p>
              
              <div className="border-l-2 border-orange-600 pl-6 py-1">
                <p className="text-sm md:text-base text-muted-foreground uppercase tracking-widest leading-relaxed">
                  Your dedication fuels our engine. Step into a personalized ecosystem where every milestone you achieve unlocks <span className="text-foreground font-black">custom perks</span> and tangible corporate rewards.
                </p>
              </div>
            </div>

            {/* Sharp Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-20">
              <a
                href="#tiers"
                onClick={playClickSound}
                className="inline-flex items-center justify-center gap-3 bg-orange-600 px-10 py-5 rounded-none font-black text-xs uppercase tracking-[0.2em] text-white hover:bg-orange-500 transition-all active:scale-95"
              >
                More Info
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/login"
                onClick={playClickSound}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-none font-black text-xs uppercase tracking-[0.2em] border border-border bg-background/40 text-foreground hover:bg-foreground hover:text-background transition-all"
              >
                My Rewards
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Master Bot Section */}
      <div className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 p-12 md:p-20 border-t-8 border-orange-600 relative overflow-hidden text-center">
        <Bot className="w-16 h-16 text-orange-600 mx-auto mb-10" />
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic leading-none mb-8">
          Supporting the <br/><span className="text-orange-600 not-italic uppercase">Busy Family.</span>
        </h2>
        <p className="text-zinc-400 dark:text-zinc-500 text-lg max-w-3xl mx-auto leading-relaxed mb-16 font-medium uppercase tracking-tight text-center">
          Extra tasks lead to excessive stress. Our Flame Foundation feeds into a dedicated 
          <span className="text-white dark:text-black font-black"> Magic World Master Bot</span> to manage your life with precision.
        </p>
        
        <div className="container mx-auto max-w-7xl grid md:grid-cols-3 gap-px bg-white/10 dark:bg-zinc-200 border border-white/10 dark:border-zinc-200">
          {[
            { icon: <Scale size={24}/>, title: "Life Management", desc: "Money, jobs, legal prep, and stress coping." },
            { icon: <Heart size={24}/>, title: "Modern Living", desc: "Relationships, relaxation, and sustainable fun." },
            { icon: <Globe size={24}/>, title: "Universal Good", desc: "Improving the universe for all sentient beings." }
          ].map((box, i) => (
            <div key={i} className="bg-zinc-900 dark:bg-white p-10 text-left hover:bg-zinc-800 dark:hover:bg-zinc-50 transition-colors">
              <div className="text-orange-600 mb-6">{box.icon}</div>
              <h5 className="font-black uppercase italic text-xl tracking-tight mb-3">{box.title}</h5>
              <p className="text-xs uppercase font-medium text-zinc-400 dark:text-zinc-500 leading-relaxed tracking-wider">{box.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
