import React, { useState, useEffect, useRef } from "react";
import scoretableBg from "../assets/scoretable.png";
import { supabase } from "../lib/supabaseClient";
import {
  Trophy, Target, Zap, Star, Shield, Activity,
  Loader2, Search, X, Gift, Sprout,
  Users, Filter, BarChart3, Percent, Globe, Heart, DollarSign, Lightbulb,
  Facebook, Twitter, Linkedin, MessageSquare, Youtube, Instagram
} from "lucide-react";

const Scoretable = () => {
  const [activeTab, setActiveTab] = useState<"leaderboard" | "ownership" | "kpis" | "missions">("leaderboard");
  const [leaders, setLeaders] = useState<any[]>([]);
  const [ownershipEntries, setOwnershipEntries] = useState<any[]>([]);
  const [kpiSnapshot, setKpiSnapshot] = useState<any>(null);
  const [missions, setMissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState<{ [key: string]: boolean }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [stats, setStats] = useState({ totalMembers: 0 });
  const [sortBy, setSortBy] = useState("followers"); // Default to followers now
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Referral display states
  const [referralLink, setReferralLink] = useState<string>('');
  const [referredCount, setReferredCount] = useState<number>(0);
  const [loadingReferral, setLoadingReferral] = useState(true);
  const [referralError, setReferralError] = useState<string | null>(null);

  const rankPriority: Record<string, number> = {
    "SuperFarmer": 1,
    "Angel": 2,
    "SuperHero": 3,
    "Normie": 4
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

  // Fetch referral data
  useEffect(() => {
    const fetchReferral = async () => {
      setLoadingReferral(true);
      setReferralError(null);

      try {
        const { data: { user }, error: authErr } = await supabase.auth.getUser();
        if (authErr || !user) {
          setReferralError("Please log in to see your referral link");
          return;
        }

        const { data: profile, error: profileErr } = await supabase
          .from('profiles')
          .select('referral_code, referral_count')
          .eq('id', user.id)
          .single();

        if (profileErr) throw profileErr;
        if (!profile) throw new Error("No profile found");

        setReferralLink(`https://ourflamefoundation.vercel.app/?ref=${profile.referral_code}`);
        setReferredCount(profile.referral_count || 0);
      } catch (err: any) {
        setReferralError(err.message || "Failed to load referral info");
      } finally {
        setLoadingReferral(false);
      }
    };

    fetchReferral();
  }, []);

  const fetchLeaderboard = async (query = "", currentSort = sortBy) => {
    try {
      let queryBuilder = supabase.from("profiles").select(`
        id, display_name, email, received, "Rebirth", rank, world,
        happiness_score, curiosity_score, econ_score,
        tribe_id, valuation,
        facebook, linkedin   -- assuming these column names in profiles
      `);

      const { data: tableData, error } = await queryBuilder;
      if (error) throw error;

      const leadersWithFollowers = (tableData || []).map(profile => ({
        ...profile,
        followers: (profile.facebook || 0) + (profile.linkedin || 0)
      }));

      // Filter by search
      let filtered = leadersWithFollowers;
      if (query) {
        filtered = filtered.filter(p =>
          p.display_name?.toLowerCase().includes(query.toLowerCase()) ||
          p.email?.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Sort
      const sorted = [...filtered].sort((a, b) => {
        if (currentSort === 'rank') {
          return (rankPriority[a.rank] || 99) - (rankPriority[b.rank] || 99);
        }
        if (currentSort === 'followers') {
          return (b.followers || 0) - (a.followers || 0);
        }
        if (currentSort === 'valuation') {
          return (b.valuation || 0) - (a.valuation || 0);
        }
        return 0;
      });

      if (!query) {
        const top10 = sorted.slice(0, 10);
        setLeaders(top10);
        setStats({ totalMembers: leadersWithFollowers.length });
      } else {
        setLeaders(sorted);
      }
    } catch (err) {
      console.error("Leaderboard fetch error:", err);
    }
  };

  const fetchOwnership = async () => {
    setTabLoading(prev => ({ ...prev, ownership: true }));
    try {
      const { data, error } = await supabase
        .from("scoretable_entries")
        .select(`*, tribes!left (name, description)`)
        .eq("active", true)
        .order("own_percentage", { ascending: false });
      if (error) throw error;
      setOwnershipEntries(data || []);
    } catch (err) {
      console.error("Ownership fetch error:", err);
    } finally {
      setTabLoading(prev => ({ ...prev, ownership: false }));
    }
  };

  const fetchLatestKpi = async () => {
    try {
      const { data, error } = await supabase
        .from("kpi_snapshots")
        .select("*")
        .order("snapshot_at", { ascending: false })
        .limit(1);
      if (error) throw error;
      if (data?.[0]) setKpiSnapshot(data[0]);
    } catch (err) {
      console.error("KPI fetch error:", err);
    }
  };

  const fetchMissions = async () => {
    setTabLoading(prev => ({ ...prev, missions: true }));
    try {
      const { data, error } = await supabase
        .from("missions")
        .select("id, title, description, type, status, predicted_impact, grok_generated, created_at")
        .order("created_at", { ascending: false })
        .limit(10);
      if (error) throw error;
      setMissions(data || []);
    } catch (err) {
      console.error("Missions fetch error:", err);
    } finally {
      setTabLoading(prev => ({ ...prev, missions: false }));
    }
  };

  useEffect(() => {
    setLoading(true);
    const loadAll = async () => {
      await Promise.all([
        fetchLeaderboard(searchQuery, sortBy),
        fetchOwnership(),
        fetchLatestKpi(),
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
      supabase.channel("missions-changes").on("postgres_changes", { event: "*", schema: "public", table: "missions" }, fetchMissions).subscribe()
    ];
    return () => {
      channels.forEach(ch => supabase.removeChannel(ch));
    };
  }, [sortBy, searchQuery]);

  const filterOptions = [
    { label: "Tribe", value: "tribe_id" },
    { label: "Rank", value: "rank" },
    { label: "Followers", value: "followers" },
    { label: "Valuation", value: "valuation" }
  ];

  const classRewards = [
    { class: "Normie", icon: <Zap size={20} className="text-blue-500" />, rewards: ["Do Good", "Share Content", "Win Prizes"] },
    { class: "SuperHero", icon: <Star size={20} className="text-orange-600" />, rewards: ["Recruit Normies", "Educate All", "Launch Products"] },
    { class: "Angel", icon: <Shield size={20} className="text-yellow-500" />, rewards: ["Recruit SuperHeros", "Mentor & Coach", "Angel Fund"] },
    { class: "SuperFarmer", icon: <Sprout size={20} className="text-green-500" />, rewards: ["Recruit Angels", "Mentor & Coach", "Seed Fund"] }
  ];

  const copyReferralLink = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    alert('Referral link copied! Share it on X, IG, WhatsApp or anywhere 🔥');
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
                            <th className="p-6">Tribe</th>
                            <th className="p-6">Rebirth</th>
                            <th className="p-6">Followers (FB + LI)</th>
                            <th className="p-6 text-right">Valuation</th>
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
                              <td className="p-6 text-sm text-zinc-300">
                                {agent.tribe_id || "No Tribe"}
                              </td>
                              <td className="p-6 text-sm font-bold text-zinc-300">{agent.Rebirth || 2026}</td>
                              <td className="p-6">
                                <div className="flex items-center gap-2">
                                  <Users size={14} className="text-orange-600" />
                                  {agent.followers?.toLocaleString() || "0"}
                                </div>
                              </td>
                              <td className="p-6 text-right font-mono text-lg font-black text-purple-400">
                                ${agent.valuation?.toLocaleString() || "0"}
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

                  {/* REFERRAL DISPLAY */}
                  <div className="mt-8 bg-gradient-to-br from-orange-600/90 to-purple-600/90 p-6 rounded-2xl text-center shadow-2xl border border-orange-400/30">
                    <h3 className="text-2xl md:text-3xl font-black mb-3 text-white">
                      Refer a Friend → Both Get 10,000 Flame Dollars + SuperBot Power 🔥
                    </h3>
                    <p className="text-base mb-4 opacity-90 text-white">
                      Grow the Flame Network — your invites fuel global happiness & economy
                    </p>
                    {loadingReferral ? (
                      <div className="animate-pulse bg-zinc-800 h-10 rounded mb-4" />
                    ) : referralError ? (
                      <p className="text-red-300 font-medium mb-4">{referralError}</p>
                    ) : (
                      <>
                        <div className="bg-black/50 border border-orange-400/50 rounded-lg p-4 mb-4 font-mono text-sm break-all text-orange-200">
                          {referralLink || 'Loading your unique link...'}
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(referralLink);
                            alert('Referral link copied! Share it 🔥');
                          }}
                          disabled={!referralLink}
                          className="px-8 py-4 bg-zinc-900 hover:bg-zinc-800 border-2 border-orange-500 text-orange-300 font-bold uppercase tracking-wider rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg w-full md:w-auto"
                        >
                          Copy & Share Link
                        </button>
                        <p className="text-sm mt-6 text-white/90">
                          Live: <span className="font-bold text-green-300">{referredCount}</span> friends joined
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* OWNERSHIP TAB */}
            {activeTab === "ownership" && (
              <div className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-zinc-800 bg-black/20">
                  <h3 className="text-xl font-black uppercase tracking-wider text-orange-600 flex items-center gap-3">
                    <Percent size={24} /> Ownership & Valuation Table
                  </h3>
                  <p className="text-zinc-500 text-sm mt-2">Grok-optimized distribution of solutions, valuations & ownership %</p>
                </div>

                {tabLoading.ownership ? (
                  <div className="p-12 text-center bg-zinc-950">
                    <Loader2 className="animate-spin text-orange-600 mx-auto" size={32} />
                  </div>
                ) : ownershipEntries.length === 0 ? (
                  <div className="p-12 text-center text-zinc-500 italic bg-zinc-950">
                    No ownership entries yet — Grok swarm will populate soon
                  </div>
                ) : (
                  <div className="overflow-x-auto bg-zinc-950">
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
                        {ownershipEntries.map(entry => (
                          <tr key={entry.id} className="hover:bg-orange-950/20 transition-colors group">
                            <td className="p-6 font-medium text-white">
                              {entry.who_full || (entry.tribes?.name ? `${entry.tribes.name} - ${entry.tribes.description || ''}` : "No Tribe Assigned")}
                            </td>
                            <td className="p-6">
                              {entry.solution_link_1 ? (
                                <a href={entry.solution_link_1} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline text-sm font-bold">
                                  Link 1
                                </a>
                              ) : <span className="text-zinc-700">-</span>}
                            </td>
                            <td className="p-6 text-sm font-mono text-zinc-300">
                              {entry.valuation_1 ? `$${entry.valuation_1.toLocaleString()}` : '-'}
                            </td>
                            <td className="p-6">
                              {entry.solution_link_2 ? (
                                <a href={entry.solution_link_2} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline text-sm font-bold">
                                  Link 2
                                </a>
                              ) : <span className="text-zinc-700">-</span>}
                            </td>
                            <td className="p-6 text-sm font-mono text-zinc-300">
                              {entry.valuation_2 ? `$${entry.valuation_2.toLocaleString()}` : '-'}
                            </td>
                            <td className="p-6">
                              {entry.solution_link_3 ? (
                                <a href={entry.solution_link_3} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 hover:underline text-sm font-bold">
                                  Link 3
                                </a>
                              ) : <span className="text-zinc-700">-</span>}
                            </td>
                            <td className="p-6 text-sm font-mono text-zinc-300">
                              {entry.valuation_3 ? `$${entry.valuation_3.toLocaleString()}` : '-'}
                            </td>
                            <td className="p-6 text-right text-xl font-black text-green-400">
                              {entry.own_percentage ? `${entry.own_percentage}%` : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
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
                      {/* Social stats removed since followers now from profiles */}
                      <div className="col-span-4 py-8 text-center text-zinc-500 italic">
                        Followers data now sourced from profiles (Facebook + LinkedIn)
                      </div>
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
                {tabLoading.missions ? (
                  <div className="p-12 text-center">
                    <Loader2 className="animate-spin text-orange-600 mx-auto" size={32} />
                  </div>
                ) : missions.length === 0 ? (
                  <div className="text-center py-12 text-zinc-500 italic">
                    No missions generated yet — Grok creates them hourly based on foundation KPIs
                  </div>
                ) : (
                  <div className="space-y-6">
                    {missions.map((mission) => (
                      <div
                        key={mission.id}
                        className="border border-zinc-700 p-6 rounded-lg hover:border-orange-600/50 transition-colors bg-zinc-900/30"
                      >
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
