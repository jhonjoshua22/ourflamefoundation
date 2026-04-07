import { ArrowRight, Users, Flag, ThumbsUp, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom"; // Added for the Link tag in tiers
import heroImage from "@/assets/hero-professionals.png";
import clickSound from "@/assets/button.m4a"; 

// Dynamic imports for the tier images
import partnerImg from "@/assets/partners.jpg"; 
import scoutImg from "@/assets/scout.png";
import stormtrooperImg from "@/assets/superheroes.png";
import angelImg from "@/assets/angel.png";
import farmerImg from "@/assets/superfarmer.png";

const HeroSection = () => {
  // Sound helper function
  const playClickSound = () => {
    new Audio(clickSound).play().catch(e => console.log("Audio playback failed", e));
  };

  const tiers = [
    {
      role: "Partner",
      image: partnerImg,
      price: "Forever Free",
      benefit: "We just want to help all our stakeholders ethically.",
      color: "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50", 
      button: "I'm Partner",
    },
    {
      role: "Normies",
      image: scoutImg,
      price: "From $1 pm • Concessions Available",
      benefit: "We just want to enjoy our lives via work, family, hobbies & friends.",
      color: "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50", 
      button: "I'm Normal",
    },
    {
      role: "Superheros",
      image: stormtrooperImg,
      price: "From $5 pm • 50-99% Profit Pay",
      benefit: "We want to use our 10x Superbot powers to do good and earn rewards.",
      color: "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50",
      button: "I'm SuperHero",
    },
    {
      role: "Angels",
      image: angelImg,
      price: "From $50 pm • 50-99% Profit Pay",
      benefit: "We want to provide the funds to fuel the mission and share in the magic.",
      color: "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50",
      button: "I'm Angel",
    },
    {
      role: "SuperFarmers",
      image: farmerImg,
      price: "From $500 pm • 50-99% Profit Pay",
      benefit: "We want to boost the ecosystem, plant seeds for growth, and invite our friends.",
      color: "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50",
      button: "I'm SuperFarmer",
    },
  ];

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

            {/* Sharp Buttons - Linked to #tiers */}
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

      {/* TIERS CONTAINER - Custom 6-Column Grid to safely yield a 3+2 visual flow */}
      <div className="container mx-auto px-6 py-24">
        <div id="tiers" className="scroll-mt-24 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-6 gap-6">
          {tiers.map((tier, i) => {
            // Cards 1, 2, 3 take up 2 grid columns each (Total 6 = perfectly fits 1 row)
            // Cards 4, 5 take up 2 grid columns each, but we push card 4 over by 1 column on desktop to center the bottom row
            const gridClasses = 
              i < 3 
                ? "md:col-span-2" 
                : i === 3 
                ? "md:col-span-2 md:col-start-2" 
                : "md:col-span-2";

            return (
              <div key={i} className={`${gridClasses} p-8 border rounded-2xl flex flex-col justify-between transition-all hover:shadow-lg ${tier.color}`}>
                <div>
                  <div className="flex flex-col items-center text-center mb-6">
                    {/* Big centered circle pictures */}
                    <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl mb-6 bg-zinc-100 dark:bg-zinc-800">
                      <img 
                        src={tier.image} 
                        alt={tier.role} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }} 
                      />
                    </div>
                    <h4 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white uppercase italic">{tier.role}</h4>
                    <div className="text-orange-600 font-bold text-xs mt-1">{tier.price}</div>
                  </div>
                  
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm text-center italic leading-relaxed mb-8 min-h-[60px]">
                    "{tier.benefit}"
                  </p>
                </div>
                
                <Link 
                  to="/login"
                  onClick={playClickSound}
                  className="w-full py-3.5 font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 rounded-lg bg-zinc-900/10 dark:bg-white/10 text-zinc-900 dark:text-white hover:bg-zinc-900/20 dark:hover:bg-white/20"
                >
                  {tier.button} <ChevronRight size={14} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default HeroSection;
