import React from "react";
import { Flame, ShieldCheck, Trophy, ArrowUpRight, Gift, Target, Shield, Sparkles } from "lucide-react";

// CUSTOM VECTOR GRAPHICS FOR RANKS
const ScoutIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-orange-800/20 stroke-orange-700 stroke-[1.5] animate-pulse">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8M8 12h8" />
    <path d="M12 2L12 4M12 20L12 22M2 12L4 12M20 12L22 12" />
  </svg>
);

const TrooperIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-zinc-500/20 stroke-zinc-400 stroke-[1.5]">
    <path d="M12 2L4 5v6.71c0 4.66 3.45 8.79 8 9.29 4.55-.5 8-4.63 8-9.29V5l-8-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const AngelIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-yellow-500/20 stroke-yellow-500 stroke-[1.5] animate-spin-slow">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    <circle cx="12" cy="12" r="3" className="fill-white" />
  </svg>
);

const ProcessSection = () => {
  const steps = [
    { number: "01", title: "ONBOARDING", desc: "Join your chosen session and receive your exclusive Flame merch to begin your journey.", badge: "Scout Enlisted" },
    { number: "02", title: "WEEKLY ACTIVITIES", desc: "Complete improvement activities weekly. Your Flame team is dedicated to cheering you toward success.", badge: "Trooper Training" },
    { number: "03", title: "SUCCESS REPORTING", desc: "Report daily successes via video. This consistency unlocks weekly prizes and recognition.", badge: "Angel Ascension" },
  ];

  const rankingItems = [
    { label: ">100% Complete", rank: "Flame Flyer Rank + Bonus Prize", color: "text-orange-600", icon: <Sparkles size={14}/> },
    { label: "100% Complete", rank: "3 Flame Rank - Top Performer", color: "text-orange-500", icon: <Trophy size={14}/> },
    { label: "<100% Complete", rank: "2 Flame Rank - Extra Support", color: "text-zinc-500", icon: <Shield size={14}/> },
    { label: "<50% Complete", rank: "1 Flame Rank - Pivot", color: "text-zinc-400", icon: <Target size={14}/> },
  ];

  const partnerTiers = [
    { title: "Gold Partner", range: "60-100%", icon: <AngelIcon /> },
    { title: "Silver Partner", range: "10-60%", icon: <TrooperIcon /> },
    { title: "Bronze Partner", range: "<10%", icon: <ScoutIcon /> },
  ];

  const communityPrizes = [
    { level: "Bronze", reward: "FREE Magic Gems & Merch", rankName: "SCOUT" },
    { level: "Silver", reward: "$1 pm per family (wholesale) Magic Bots", rankName: "TROOPER" },
    { level: "Gold", reward: "SuperBot $10 pm per fam (wholesale)", rankName: "ANGEL" },
  ];

  return (
    <section id="process" className="py-24 bg-white dark:bg-black font-sans border-t border-zinc-100 dark:border-zinc-900 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic">
            How the <span className="text-orange-600 not-italic uppercase underline decoration-orange-600/30">Foundation Works</span>
          </h2>
          <div className="text-[10px] font-mono text-orange-600 tracking-widest bg-orange-600/5 px-4 py-2 border border-orange-600/20">
            SECTOR_ID: 07-FLAME // MISSION_HUB
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
          
          {/* LEFT SIDE: JOURNEY */}
          <div className="bg-white dark:bg-black p-8 md:p-12 flex flex-col justify-between gap-16 relative">
            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-8 items-start group">
                  <div className="relative">
                    <span className="text-sm font-black text-orange-600 tracking-tighter block group-hover:scale-150 transition-transform duration-500">
                      {step.number}
                    </span>
                    <div className="absolute -left-2 top-0 h-full w-[1px] bg-orange-600/20 group-hover:bg-orange-600 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-[9px] font-black uppercase text-orange-600/50 tracking-[0.2em]">{step.badge}</div>
                    <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-tight group-hover:text-orange-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30 p-6">
              <div className="flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
                <ShieldCheck size={16} className="text-orange-600 animate-pulse" />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Nota Bene (NB)</h4>
              </div>
              <ul className="space-y-3 text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug font-bold uppercase tracking-tight">
                <li className="flex items-start gap-2"><span className="text-orange-600">»</span> Activities relate to requested help (Money, Jobs, Love, etc).</li>
                <li className="flex items-start gap-2"><span className="text-orange-600">»</span> Tasks are performed in wasted time day to day.</li>
                <li className="flex items-start gap-2"><span className="text-orange-600">»</span> No blocking of quality family or work time permitted.</li>
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE: RANKINGS & REWARDS */}
          <div className="bg-zinc-50 dark:bg-zinc-950 p-8 md:p-12 flex flex-col gap-10">
            
            {/* Personal Ranking */}
            <div className="relative overflow-hidden group">
              <div className="flex items-center gap-2 mb-6 text-orange-600">
                <Flame size={16} className="animate-bounce" />
                <h4 className="text-xs font-black uppercase tracking-[0.3em]">Personal Ranking</h4>
              </div>
              <div className="space-y-3 relative z-10">
                {rankingItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-3 last:border-0 hover:pl-2 transition-all group/item">
                    <div className="flex items-center gap-3">
                        <span className="opacity-0 group-hover/item:opacity-100 text-orange-600 transition-opacity">
                            {item.icon}
                        </span>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>
                            {item.label}
                        </span>
                    </div>
                    <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-black uppercase italic">
                        {item.rank}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner Commitment Tiers (Stormtroopers, Scouts, Angels) */}
            <div>
              <div className="flex items-center gap-2 mb-6 text-zinc-900 dark:text-white">
                <Target size={16} className="text-orange-600" />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Partner Tiers</h4>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {partnerTiers.map((tier, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-4 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 text-center hover:border-orange-600 transition-all group cursor-pointer">
                    <div className="mb-3 transform group-hover:scale-125 transition-transform duration-300">
                        {tier.icon}
                    </div>
                    <span className="text-[8px] font-black uppercase text-zinc-400 mb-1">{tier.title}</span>
                    <span className="text-[12px] font-black text-orange-600">{tier.range}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* REWARDS SECTION */}
            <div className="bg-orange-600 p-8 text-white relative overflow-hidden group">
              <Sparkles className="absolute top-0 right-0 w-32 h-32 opacity-10 -rotate-12 group-hover:rotate-12 transition-transform duration-1000" />
              <div className="flex items-center gap-2 mb-6 relative z-10">
                <Gift size={16} />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Ascension Rewards</h4>
              </div>
              <div className="space-y-3 relative z-10">
                {communityPrizes.map((prize, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-black/20 border border-white/10 backdrop-blur-sm">
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black opacity-60 tracking-widest">{prize.rankName} RANK</span>
                        <span className="text-[11px] font-black uppercase tracking-widest">{prize.level}</span>
                    </div>
                    <span className="text-[11px] font-bold text-white text-right max-w-[150px]">{prize.reward}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
              <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-tighter">
                Official Enlistment:{" "}
                <a 
                  href="https://drive.google.com/drive/folders/1aFXb-glex8tp_zs3Ltf6KoMN8nYH7xen" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-orange-600 font-black hover:underline inline-flex items-center gap-1 group ml-1"
                >
                  PARTNERS_PORTAL
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
