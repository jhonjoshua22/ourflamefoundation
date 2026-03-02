import React from "react";
import { Trophy, Medal, Target, Zap, Star, Shield, ArrowUpRight, Gift, ChevronRight } from "lucide-react";

const Scoretable = () => {
  // Sample data set to 0 as requested
  const leaders = [
    { id: 1, name: "Nova_Flame", rank: "Angel", points: 0, change: "0%", avatar: "NF" },
    { id: 2, name: "CyberScout_88", rank: "Supertrooper", points: 0, change: "0%", avatar: "CS" },
    { id: 3, name: "Solar_Angel", rank: "Angel", points: 0, change: "0%", avatar: "SA" },
    { id: 4, name: "Echo_Trooper", rank: "Supertrooper", points: 0, change: "0%", avatar: "ET" },
    { id: 5, name: "Pixel_Scout", rank: "Scout", points: 0, change: "0%", avatar: "PS" },
  ];

  const rewardTiers = [
    { level: "Level 01", title: "Starter Kit", requirement: "500 pts", reward: "Foundation Badge" },
    { level: "Level 05", title: "Elite Access", requirement: "2,500 pts", reward: "Exclusive Merch" },
    { level: "Level 10", title: "Global Trooper", requirement: "10,000 pts", reward: "Event Pass" },
    { level: "Max Rank", title: "Flame Guardian", requirement: "25,000 pts", reward: "Honorary NFT" },
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
            <div className="bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Total Rewards Distributed</p>
              <p className="text-2xl font-black text-orange-600">$0.00</p>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Active Agents</p>
              <p className="text-2xl font-black text-zinc-900 dark:text-white">0</p>
            </div>
          </div>
        </div>

        {/* Main Score Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          
          {/* Top 3 Spotlight */}
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
                      <td className="p-6 font-black italic text-2xl text-zinc-300 dark:text-zinc-800 group-hover:text-orange-600/20">
                        #{index + 1}
                      </td>
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-orange-600 flex items-center justify-center font-black text-white text-xs">
                            {agent.avatar}
                          </div>
                          <div>
                            <p className="font-bold text-zinc-900 dark:text-white uppercase tracking-tight">{agent.name}</p>
                            <p className="text-[10px] text-zinc-400 font-bold tracking-widest">{agent.change} This Week</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-6">
                        <span className={`text-[10px] font-black uppercase px-2 py-1 flex items-center gap-1 w-fit
                          ${agent.rank === 'Angel' ? 'bg-yellow-500/10 text-yellow-500' : 
                            agent.rank === 'Supertrooper' ? 'bg-orange-600/10 text-orange-600' : 
                            'bg-blue-500/10 text-blue-500'}
                        `}>
                          {agent.rank === 'Angel' ? <Shield size={10} /> : agent.rank === 'Supertrooper' ? <Star size={10} /> : <Zap size={10} />}
                          {agent.rank}
                        </span>
                      </td>
                      <td className="p-6 font-mono font-bold text-zinc-900 dark:text-white">
                        {agent.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar - Quick Stats & Call to Action */}
          <div className="space-y-8">
            <div className="p-8 bg-zinc-900 text-white border-l-4 border-orange-600">
              <Gift className="text-orange-600 mb-4" size={32} />
              <h4 className="text-xl font-black uppercase italic mb-2">Rewards Program</h4>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                Complete missions to earn points and unlock exclusive Flame Foundation tiers.
              </p>
              <button className="w-full py-4 bg-orange-600 hover:bg-orange-500 transition-all font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 group">
                View All Rewards <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 p-6">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-zinc-400" /> Activity Log
              </h5>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-[11px] border-b border-zinc-100 dark:border-zinc-900 pb-3 last:border-0">
                    <p className="text-zinc-500 dark:text-zinc-400">
                      <span className="text-zinc-400 font-bold uppercase">System:</span> Waiting for mission deployment...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* NEW REWARDS TABLE SECTION */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-400 flex items-center gap-3">
            <Medal size={18} className="text-orange-600" /> Achievement Tiers
          </h3>
          <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
              {rewardTiers.map((tier) => (
                <div key={tier.level} className="p-8 hover:bg-white dark:hover:bg-zinc-900 transition-all group">
                  <p className="text-orange-600 text-[10px] font-black uppercase tracking-widest mb-2">{tier.level}</p>
                  <h5 className="text-xl font-black text-zinc-900 dark:text-white uppercase italic mb-4 group-hover:text-orange-600 transition-colors">
                    {tier.title}
                  </h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-400">
                      <span>Requirement</span>
                      <span className="text-zinc-900 dark:text-white">{tier.requirement}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase text-zinc-400">
                      <span>Reward</span>
                      <span className="text-green-500">{tier.reward}</span>
                    </div>
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
