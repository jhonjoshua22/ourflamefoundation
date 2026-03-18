import React, { useState, useEffect, useRef } from "react";
import scoretableBg from "../assets/scoretable.png";
import { supabase } from "../lib/supabaseClient";
import {
  Trophy, Target, Zap, Star, Shield, Activity,
  Loader2, Search, X, Network as NetworkIcon, Gift, Sprout,
  Users, Filter, BarChart3, Percent, Globe, Heart, DollarSign, Lightbulb,
  Facebook, Twitter, Linkedin, MessageSquare, Youtube, Instagram
} from "lucide-react";

const Scoretable = () => {
  const [activeTab, setActiveTab] = useState<"leaderboard" | "ownership" | "kpis" | "missions">("leaderboard");
  const [leaders, setLeaders] = useState<any[]>([]);
  const [ownershipEntries, setOwnershipEntries] = useState<any[]>([]);
  const [kpiSnapshot, setKpiSnapshot] = useState<any>(null);
  const [socialStats, setSocialStats] = useState<any[]>([]);
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [stats, setStats] = useState({ totalMembers: 0 });
  const [sortBy, setSortBy] = useState("network");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const rankPriority: Record<string, number> = {
    "SuperFarmer": 1,
    "Angel": 2,
    "SuperHero": 3,
    "Normie": 4
  };

  // NEW FLAME $ FORMULA
  const calculateFlameDollars = (networkVal: number) => {
    const currentYear = new Date().getFullYear(); // e.g. 2026
    const yearsSince2020 = currentYear - 2020;   // 6 for 2026
    if (yearsSince2020 <= 0) return 0;

    const totalPool = 75000000; // $75M
    const yearAllocation = totalPool * (yearsSince2020 / yearsSince2020); // full $75M in current year (adjust divisor if multi-year spread)

    const totalPeople = stats.totalMembers || 1; // avoid divide by zero
    const perPerson = yearAllocation / totalPeople;

    // World splits
    const splits = {
      Money: 0.50,
      Gaming: 0.25,
      Education: 0.125,
      Health: 0.0625,
      Legal: 0.03125,
      Sport: 0.015625,
      // "Other 25 Worlds" get remaining 1.5625% split equally (0.000625 each)
      Other: (1 - 0.50 - 0.25 - 0.125 - 0.0625 - 0.03125 - 0.015625) / 25
    };

    // Return total Flame $ per person (sum of all worlds)
    // You can also return object with per-world breakdown if needed later
    return Object.values(splits).reduce((sum, pct) => sum + (perPerson * pct), 0);
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

  const fetchSocialStats = async () => {
    try {
      const { data } = await supabase
        .from("social_stats")
        .select("platform, handle, followers_count, engagement_rate")
        .order("followers_count", { ascending: false });
      setSocialStats(data || []);
    } catch (err) {
      console.error("Social stats fetch error:", err);
    }
  };

  const fetchLeaderboard = async (query = "", currentSort = sortBy) => {
    try {
      const { data: allData } = await supabase.from("profiles").select("followers, network");
      const totalFollowerSum = allData?.reduce((acc, curr) => acc + (Number(curr.followers) || 0), 0) || 0;

      let queryBuilder = supabase.from("profiles").select(`
        id, display_name, email, network, received, "Rebirth", rank, world, followers,
        happiness_score, curiosity_score, econ_score
      `);

      if (query) {
        queryBuilder = queryBuilder.or(`display_name.ilike.%${query}%,email.ilike.%${query}%`);
      } else if (currentSort !== 'rank') {
        queryBuilder = queryBuilder.order(currentSort, { ascending: false }).limit(20);
      } else {
        queryBuilder = queryBuilder.limit(50);
      }

      const { data: tableData } = await queryBuilder;
      if (tableData) {
        const sorted = [...tableData].sort((a, b) => {
          if (currentSort === 'rank') {
            return (rankPriority[a.rank] || 99) - (rankPriority[b.rank] || 99);
          }
          return (b[currentSort] || 0) - (a[currentSort] || 0);
        });

        if (!query) {
          const top10 = sorted.slice(0, 10);
          setLeaders(top10);
          setStats({ totalMembers: totalFollowerSum });
        } else {
          setLeaders(sorted);
        }
      }
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
    }
  };

  const fetchOwnership = async () => {
    try {
      const { data } = await supabase
        .from("scoretable_entries")
        .select(`*, tribes!left (name, description)`)
        .eq("active", true)
        .order("own_percentage", { ascending: false });
      setOwnershipEntries(data || []);
    } catch (err) {
      console.error("Ownership fetch error:", err);
    }
  };

  const fetchLatestKpi = async () => {
    try {
      const { data } = await supabase
        .from("kpi_snapshots")
        .select("*")
        .order("snapshot_at", { ascending: false })
        .limit(1);
      if (data?.[0]) setKpiSnapshot(data[0]);
    } catch (err) {
      console.error("KPI fetch error:", err);
    }
  };

  const fetchMissions = async () => {
    try {
      const { data } = await supabase
        .from("missions")
        .select("id, title, description, type, status, predicted_impact, grok_generated, created_at")
        .order("created_at", { ascending: false })
        .limit(10);
      setMissions(data || []);
    } catch (err) {
      console.error("Missions fetch error:", err);
    }
  };

  useEffect(() => {
    setLoading(true);
    const loadAll = async () => {
      await Promise.all([
        fetchLeaderboard(searchQuery, sortBy),
        fetchOwnership(),
        fetchLatestKpi(),
        fetchSocialStats(),
        fetchMissions()
      ]);
      setLoading(false);
    };
    loadAll();

    const channels = [
      supabase.channel("profiles-changes").on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        if (!searchQuery) fetchLeaderboard(searchQuery, sortBy);
      }).subscribe(),
      supabase.channel("scoretable-changes").on("postgres_changes", { event: "*", schema: "public", table: "scoretable_entries" }, fetchOwnership).subscribe(),
      supabase.channel("kpi-changes").on("postgres_changes", { event: "*", schema: "public", table: "kpi_snapshots" }, fetchLatestKpi).subscribe(),
      supabase.channel("social-changes").on("postgres_changes", { event: "*", schema: "public", table: "social_stats" }, fetchSocialStats).subscribe(),
      supabase.channel("missions-changes").on("postgres_changes", { event: "*", schema: "public", table: "missions" }, fetchMissions).subscribe()
    ];

    return () => {
      channels.forEach(ch => supabase.removeChannel(ch));
    };
  }, [sortBy, searchQuery]);

  const filterOptions = [
    { label: "Network", value: "network" },
    { label: "Rank", value: "rank" },
    { label: "Followers", value: "followers" }
  ];

  const classRewards = [
    { class: "Normie", icon: <Zap size={20} className="text-blue-500" />, rewards: ["Do Good", "Share Content", "Win Prizes"] },
    { class: "SuperHero", icon: <Star size={20} className="text-orange-600" />, rewards: ["Recruit Normies", "Educate All", "Launch Products"] },
    { class: "Angel", icon: <Shield size={20} className="text-yellow-500" />, rewards: ["Recruit SuperHeros", "Mentor & Coach", "Angel Fund"] },
    { class: "SuperFarmer", icon: <Sprout size={20} className="text-green-500" />, rewards: ["Recruit Angels", "Mentor & Coach", "Seed Fund"] }
  ];

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <Facebook size={18} className="text-blue-600" />;
      case 'instagram': return <Instagram size={18} className="text-pink-500" />;
      case 'x': return <Twitter size={18} className="text-zinc-200" />;
      case 'linkedin': return <Linkedin size={18} className="text-blue-700" />;
      case 'reddit': return <MessageSquare size={18} className="text-orange-500" />;
      case 'youtube': return <Youtube size={18} className="text-red-600" />;
      default: return <Globe size={18} className="text-zinc-400" />;
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-white dark:bg-black min-h-screen transition-colors duration-500 font-sans">
      <div className="container mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-xs">
              <Trophy size={16} /> Global Flame Network
            </div>
            <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white leading-none">
              Flame Foundation <span className="text-orange-600">Scoretable</span>
            </h1>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <form onSubmit={(e) => { e.preventDefault(); fetchLeaderboard(searchQuery); setIsSearching(true); }} className="relative group">
              <input
                type="text"
                placeholder="Search Agent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 py-3 pl-10 pr-12 text-[10px] font-bold uppercase tracking-widest w-full md:w-80 text-zinc-900 dark:text-white focus:border-orange-600 outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              {isSearching && <X className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer" size={14} onClick={() => { setSearchQuery(""); setIsSearching(false); fetchLeaderboard(); }} />}
            </form>
            <div className="flex justify-end">
              <div className="bg-white dark:bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-800 min-w-[220px]">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Total Members</p>
                <p className="text-xl font-black text-zinc-900 dark:text-white">{stats.totalMembers.toLocaleString()} +</p>
              </div>
            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex justify-center mb-10 overflow-x-auto">
          <div className="inline-flex bg-zinc-900 border border-zinc-800 rounded-full p-1 flex-wrap gap-1">
            <button
              onClick={() => setActiveTab("leaderboard")}
              className={`px-5 py-2 text-sm font-bold uppercase tracking-wider rounded-full transition-all ${activeTab === "leaderboard" ? "bg-orange-600 text-white" : "text-zinc-400 hover:text-white"}`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab("ownership")}
              className={`px-5 py-2 text-sm font-bold uppercase tracking-wider rounded-full transition-all ${activeTab === "ownership" ? "bg-orange-600 text-white" : "text-zinc-400 hover:text-white"}`}
            >
              Ownership & Valuation
            </button>
            <button
              onClick={() => setActiveTab("kpis")}
              className={`px-5 py-2 text-sm font-bold uppercase tracking-wider rounded-full transition-all ${activeTab === "kpis" ? "bg-orange-600 text-white" : "text-zinc-400 hover:text-white"}`}
            >
              Global KPIs
            </button>
            <button
              onClick={() => setActiveTab("missions")}
              className={`px-5 py-2 text-sm font-bold uppercase tracking-wider rounded-full transition-all ${activeTab === "missions" ? "bg-orange-600 text-white" : "text-zinc-400 hover:text-white"}`}
            >
              Grok Missions
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Loader2 className="animate-spin text-orange-600" size={48} />
          </div>
        ) : (
          <>
            {/* LEADERBOARD TAB */}
            {activeTab === "leaderboard" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-3">
                      <Target size={18} className="text-orange-600" /> Live Leaderboard (By {sortBy})
                    </h3>
                    <div className="relative inline-block" ref={filterRef}>
                      <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-white hover:border-orange-600 transition-colors flex items-center gap-3 rounded">
                        <Filter size={14} className={isFilterOpen ? "text-orange-600" : "text-zinc-400"} />
                        <span className="text-xs font-black uppercase">Sort: {sortBy}</span>
                      </button>
                      {isFilterOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-zinc-950 border border-zinc-800 shadow-2xl z-50">
                          {filterOptions.map(opt => (
                            <button key={opt.value} onClick={() => { setSortBy(opt.value); setIsFilterOpen(false); }} className={`w-full text-left px-4 py-3 text-xs font-black uppercase ${sortBy === opt.value ? "bg-orange-600 text-white" : "text-zinc-400 hover:bg-zinc-800"}`}>{opt.label}</button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="relative border border-zinc-800 overflow-hidden min-h-[500px] shadow-2xl bg-zinc-950 rounded-lg">
                    <div className="absolute inset-0 z-0 bg-cover opacity-30" style={{ backgroundImage: `url(${scoretableBg})` }} />
                    <div className="absolute inset-0 z-10 bg-black/75 backdrop-blur-sm" />
                    <div className="relative z-20 overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                          <tr className="bg-black/70 border-b border-orange-900/50 text-xs font-black uppercase tracking-widest text-zinc-400">
                            <th className="p-6">Agent</th>
                            <th className="p-6">World</th>
                            <th className="p-6">Rebirth</th>
                            <th className="p-6">Followers</th>
                            <th className="p-6 text-right">Flame Value</th>
                            <th className="p-6 text-right text-green-400">Received</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50 text-white">
                          {leaders.map(agent => (
                            <tr key={agent.id} className="hover:bg-orange-900/20 transition-colors">
                              <td className="p-6">
                                <p className="font-bold uppercase text-sm mb-1">{agent.display_name || "Unknown Agent"}</p>
                                <span className="text-[10px] font-black uppercase bg-zinc-800 px-2 py-0.5 rounded text-zinc-300 border border-zinc-700">{agent.rank}</span>
                              </td>
                              <td className="p-6 italic text-sm text-zinc-400">{agent.world || "Universal"}</td>
                              <td className="p-6 text-sm font-bold text-zinc-300">{agent.Rebirth || 2026}</td>
                              <td className="p-6">
                                <div className="flex items-center gap-2">
                                  <Users size={14} className="text-orange-600" />
                                  {Number(agent.followers || 0).toLocaleString()}
                                </div>
                              </td>
                              <td className="p-6 text-right font-mono text-lg font-black text-orange-400">
                                ${calculateFlameDollars(agent.network).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                <div className="text-[10px] text-zinc-500 flex items-center justify-end gap-1">
                                  <NetworkIcon size={12} /> {agent.network?.toLocaleString() || 0}
                                </div>
                              </td>
                              <td className="p-6 text-right font-mono text-xl font-black text-green-400">
                                ${Number(agent.received || 0).toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-3">
                    <div className="relative">
                      <Activity size={18} className="text-orange-600" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-600 rounded-full animate-ping" />
                    </div>
                    Live Activity
                  </h3>
                  <div className="border border-zinc-800 p-6 bg-zinc-950 h-[500px] overflow-y-auto custom-scrollbar rounded-lg">
                    <div className="space-y-6">
                      {leaders.slice(0, 12).map((agent, i) => (
                        <div key={i} className="text-sm border-b border-zinc-800 pb-4 last:border-0">
                          <p className="text-zinc-400 leading-relaxed">
                            Agent <span className="text-white font-black italic uppercase">{agent.display_name}</span> has synced with the foundation.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* OWNERSHIP & VALUATION TAB */}
            {activeTab === "ownership" && (
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-zinc-800">
                  <h3 className="text-xl font-black uppercase tracking-wider text-orange-600 flex items-center gap-3">
                    <Percent size={24} /> Ownership & Valuation Table
                  </h3>
                  <p className="text-zinc-500 text-sm mt-2">Grok-optimized distribution of solutions, valuations & ownership %</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-black/60 text-xs font-black uppercase tracking-widest text-zinc-400 border-b border-zinc-800">
                        <th className="p-6">WHO (Name + Tribe + Logins)</th>
                        <th className="p-6">Solution 1</th>
                        <th className="p-6">Valuation 1</th>
                        <th className="p-6">Solution 2</th>
                        <th className="p-6">Valuation 2</th>
                        <th className="p-6">Solution 3</th>
                        <th className="p-6">Valuation 3</th>
                        <th className="p-6 text-right text-green-400">OWN %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/50">
                      {ownershipEntries.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="p-12 text-center text-zinc-500 italic">
                            No ownership entries yet — Grok swarm will populate soon
                          </td>
                        </tr>
                      ) : (
                        ownershipEntries.map(entry => (
                          <tr key={entry.id} className="hover:bg-orange-950/20 transition-colors">
                            <td className="p-6 font-medium">
                              {entry.who_full || (entry.tribes?.name ? `${entry.tribes.name} - ${entry.tribes.description || ''}` : "No Tribe Assigned")}
                            </td>
                            <td className="p-6">
                              {entry.solution_link_1 ? (
                                <a href={entry.solution_link_1} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">
                                  Link 1
                                </a>
                              ) : '-'}
                            </td>
                            <td className="p-6 text-sm font-mono">
                              {entry.valuation_1 ? `$${entry.valuation_1.toLocaleString()}` : '-'}
                            </td>
                            <td className="p-6">
                              {entry.solution_link_2 ? (
                                <a href={entry.solution_link_2} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">
                                  Link 2
                                </a>
                              ) : '-'}
                            </td>
                            <td className="p-6 text-sm font-mono">
                              {entry.valuation_2 ? `$${entry.valuation_2.toLocaleString()}` : '-'}
                            </td>
                            <td className="p-6">
                              {entry.solution_link_3 ? (
                                <a href={entry.solution_link_3} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm">
                                  Link 3
                                </a>
                              ) : '-'}
                            </td>
                            <td className="p-6 text-sm font-mono">
                              {entry.valuation_3 ? `$${entry.valuation_3.toLocaleString()}` : '-'}
                            </td>
                            <td className="p-6 text-right text-xl font-black text-green-400">
                              {entry.own_percentage ? `${entry.own_percentage}%` : '-'}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* GLOBAL KPIs TAB */}
            {activeTab === "kpis" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Healthy Happiness", value: kpiSnapshot?.total_happiness, icon: <Heart size={32} className="text-pink-500" />, color: "pink" },
                  { title: "Economic Sustainability", value: kpiSnapshot?.total_econ, icon: <DollarSign size={32} className="text-green-500" />, color: "green" },
                  { title: "Curiosity & Truth", value: kpiSnapshot?.total_curiosity, icon: <Lightbulb size={32} className="text-yellow-500" />, color: "yellow" }
                ].map(item => (
                  <div key={item.title} className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 text-center shadow-2xl hover:border-orange-600/50 transition-colors">
                    <div className="mb-4">{item.icon}</div>
                    <h4 className="text-lg font-black uppercase tracking-wider text-zinc-400 mb-2">{item.title}</h4>
                    <p className={`text-5xl font-black ${item.color === "pink" ? "text-pink-500" : item.color === "green" ? "text-green-500" : "text-yellow-500"}`}>
                      {item.value ? item.value.toFixed(1) : "—"}%
                    </p>
                  </div>
                ))}

                <div className="md:col-span-3 bg-zinc-950 border border-zinc-800 rounded-xl p-8 mt-4">
                  <h3 className="text-xl font-black uppercase tracking-wider text-orange-600 mb-6 flex items-center gap-3">
                    <Globe size={24} /> Global Network Snapshot
                  </h3>
                  <div className="overflow-x-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      {socialStats.length > 0 ? (
                        socialStats.map((stat, idx) => (
                          <div key={idx} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-lg hover:border-orange-600/30 transition-all group">
                            <div className="flex items-center gap-3 mb-4">
                              {getSocialIcon(stat.platform)}
                              <p className="text-xs font-black uppercase tracking-widest text-zinc-300">{stat.platform}</p>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <p className="text-[10px] text-zinc-500 uppercase font-bold">Handle</p>
                                <p className="text-sm font-bold text-white truncate">{stat.handle || '—'}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
                                <div>
                                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Followers</p>
                                  <p className="text-lg font-black text-orange-400">{stat.followers_count?.toLocaleString() || 0}</p>
                                </div>
                                <div>
                                  <p className="text-[10px] text-zinc-500 uppercase font-bold">Engage</p>
                                  <p className="text-lg font-black text-green-400">{stat.engagement_rate}%</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-4 py-8 text-center text-zinc-500 italic">
                          No social stats synchronized yet.
                        </div>
                      )}
                    </div>
                  </div>
                  {kpiSnapshot?.grok_note && (
                    <p className="mt-6 text-zinc-400 italic text-center border-t border-zinc-800 pt-4">
                      Grok note: {kpiSnapshot.grok_note}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* GROK MISSIONS TAB */}
            {activeTab === "missions" && (
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl p-8">
                <h3 className="text-xl font-black uppercase tracking-wider text-orange-600 mb-6 flex items-center gap-3">
                  <Target size={24} /> Grok-Generated Missions (Latest 10)
                </h3>
                {missions.length === 0 ? (
                  <div className="text-center py-12 text-zinc-500 italic">
                    No missions generated yet — Grok creates them hourly based on foundation KPIs
                  </div>
                ) : (
                  <div className="space-y-6">
                    {missions.map((mission) => (
                      <div key={mission.id} className="border border-zinc-700 p-6 rounded-lg hover:border-orange-600/50 transition-colors bg-zinc-900/30">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                          <div>
                            <h4 className="text-lg font-bold text-white mb-1">{mission.title}</h4>
                            <p className="text-sm text-zinc-400">{mission.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs uppercase px-3 py-1 rounded-full bg-orange-600/30 text-orange-300">
                              {mission.type}
                            </span>
                            <span className="text-xs uppercase px-3 py-1 rounded-full bg-zinc-700 text-zinc-300">
                              {mission.status}
                            </span>
                            {mission.grok_generated && (
                              <span className="text-xs uppercase px-3 py-1 rounded-full bg-purple-600/30 text-purple-300">
                                Grok
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center text-sm mb-4">
                          <div className="bg-zinc-900/50 p-3 rounded">
                            <p className="text-zinc-500 mb-1">Happiness</p>
                            <p className="font-bold text-pink-400 text-xl">
                              +{mission.predicted_impact?.happiness || 0}
                            </p>
                          </div>
                          <div className="bg-zinc-900/50 p-3 rounded">
                            <p className="text-zinc-500 mb-1">Economy</p>
                            <p className="font-bold text-green-400 text-xl">
                              +{mission.predicted_impact?.econ || 0}
                            </p>
                          </div>
                          <div className="bg-zinc-900/50 p-3 rounded">
                            <p className="text-zinc-500 mb-1">Curiosity</p>
                            <p className="font-bold text-yellow-400 text-xl">
                              +{mission.predicted_impact?.curiosity || 0}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-zinc-500">
                          Created: {new Date(mission.created_at).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* FOUNDATION REWARDS */}
        <div className="space-y-6 pt-16 border-t border-zinc-800">
          <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-3">
            <Gift size={18} className="text-orange-600" /> Foundation Rewards
          </h3>
          <div className="border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl rounded-lg">
            {classRewards.map(tier => (
              <div key={tier.class} className="grid grid-cols-1 md:grid-cols-12 items-center p-8 border-b border-zinc-800 last:border-0 group hover:bg-zinc-900/50 transition-colors">
                <div className="col-span-4 flex items-center gap-4">
                  <div className="p-4 bg-zinc-800 rounded group-hover:bg-orange-600/30 transition-colors">
                    {tier.icon}
                  </div>
                  <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                    {tier.class}
                  </h4>
                </div>
                <div className="col-span-8 text-right flex flex-wrap justify-end gap-3">
                  {tier.rewards.map((r, i) => (
                    <span key={i} className="text-xs font-bold uppercase text-zinc-400 bg-zinc-900 px-4 py-2 border border-zinc-700 rounded">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-16">
          Database-driven | Real-time | Optimized by Grok + AI Swarm
        </p>
      </div>
    </div>
  );
};

export default Scoretable;
