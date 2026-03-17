import React, { useState, useEffect, useRef } from "react";
import scoretableBg from "../assets/scoretable.png"; 
import { supabase } from "../lib/supabaseClient"; 
import { 
  Trophy, Target, Zap, Star, Shield, Activity, 
  Loader2, Search, X, Network as NetworkIcon, Gift, Sprout,
  Users, Filter
} from "lucide-react";

const Scoretable = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [stats, setStats] = useState({ totalFlame: 0, totalMembers: 0 });
  const [sortBy, setSortBy] = useState("network");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Custom Priority for Ranks
  const rankPriority: Record<string, number> = {
    "SuperFarmer": 1,
    "Angel": 2,
    "SuperHero": 3,
    "Normie": 4
  };

  const calculateFlameDollars = (networkVal: number) => {
    return (1000000000 * 0.0001533 * (networkVal || 0)) / 50000;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchScores = async (query = "", currentSort = sortBy) => {
    try {
      setLoading(true);
      
      const { data: allData, error: fetchError } = await supabase
        .from("profiles")
        .select("followers, network");

      if (fetchError) throw fetchError;
      const totalFollowerSum = allData?.reduce((acc, curr) => acc + (Number(curr.followers) || 0), 0) || 0;

      let supabaseQuery = supabase.from("profiles").select(`
        id, display_name, email, network, received, Rebirth, rank, world, followers
      `);

      if (query) {
        supabaseQuery = supabaseQuery.or(`display_name.ilike.%${query}%,email.ilike.%${query}%`);
      } 
      else if (currentSort !== 'rank') {
        supabaseQuery = supabaseQuery.order(currentSort, { ascending: false }).limit(20);
      } else {
        supabaseQuery = supabaseQuery.limit(50); 
      }

      const { data: tableData, error: tableError } = await supabaseQuery;
      if (tableError) throw tableError;

      if (tableData) {
        const sortedData = [...tableData].sort((a, b) => {
          if (currentSort === 'rank') {
            const priorityA = rankPriority[a.rank] || 99;
            const priorityB = rankPriority[b.rank] || 99;
            return priorityA - priorityB;
          }
          return (b[currentSort] || 0) - (a[currentSort] || 0);
        });
        
        if (!query) {
          const top10 = sortedData.slice(0, 10);
          setLeaders(top10);
          const totalFlame = top10.reduce((acc, curr) => acc + calculateFlameDollars(curr.network), 0);
          setStats({ totalFlame, totalMembers: totalFollowerSum });
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
    fetchScores(searchQuery, sortBy);
    const channel = supabase.channel("live-scoreboard")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        if (!searchQuery) fetchScores(searchQuery, sortBy);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [sortBy]);

  const classRewards = [
    { class: "Normie", icon: <Zap size={20} className="text-blue-500" />, rewards: ["Do Good", "Share Content", "Win Prizes"] },
    { class: "SuperHero", icon: <Star size={20} className="text-orange-600" />, rewards: ["Recruit Normies", "Educate All", "Launch Products"] },
    { class: "Angel", icon: <Shield size={20} className="text-yellow-500" />, rewards: ["Recruit SuperHeros", "Mentor & Coach", "Angel Fund"] },
    { class: "SuperFarmer", icon: <Sprout size={20} className="text-green-500" />, rewards: ["Recruit Angels", "Mentor & Coach", "Seed Fund"] }
  ];

  const filterOptions = [
    { label: "Network", value: "network" },
    { label: "Rank", value: "rank" },
    { label: "Followers", value: "followers" }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-white dark:bg-black min-h-screen transition-colors duration-500 font-sans">
      <div className="container mx-auto max-w-6xl">
        
        {/* HEADER & STATS */}
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
                placeholder="Search Agent..." 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 py-3 pl-10 pr-12 text-[10px] font-bold uppercase tracking-widest w-full md:w-80 text-zinc-900 dark:text-white focus:border-orange-600 outline-none" 
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              {isSearching && <X className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer" size={14} onClick={() => { setSearchQuery(""); setIsSearching(false); fetchScores(); }} />}
            </form>

            <div className="flex justify-end">
              <div className="bg-white dark:bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-800 min-w-[180px]">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Total Members</p>
                <p className="text-xl font-black text-zinc-900 dark:text-white">{stats.totalMembers.toLocaleString()} + </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          <div className="lg:col-span-2 space-y-4">
            {/* LABEL AND FILTER SECTION */}
            <div className="space-y-4">
              <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-3">
                <Target size={18} className="text-orange-600" /> {isSearching ? "Search Results" : `Live Scoreboard (By ${sortBy})`}
              </h3>

              <div className="relative inline-block" ref={filterRef}>
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white hover:border-orange-600 transition-colors flex items-center gap-3"
                >
                  <Filter size={14} className={isFilterOpen ? "text-orange-600" : "text-zinc-400"} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Sort: {sortBy}</span>
                </button>

                {isFilterOpen && (
                  <div className="absolute left-0 mt-2 w-48 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl z-[100] overflow-hidden">
                    {filterOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-colors ${
                          sortBy === opt.value 
                          ? "bg-orange-600 text-white" 
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="relative border border-zinc-200 dark:border-zinc-800 overflow-hidden min-h-[500px] shadow-2xl bg-zinc-950">
              <div className="absolute inset-0 z-0 bg-cover opacity-30" style={{ backgroundImage: `url(${scoretableBg})` }} />
              <div className="absolute inset-0 z-10 bg-black/70 backdrop-blur-[2px]" />
              <div className="relative z-20 overflow-x-auto">
                {loading ? (
                  <div className="flex h-[500px] items-center justify-center"><Loader2 className="animate-spin text-orange-600" size={32} /></div>
                ) : (
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-black/60 border-b border-white/10 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        <th className="p-6">Agent</th>
                        <th className="p-6">World</th>
                        <th className="p-6">Rebirth</th>
                        <th className="p-6">Followers</th>
                        <th className="p-6 text-right">Flame Value</th>
                        <th className="p-6 text-right text-green-500">Received</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-white">
                      {leaders.map((agent) => (
                        <tr key={agent.id} className="hover:bg-orange-600/10 transition-colors group">
                          <td className="p-6">
                            <p className="font-bold uppercase text-sm leading-none mb-1">{agent.display_name || "Unknown Agent"}</p>
                            <span className="text-[8px] font-black uppercase bg-zinc-800 px-1.5 py-0.5 rounded-sm text-zinc-400 border border-white/5">{agent.rank}</span>
                          </td>
                          <td className="p-6 italic text-[10px] uppercase text-zinc-400">
                             {agent.world || "Universal"}
                          </td>
                          <td className="p-6 text-xs font-bold text-zinc-300 italic">
                            {agent.Rebirth || 2026}
                          </td>
                          <td className="p-6 text-xs font-bold text-zinc-300">
                            <div className="flex items-center gap-2">
                                <Users size={12} className="text-orange-600" />
                                {Number(agent.followers || 0).toLocaleString()}
                            </div>
                          </td>
                          <td className="p-6 text-right font-mono text-lg font-black">
                            ${calculateFlameDollars(agent.network).toLocaleString(undefined, {minimumFractionDigits: 2})}
                            <div className="text-[9px] text-orange-600 flex items-center justify-end gap-1 font-bold tracking-tighter uppercase">
                              <NetworkIcon size={10} /> {agent.network?.toLocaleString() || 0} NETWORK
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

          <div className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-3">
              <div className="relative"><Activity size={18} className="text-orange-600" /><div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-600 rounded-full animate-ping" /></div>
              Live Activity
            </h3>
            <div className="border border-zinc-200 dark:border-zinc-800 p-6 bg-zinc-50 dark:bg-zinc-950 h-[500px] overflow-y-auto custom-scrollbar">
              <div className="space-y-6">
                {leaders.slice(0, 12).map((agent, i) => (
                  <div key={i} className="text-[11px] border-b border-zinc-200 dark:border-zinc-800 pb-4 last:border-0">
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                      Agent <span className="text-zinc-900 dark:text-white font-black italic uppercase">{agent.display_name}</span> has synced with the foundation.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* REWARDS GRID */}
        <div className="space-y-6 pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-3">
            <Gift size={18} className="text-orange-600" /> Foundation Rewards
          </h3>
          <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-2xl">
            {classRewards.map((tier) => (
              <div key={tier.class} className="grid grid-cols-1 md:grid-cols-12 items-center p-8 border-b border-zinc-100 dark:border-zinc-900 last:border-0 group hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                <div className="col-span-4 flex items-center gap-4">
                  <div className="p-3 bg-zinc-100 dark:bg-zinc-800 rounded group-hover:bg-orange-600 group-hover:text-white transition-colors">{tier.icon}</div>
                  <h4 className="text-2xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white">{tier.class}</h4>
                </div>
                <div className="col-span-8 text-right flex flex-wrap justify-end gap-2">
                  {tier.rewards.map((r, i) => (
                    <span key={i} className="text-[10px] font-bold uppercase text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-3 py-1 border border-zinc-200 dark:border-zinc-800">
                      {r}
                    </span>
                  ))}
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
