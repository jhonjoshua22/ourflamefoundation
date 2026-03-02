import React from "react";
// Import from assets folder which is one level up from pages
import scoretableBg from "../assets/scoretable.png"; 

import { Trophy, Target, Zap, Star, Shield, Activity, ChevronRight } from "lucide-react";

const Scoretable = () => {
  const leaders = [
    { id: 1, name: "Nova Flame", email: "nova.f@foundation.org", rank: "Angel", points: 0 },
    { id: 2, name: "Marcus Scout", email: "m.scout88@sector.io", rank: "Supertrooper", points: 0 },
    { id: 3, name: "Solar Angel", email: "solar.a@mission.com", rank: "Angel", points: 0 },
    { id: 4, name: "Echo Trooper", email: "echo.t@defense.net", rank: "Supertrooper", points: 0 },
    { id: 5, name: "Pixel Scout", email: "p.scout@foundation.org", rank: "Scout", points: 0 },
  ];

  const classRewards = [
    {
      class: "Scout",
      icon: <Zap size={20} className="text-blue-500" />,
      requirement: "0 - 5,000 PTS",
      benefits: ["Basic Mission Access", "Community Badge", "Digital Certificate"]
    },
    {
      class: "Supertrooper",
      icon: <Star size={20} className="text-orange-600" />,
      requirement: "5,001 - 15,000 PTS",
      benefits: ["Priority Deployment", "Exclusive Merch", "Governance Voting"]
    },
    {
      class: "Angel",
      icon: <Shield size={20} className="text-yellow-500" />,
      requirement: "15,001+ PTS",
      benefits: ["Foundation Liaison", "Global Invites", "Strategic Rights"]
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-white dark:bg-black min-h-screen transition-colors duration-500">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-xs">
              <Trophy size={16} /> Global Rankings
            </div>
            <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white">
              Foundation <span className="text-orange-600">Scores</span>
            </h1>
          </div>
          
          <div className="grid grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800">
            <div className="bg-white dark:bg-zinc-950 p-6">
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">Total Points</p>
              <p className="text-3xl font-black text-orange-600">0</p>
            </div>
            <div className="bg-white dark:bg-zinc-950 p-6">
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">Active Agents</p>
              <p className="text-3xl font-black text-zinc-900 dark:text-white">0</p>
            </div>
          </div>
        </div>

        {/* Rankings & Live Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400 flex items-center gap-3">
              <Target size={18} className="text-orange-600" /> Scoreboard
            </h3>
            
            <div className="relative border border-zinc-200 dark:border-zinc-800 overflow-hidden min-h-[450px]">
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${scoretableBg})` }}
              />
              <div className="absolute inset-0 z-10 bg-black/50 backdrop-blur-[1px]" />

              <div className="relative z-20 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black/60 border-b border-white/20 text-[10px] font-black uppercase tracking-widest text-white">
                      <th className="p-6">Rank</th>
                      <th className="p-6">Agent / Class</th>
                      <th className="p-6">Email Address</th>
                      <th className="p-6 text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {leaders.map((agent, index) => (
                      <tr key={agent.id} className="hover:bg-orange-600/20 transition-colors group">
                        <td className="p-6 font-black italic text-2xl text-white group-hover:text-orange-400 transition-colors">
                          #{index + 1}
                        </td>
                        <td className="p-6">
                          <p className="font-bold text-white uppercase tracking-tight leading-none mb-1.5">{agent.name}</p>
                          <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 tracking-tighter ${
                            agent.rank === 'Angel' ? 'bg-yellow-500 text-black' : 
                            agent.rank === 'Supertrooper' ? 'bg-orange-600 text-white' : 
                            'bg-blue-500 text-white'
                          }`}>
                            {agent.rank}
                          </span>
                        </td>
                        <td className="p-6">
                          <p className="text-[11px] text-white lowercase font-medium tracking-wide">
                            {agent.email}
                          </p>
                        </td>
                        <td className="p-6 font-mono font-bold text-white text-right">
                          {agent.points}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400 flex items-center gap-3">
              <Activity size={18} className="text-orange-600" /> Live Feed
            </h3>
            <div className="border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-900/50 h-full">
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="text-[11px] border-b border-zinc-200 dark:border-zinc-700 pb-4 last:border-0">
                    <p className="text-zinc-900 dark:text-white font-medium leading-relaxed">
                      <span className="text-orange-600 font-bold uppercase tracking-tighter">System Alert:</span> 
                      <br />Monitoring sector data...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Tiers Grid - CLEANED UP VERSION */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400 flex items-center gap-3">
             <Shield size={18} className="text-orange-600" /> Achievement Tiers
          </h3>
          
          <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              <div className="col-span-4 p-6 border-r border-zinc-200 dark:border-zinc-800">Class & Rank</div>
              <div className="col-span-3 p-6 border-r border-zinc-200 dark:border-zinc-800">Requirement</div>
              <div className="col-span-5 p-6">Tier Benefits</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {classRewards.map((tier) => (
                <div key={tier.class} className="grid grid-cols-1 md:grid-cols-12 group hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors">
                  {/* Icon & Name */}
                  <div className="col-span-4 p-8 border-r-0 md:border-r border-zinc-200 dark:border-zinc-800 flex items-center gap-6">
                    <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-sm group-hover:scale-110 transition-transform">
                      {tier.icon}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">{tier.class}</h4>
                      <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mt-1">Rewards</p>
                    </div>
                  </div>
                  
                  {/* Requirement */}
                  <div className="col-span-3 p-8 border-r-0 md:border-r border-zinc-200 dark:border-zinc-800 flex items-center">
                    <span className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-white/5 px-3 py-1 uppercase tracking-widest">
                      {tier.requirement}
                    </span>
                  </div>

                  {/* Clean Vertical Benefits */}
                  <div className="col-span-5 flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800">
                    {tier.benefits.map((benefit, i) => (
                      <div key={i} className="px-8 py-4 flex items-center gap-3">
                        <ChevronRight size={14} className="text-orange-600 shrink-0" />
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 uppercase tracking-wide">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Scoretable;
