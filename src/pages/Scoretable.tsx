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
            <div className="bg-white dark:bg-black p-6">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Total Points</p>
              <p className="text-3xl font-black text-orange-600">0</p>
            </div>
            <div className="bg-white dark:bg-black p-6">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Active Agents</p>
              <p className="text-3xl font-black text-zinc-900 dark:text-white">0</p>
            </div>
          </div>
        </div>

        {/* Rankings & Live Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-3">
              <Target size={18} className="text-orange-600" /> Sector Leaders
            </h3>
            
            <div className="relative border border-zinc-200 dark:border-zinc-800 overflow-hidden min-h-[450px]">
              {/* Photo Background Wrapper using the IMPORTED variable */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${scoretableBg})` }}
              />
              <div className="absolute inset-0 z-10 bg-black/85 backdrop-blur-[1px]" />

              {/* Table Content */}
              <div className="relative z-20 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-black/60 border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                      <th className="p-6">Rank</th>
                      <th className="p-6">Agent / Class</th>
                      <th className="p-6">Email Address</th>
                      <th className="p-6 text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leaders.map((agent, index) => (
                      <tr key={agent.id} className="hover:bg-orange-600/10 transition-colors group">
                        <td className="p-6 font-black italic text-2xl text-white/10 group-hover:text-orange-600/30">
                          #{index + 1}
                        </td>
                        
                        <td className="p-6">
                          <p className="font-bold text-white uppercase tracking-tight leading-none mb-1.5">{agent.name}</p>
                          <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 tracking-tighter ${
                            agent.rank === 'Angel' ? 'bg-yellow-500/20 text-yellow-500' : 
                            agent.rank === 'Supertrooper' ? 'bg-orange-600/20 text-orange-600' : 
                            'bg-blue-500/20 text-blue-500'
                          }`}>
                            {agent.rank}
                          </span>
                        </td>

                        <td className="p-6">
                          <p className="text-[11px] text-zinc-400 lowercase font-medium tracking-wide">
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

          {/* Live Feed Column */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-3">
              <Activity size={18} className="text-orange-600" /> Live Feed
            </h3>
            <div className="border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-950/50 h-full">
              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="text-[11px] border-b border-zinc-100 dark:border-zinc-900 pb-4 last:border-0">
                    <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                      <span className="text-orange-600 font-bold uppercase tracking-tighter">System Alert:</span> 
                      <br />Monitoring sector data...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Tiers Grid */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-3">
             <Shield size={18} className="text-orange-600" /> Achievement Tiers
          </h3>
          
          <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
            <div className="hidden md:grid grid-cols-3 bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <div className="p-6 border-r border-zinc-200 dark:border-zinc-800">Class & Rank</div>
              <div className="p-6 border-r border-zinc-200 dark:border-zinc-800">Requirement</div>
              <div className="p-6">Benefits</div>
            </div>

            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {classRewards.map((tier) => (
                <div key={tier.class} className="grid grid-cols-1 md:grid-cols-3 group">
                  <div className="p-8 border-r-0 md:border-r border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
                    <div className="p-3 bg-zinc-100 dark:bg-zinc-900">{tier.icon}</div>
                    <h4 className="text-xl font-black text-zinc-900 dark:text-white uppercase italic">{tier.class}</h4>
                  </div>
                  
                  <div className="p-8 border-r-0 md:border-r border-zinc-200 dark:border-zinc-800 flex items-center">
                    <span className="text-sm font-mono font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest">{tier.requirement}</span>
                  </div>

                  <div className="p-8 bg-zinc-50/30 dark:bg-zinc-900/10 flex flex-wrap gap-x-6 gap-y-2">
                    {tier.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase">
                        <ChevronRight size={12} className="text-orange-600" />
                        {benefit}
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
