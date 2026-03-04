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
  Gift
} from "lucide-react";

const Scoretable = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [stats, setStats] = useState({ totalFlame: 0, totalMembers: 0 });

  const calculateFlameDollars = (points: number) => {
    return (1000000000 * 0.0001533 * (points || 0)) / 50000;
  };

  const fetchScores = async (query = "") => {
    try {
      setLoading(true);
      const { count } = await supabase.from("profiles").select("*", { count: 'exact', head: true });

      let supabaseQuery = supabase.from("profiles").select("id, display_name, email, points, rank, received");

      if (query) {
        supabaseQuery = supabaseQuery.or(`display_name.ilike.%${query}%,email.ilike.%${query}%`);
      } else {
        supabaseQuery = supabaseQuery.order("points", { ascending: false }).limit(20);
      }

      const { data, error } = await supabaseQuery;
      if (error) throw error;

      if (data) {
        const sortedData = [...data].sort((a, b) => (b.points || 0) - (a.points || 0));

        if (!query) {
          const top10 = sortedData.slice(0, 10);
          setLeaders(top10);
          const totalFlame = top10.reduce((acc, curr) => acc + calculateFlameDollars(curr.points), 0);
          setStats({ totalFlame, totalMembers: count || 0 });
        } else {
          setLeaders(sortedData);
        }
      }
    } catch (error) {
      console.error("Foundation Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
    const channel = supabase.channel("live-scoreboard").on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
      if (!searchQuery) fetchScores();
    }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const classRewards = [
    { class: "Scout", icon: <Zap size={20} className="text-blue-500" />, network: "0 - 5,000", rewards: ["Basic Mission Access", "Community Badge"] },
    { class: "Supertrooper", icon: <Star size={20} className="text-orange-600" />, network: "5,001 - 15,000", rewards: ["Priority Deployment", "Governance Voting"] },
    { class: "Angel", icon: <Shield size={20} className="text-yellow-500" />, network: "15,001+", rewards: ["Foundation Liaison", "Strategic Rights"] }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-white dark:bg-black min-h-screen transition-colors duration-500 font-sans">
      <div className="container mx-auto max-w-6xl">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-xs">
              <Trophy size={16} /> Global Payouts
            </div>
            <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white leading-none">
              Flame Foundation <span className="text-orange-600">Rewards</span>
            </h1>
          </div>
          
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <form onSubmit={(e) => { e.preventDefault(); fetchScores(searchQuery); setIsSearching(true); }} className="relative group">
              <input 
                type="text" 
                placeholder="Search Agent or Email..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 py-3 pl-10 pr-12 text-[10px] font-bold uppercase tracking-widest w-full md:w-80 text-zinc-900 dark:text-white focus:border-orange-600 outline-none" 
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              {isSearching && <X className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer" size={14} onClick={() => { setSearchQuery(""); setIsSearching(false); fetchScores(); }} />}
            </form>

            <div className="grid grid-cols-2 gap-px bg-zinc-200 dark:border-zinc-800">
              <div className="bg-white dark:bg-zinc-950 p-4 min-w-[150px]">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Top 10 Value</p>
                <p className="text-xl font-black text-orange-600">${stats.totalFlame.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
              </div>
              <div className="bg-white dark:bg-zinc-950 p-4">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Members</p>
                <p className="text-xl font-black text-zinc-900 dark:text-white">{stats.totalMembers.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN DATA GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-3">
              <Target size={18} className="text-orange-600" /> {isSearching ? "Search Results" : "Live Scoreboard"}
            </h3>
            
            <div className="relative border border-zinc-200 dark:border-zinc-800 overflow-hidden min-h-[500px] shadow-2xl bg-zinc-950">
              <div className="absolute inset-0 z-0 bg-cover opacity-30" style={{ backgroundImage: `url(${scoretableBg})` }} />
              <div className="absolute inset-0 z-10 bg-black/70 backdrop-blur-[2px]" />
              <div className="relative z-20 overflow-x-auto">
                {loading ? (
                  <div className="flex h-[500px] items-center justify-center"><Loader2 className="animate-spin text-orange-600" size={32} /></div>
                ) : (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-black/60 border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        <th className="p-6">Pos</th>
                        <th className="p-6">Agent</th>
                        <th className="p-6 text-right">Flame $</th>
                        <th className="p-6 text-right text-green-500">Paid</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-white">
                      {leaders.map((agent, index) => (
                        <tr key={agent.id} className="hover:bg-orange-600/10 transition-colors group">
                          <td className="p-6 font-black italic text-xl">{isSearching ? "-" : `#${index + 1}`}</td>
                          <td className="p-6">
                            <p className="font-bold uppercase text-sm leading-none mb-1">{agent.display_name}</p>
                            <span className="text-[8px] font-black uppercase bg-zinc-800 px-1 py-0.5">{agent.rank || "Scout"}</span>
                          </td>
                          <td className="p-6 text-right font-mono text-lg font-black">
                            ${calculateFlameDollars(agent.points).toLocaleString(undefined, {minimumFractionDigits: 2})}
                            <div className="text-[9px] text-orange-600 flex items-center justify-end gap-1 font-bold">
                              <NetworkIcon size={10} /> {agent.points?.toLocaleString()} NETWORK
                            </div>
                          </td>
                          <td className="p-6 text-right font-mono text-green-500 font-bold">
                            ${Number(agent.received || 0).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* ELITE ACTIVITY FEED */}
          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-3">
              <div className="relative">
                <Activity size={18} className="text-orange-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-600 rounded-full animate-ping" />
              </div>
              Live Activity
            </h3>
            <div className="border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-950 h-[500px] overflow-y-auto">
              <div className="space-y-6">
                {leaders.slice(0, 8).map((agent, i) => (
                  <div key={i} className="text-[11px] border-b border-zinc-200 dark:border-zinc-800 pb-4 last:border-0">
                    <p className="text-zinc-900 dark:text-zinc-400 font-medium leading-relaxed">
                      Agent <span className="text-white font-black italic">{agent.display_name}</span> is currently active at Rank #{i + 1} with {agent.points?.toLocaleString()} NETWORK.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* REWARDS SECTION */}
        <div className="space-y-6 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-3">
            <Gift size={18} className="text-orange-600" /> Tiered Rewards
          </h3>
          <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-2xl">
            <div className="hidden md:grid grid-cols-12 bg-zinc-100 dark:bg-zinc-900 text-[10px] font-black uppercase p-6 border-b border-zinc-200 dark:border-zinc-800">
              <div className="col-span-4">Class</div>
              <div className="col-span-4 text-center">Network Threshold</div>
              <div className="col-span-4 text-right">Class Rewards</div>
            </div>
            {classRewards.map((tier) => (
              <div key={tier.class} className="grid grid-cols-1 md:grid-cols-12 items-center p-8 border-b border-zinc-100 dark:border-zinc-900 last:border-0 group hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                <div className="col-span-4 flex items-center gap-4">
                  <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded">{tier.icon}</div>
                  <h4 className="text-2xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white">{tier.class}</h4>
                </div>
                <div className="col-span-4 text-center font-mono font-bold text-orange-600 tracking-widest">{tier.network} NETWORK</div>
                <div className="col-span-4 text-right space-y-1">
                  {tier.rewards.map((r, i) => <p key={i} className="text-[10px] font-bold uppercase text-zinc-500">{r}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Scoretable;
