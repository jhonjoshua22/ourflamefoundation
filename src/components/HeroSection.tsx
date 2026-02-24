import { ArrowRight, Users, Flag, ThumbsUp } from "lucide-react";
import heroImage from "@/assets/hero-professionals.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background Container */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professionals"
          className="w-full h-full object-cover object-center 
                     brightness-[0.4] contrast-[1.1] 
                     dark:brightness-[0.3] dark:contrast-125 
                     transition-all duration-700"
        />
        
        {/* Foundation Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          
          {/* Sharp Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-none bg-orange-600/10 border border-orange-600/30 mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-orange-600 animate-pulse rounded-none" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-600">
              Empowering Communities Since 2002
            </span>
          </div>

          {/* Heading - Foundation Style */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-8 text-white uppercase italic tracking-tighter">
            Ignite <span className="text-orange-600 not-italic">Change</span>,<br />
            <span className="text-white">Transform Lives</span>
          </h1>

          <div className="space-y-6 mb-12">
            <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-2xl">
              A global incubator dedicated to reducing complexity. 
              Fusing <span className="text-white font-bold">AI, blockchain</span>, and expert human support to improve lives.
            </p>
            
            <div className="border-l-2 border-orange-600 pl-6 py-1">
              <p className="text-sm md:text-base text-zinc-500 uppercase tracking-widest leading-relaxed">
                Our superpower is our <span className="text-zinc-200 font-black">neurodiversity</span>. 
                We eliminate wasted time through precision planning.
              </p>
            </div>
          </div>

          {/* Sharp Buttons */}
          <div className="flex flex-col sm:row gap-4 mb-20">
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.youtube.com/@MagicworldsTV"
                className="inline-flex items-center justify-center gap-3 bg-orange-600 px-10 py-5 rounded-none font-black text-xs uppercase tracking-[0.2em] text-white hover:bg-orange-500 transition-all active:scale-95 shadow-[0_0_20px_rgba(234,88,12,0.3)]"
              >
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#impact"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-none font-black text-xs uppercase tracking-[0.2em] border border-zinc-800 bg-white/5 text-white hover:bg-white hover:text-black transition-all"
              >
                Our Hot Topics
              </a>
            </div>
          </div>

          {/* Stats Section - Clean & Industrial */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 pt-12 border-t border-zinc-900">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-orange-600" />
                <span className="text-4xl font-black tracking-tighter text-white">50K+</span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-600">Followers</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Flag className="w-5 h-5 text-orange-600" />
                <span className="text-4xl font-black tracking-tighter text-white">100K+</span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-600">Supported</p>
            </div>

            <div className="space-y-2 col-span-2 md:col-span-1">
              <div className="flex items-center gap-3">
                <ThumbsUp className="w-5 h-5 text-orange-600" />
                <span className="text-4xl font-black tracking-tighter text-white">3.5M</span>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-600">2026 Foundation Goal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
