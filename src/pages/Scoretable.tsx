import React from "react";
import { Trophy, Target, Zap, Star, Shield, Activity, ChevronRight } from "lucide-react";

// Replace this URL with your actual background image path
const BG_IMAGE = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";

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
      icon: <Zap size={20} className="text-blue-400" />,
      requirement: "0 - 5,000 PTS",
      benefits: ["Basic Mission Access", "Community Badge", "Digital Certificate"]
    },
    {
      class: "Supertrooper",
      icon: <Star size={20} className="text-orange-500" />,
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
    <div className="relative min-h-screen font-sans selection:bg-orange-600/30">
      {/* BACKGROUND IMAGE LAYER */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
        style={{ backgroundImage: `url(${BG_IMAGE})` }}
      >
        {/* Dark Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-[2px]" />
      </div>

      {/* CONTENT LAYER */}
      <div className="relative z-10 pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/10 pb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-orange-500 font-black uppercase tracking-[0.3em] text-xs">
                <Trophy size={16} /> Global Rankings
              </div>
              <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter text-white">
                Foundation <span className="text-orange-500">Scores</span>
              </h1>
            </div>
            
            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 overflow-hidden shadow-2xl">
              <div className="bg-black/40 backdrop-blur-md p-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Points</p>
                <p className="text-3xl font-black text-orange-500">0</p>
              </div>
              <div className="bg-black/40 backdrop-blur-md p-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Agents</p>
                <p className="text-3xl font-black text-white">0</p>
              </div>
            </div>
          </div>

          {/* Rankings & Live Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.4em] text-gray-400 flex items-center gap-3">
                <Target size={18} className="text-orange-500" /> Sector Leaders
              </h3>
              <div className="border border-white/10 overflow-hidden bg-black/30 backdrop-blur-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <th className="p-6">Rank</th>
                      <th className="p-6">Agent Details</th>
                      <th className="p-6">Class</th>
                      <th className="p-6 text-right">Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {leaders.map((agent, index) => (
                      <tr key={agent.id} className="hover:bg-orange-500/5 transition-colors group">
                        <td className="p-6 font-black italic text-2xl text-white/20 group-hover:text-orange-500/40 transition-colors">#{index + 1}</td>
                        <td className="p-6">
                          <p className="font-bold text-white uppercase tracking-tight">{agent.name}</p>
                          <p className="text-[11px] text-gray-500 lowercase">{agent.email}</p>
                        </td>
                        <td className="p-6 text-[10px] font-black uppercase text-gray-400">{agent.rank}</td>
                        <td className="p-6 font-mono font-bold text-white text-right">{agent.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Live Feed */}
            <div className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.4em] text-gray-400 flex items-center gap-3">
                <Activity size={18} className="text-orange-500" /> Live Feed
              </h3>
              <div className="border border-white/10 p-6 bg-black/40 backdrop-blur-sm h-fit">
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="text-[11px] border-b border-white/5 pb-4 last:border-0">
                      <p className="text-gray-400 leading-relaxed">
                        <span className="text-orange-500 font-bold uppercase tracking-tighter">System:</span> 
                        <br />Monitoring sector data... No pings.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* REWARDS GRID */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-gray-400 flex items-center gap-3">
               <Shield size={18} className="text-orange-500" /> Achievement Tiers
            </h3>
            
            <div className="border border-white/10 bg-black/30 backdrop-blur-sm shadow-2xl">
              <div className="hidden md:grid grid-cols-3 bg-white/5 border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <div className="p-6 border-r border-white/10">Class & Rank</div>
                <div className="p-6 border-r border-white/10">Point Requirement</div>
                <div className="p-6">Tier Benefits</div>
              </div>

              <div className="divide-y divide-white/10">
                {classRewards.map((tier) => (
                  <div key={tier.class} className="grid grid-cols-1 md:grid-cols-3 group">
                    <div className="p-8 border-r-0 md:border-r border-white/10 flex items-center gap-4 group-hover:bg-white/5 transition-colors">
                      <div className="p-3 bg-white/5 border border-white/10">{tier.icon}</div>
                      <div>
                        <h4 className="text-xl font-black text-white uppercase italic">{tier.class}</h4>
                        <p className="text-[9px] text-orange-500 font-black uppercase tracking-widest">Active Tier</p>
                      </div>
                    </div>
                    
                    <div className="p-8 border-r-0 md:border-r border-white/10 flex items-center group-hover:bg-white/5 transition-colors">
                      <span className="text-sm font-mono font-bold text-gray-300 uppercase tracking-widest">
                        {tier.requirement}
                      </span>
                    </div>

                    <div className="p-8 bg-white/5 group-hover:bg-white/10 transition-colors">
                      <div className="grid grid-cols-1 gap-3">
                        {tier.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-3 text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                            <ChevronRight size={12} className="text-orange-500" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
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
