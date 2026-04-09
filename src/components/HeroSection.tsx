import { ArrowRight, Users, Flag, ThumbsUp } from "lucide-react";
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

      {/* Stats Grid Footer */}
      <div className="container mx-auto px-6 py-12 border-t border-border/50">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
           <div className="flex flex-col items-center md:items-start">
             <Users className="text-orange-600 mb-2" />
             <span className="text-2xl font-black">50K+</span>
             <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Followers</span>
           </div>
           <div className="flex flex-col items-center md:items-start">
             <Flag className="text-orange-600 mb-2" />
             <span className="text-2xl font-black">100K+</span>
             <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Supported</span>
           </div>
           <div className="flex flex-col items-center md:items-start col-span-2 md:col-span-1">
             <ThumbsUp className="text-orange-600 mb-2" />
             <span className="text-2xl font-black">3.5M</span>
             <span className="text-[10px] uppercase tracking-widest text-muted-foreground">2026 Goal</span>
           </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
