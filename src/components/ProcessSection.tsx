import React from "react";
import { motion } from "framer-motion";
import { 
  Flame, 
  ShieldCheck, 
  Trophy, 
  ArrowUpRight, 
  Gift, 
  Target, 
  Zap, 
  Compass,
  Medal
} from "lucide-react";
import clickSound from "../assets/button.m4a"; // Added import

const ProcessSection = () => {
  // Added sound helper function
  const playClickSound = () => {
    new Audio(clickSound).play().catch(e => console.log("Audio playback failed", e));
  };

  const steps = [
    { 
      number: "01", 
      title: "MISSION BRIEFING", 
      desc: "Join your chosen session and receive your exclusive Flame gear to begin your journey.", 
      icon: <Compass className="text-blue-400" /> 
    },
    { 
      number: "02", 
      title: "WEEKLY MANEUVERS", 
      desc: "Complete improvement activities weekly. Your Flame squad is dedicated to cheering you toward victory.", 
      icon: <Zap className="text-orange-500" /> 
    },
    { 
      number: "03", 
      title: "HOLONET REPORTING", 
      desc: "Report daily successes via video. Consistency unlocks rare weekly prizes and Jedi-level recognition.", 
      icon: <Target className="text-red-500" /> 
    },
  ];

  const rankingItems = [
    { label: ">100% Complete", rank: "Master Flame Flyer + Mythic Prize", color: "text-orange-600" },
    { label: "100% Complete", rank: "Elite 3-Flame Knight", color: "text-orange-500" },
    { label: "<100% Complete", rank: "2-Flame Padawan - Support", color: "text-zinc-500" },
    { label: "<50% Complete", rank: "Initiate Rank - Pivot Mission", color: "text-zinc-400" },
  ];

  const rewardTiers = [
    { level: "Bronze", reward: "Magic Gems & Exclusive Merch", icon: <Medal className="text-amber-700" /> },
    { level: "Silver", reward: "$1 pm Magic Bots (Wholesale)", icon: <Medal className="text-zinc-400" /> },
    { level: "Gold", reward: "SuperBot Access ($10 pm Wholesale)", icon: <Medal className="text-amber-400" /> },
  ];

  return (
    <section id="process" className="relative py-24 bg-white dark:bg-[#050505] font-sans border-t border-zinc-100 dark:border-white/5 overflow-hidden">
      {/* Background Decorative "Starfield" Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/10 blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase italic">
            Mission <span className="text-orange-600 not-italic">Protocol</span>
          </h2>
          <p className="text-zinc-500 uppercase tracking-[0.3em] text-[10px] mt-2 font-bold">Foundation Operations Guide</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-px bg-zinc-200 dark:bg-white/10 border border-zinc-200 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl">
          
          {/* LEFT SIDE: THE JOURNEY (MISSION STEPS) */}
          <div className="bg-white dark:bg-[#0a0a0a] p-8 md:p-12 flex flex-col justify-between gap-16">
            <div className="space-y-12">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="group flex gap-6 items-start"
                >
                  <div className="relative">
                    <div className="absolute -inset-2 bg-orange-600/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative text-sm font-black text-orange-600 tracking-tighter pt-1">{step.number}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {step.icon}
                      <h3 className="text-lg font-black text-zinc-900 dark:text-white uppercase tracking-tighter italic">{step.title}</h3>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-sm group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Engagement Rules (Nota Bene) */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-zinc-50 dark:bg-white/5 border border-zinc-100 dark:border-white/10 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-4 text-zinc-900 dark:text-white">
                <ShieldCheck size={18} className="text-orange-600 animate-pulse" />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Rules of Engagement</h4>
              </div>
              <ul className="space-y-3 text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug font-medium uppercase tracking-wider">
                <li className="flex gap-2 items-start"><span className="text-orange-600">»</span> Missions target Money, Jobs, and Connection.</li>
                <li className="flex gap-2 items-start"><span className="text-orange-600">»</span> Tasks utilize "Wasted Time" intervals.</li>
                <li className="flex gap-2 items-start"><span className="text-orange-600">»</span> Family & Work time remain Sacred Grounds.</li>
              </ul>
            </motion.div>
          </div>

          {/* RIGHT SIDE: RANKINGS & SECTOR REWARDS */}
          <div className="bg-zinc-50 dark:bg-[#0d0d0d] p-8 md:p-12 flex flex-col gap-10 border-l border-zinc-200 dark:border-white/10">
            
            {/* Personal Ranking / Pilot Standings */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-6 text-orange-600">
                <Flame size={18} className="drop-shadow-[0_0_8px_rgba(234,88,12,0.5)]" />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Pilot Standings</h4>
              </div>
              <div className="space-y-3">
                {rankingItems.map((item, index) => (
                  <motion.div 
                    key={index}
                    whileHover={{ x: 10 }}
                    className="flex justify-between items-center border-b border-zinc-200 dark:border-white/5 pb-3 last:border-0"
                  >
                    <span className={`text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.label}</span>
                    <span className="text-[11px] text-zinc-600 dark:text-zinc-300 font-bold italic uppercase">{item.rank}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sector Rewards / Prizes */}
            <div>
              <div className="flex items-center gap-2 mb-6 text-zinc-900 dark:text-white">
                <Gift size={18} className="text-orange-600" />
                <h4 className="text-xs font-black uppercase tracking-[0.2em]">Sector Rewards</h4>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {rewardTiers.map((prize, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.03, backgroundColor: "rgba(234, 88, 12, 0.05)" }}
                    className="flex items-center justify-between p-4 bg-white dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      {prize.icon}
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">{prize.level}</span>
                    </div>
                    <span className="text-[11px] font-bold text-orange-600 uppercase italic">{prize.reward}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer / Partner Link */}
            <div className="pt-6 border-t border-zinc-200 dark:border-white/10 mt-auto">
              <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                Operational Partners: 
                <a 
                  href="https://drive.google.com/drive/folders/1aFXb-glex8tp_zs3Ltf6KoMN8nYH7xen" 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={playClickSound}
                  className="text-orange-600 hover:text-orange-400 transition-colors inline-flex items-center gap-1 group"
                >
                  ACCESS DRIVE
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
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
