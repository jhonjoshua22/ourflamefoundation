import { ArrowRight, Users, Flag, ThumbsUp } from "lucide-react";
import heroImage from "@/assets/hero-professionals.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      /* Back to dynamic background: bg-background (standard) or bg-white dark:bg-[#0a0a0a] */
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background transition-colors duration-500"
    >
      {/* Background Container - IMAGE IS UNTOUCHED, only filtered for legibility */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professionals"
          className="w-full h-full object-cover object-center 
                     brightness-[0.7] contrast-[1.1] 
                     dark:brightness-[0.4] dark:contrast-125 
                     transition-all duration-700"
        />
        
        {/* Dynamic Gradients: Adapts to Light/Dark mode via 'from-background' */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent transition-all duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          
          {/* Sharp Badge - Removed all rounding */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-none bg-orange-600/10 border border-orange-600/30 mb-8 backdrop-blur-sm">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">
              Empowering Communities Since 2002
            </span>
          </div>

          {/* Heading - Uses 'text-foreground' to swap between Black/White automatically */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8 text-foreground uppercase italic tracking-tighter">
            Ignite <span className="text-orange-600 not-italic">Change</span>,<br />
            <span>Transform Lives</span>
          </h1>

          <div className="space-y-6 mb-12">
            <p className="text-xl md:text-2xl text-foreground/80 font-light leading-relaxed max-w-2xl">
              A global incubator dedicated to reducing complexity. 
              Fusing <span className="font-bold">AI, blockchain</span>, and expert human support to improve lives.
            </p>
            
            <div className="border-l-2 border-orange-600 pl-6 py-1">
              <p className="text-sm md:text-base text-muted-foreground uppercase tracking-widest leading-relaxed">
                Our superpower is our <span className="text-foreground font-black">neurodiversity</span>. 
                We eliminate wasted time through precision planning.
              </p>
            </div>
          </div>

          {/* Sharp Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-20">
            <a
              href="https://www.youtube.com/@MagicworldsTV"
              className="inline-flex items-center justify-center gap-3 bg-orange-600 px-10 py-5 rounded-none font-black text-xs uppercase tracking-[0.2em] text-white hover:bg-orange-500 transition-all active:scale-95"
            >
              Start Learning
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#impact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-none font-black text-xs uppercase tracking-[0.2em] border border-border bg-background/40 text-foreground hover:bg-foreground hover:text-background transition-all"
            >
              Our Hot Topics
            </a>
          </div>

          {/* Stats Section - Colors switch based on theme */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-12 border-t border-border">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-orange-600" />
                <span className="text-4xl font-black tracking-tighter text-foreground">50K+</span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-muted-foreground">Followers</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Flag className="w-5 h-5 text-orange-600" />
                <span className="text-4xl font-black tracking-tighter text-foreground">100K+</span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-muted-foreground">Supported</p>
            </div>

            <div className="space-y-2 col-span-2 md:col-span-1">
              <div className="flex items-center gap-3">
                <ThumbsUp className="w-5 h-5 text-orange-600" />
                <span className="text-4xl font-black tracking-tighter text-foreground">3.5M</span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-muted-foreground">2026 Foundation Goal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
