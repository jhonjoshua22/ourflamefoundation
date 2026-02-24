import React from "react";
import { Flame, ShieldCheck, Trophy, ArrowUpRight, Gift } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    { number: "01", title: "ONBOARDING", desc: "Join your chosen session and receive your exclusive Flame merch to begin your journey." },
    { number: "02", title: "WEEKLY ACTIVITIES", desc: "Complete improvement activities weekly. Your Flame team is dedicated to cheering you toward success." },
    { number: "03", title: "SUCCESS REPORTING", desc: "Report daily successes via video. This consistency unlocks weekly prizes and recognition." },
  ];

  const rankingItems = [
    { label: ">100% Complete", rank: "Flame Flyer Rank + Bonus Prize", color: "text-orange-600" },
    { label: "100% Complete", rank: "3 Flame Rank - Top Performer", color: "text-orange-500" },
    { label: "<100% Complete", rank: "2 Flame Rank - Extra Support", color: "text-zinc-500" },
    { label: "<50% Complete", rank: "1 Flame Rank - Pivot", color: "text-zinc-400" },
  ];

  const partnerTiers = [
    { title: "Gold Partner", range: "60-100%", dot: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" },
    { title: "Silver Partner", range: "10-60%", dot: "bg-slate-300 shadow-[0_0_10px_rgba(203,213,225,0.5)]" },
    { title: "Bronze Partner", range: "<10%", dot: "bg-amber-800 shadow-[0_0_10px_rgba(180,83,9,0.5)]" },
  ];

  const communityPrizes = [
    { level: "Bronze", reward: "FREE Magic Gems & Merch" },
    { level: "Silver", reward: "$1 pm per family (wholesale) Magic Bots" },
    { level: "Gold", reward: "SuperBot $10 pm per fam (wholesale)" },
  ];

  return (
    <section id="process" className="py-24 bg-white dark:bg-black font-sans border-t border-zinc-100 dark:border-zinc-900">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white uppercase italic">
            How the <span className="text-orange-600 not-italic uppercase">Foundation Works</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
          
          {/* LEFT SIDE: JOURNEY + NB */}
          <div className="bg-white dark:bg-black p-8 md:p-12 flex flex-col justify-between gap-16">
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <span className="text-sm font-black text-orange-600 tracking-tighter pt-1">{step.number}</span>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-tight">{step.title}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900">
              <div className="flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
                <ShieldCheck size={16} className="text-orange-600" />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Nota Bene (NB)</h4>
              </div>
              <ul className="space-y-2 text-[12px] text-zinc-500 dark:text-zinc-400 leading-snug list-disc pl-4">
                <li>Activities relate to requested help (Money, Jobs, Love, etc).</li>
                <li>Tasks are performed in wasted time day to day.</li>
                <li>No blocking of quality family or work time permitted.</li>
              </ul>
            </div>
          </div>

          {/* RIGHT SIDE: RANKING + PARTNERS + PRIZES */}
          <div className="bg-zinc-50 dark:bg-zinc-950 p-8 md:p-12 flex flex-col gap-10">
            {/* Personal Ranking */}
            <div>
              <div className="flex items-center gap-2 mb-6 text-orange-600">
                <Flame size={16} />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Personal Ranking</h4>
              </div>
              <div className="space-y-3">
                {rankingItems.map((item, index) => (
                  <div key={index} className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 last:border-0">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.label}</span>
                    <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">{item.rank}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner Commitment Tiers (Independent) */}
            <div>
              <div className="flex items-center gap-2 mb-6 text-zinc-900 dark:text-white">
                <Trophy size={16} className="text-amber-500" />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Partner Commitment Tiers</h4>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {partnerTiers.map((tier, i) => (
                  <div key={i} className="flex flex-col p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded">
                    <span className="text-[8px] font-black uppercase text-zinc-400 mb-1">{tier.title}</span>
                    <span className="text-[10px] font-black text-orange-600">{tier.range}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* COMMUNITY PRIZES (NEW SECTION) */}
            <div>
              <div className="flex items-center gap-2 mb-6 text-zinc-900 dark:text-white">
                <Gift size={16} className="text-orange-600" />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Rewards</h4>
              </div>
              <div className="space-y-2">
                {communityPrizes.map((prize, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">{prize.level}</span>
                    <span className="text-[11px] font-bold text-orange-600">{prize.reward}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
                We work with: 
                <a 
                  href="https://drive.google.com/drive/folders/1aFXb-glex8tp_zs3Ltf6KoMN8nYH7xen" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-orange-600 font-black uppercase tracking-widest hover:underline inline-flex items-center gap-1 group"
                >
                  partners
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
