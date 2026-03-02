import React from "react";
import { Trophy, Medal, Target, Zap, Star, Shield, ArrowUpRight } from "lucide-react";

const Scoretable = () => {
  const leaders = [
    { id: 1, name: "Nova_Flame", rank: "Angel", points: 12450, change: "+12%", avatar: "NF" },
    { id: 2, name: "CyberScout_88", rank: "Supertrooper", points: 11200, change: "+5%", avatar: "CS" },
    { id: 3, name: "Solar_Angel", rank: "Angel", points: 10890, change: "+8%", avatar: "SA" },
    { id: 4, name: "Echo_Trooper", rank: "Supertrooper", points: 9400, change: "+2%", avatar: "ET" },
    { id: 5, name: "Pixel_Scout", rank: "Scout", points: 8100, change: "+15%", avatar: "PS" },
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
              <p className="text-2xl font-black text-orange-600">$142,500.00</p>
            </div>
            <div className="bg-zinc-100 dark:bg-zinc-900 p-4 border border-zinc-200 dark:border-zinc-800">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">Active Agents</p>
              <p className="text-2xl font-black text-zinc-900 dark:text-white">12,842</p>
            </div>
          </div>
        </div>

        {/* Main Score Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
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
                            <p className="text-[10px] text-green-500 font-bold tracking-widest">{agent.change} This Week</p>
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
                        {agent.points.toLocaleString()}
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
              <Medal className="text-orange-600 mb-4" size={32} />
              <h4 className="text-xl font-black uppercase italic mb-2">Claim Your Payout</h4>
              <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                Objective verification is complete for the current cycle. Weekly rewards are ready for transfer.
              </p>
              <button className="w-full py-4 bg-orange-600 hover:bg-orange-500 transition-all font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 group">
                Access Rewards Wall <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>

            <div className="border border-zinc-200 dark:border-zinc-800 p-6">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Feed
              </h5>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-[11px] border-b border-zinc-100 dark:border-zinc-900 pb-3 last:border-0">
                    <p className="text-zinc-500 dark:text-zinc-400">
                      <span className="text-orange-600 font-bold uppercase">System:</span> Angel_Z7 verified a community event in Sector 4.
                    </p>
                    <p className="text-zinc-400 mt-1 opacity-50">2m ago</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Scoretable;
