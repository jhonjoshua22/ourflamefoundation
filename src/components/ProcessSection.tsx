import React from "react";
import { ArrowRight, Flame, ShieldAlert } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      title: "Begin the Journey",
      desc: "Join your first session to receive your official Flame gear and meet the community that will walk beside you.",
    },
    {
      title: "Small Steps, Weekly Gains",
      desc: "Work through custom activities designed for your unique goals. Your team provides the wind beneath your wings.",
    },
    {
      title: "Celebrate Every Win",
      desc: "Share your progress via brief video updates. Your consistency unlocks rewards and inspires the collective.",
    },
  ];

  const rankingItems = [
    { label: ">100%", rank: "Flame Flyer", bonus: "Bonus Prize", color: "text-orange-600" },
    { label: "100%", rank: "3 Flame Rank", bonus: "Top Performer", color: "text-orange-500" },
    { label: "<100%", rank: "2 Flame Rank", bonus: "Extra Support", color: "text-zinc-500" },
    { label: "<50%", rank: "1 Flame Rank", bonus: "Pivot Phase", color: "text-zinc-400" },
  ];

  return (
    <section id="process" className="py-32 bg-white dark:bg-black overflow-hidden font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header - Simple & Clean */}
        <div className="mb-24">
          <h4 className="text-orange-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
            The Methodology
          </h4>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 dark:text-white uppercase italic">
            The <span className="text-orange-600 not-italic uppercase">Flame</span> Journey
          </h2>
          <p className="text-zinc-500 mt-6 max-w-xl text-lg leading-relaxed">
            Growth isn't a race; it's a consistent rhythm. We've simplified the path to sustainable improvement into three core movements.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT: STORYTELLING COLUMN (7 Cols) */}
          <div className="lg:col-span-7 relative">
            {/* Vertical Path Line */}
            <div className="absolute left-[23px] top-0 bottom-0 w-[1px] bg-zinc-100 dark:bg-zinc-800 hidden md:block" />

            <div className="space-y-20">
              {steps.map((step, index) => (
                <div key={index} className="relative flex gap-8 group">
                  {/* Number Circle - Sharp Edges */}
                  <div className="relative z-10 w-12 h-12 flex-shrink-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center font-black text-zinc-900 dark:text-white transition-colors group-hover:border-orange-600 group-hover:text-orange-600">
                    0{index + 1}
                  </div>
                  
                  <div className="pt-2">
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 tracking-tight italic">
                      {step.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md">
                      {step.desc}
                    </p>
                    {index < 2 && (
                      <div className="mt-8 flex items-center gap-2 text-zinc-300 dark:text-zinc-700">
                        <ArrowRight size={16} />
                        <span className="text-[10px] uppercase font-black tracking-widest">Next Phase</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: THE STATUS BOARD (5 Cols) */}
          <div className="lg:col-span-5 space-y-10">
            
            {/* Ranking Table - Sharp Brutalist Minimal */}
            <div className="border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-10">
              <div className="flex items-center gap-3 mb-10 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <Flame className="text-orange-600" size={24} />
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-900 dark:text-white">Performance Ranks</h3>
              </div>
              
              <div className="space-y-6">
                {rankingItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between group">
                    <div>
                      <span className={`text-xs font-black tracking-widest uppercase ${item.color}`}>
                        {item.label}
                      </span>
                      <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm mt-1 uppercase tracking-tight">
                        {item.rank}
                      </p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.bonus}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* NB Section - Ethical Notes */}
            <div className="p-10 bg-zinc-900 text-white">
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="text-orange-600" size={18} />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Our Ethical Guardrail</h4>
              </div>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li className="flex gap-3 leading-relaxed">
                   <span className="text-orange-600 font-bold">•</span>
                   Activities focus on your specific needs (Jobs, Finance, Connection).
                </li>
                <li className="flex gap-3 leading-relaxed">
                   <span className="text-orange-600 font-bold">•</span>
                   Tasks are designed for "found time"—the gaps in your daily routine.
                </li>
                <li className="flex gap-3 leading-relaxed">
                   <span className="text-orange-600 font-bold">•</span>
                   Family and primary work time remain sacred and undisturbed.
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
