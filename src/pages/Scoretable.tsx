import React, { useState, useEffect, useRef } from "react";
import scoretableBg from "../assets/scoretable.png";
import { supabase } from "../lib/supabaseClient";
import {
  Trophy, Target, Zap, Star, Shield, Sprout,
  Loader2, Search, X, Gift, Users, Filter,
  Heart, DollarSign, Lightbulb,
} from "lucide-react";

const Scoretable = () => {
  const [combinedData, setCombinedData] = useState<any[]>([]);
  const [topLeaders, setTopLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [stats, setStats] = useState({ totalMembers: 0 });
  const [sortBy, setSortBy] = useState("followers");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Referral states
  const [referralLink, setReferralLink] = useState<string>('');
  const [referredCount, setReferredCount] = useState<number>(0);
  const [loadingReferral, setLoadingReferral] = useState(true);
  const [referralError, setReferralError] = useState<string | null>(null);

  const filterRef = useRef<HTMLDivElement>(null);

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

  // Get current user ID for row highlighting
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setCurrentUserId(data.user.id);
    });
  }, []);

  // Fetch referral data
  useEffect(() => {
    const fetchReferral = async () => {
      setLoadingReferral(true);
      setReferralError(null);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setReferralError("Please log in to see your referral link");
          return;
        }
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('referral_code, referral_count')
          .eq('id', user.id)
          .single();
        if (error) throw error;
        if (profile) {
          setReferralLink(`https://ourflamefoundation.vercel.app/?ref=${profile.referral_code}`);
          setReferredCount(profile.referral_count || 0);
        }
      } catch (err: any) {
        setReferralError(err.message || "Failed to load referral info");
      } finally {
        setLoadingReferral(false);
      }
    };
    fetchReferral();
  }, []);

  const fetchCombined = async (query = "", currentSort = sortBy) => {
    try {
      // Total members calculation (facebook + linkedin)
      const { data: allProfiles } = await supabase
        .from("profiles")
        .select("facebook, linkedin");
      const totalMembers = (allProfiles || []).reduce((sum, row) => {
        return sum + Number(row.facebook || 0) + Number(row.linkedin || 0);
      }, 0);
      setStats({ totalMembers });

      // Main combined query
      let queryBuilder = supabase
        .from('profiles')
        .select(`
          id, display_name, rank, Rebirth, facebook, linkedin, valuation, received,
          happiness_score, curiosity_score, econ_score, tribe_id,
          scoretable_entries!left (
            own_percentage, valuation_1, valuation_2, valuation_3,
            solution_link_1, solution_link_2, solution_link_3,
            tribes!left (name, description)
          )
        `);

      if (query) {
        queryBuilder = queryBuilder.or(`display_name.ilike.%${query}%,email.ilike.%${query}%`);
      }

      if (!query) {
        if (currentSort === "valuation") {
          queryBuilder = queryBuilder.order("valuation", { ascending: false });
        }
        queryBuilder = queryBuilder.limit(50);
      }

      const { data, error } = await queryBuilder;
      if (error) throw error;

      const processed = (data || []).map(item => ({
        ...item,
        followers: Number(item.facebook || 0) + Number(item.linkedin || 0),
        tribe_name: item.scoretable_entries?.[0]?.tribes?.name || 'Normie',
        own_percentage: item.scoretable_entries?.[0]?.own_percentage || 0,
        total_valuation: 
          (item.scoretable_entries?.[0]?.valuation_1 || 0) +
          (item.scoretable_entries?.[0]?.valuation_2 || 0) +
          (item.scoretable_entries?.[0]?.valuation_3 || 0),
      }));

      let sorted = [...processed];

      if (currentSort === "followers") {
        sorted.sort((a, b) => b.followers - a.followers);
      } else if (currentSort === "rank") {
        sorted.sort((a, b) => (rankPriority[a.rank] || 99) - (rankPriority[b.rank] || 99));
      } else if (currentSort === "valuation") {
        sorted.sort((a, b) => b.valuation - a.valuation);
      }

      setCombinedData(sorted);
      setTopLeaders(sorted.slice(0, 10));
    } catch (err) {
      console.error("Combined fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCombined(searchQuery, sortBy);

    const channels = [
      supabase.channel("profiles-changes").on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        if (!searchQuery) fetchCombined("", sortBy);
      }).subscribe(),
      supabase.channel("scoretable-changes").on("postgres_changes", { event: "*", schema: "public", table: "scoretable_entries" }, () => fetchCombined(searchQuery, sortBy)).subscribe(),
    ];

    return () => {
      channels.forEach(ch => supabase.removeChannel(ch));
    };
  }, [sortBy, searchQuery]);

  const filterOptions = [
    { label: "Followers", value: "followers" },
    { label: "Valuation", value: "valuation" },
    { label: "Rank", value: "rank" }
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchCombined(searchQuery);
                setIsSearching(true);
              }}
              className="relative group"
            >
              <input
                type="text"
                placeholder="Search Agent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 py-3 pl-10 pr-12 text-[10px] font-bold uppercase tracking-widest w-full md:w-80 text-zinc-900 dark:text-white focus:border-orange-600 outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
              {isSearching && (
                <X
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 cursor-pointer"
                  size={14}
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearching(false);
                    fetchCombined();
                  }}
                />
              )}
            </form>
            <div className="flex justify-end">
              <div className="bg-white dark:bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-800 min-w-[220px]">
                <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Total Members</p>
                <p className="text-xl font-black text-zinc-900 dark:text-white">
                  {stats.totalMembers.toLocaleString()} +
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* UNIFIED SCORETABLE */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Loader2 className="animate-spin text-orange-600" size={48} />
          </div>
        ) : (
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl mb-12">
            <div className="p-8 border-b border-zinc-800 bg-black/30 relative">
              <div className="absolute inset-0 z-0 bg-cover opacity-20" style={{ backgroundImage: `url(${scoretableBg})` }} />
              <div className="relative z-10">
                <h2 className="text-4xl font-black uppercase text-orange-600 flex items-center gap-4 mb-3">
                  <Trophy size={32} /> Unified Flame Scoretable
                </h2>
                <p className="text-zinc-400">Rank • Followers • Valuation • Ownership Stake • Climb & Own the Flame</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-black/20">
              <h3 className="text-lg font-black text-zinc-300 flex items-center gap-3">
                <Target size={20} className="text-orange-600" /> Top Agents
              </h3>
              <div className="relative inline-block" ref={filterRef}>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-white hover:border-orange-600 transition-colors flex items-center gap-3 rounded"
                >
                  <Filter size={14} className={isFilterOpen ? "text-orange-600" : "text-zinc-400"} />
                  <span className="text-xs font-black uppercase">Sort: {sortBy}</span>
                </button>
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-950 border border-zinc-800 shadow-2xl z-50">
                    {filterOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setIsFilterOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-xs font-black uppercase ${
                          sortBy === opt.value ? "bg-orange-600 text-white" : "text-zinc-400 hover:bg-zinc-800"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-left">
                <thead>
                  <tr className="bg-black/60 text-xs uppercase tracking-widest text-zinc-400 border-b border-zinc-700">
                    <th className="p-6">Rank</th>
                    <th className="p-6">Agent / Tribe</th>
                    <th className="p-6">Followers</th>
                    <th className="p-6">Valuation</th>
                    <th className="p-6 text-center">Scores</th>
                    <th className="p-6 text-right text-green-400">Ownership %</th>
                    <th className="p-6 text-right">Total Stake</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {topLeaders.map((agent, idx) => {
                    const isYou = agent.id === currentUserId;
                    return (
                      <tr
                        key={agent.id}
                        className={`hover:bg-orange-950/30 transition-colors ${
                          isYou ? 'bg-orange-950/50 border-l-4 border-orange-600 font-bold' : ''
                        }`}
                      >
                        <td className="p-6 text-orange-400 font-black text-lg">{idx + 1}</td>
                        <td className="p-6">
                          <div className="font-bold text-white">{agent.display_name || 'Anonymous'}</div>
                          <span className="text-xs bg-zinc-800 px-2 py-1 rounded text-zinc-300">
                            {agent.rank} • {agent.tribe_name}
                          </span>
                          {isYou && <span className="ml-2 text-xs text-orange-400">(You)</span>}
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-orange-600" />
                            {agent.followers.toLocaleString()}
                          </div>
                        </td>
                        <td className="p-6 text-purple-400 font-mono">
                          ${agent.valuation?.toLocaleString() || '0'}
                        </td>
                        <td className="p-6 text-center">
                          <div className="flex justify-center gap-4 text-xs">
                            <Heart size={16} className="text-pink-500" /> {agent.happiness_score?.toFixed(1)}%
                            <DollarSign size={16} className="text-green-500" /> {agent.econ_score?.toFixed(1)}%
                            <Lightbulb size={16} className="text-yellow-500" /> {agent.curiosity_score?.toFixed(1)}%
                          </div>
                        </td>
                        <td className="p-6 text-right text-xl font-black text-green-400">
                          {agent.own_percentage}%
                        </td>
                        <td className="p-6 text-right text-zinc-300 font-mono">
                          ${agent.total_valuation.toLocaleString() || '—'}
                        </td>
                      </tr>
                    );
                  })}
                  {topLeaders.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-zinc-500 italic">
                        No agents found — start recruiting to climb the Flame!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REFERRAL CTA - kept prominent */}
        <div className="mt-12 bg-gradient-to-br from-orange-600/90 to-purple-600/90 p-8 rounded-2xl text-center shadow-2xl border border-orange-400/30">
          <h3 className="text-3xl font-black mb-4 text-white">
            Refer a Friend → Both Get 10,000 Flame Dollars + SuperBot Power 🔥
          </h3>
          <p className="text-lg mb-6 opacity-90 text-white">
            Grow the Flame Network — your invites fuel global happiness & economy
          </p>
          {loadingReferral ? (
            <div className="animate-pulse bg-zinc-800 h-12 rounded mb-6" />
          ) : referralError ? (
            <p className="text-red-300 font-medium mb-6">{referralError}</p>
          ) : (
            <>
              <div className="bg-black/50 border border-orange-400/50 rounded-lg p-5 mb-6 font-mono text-base break-all text-orange-200">
                {referralLink || 'Loading your unique link...'}
              </div>
              <button
                onClick={copyReferralLink}
                disabled={!referralLink}
                className="px-10 py-5 bg-zinc-900 hover:bg-zinc-800 border-2 border-orange-500 text-orange-300 font-bold uppercase tracking-wider rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg w-full md:w-auto"
              >
                Copy & Share Link
              </button>
              <p className="text-base mt-6 text-white/90">
                Live: <span className="font-bold text-green-300">{referredCount}</span> friends joined
              </p>
            </>
          )}
        </div>

        {/* Foundation Rewards - kept as is */}
        <div className="space-y-6 pt-16 border-t border-zinc-800">
          <h3 className="text-sm font-black uppercase tracking-[0.4em] text-zinc-500 flex items-center gap-3">
            <Gift size={18} className="text-orange-600" /> Foundation Rewards
          </h3>
          <div className="border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl rounded-lg">
            {[
              { class: "Normie", icon: <Zap size={20} className="text-blue-500" />, rewards: ["Do Good", "Share Content", "Win Prizes"] },
              { class: "SuperHero", icon: <Star size={20} className="text-orange-600" />, rewards: ["Recruit Normies", "Educate All", "Launch Products"] },
              { class: "Angel", icon: <Shield size={20} className="text-yellow-500" />, rewards: ["Recruit SuperHeros", "Mentor & Coach", "Angel Fund"] },
              { class: "SuperFarmer", icon: <Sprout size={20} className="text-green-500" />, rewards: ["Recruit Angels", "Mentor & Coach", "Seed Fund"] }
            ].map(tier => (
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
