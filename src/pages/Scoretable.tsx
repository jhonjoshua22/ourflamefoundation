import React, { useState, useEffect } from "react";
// Ensure the path to your assets and supabase client is correct
import scoretableBg from "../assets/scoretable.png"; 
import { supabase } from "../lib/supabaseClient"; 
import { 
  Trophy, 
  Target, 
  Zap, 
  Star, 
  Shield, 
  Activity, 
  ChevronRight, 
  Loader2 
} from "lucide-react";

const Scoretable = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalPoints: 0, activeAgents: 0 });

  // 1. DATA FETCHING LOGIC - WITH RANK TIE-BREAKERS
  const fetchScores = async () => {
    try {
      setLoading(true);
      
      // We fetch slightly more than 10 to ensure we catch all elites for sorting
      const { data, error } = await supabase
        .from("profiles") 
        .select("id, display_name, email, points, rank") 
        .order("points", { ascending: false })
        .limit(20); 

      if (error) throw error;

      if (data) {
        // Define our custom Rank Hierarchy for tie-breaking
        const rankPriority: Record<string, number> = {
          'Angel': 1,        // Highest Priority
          'Supertrooper': 2, 
          'Scout': 3         // Lowest Priority
        };

        const sortedData = [...data].sort((a, b) => {
          // Rule 1: Sort by points primarily (Descending)
          if ((b.points || 0) !== (a.points || 0)) {
            return (b.points || 0) - (a.points || 0);
          }

          // Rule 2: If points are tied, sort by Rank Priority (Angel > Supertrooper > Scout)
          const priorityA = rankPriority[a.rank] || 3;
          const priorityB = rankPriority[b.rank] || 3;

          if (priorityA !== priorityB) {
            return priorityA - priorityB;
          }

          // Rule 3: If points and rank are tied, sort alphabetically
          return (a.display_name || "").localeCompare(b.display_name || "");
        });

        // Strictly keep the top 10
        const top10 = sortedData.slice(0, 10);
        
        setLeaders(top10);
        
        // Stats based on top 10
        const total = top10.reduce((acc, curr) => acc + (curr.points || 0), 0);
        setStats({ totalPoints: total, activeAgents: top10.length });
      }
    } catch (error) {
      console.error("Foundation Database Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. REAL-TIME SUBSCRIPTION
  useEffect(() => {
    fetchScores();

    const channel = supabase
      .channel("live-scoreboard")
      .on(
        "postgres_changes", 
        { event: "*", schema: "public", table: "profiles" }, 
        () => fetchScores()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
    <div className="pt-32 pb-24 px-6 bg-white dark:bg-black min-h-screen transition-colors duration-500 font-sans">
      <div className="container mx-auto max-w-6xl">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-xs">
              <Trophy size={16} /> Global Rankings
            </div>
            <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white leading-none">
              Foundation <span className="text-orange-600">Scores</span>
            </h1>
          </div>
          
          <div className="grid grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <div className="bg-white dark:bg-zinc-950 p-6 min-w-[140px]">
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">Top 10 Points</p>
              <p className="text-3xl font-black text-orange-600">{stats.totalPoints.toLocaleString()}</p>
            </div>
            <div className="bg-white dark:bg-zinc-950 p-6 min-w-[140px]">
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">Active Elite</p>
              <p className="text-3xl font-black text-zinc-900 dark:text-white">{stats.activeAgents}</p>
            </div>
          </div>
        </div>

        {/* RANKINGS & LIVE FEED */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400 flex items-center gap-3">
              <Target size={18} className="text-orange-600" /> Top 10 Elite
            </h3>
            
            <div className="relative border border-zinc-200 dark:border-zinc-800 overflow-hidden min-h-[450px] shadow-2xl bg-zinc-950">
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: `url(${scoretableBg})` }}
              />
              <div className="absolute inset-0 z-10 bg-black/60 backdrop-blur-[1px]" />

              <div className="relative z-20 overflow-x-auto">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-[450px] text-white">
                    <Loader2 className="animate-spin mb-4 text-orange-600" size={32} />
                    <p className="text-[10px] font-black uppercase tracking-widest">Syncing Grid...</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/60 border-b border-white/20 text-[10px] font-black uppercase tracking-widest text-white">
                        <th className="p-6">Rank</th>
                        <th className="p-6">Agent / Class</th>
                        <th className="p-6 text-right">Points</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {leaders.map((agent, index) => (
                        <tr key={agent.id} className="hover:bg-orange-600/20 transition-all group">
                          <td className="p-6 font-black italic text-2xl text-white group-hover:text-orange-400">
                            #{index + 1}
                          </td>
                          <td className="p-6">
                            <p className="font-bold text-white uppercase tracking-tight leading-none mb-1.5">
                              {agent.display_name || "New Recruit"}
                            </p>
                            <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 tracking-tighter ${
                              agent.rank === 'Angel' ? 'bg-yellow-500 text-black' : 
                              agent.rank === 'Supertrooper' ? 'bg-orange-600 text-white' : 
                              'bg-blue-500 text-white'
                            }`}>
                              {agent.rank || "Scout"}
                            </span>
                          </td>
                          <td className="p-6 font-mono font-bold text-white text-right text-lg">
                            {(agent.points || 0).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* LIVE FEED COLUMN */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400 flex items-center gap-3">
              <Activity size={18} className="text-orange-600" /> Elite Activity
            </h3>
            <div className="border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-950 h-full shadow-inner">
              <div className="space-y-6">
                {leaders.slice(0, 5).map((agent, i) => (
                  <div key={i} className="text-[11px] border-b border-zinc-200 dark:border-zinc-800 pb-4 last:border-0">
                    <p className="text-zinc-900 dark:text-white font-medium leading-relaxed">
                      <span className="text-orange-600 font-bold uppercase tracking-tighter">Status:</span> 
                      <br />Agent <span className="font-black italic">{agent.display_name || "Unknown"}</span> holding Rank #{i + 1} with {agent.points?.toLocaleString()} PTS.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ACHIEVEMENT TIERS GRID */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400 flex items-center gap-3">
             <Shield size={18} className="text-orange-600" /> Rank Requirements
          </h3>
          
          <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-2xl">
            <div className="hidden md:grid grid-cols-12 bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              <div className="col-span-4 p-6 border-r border-zinc-200 dark:border-zinc-800">Class Type</div>
              <div className="col-span-3 p-6 border-r border-zinc-200 dark:border-zinc-800">Point Goal</div>
              <div className="col-span-5 p-6">Active Benefits</div>
            </div>

            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {classRewards.map((tier) => (
                <div key={tier.class} className="grid grid-cols-1 md:grid-cols-12 group hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors">
                  <div className="col-span-4 p-8 border-r-0 md:border-r border-zinc-200 dark:border-zinc-800 flex items-center gap-6">
                    <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-sm group-hover:scale-110 transition-transform">
                      {tier.icon}
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-zinc-900 dark:text-white uppercase italic tracking-tighter leading-none">{tier.class}</h4>
                      <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mt-1">Tier Level</p>
                    </div>
                  </div>
                  
                  <div className="col-span-3 p-8 border-r-0 md:border-r border-zinc-200 dark:border-zinc-800 flex items-center">
                    <span className="text-sm font-mono font-bold text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-white/5 px-4 py-2 uppercase tracking-widest border border-zinc-200 dark:border-zinc-800">
                      {tier.requirement}
                    </span>
                  </div>

                  <div className="col-span-5 flex flex-col divide-y divide-zinc-100 dark:divide-zinc-800 bg-zinc-50/30 dark:bg-black/20">
                    {tier.benefits.map((benefit, i) => (
                      <div key={i} className="px-8 py-4 flex items-center gap-3">
                        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-300 uppercase tracking-wide">
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
