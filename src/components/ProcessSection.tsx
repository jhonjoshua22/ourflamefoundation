import React from "react";
import { Flame, ShieldCheck } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "ONBOARDING",
      desc: "Join your chosen session and receive your exclusive Flame merch to begin your journey with the community.",
    },
    {
      number: "02",
      title: "WEEKLY ACTIVITIES",
      desc: "Complete improvement activities weekly. Your Flame team is dedicated to cheering you toward personal success.",
    },
    {
      number: "03",
      title: "SUCCESS REPORTING",
      desc: "Report daily successes via video. This consistency unlocks weekly prize opportunities and community recognition.",
    },
  ];

  const rankingItems = [
    { label: ">100% Complete", rank: "Flame Flyer Rank + Bonus Prize", color: "text-orange-600" },
    { label: "100% Complete", rank: "3 Flame Rank - Top Performer Bonus", color: "text-orange-500" },
    { label: "<100% Complete", rank: "2 Flame Rank - Extra Support", color: "text-zinc-500" },
    { label: "<50% Complete", rank: "1 Flame Rank - Pivot", color: "text-zinc-400" },
  ];

  return (
    <section id="process" className="py-24 bg-white dark:bg-black font-sans border-t border-zinc-100 dark:border-zinc-900">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header - Minimalist & Ethical */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-white uppercase italic">
            How the <span className="text-orange-600 not-italic uppercase">Foundation Works</span>
          </h2>
          <p className="text-zinc-500 mt-4 max-w-2xl text-lg">
            A simple three-step process designed to foster growth and ethical improvement within our global community.
          </p>
        </div>

        {/* Main Content Grid - Perfectly Aligned */}
        <div className="grid lg:grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
          
          {/* LEFT SIDE: THE STORYTELLING JOURNEY */}
          <div className="bg-white dark:bg-black p-8 md:p-12 space-y-12 flex flex-col justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <span className="text-sm font-black text-orange-600 tracking-tighter pt-1">
                  {step.number}
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: RANKING & NB BOARD */}
          <div className="bg-zinc-50 dark:bg-zinc-950 p-8 md:p-12 flex flex-col">
            {/* Ranking System */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6 text-orange-600">
                <Flame size={16} />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Ranking System</h4>
              </div>
              <div className="space-y-3">
                {rankingItems.map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row md:justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 last:border-0">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>
                      {item.label}
                    </span>
                    <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
                      {item.rank}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* NB Section - Pushed to bottom to align with left side */}
            <div className="mt-auto pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
                <ShieldCheck size={16} />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Nota Bene (NB)</h4>
              </div>
              <ul className="space-y-2 text-[12px] text-zinc-500 dark:text-zinc-400 leading-snug list-disc pl-4">
                <li>Activities relate to requested help (Money, Jobs, Love, etc).</li>
                <li>Tasks are performed in wasted time day to day.</li>
                <li>No blocking of quality family or work time permitted.</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
