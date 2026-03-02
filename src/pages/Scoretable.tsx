import React from "react";
import { Trophy, Target, Zap, Star, Shield, ArrowUpRight, Activity } from "lucide-react";

const Scoretable = () => {
  // Sample data set to 0
  const leaders = [
    { id: 1, name: "Nova_Flame", rank: "Angel", points: 0, change: "0%", avatar: "NF" },
    { id: 2, name: "CyberScout_88", rank: "Supertrooper", points: 0, change: "0%", avatar: "CS" },
    { id: 3, name: "Solar_Angel", rank: "Angel", points: 0, change: "0%", avatar: "SA" },
    { id: 4, name: "Echo_Trooper", rank: "Supertrooper", points: 0, change: "0%", avatar: "ET" },
    { id: 5, name: "Pixel_Scout", rank: "Scout", points: 0, change: "0%", avatar: "PS" },
  ];

  const classRewards = [
    {
      class: "Scout",
      icon: <Zap size={24} className="text-blue-500" />,
      color: "border-blue-500/50",
      bg: "bg-blue-500/5",
      requirement: "0 - 5,000 PTS",
      benefits: ["Basic Mission Access", "Community Badge", "Digital Certificate"]
    },
    {
      class: "Supertrooper",
      icon: <Star size={24} className="text-orange-600" />,
      color: "border-orange-600/50",
      bg: "bg-orange-600/5",
      requirement: "5,001 - 15,000 PTS",
      benefits: ["Priority Mission Deployment", "Exclusive Merch Access", "Governance Voting (Minor)"]
    },
    {
      class: "Angel",
      icon: <Shield size={24} className="text-yellow-500" />,
      color: "border-yellow-500/50",
      bg: "bg-yellow-500/5",
      requirement: "15,001+ PTS",
      benefits: ["Direct Foundation Liaison", "Global Event Invites", "Strategic Decision Rights"]
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
            <p className="text-zinc-500 max-w-md font-medium">
              Real-time verification of mission contributions across all active sectors.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800 text-center md:text-left">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Total Points Earned</p>
              <p className="text-2xl font-black text-orange-600">0</p>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800 text-center md:text-left">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Active Agents</p>
              <p className="text-2xl font-black text-zinc-900 dark:text-white">0</p>
            </div>
          </div>
        </div>

        {/* Rankings & Live Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-3">
              <Target size={18} className="text-orange-600" /> Sector Leaders
            </h3>
            <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-200 dark:border-zinc-800">
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Rank</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Agent</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Class</th>
                    <th className="p-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                  {leaders.map((agent, index) => (
                    <tr key={agent.id} className="group hover:bg-zinc-50 dark:hover:bg-orange-600/5 transition-colors">
                      <td className="p-6 font-black italic text-2xl text-zinc-300 dark:text-zinc-800 group-hover:text-orange-600/20">#{index + 1}</td>
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-orange-600 flex items-center justify-center font-black text-white text-xs">{agent.avatar}</div>
                          <div>
                            <p className="font-bold text-zinc-900 dark:text-white uppercase tracking-tight">{agent.name}</p>
                            <p className="text-[10px] text-zinc-400 font-bold tracking-widest">{agent.change} Weekly</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 text-[10px] font-black uppercase text-zinc-500">{agent.rank}</td>
                      <td className="p-6 font-mono font-bold text-zinc-900 dark:text-white">{agent.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Live Feed Column */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-3">
              <Activity size={18} className="text-orange-600" /> Live Feed
            </h3>
            <div className="border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-950/50">
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="text-[11px] border-b border-zinc-100 dark:border-zinc-900 pb-4 last:border-0">
                    <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      <span className="text-orange-600 font-bold uppercase tracking-tighter">System Alert:</span> 
                      <br />Monitoring sector data... No active mission pings detected.
                    </p>
                    <p className="text-zinc-400 mt-2 opacity-50 flex items-center gap-1 font-bold italic">
                      ST-ID: 00{i} <span className="h-1 w-1 bg-zinc-400 rounded-full" /> STANDBY
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* REWARDS GRID - Scouts, Supertroopers, Angels */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-3 whitespace-nowrap">
               Class Rewards
            </h3>
            <div className="h-px bg-zinc-200 dark:border-zinc-800 w-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {classRewards.map((tier) => (
              <div key={tier.class} className={`p-8 border-t-4 ${tier.color} ${tier.bg} transition-all hover:-translate-y-1`}>
                <div className="mb-6">{tier.icon}</div>
                <h4 className="text-2xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter mb-1">
                  {tier.class}
                </h4>
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-6">
                  Requirement: {tier.requirement}
                </p>
                <ul className="space-y-3">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-3 text-[11px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-tight">
                      <div className="h-1 w-1 bg-orange-600 rounded-full" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Scoretable;
