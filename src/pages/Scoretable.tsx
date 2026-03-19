import React, { useState, useEffect, useRef } from "react";
import scoretableBg from "../assets/scoretable.png";
import { supabase } from "../lib/supabaseClient";
import {
  Trophy, Target, Users, Filter, Loader2, Search, X,
  Heart, DollarSign, Lightbulb, Gift, Zap, Star, Shield, Sprout,
} from "lucide-react";

const Scoretable = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("followers");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [stats, setStats] = useState({ totalMembers: 0 });
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

  // Get current user for highlighting
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setCurrentUserId(data.user.id);
    });
  }, []);

  // Referral fetch
  useEffect(() => {
    const fetchReferral = async () => {
      setLoadingReferral(true);
      setReferralError(null);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setReferralError("Log in to see your referral link");
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
        setReferralError(err.message || "Failed to load referral");
      } finally {
        setLoadingReferral(false);
      }
    };
    fetchReferral();
  }, []);

  const fetchData = async (query = "", currentSort = sortBy) => {
    setLoading(true);
    try {
      // Total members
      const { data: all } = await supabase.from("profiles").select("facebook, linkedin");
      const total = (all || []).reduce((sum, r) => sum + Number(r.facebook || 0) + Number(r.linkedin || 0), 0);
      setStats({ totalMembers: total });

      // Main query
      let qb = supabase.from('profiles').select(`
        id, display_name, rank, Rebirth, facebook, linkedin, valuation, received,
        happiness_score, curiosity_score, econ_score, tribe_id
      `);

      if (query) {
        qb = qb.or(`display_name.ilike.%${query}%,email.ilike.%${query}%`);
      }

      if (!query) {
        if (currentSort === "valuation") {
          qb = qb.order("valuation", { ascending: false });
        }
        qb = qb.limit(50);
      }

      const { data, error } = await qb;
      if (error) throw error;

      const processed = (data || []).map(item => ({
        ...item,
        followers: Number(item.facebook || 0) + Number(item.linkedin || 0),
      }));

      let sorted = [...processed];

      if (currentSort === "followers") {
        sorted.sort((a, b) => b.followers - a.followers);
      } else if (currentSort === "rank") {
        sorted.sort((a, b) => (rankPriority[a.rank] || 99) - (rankPriority[b.rank] || 99));
      } else if (currentSort === "valuation") {
        sorted.sort((a, b) => (b.valuation || 0) - (a.valuation || 0));
      }

      setLeaders(sorted.slice(0, 10));
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchQuery, sortBy);

    const sub = supabase.channel("profiles-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        if (!searchQuery) fetchData("", sortBy);
      })
      .subscribe();

    return () => { supabase.removeChannel(sub); };
  }, [sortBy, searchQuery]);

  const filterOptions = [
    { label: "Followers", value: "followers" },
    { label: "Valuation", value: "valuation" },
    { label: "Rank", value: "rank" }
  ];

  const copyReferral = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      alert("Referral link copied!");
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-black min-h-screen text-white font-sans">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-zinc-800 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-widest text-xs">
              <Trophy size={16} /> Global Flame Network
            </div>
            <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
              Flame Foundation <span className="text-orange-600">Scoretable</span>
            </h1>
          </div>
          <div className="flex flex-col gap-4 w-full md:w-auto">
            <form
              onSubmit={(e) => { e.preventDefault(); fetchData(searchQuery); }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Search Agent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 py-3 pl-10 pr-12 text-sm w-full md:w-80 focus:border-orange-600 outline-none rounded"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              {searchQuery && (
                <X
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer"
                  size={16}
                  onClick={() => { setSearchQuery(""); fetchData(); }}
                />
              )}
            </form>
            <div className="bg-zinc-900 p-4 border border-zinc-700 rounded min-w-[220px] text-center">
              <p className="text-xs text-zinc-400 uppercase mb-1">Total Members</p>
              <p className="text-2xl font-black">{stats.totalMembers.toLocaleString()} +</p>
            </div>
          </div>
        </div>

        {/* Unified Table */}
        {loading ? (
          <div className="flex justify-center py-32">
            <Loader2 className="animate-spin text-orange-600" size={48} />
          </div>
        ) : (
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-800 bg-black/40 relative">
              <div className="absolute inset-0 bg-cover opacity-10" style={{ backgroundImage: `url(${scoretableBg})` }} />
              <h2 className="relative text-3xl font-black uppercase text-orange-600 flex items-center gap-3">
                <Trophy size={28} /> Unified Flame Scoretable
              </h2>
              <p className="text-zinc-400 mt-2">Agent • Tribe • Followers • Valuation • Personal Scores</p>
            </div>

            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Target size={18} className="text-orange-600" /> Top Agents
              </h3>
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded flex items-center gap-2 hover:border-orange-600"
                >
                  <Filter size={14} />
                  Sort: {sortBy}
                </button>
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-zinc-900 border border-zinc-700 rounded shadow-xl z-50">
                    {filterOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setIsFilterOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-zinc-800 ${
                          sortBy === opt.value ? "bg-orange-600/30" : ""
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
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-zinc-900 text-xs uppercase text-zinc-400 border-b border-zinc-800">
                    <th className="p-5 text-left">Rank</th>
                    <th className="p-5 text-left">Agent</th>
                    <th className="p-5 text-left">Tribe</th>
                    <th className="p-5 text-left">Followers</th>
                    <th className="p-5 text-left">Valuation</th>
                    <th className="p-5 text-center">Scores</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {leaders.map((agent, idx) => {
                    const isYou = agent.id === currentUserId;
                    return (
                      <tr
                        key={agent.id}
                        className={`hover:bg-zinc-900/70 ${isYou ? 'bg-orange-950/40 border-l-4 border-orange-600' : ''}`}
                      >
                        <td className="p-5 text-orange-400 font-black">{idx + 1}</td>
                        <td className="p-5">
                          <div className="font-bold">{agent.display_name || "Anonymous"}</div>
                          <div className="text-xs text-zinc-500">{agent.rank}</div>
                          {isYou && <div className="text-xs text-orange-400 mt-1">(You)</div>}
                        </td>
                        <td className="p-5 text-zinc-300">{agent.tribe_id || "—"}</td>
                        <td className="p-5">
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-orange-600" />
                            {agent.followers.toLocaleString()}
                          </div>
                        </td>
                        <td className="p-5 text-purple-400 font-mono">
                          ${agent.valuation?.toLocaleString() || "0"}
                        </td>
                        <td className="p-5 text-center">
                          <div className="flex justify-center gap-4 text-xs">
                            <Heart size={16} className="text-pink-500" /> {agent.happiness_score?.toFixed(1) || 0}%
                            <DollarSign size={16} className="text-green-500" /> {agent.econ_score?.toFixed(1) || 0}%
                            <Lightbulb size={16} className="text-yellow-500" /> {agent.curiosity_score?.toFixed(1) || 0}%
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Referral CTA */}
        <div className="mt-12 bg-gradient-to-br from-orange-700 to-purple-800 p-8 rounded-2xl text-center border border-orange-500/30 shadow-2xl">
          <h3 className="text-3xl font-black mb-4">Refer Friends → Earn Flame Dollars + Powers 🔥</h3>
          {loadingReferral ? (
            <div className="h-12 bg-zinc-800 animate-pulse rounded mb-6" />
          ) : referralError ? (
            <p className="text-red-300 mb-6">{referralError}</p>
          ) : (
            <>
              <div className="bg-black/60 p-4 rounded mb-6 font-mono break-all text-orange-200">
                {referralLink || 'Loading link...'}
              </div>
              <button
                onClick={copyReferral}
                disabled={!referralLink}
                className="px-10 py-4 bg-zinc-900 border-2 border-orange-500 text-orange-300 font-bold uppercase rounded-full hover:bg-zinc-800 transition disabled:opacity-50"
              >
                Copy & Share
              </button>
              <p className="mt-6 text-lg">
                <span className="font-bold text-green-300">{referredCount}</span> friends already joined
              </p>
            </>
          )}
        </div>

        {/* Rewards section */}
        <div className="mt-16 border-t border-zinc-800 pt-12">
          <h3 className="text-sm uppercase tracking-widest text-zinc-500 mb-6 flex items-center gap-3">
            <Gift size={18} className="text-orange-600" /> Foundation Rewards
          </h3>
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950">
            {[
              { class: "Normie", icon: <Zap size={20} className="text-blue-500" />, rewards: ["Do Good", "Share Content", "Win Prizes"] },
              { class: "SuperHero", icon: <Star size={20} className="text-orange-600" />, rewards: ["Recruit Normies", "Educate All", "Launch Products"] },
              { class: "Angel", icon: <Shield size={20} className="text-yellow-500" />, rewards: ["Recruit SuperHeros", "Mentor & Coach", "Angel Fund"] },
              { class: "SuperFarmer", icon: <Sprout size={20} className="text-green-500" />, rewards: ["Recruit Angels", "Mentor & Coach", "Seed Fund"] }
            ].map(tier => (
              <div key={tier.class} className="grid md:grid-cols-12 p-6 border-b border-zinc-800 last:border-0 hover:bg-zinc-900/50">
                <div className="md:col-span-4 flex items-center gap-4 mb-4 md:mb-0">
                  <div className="p-3 bg-zinc-800 rounded">{tier.icon}</div>
                  <h4 className="text-xl font-black">{tier.class}</h4>
                </div>
                <div className="md:col-span-8 flex flex-wrap gap-3 justify-end">
                  {tier.rewards.map(r => (
                    <span key={r} className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-zinc-600 text-sm mt-12">
          Real-time • Database-powered • Grok-optimized
        </p>
      </div>
    </div>
  );
};

export default Scoretable;
