import { ArrowRight, Users, Flag, ThumbsUp } from "lucide-react";
import heroImage from "@/assets/hero-professionals.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professionals united for community change"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
            <span className="w-2 h-2 rounded-full bg-flame-orange animate-pulse" />
            <span className="text-sm font-medium text-flame-orange">
              Empowering Communities Since 2024
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Ignite Change,{" "}
            <span className="flame-text">Transform Lives</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Join professionals from all walks of life—engineers, business
            leaders, and advocates—to report, surface, and vote on local
            issues that matter to your community.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 flame-gradient px-8 py-4 rounded-full font-semibold text-lg text-primary-foreground hover:opacity-90 transition-all ember-glow"
            >
              Report an Issue
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#impact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-lg border border-border hover:bg-muted transition-colors"
            >
              See Our Impact
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <Users className="w-5 h-5 text-flame-orange" />
                <span className="font-display text-2xl md:text-3xl font-bold">
                  12K+
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                Active Members
              </span>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <Flag className="w-5 h-5 text-flame-orange" />
                <span className="font-display text-2xl md:text-3xl font-bold">
                  850+
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                Issues Resolved
              </span>
            </div>
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <ThumbsUp className="w-5 h-5 text-flame-orange" />
                <span className="font-display text-2xl md:text-3xl font-bold">
                  45K+
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                Community Votes
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
