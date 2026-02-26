import React from "react";
import { ArrowUpRight } from "lucide-react";

// STAR‑WARS STYLE ICONS (SVG ONLY)
const ScoutIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-yellow-400/10 stroke-yellow-500 stroke-[1.5] animate-pulse">
    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const TrooperIcon = () => (
  <svg viewBox="0 0 24 24" className="w-10 h-10 fill-zinc-500/10 stroke-zinc-400 stroke-[1.5]">
    <path d="M12 2c-3.3 0-6 2.7-6 6v2h12V8c0-3.3-2.7-6-6-6z" />
    <path d="M18 10v10l-6-2-6 2V10h12z" />
    <path d="M9 14h6M12 10v4" />
  </svg>
);

const AngelIcon = () => (
  <svg viewBox="0 0 24 24" className="w-12 h-12 fill-yellow-400/20 stroke-yellow-400 stroke-[1.5] animate-spin-slow">
    <path d="M12 2L9 9H2l6 5-2 7 6-4 6 4-2-7 6-5h-7l-3-7z" />
    <circle cx="12" cy="12" r="3" className="fill-white" />
  </svg>
);

// STAR WARS BADGE ICONS
const FlameIcon = () => <FlameIconSVG className="animate-bounce" />;
const FlameIconSVG = ({ className }) => (
  <svg viewBox="0 0 24 24" className={`w-4 h-4 fill-yellow-500 ${className}`}>
    <path d="M12 2c0 0-4 4.5-4 8.5s3 6.5 4 8.5c1-2 4-4.5 4-8.5S12 2 12 2z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-yellow-500 fill-none stroke-2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-yellow-500 fill-none stroke-2 animate-spin-slow">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
  </svg>
);

const SparkIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <path d="M12 3l1.91 5.89H20.1l-4.73 3.44L17.28 18.2 12 14.56l-5.28 3.64 1.91-5.87-4.73-3.44h6.19L12 3z" />
  </svg>
);

const GiftIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black">
    <rect x="3" y="8" width="18" height="12" rx="1" />
    <path d="M12 8V3M8 3h8" />
  </svg>
);

const TrophyIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-yellow-400">
    <path d="M6 9H4v3c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4V9h-2" />
    <path d="M12 16v3m-4 3h8" />
    <path d="M8 2h8v7H8z" />
  </svg>
);

const ProcessSection = () => {
  const steps = [
    { number: "01", title: "ONBOARDING", desc: "Join your chosen session and receive your exclusive Flame merch to begin your journey.", badge: "Scout Enlisted" },
    { number: "02", title: "WEEKLY ACTIVITIES", desc: "Complete improvement activities weekly. Your Flame team is dedicated to cheering you toward success.", badge: "Trooper Training" },
    { number: "03", title: "SUCCESS REPORTING", desc: "Report daily successes via video. This consistency unlocks weekly prizes and recognition.", badge: "Angel Ascension" },
  ];

  const rankingItems = [
    { label: ">100% Complete", rank: "Flame Flyer Rank + Bonus Prize", color: "text-yellow-400", icon: <TrophyIcon /> },
    { label: "100% Complete", rank: "3 Flame Rank - Top Performer", color: "text-yellow-300", icon: <TrophyIcon /> },
    { label: "<100% Complete", rank: "2 Flame Rank - Extra Support", color: "text-blue-400", icon: <ShieldCheckIcon /> },
    { label: "<50% Complete", rank: "1 Flame Rank - Pivot", color: "text-gray-400", icon: <TargetIcon /> },
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
    <section id="process" className="py-24 bg-black text-white font-sans overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* HEADER */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
            How the <span className="text-yellow-400 not-italic uppercase underline decoration-yellow-400/30">Foundation Works</span>
          </h2>
          <div className="text-[10px] font-mono text-yellow-400 tracking-widest bg-yellow-400/10 px-4 py-2 border border-yellow-400/20">
            SECTOR_ID: 07-FLAME // MISSION_HUB
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">

          {/* JOURNEY SIDE */}
          <div className="bg-black p-12 flex flex-col justify-between gap-16 relative">
            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-8 items-start group">
                  <div className="relative">
                    <span className="text-sm font-black text-yellow-400 tracking-tighter block group-hover:scale-150 transition-transform duration-500">
                      {step.number}
                    </span>
                    <div className="absolute -left-2 top-0 h-full w-[1px] bg-yellow-400/20 group-hover:bg-yellow-400 transition-colors" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-[9px] font-black uppercase text-yellow-400/70 tracking-[0.2em]">
                      {step.badge}
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-yellow-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-zinc-800 bg-zinc-900/30 p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheckIcon />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Nota Bene (NB)</h4>
              </div>

              <ul className="space-y-3 text-[11px] text-zinc-400 leading-snug font-bold uppercase tracking-tight">
                <li className="flex items-start gap-2"><span className="text-yellow-400">»</span> Activities relate to requested help (Money, Jobs, Love, etc).</li>
                <li className="flex items-start gap-2"><span className="text-yellow-400">»</span> Tasks are performed in wasted time day to day.</li>
                <li className="flex items-start gap-2"><span className="text-yellow-400">»</span> No blocking of quality family or work time permitted.</li>
              </ul>
            </div>
          </div>

          {/* RANKS & REWARDS */}
          <div className="bg-zinc-950 p-12 flex flex-col gap-10">

            {/* Personal Ranking */}
            <div className="relative overflow-hidden group">
              <div className="flex items-center gap-2 mb-6 text-yellow-400">
                <FlameIcon />
                <h4 className="text-xs font-black uppercase tracking-[0.3em]">Personal Ranking</h4>
              </div>

              <div className="space-y-3">
                {rankingItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-zinc-800 pb-3 hover:pl-2 transition-all group/item">
                    <div className="flex items-center gap-3">
                      <span className="opacity-0 group-hover/item:opacity-100 text-yellow-400 transition-opacity">
                        {item.icon}
                      </span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>
                        {item.label}
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-black uppercase italic">
                      {item.rank}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner Tiers */}
            <div>
              <div className="flex items-center gap-2 mb-6 text-white">
                <TargetIcon />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Partner Tiers</h4>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {partnerTiers.map((tier, i) => (
                  <div key={i} className="flex flex-col items-center justify-center p-4 bg-black border border-zinc-800 hover:border-yellow-400 transition-all cursor-pointer group">
                    <div className="mb-3 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                      {tier.icon}
                    </div>
                    <span className="text-[8px] font-black uppercase text-zinc-500 mb-1">{tier.title}</span>
                    <span className="text-[12px] font-black text-yellow-400">{tier.range}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rewards */}
            <div className="bg-yellow-500 p-8 text-black relative overflow-hidden group">
              <SparkIcon className="absolute top-0 right-0 w-32 h-32 opacity-10 -rotate-12 group-hover:rotate-12 transition-transform duration-1000 fill-black" />
              <div className="flex items-center gap-2 mb-6">
                <GiftIcon />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Ascension Rewards</h4>
              </div>

              <div className="space-y-3">
                {communityPrizes.map((prize, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-black/10 border border-black/10 backdrop-blur-sm">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black opacity-60 tracking-widest">{prize.rankName} RANK</span>
                      <span className="text-[11px] font-black uppercase tracking-widest">{prize.level}</span>
                    </div>
                    <span className="text-[11px] font-bold text-black text-right max-w-[150px] leading-tight">{prize.reward}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-zinc-800 mt-auto">
              <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-tighter">
                Official Enlistment:
                <a
                  href="https://drive.google.com/drive/folders/1aFXb-glex8tp_zs3Ltf6KoMN8nYH7xen"
                  target="_blank"
                  rel="noreferrer"
                  className="text-yellow-400 font-black hover:underline inline-flex items-center gap-1 ml-1 group"
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
