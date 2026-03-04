import React, { useState, useEffect } from "react";
import scoretableBg from "../assets/scoretable.png"; 
import { supabase } from "../lib/supabaseClient"; 
import { 
  Trophy, 
  Target, 
  Zap, 
  Star, 
  Shield, 
  Activity, 
  Loader2,
  DollarSign
} from "lucide-react";

const Scoretable = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalFlame: 0, activeAgents: 0 });

  // Calculation Helper
  const calculateFlameDollars = (points: number) => {
    return (1000000000 * 0.0001533 * points) / 50000;
  };

  const fetchScores = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles") 
        .select("id, display_name, email, points, rank, received") 
        .order("points", { ascending: false })
        .limit(20); 

      if (error) throw error;

      if (data) {
        const rankPriority: Record<string, number> = {
          'Angel': 1,
          'Supertrooper': 2,
          'Scout': 3
        };

        const sortedData = [...data].sort((a, b) => {
          if ((b.points || 0) !== (a.points || 0)) {
            return (b.points || 0) - (a.points || 0);
          }
          const priorityA = rankPriority[a.rank] || 3;
          const priorityB = rankPriority[b.rank] || 3;
          if (priorityA !== priorityB) return priorityA - priorityB;
          return (a.display_name || "").localeCompare(b.display_name || "");
        });

        const top10 = sortedData.slice(0, 10);
        setLeaders(top10);
        
        const totalFlame = top10.reduce((acc, curr) => acc + calculateFlameDollars(curr.points || 0), 0);
        setStats({ totalFlame, activeAgents: top10.length });
      }
    } catch (error) {
      console.error("Foundation Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
    const channel = supabase
      .channel("live-scoreboard")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => fetchScores())
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 bg-white dark:bg-black min-h-screen transition-colors duration-500 font-sans">
      <div className="container mx-auto max-w-6xl">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-xs">
              <Trophy size={16} /> Global Payouts
            </div>
            <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white leading-none">
              Flame <span className="text-orange-600">$</span> Grid
            </h1>
          </div>
          
          <div className="grid grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 shadow-2xl">
            <div className="bg-white dark:bg-zinc-950 p-6 min-w-[160px]">
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">Total Flame $</p>
              <p className="text-2xl font-black text-orange-600">${stats.totalFlame.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
            </div>
            <div className="bg-white dark:bg-zinc-950 p-6 min-w-[140px]">
              <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1">Active Elite</p>
              <p className="text-3xl font-black text-zinc-900 dark:text-white">{stats.activeAgents}</p>
            </div>
          </div>
        </div>

        {/* RANKINGS TABLE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-3">
              <Target size={18} className="text-orange-600" /> Top 10 Elite
            </h3>
            
            <div className="relative border border-zinc-200 dark:border-zinc-800 overflow-hidden min-h-[450px] shadow-2xl bg-zinc-950">
              <div className="absolute inset-0 z-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${scoretableBg})` }} />
              <div className="absolute inset-0 z-10 bg-black/70 backdrop-blur-[1px]" />

              <div className="relative z-20 overflow-x-auto">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-[450px] text-white">
                    <Loader2 className="animate-spin mb-4 text-orange-600" size={32} />
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/60 border-b border-white/20 text-[10px] font-black uppercase tracking-widest text-white">
                        <th className="p-6">Rank</th>
                        <th className="p-6">Agent / Class</th>
                        <th className="p-6 text-right">Flame $</th>
                        <th className="p-6 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {leaders.map((agent, index) => (
                        <tr key={agent.id} className="hover:bg-orange-600/20 transition-all group">
                          <td className="p-6 font-black italic text-2xl text-white group-hover:text-orange-400">#{index + 1}</td>
                          <td className="p-6">
                            <p className="font-bold text-white uppercase tracking-tight mb-1">{agent.display_name || "New Recruit"}</p>
                            <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 ${agent.rank === 'Angel' ? 'bg-yellow-500 text-black' : agent.rank === 'Supertrooper' ? 'bg-orange-600 text-white' : 'bg-blue-500 text-white'}`}>
                              {agent.rank || "Scout"}
                            </span>
                          </td>
                          <td className="p-6 text-right">
                            <p className="font-mono font-black text-white text-lg">
                              ${calculateFlameDollars(agent.points || 0).toLocaleString(undefined, {minimumFractionDigits: 2})}
                            </p>
                            <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">{(agent.points || 0)} Points</p>
                          </td>
                          <td className="p-6 text-center">
                            {agent.received ? (
                              <div className="inline-flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                                <Zap size={10} fill="currentColor" />
                                <span className="text-[9px] font-black uppercase tracking-tighter">Received</span>
                              </div>
                            ) : (
                              <div className="inline-flex items-center gap-1 text-zinc-500 bg-white/5 px-2 py-1 rounded border border-white/10">
                                <Activity size={10} />
                                <span className="text-[9px] font-black uppercase tracking-tighter">Pending</span>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* SIDE ACTIVITY FEED */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-3">
              <Activity size={18} className="text-orange-600" /> Payout Stream
            </h3>
            <div className="border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-950 h-[450px] overflow-y-auto shadow-inner">
              <div className="space-y-6">
                {leaders.map((agent, i) => (
                  <div key={i} className="text-[11px] border-b border-zinc-200 dark:border-zinc-800 pb-4 last:border-0">
                    <p className="text-zinc-900 dark:text-white leading-relaxed">
                      Agent <span className="text-orange-600 font-black italic">{agent.display_name}</span> 
                      <br /> 
                      Generated <span className="font-black font-mono">${calculateFlameDollars(agent.points || 0).toFixed(2)}</span>
                    </p>
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
