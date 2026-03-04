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
  Search,
  X,
  Network as NetworkIcon,
  ArrowUpRight
} from "lucide-react";

const Scoretable = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [stats, setStats] = useState({ totalFlame: 0, activeAgents: 0 });

  // CONVERSION FORMULA: (1B * 0.0001533 * points) / 50,000
  const calculateFlameDollars = (points: number) => {
    return (1000000000 * 0.0001533 * (points || 0)) / 50000;
  };

  const fetchScores = async (query = "") => {
    try {
      setLoading(true);
      let supabaseQuery = supabase
        .from("profiles")
        .select("id, display_name, email, points, rank, received");

      if (query) {
        supabaseQuery = supabaseQuery.or(`display_name.ilike.%${query}%,email.ilike.%${query}%`);
      } else {
        supabaseQuery = supabaseQuery.order("points", { ascending: false }).limit(20);
      }

      const { data, error } = await supabaseQuery;
      if (error) throw error;

      if (data) {
        const rankPriority: Record<string, number> = { 'Angel': 1, 'Supertrooper': 2, 'Scout': 3 };

        const sortedData = [...data].sort((a, b) => {
          if ((b.points || 0) !== (a.points || 0)) return (b.points || 0) - (a.points || 0);
          const priorityA = rankPriority[a.rank] || 3;
          const priorityB = rankPriority[b.rank] || 3;
          if (priorityA !== priorityB) return priorityA - priorityB;
          return (a.display_name || "").localeCompare(b.display_name || "");
        });

        if (!query) {
          const top10 = sortedData.slice(0, 10);
          setLeaders(top10);
          const totalFlame = top10.reduce((acc, curr) => acc + calculateFlameDollars(curr.points), 0);
          setStats({ totalFlame, activeAgents: top10.length });
        } else {
          setLeaders(sortedData);
        }
      }
    } catch (error) {
      console.error("Network Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
    const channel = supabase
      .channel("live-scoreboard")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        if (!searchQuery) fetchScores();
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearching(true);
      fetchScores(searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    fetchScores();
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-white dark:bg-black min-h-screen transition-colors duration-500 font-sans">
      <div className="container mx-auto max-w-6xl">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-xs">
              <Trophy size={16} /> Foundation Rewards
            </div>
            <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white leading-none">
              Flame <span className="text-orange-600">$</span> Grid
            </h1>
          </div>
          
          <div className="flex flex-col gap-4 w-full md:w-auto">
            {/* SEARCH */}
            <form onSubmit={handleSearch} className="relative group">
              <input 
                type="text"
                placeholder="Search Agent or Email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 py-3 pl-10 pr-12 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-orange-600 transition-all w-full md:w-80 text-zinc-900 dark:text-white"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-orange-600 transition-colors" size={14} />
              {isSearching && (
                <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </form>

            <div className="grid grid-cols-2 gap-px bg-zinc-200 dark:border-zinc-800 shadow-xl">
              <div className="bg-white dark:bg-zinc-950 p-4 min-w-[150px]">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Total Minted</p>
                <p className="text-xl font-black text-orange-600">${stats.totalFlame.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
              </div>
              <div className="bg-white dark:bg-zinc-950 p-4">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Elite Count</p>
                <p className="text-xl font-black text-zinc-900 dark:text-white">{stats.activeAgents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN DATA GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-3">
              <Target size={18} className="text-orange-600" /> {isSearching ? "Search Results" : "Top 10 Rankings"}
            </h3>
            
            <div className="relative border border-zinc-200 dark:border-zinc-800 overflow-hidden min-h-[500px] shadow-2xl bg-zinc-950">
              <div className="absolute inset-0 z-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${scoretableBg})` }} />
              <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-[2px]" />

              <div className="relative z-20 overflow-x-auto">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-[500px] text-white">
                    <Loader2 className="animate-spin mb-4 text-orange-600" size={32} />
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-black/60 border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        <th className="p-6">Position</th>
                        <th className="p-6">Agent Identity</th>
                        <th className="p-6 text-right">Flame $ Value</th>
                        <th className="p-6 text-right">Received</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {leaders.map((agent, index) => {
                        const totalEarned = calculateFlameDollars(agent.points);
                        const receivedAmount = Number(agent.received || 0);

                        return (
                          <tr key={agent.id} className="hover:bg-orange-600/10 transition-all group">
                            <td className="p-6 font-black italic text-2xl text-white group-hover:text-orange-400">
                               {isSearching ? "-" : `#${index + 1}`}
                            </td>
                            <td className="p-6">
                              <p className="font-bold text-white uppercase tracking-tight mb-1">{agent.display_name || "Unknown Agent"}</p>
                              <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-sm ${
                                agent.rank === 'Angel' ? 'bg-yellow-500 text-black' : 
                                agent.rank === 'Supertrooper' ? 'bg-orange-600 text-white' : 
                                'bg-blue-600 text-white'
                              }`}>
                                {agent.rank || "Scout"}
                              </span>
                            </td>
                            <td className="p-6 text-right">
                              <p className="font-mono font-black text-white text-lg">
                                ${totalEarned.toLocaleString(undefined, {minimumFractionDigits: 2})}
                              </p>
                              <div className="flex items-center justify-end gap-1 text-[9px] font-black text-orange-600 uppercase">
                                <NetworkIcon size={10} /> {agent.points?.toLocaleString()} NETWORK
                              </div>
                            </td>
                            <td className="p-6 text-right">
                              <p className="font-mono font-bold text-green-500 text-md">
                                ${receivedAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                              </p>
                              <p className="text-[9px] text-zinc-600 font-black uppercase italic tracking-tighter">Confirmed Payout</p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-3">
              <Activity size={18} className="text-orange-600" /> Foundation Parameters
            </h3>
            <div className="border border-zinc-200 dark:border-zinc-800 p-8 bg-zinc-50 dark:bg-zinc-950 shadow-inner">
               <div className="space-y-6">
                  <div className="p-5 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm">
                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Network Valuation</p>
                    <p className="text-[11px] font-mono text-zinc-600 bg-zinc-100 dark:bg-zinc-900 p-3 rounded italic leading-relaxed">
                      Points registered as "Network" are calculated against the 1B Liquidity Reserve.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-zinc-900 text-white rounded-xl shadow-xl border border-zinc-800 space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-orange-600">Global Reserve</p>
                      <ArrowUpRight size={16} className="text-orange-600" />
                    </div>
                    <p className="text-3xl font-black italic tracking-tighter">$1,000,000,000</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest opacity-60">Foundation Pool Limit</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoretable;
