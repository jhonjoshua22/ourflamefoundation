import { ArrowRight, Users, Flag, ThumbsUp } from "lucide-react";
import heroImage from "@/assets/hero-professionals.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background"
    >
      {/* Background Container */}
      <div className="absolute inset-0 z-0">
        {/* The Image: Heavily dimmed in light mode to create immediate contrast */}
        <img
          src={heroImage}
          alt="Professionals"
          className="w-full h-full object-cover object-center 
                     brightness-[0.6] contrast-[1.1] 
                     dark:brightness-[0.8] dark:contrast-100 
                     transition-all duration-700"
        />
        
        {/* LAYER 1: The "Blackout" Gradient (Light Mode Only)
            This ensures the left side is NEVER white behind the text. */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent dark:hidden" />

        {/* LAYER 2: The Theme Gradient 
            Forces a solid background color on the left 60% of the screen. */}
        <div className="absolute inset-0 bg-gradient-to-r 
                        from-background via-background/95 to-transparent 
                        md:from-background md:via-background/80 md:to-transparent 
                        transition-all duration-500" />

        {/* LAYER 3: The Bottom Fade 
            Blends the hero into the next section. */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          {/* Badge with Backdrop Blur */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 dark:bg-primary/10 border border-white/20 dark:border-primary/30 mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-flame-orange animate-pulse" />
            <span className="text-sm font-semibold uppercase tracking-wider text-flame-orange">
              Empowering Communities Since 2002
            </span>
          </div>

          {/* Heading with Text Shadow for extra punch */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 drop-shadow-md text-foreground transition-colors duration-500">
            Ignite Change,{" "}
            <span className="flame-text">Transform Lives</span>
          </h1>

          <div className="space-y-6 mb-10">
            <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed max-w-xl">
              Helping families locally & globally improve their lives via expert support for money, health, & arts!
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed border-l-4 border-flame-orange/50 pl-6 bg-white/5 dark:bg-transparent py-2 rounded-r-lg">
              Our superpower is our <span className="text-foreground font-bold italic">neurodiversity</span>. 
              We help you plan meetings with experts to minimize wasted time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 mb-16">
            <a
              href="https://www.youtube.com/@MagicworldsTV"
              className="inline-flex items-center justify-center gap-3 flame-gradient px-10 py-4 rounded-full font-bold text-lg text-white hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-flame-orange/40"
            >
              Start Learning!
              <ArrowRight className="w-6 h-6" />
            </a>
            <a
              href="#impact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold text-lg border-2 border-border bg-background/40 backdrop-blur-md hover:bg-foreground hover:text-background transition-all"
            >
              See Our Hot Topics
            </a>
          </div>

          {/* Stats Section with Divider */}
          <div className="grid grid-cols-3 gap-8 pt-10 border-t border-border/40">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-flame-orange" />
                <span className="font-display text-3xl font-extrabold tracking-tight">50K+</span>
              </div>
              <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Followers</p>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Flag className="w-6 h-6 text-flame-orange" />
                <span className="font-display text-3xl font-extrabold tracking-tight">100K+</span>
              </div>
              <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Supported</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-6 h-6 text-flame-orange" />
                <span className="font-display text-3xl font-extrabold tracking-tight">3.5M</span>
              </div>
              <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground">2026 Goal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
