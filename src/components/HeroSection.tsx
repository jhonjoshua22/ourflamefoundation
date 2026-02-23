import { ArrowRight, Users, Flag, ThumbsUp } from "lucide-react";
import heroImage from "@/assets/hero-professionals.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professionals united for community change"
          /* FIX 1: Added opacity and brightness control. 
             In light mode, we dim it slightly more so the white text/gradients pop.
          */
          className="w-full h-full object-cover object-center opacity-90 dark:opacity-100 brightness-[0.85] dark:brightness-100 transition-all duration-500"
        />
        
        {/* FIX 2: The "Contrast Guard". 
           This subtle dark tint ensures that even if the background is white, 
           the image behind the text has depth.
        */}
        <div className="absolute inset-0 bg-black/10 dark:bg-transparent" />

        {/* Existing Gradients - These now transition smoothly with the theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-flame-orange animate-pulse" />
            <span className="text-sm font-medium text-flame-orange">
              Empowering Communities Since 2002
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 tracking-tight">
            Ignite Change,{" "}
            <span className="flame-text">Transform Lives</span>
          </h1>

          <div className="space-y-4 mb-8">
            <p className="text-xl text-muted-foreground leading-relaxed font-medium">
              We aim to help families locally & globally improve their lives dramatically via expert support for all of modern life's challenges!
            </p>
            <p className="text-lg text-muted-foreground/80 leading-relaxed italic border-l-2 border-flame-orange/30 pl-4">
              Our superpower is our neurodiversity. We help you plan for meetings with experts to minimize wasted time.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="https://www.youtube.com/@MagicworldsTV"
              className="inline-flex items-center justify-center gap-2 flame-gradient px-8 py-4 rounded-full font-semibold text-lg text-white hover:scale-105 transition-all ember-glow shadow-xl"
            >
              Start Learning!
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#impact"
              /* FIX 3: Changed border and background for better light mode visibility 
              */
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg border border-border bg-background/50 backdrop-blur-sm hover:bg-muted transition-all"
            >
              See Our Hot Topics
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border/50">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <Users className="w-5 h-5 text-flame-orange" />
                <span className="font-display text-2xl md:text-3xl font-bold">50 000+</span>
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Followers</span>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <Flag className="w-5 h-5 text-flame-orange" />
                <span className="font-display text-2xl md:text-3xl font-bold">100 000+</span>
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Supported</span>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <ThumbsUp className="w-5 h-5 text-flame-orange" />
                <span className="font-display text-2xl md:text-3xl font-bold">3.5M</span>
              </div>
              <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">2026 Target</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
