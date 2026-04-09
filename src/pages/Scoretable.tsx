import React, { useState, useEffect, useRef } from "react";
import scoretableBg from "../assets/scoretable.png";
import { supabase } from "../lib/supabaseClient";
import {
  Trophy, Target, Users, Filter, Loader2, Search, X,
  Heart, DollarSign, Lightbulb, Gift, Zap, Star, Shield, Sprout,
  Award, Download, Users as TribeIcon,
} from "lucide-react";
import AboutUsSection from "@/components/AboutUsSection";
import HeroSection from "@/components/HeroSection";

const Scoretable = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [tribeChallenges, setTribeChallenges] = useState<any[]>([]);
  const [tribeLeaderboard, setTribeLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingChallenges, setLoadingChallenges] = useState(true);
  const [loadingTribeLb, setLoadingTribeLb] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("followers");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [stats, setStats] = useState({ totalMembers: 0 });
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [userRank, setUserRank] = useState<string | null>(null);
  const [challengeError, setChallengeError] = useState<string | null>(null);

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

  // Click outside filter
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Get current user + their RANK
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setCurrentUserId(data.user.id);
        supabase
          .from('profiles')
          .select('rank')
          .eq('id', data.user.id)
          .single()
          .then(({ data: profile }) => {
            if (profile?.rank) {
              setUserRank(profile.rank);
              console.log("[RANK] Loaded:", profile.rank);
            }
          });
      }
    });
  }, []);

  // Fetch referral
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

  // Fetch Tribe Challenges – filtered by user's RANK
  const fetchTribeChallenges = async () => {
    setLoadingChallenges(true);
    setChallengeError(null);
    try {
      const now = new Date().toISOString();
      
      let query = supabase
        .from('tribe_challenges')
        .select('*')
        .gt('ends_at', now) // Challenge hasn't expired
        // Removed the .gte('created_at') filter so older active challenges show up
        .order('ends_at', { ascending: true });

      if (userRank) {
        // This will now work because tribe_id is now TEXT in DB
        query = query.eq('tribe_id', userRank); 
      }

      const { data, error } = await query;
      if (error) throw error;

      setTribeChallenges(data || []);
    } catch (err: any) {
      console.error("Challenges fetch error:", err);
      setChallengeError("Failed to load challenges: " + (err.message || "Unknown error"));
      setTribeChallenges([]);
    } finally {
      setLoadingChallenges(false);
    }
  };

  // Tribe Leaderboard – grouped by rank
  const fetchTribeLeaderboard = async () => {
    setLoadingTribeLb(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          rank,
          count:id,
          total_network:sum(network),
          avg_happiness:avg(happiness_score),
          avg_econ:avg(econ_score),
          avg_curiosity:avg(curiosity_score),
          avg_streak:avg(current_streak)
        `)
        .group('rank')
        .order('total_network', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTribeLeaderboard(data || []);
    } catch (err) {
      console.error("Tribe leaderboard error:", err);
      setTribeLeaderboard([]);
    } finally {
      setLoadingTribeLb(false);
    }
  };

  const fetchData = async (query = "", currentSort = sortBy) => {
    setLoading(true);
    try {
      const { data: all } = await supabase.from("profiles").select("facebook, linkedin");
      const total = (all || []).reduce((sum, r) => sum + Number(r.facebook || 0) + Number(r.linkedin || 0), 0);
      setStats({ totalMembers: total });

      let qb = supabase.from('profiles').select(`
        id, display_name, rank, Rebirth, facebook, linkedin, valuation, received,
        happiness_score, curiosity_score, econ_score, tribe_id,
        current_streak, longest_streak, referral_count
      `);

      if (query) {
        qb = qb.or(`display_name.ilike.%${query}%,email.ilike.%${query}%`);
      }

      if (!query) {
        if (currentSort === "valuation") qb = qb.order("valuation", { ascending: false });
        if (currentSort === "referrals") qb = qb.order("referral_count", { ascending: false });
        if (currentSort === "streak") qb = qb.order("current_streak", { ascending: false });
        qb = qb.limit(50);
      }

      const { data, error } = await qb;
      if (error) throw error;

      const processed = (data || []).map(item => ({
        ...item,
        followers: Number(item.facebook || 0) + Number(item.linkedin || 0),
        referral_count: Number(item.referral_count || 0),
      }));

      let sorted = [...processed];
      if (currentSort === "followers") {
        sorted.sort((a, b) => b.followers - a.followers);
      } else if (currentSort === "rank") {
        sorted.sort((a, b) => (rankPriority[a.rank] || 99) - (rankPriority[b.rank] || 99));
      } else if (currentSort === "valuation") {
        sorted.sort((a, b) => (b.valuation || 0) - (a.valuation || 0));
      } else if (currentSort === "referrals") {
        sorted.sort((a, b) => b.referral_count - a.referral_count);
      } else if (currentSort === "streak") {
        sorted.sort((a, b) => (b.current_streak || 0) - (a.current_streak || 0));
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
    fetchTribeChallenges();
    fetchTribeLeaderboard();

    const sub = supabase.channel("profiles-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        if (!searchQuery) fetchData("", sortBy);
      })
      .subscribe();

    const challengeSub = supabase.channel("challenges-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "tribe_challenges" }, fetchTribeChallenges)
      .subscribe();

    return () => {
      supabase.removeChannel(sub);
      supabase.removeChannel(challengeSub);
    };
  }, [sortBy, searchQuery, userRank]);

  const filterOptions = [
    { label: "Followers", value: "followers" },
    { label: "Valuation", value: "valuation" },
    { label: "Rank", value: "rank" },
    { label: "Referrals", value: "referrals" },
    { label: "Streak", value: "streak" }
  ];

  const copyReferral = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      alert("✅ Referral link copied! Share it everywhere 🔥");
    }
  };

  const generateShareCard = async (agent: any) => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 500;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#f97316";
    ctx.fillRect(0, 0, canvas.width, 80);
    ctx.font = "bold 48px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("FLAME FOUNDATION", 80, 55);
    ctx.font = "bold 120px sans-serif";
    ctx.fillStyle = "#f97316";
    ctx.fillText(`#${leaders.indexOf(agent) + 1}`, 80, 220);
    ctx.font = "bold 48px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(agent.display_name || "Legendary Agent", 80, 300);
    ctx.font = "bold 36px sans-serif";
    ctx.fillStyle = "#22c55e";
    ctx.fillText(`${agent.current_streak || 0}-DAY FLAME 🔥`, 80, 360);
    ctx.font = "bold 42px monospace";
    ctx.fillStyle = "#a855f7";
    ctx.fillText(`$${agent.valuation?.toLocaleString() || "0"}`, 80, 430);
    ctx.font = "bold 24px sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Join the Flame → ourflamefoundation.vercel.app", 80, 470);
    const link = document.createElement("a");
    link.download = `flame-rank-${agent.display_name}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    alert("🔥 Share card downloaded! Post it on X / IG and watch referrals explode.");
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-black min-h-screen text-white font-sans">
      <div className="container mx-auto max-w-7xl">
        {/* HEADER */}
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
            <form onSubmit={(e) => { e.preventDefault(); fetchData(searchQuery); }} className="relative">
              <input
                type="text"
                placeholder="Search Agent..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-900 border border-zinc-700 py-3 pl-10 pr-12 text-sm w-full md:w-80 focus:border-orange-600 outline-none rounded"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
              {searchQuery && <X className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 cursor-pointer" size={16} onClick={() => { setSearchQuery(""); fetchData(); }} />}
            </form>
            <div className="bg-zinc-900 p-4 border border-zinc-700 rounded min-w-[220px] text-center">
              <p className="text-xs text-zinc-400 uppercase mb-1">Total Members</p>
              <p className="text-2xl font-black">{stats.totalMembers.toLocaleString()} +</p>
            </div>
          </div>
        </div>

        {/* UNIFIED TABLE */}
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
              <p className="text-zinc-400 mt-2">Rank • Streak • Referrals • Valuation • Rank Wars</p>
            </div>

            <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Target size={18} className="text-orange-600" /> Top Agents (Live)
              </h3>
              <div className="relative" ref={filterRef}>
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="px-4 py-2 bg-zinc-900 border border-zinc-700 rounded flex items-center gap-2 hover:border-orange-600">
                  <Filter size={14} /> Sort: {sortBy}
                </button>
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-zinc-700 rounded shadow-xl z-50">
                    {filterOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setIsFilterOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-zinc-800 ${sortBy === opt.value ? "bg-orange-600/30" : ""}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead>
                  <tr className="bg-zinc-900 text-xs uppercase text-zinc-400 border-b border-zinc-800">
                    <th className="p-5 text-left">Rank</th>
                    <th className="p-5 text-left">Agent</th>
                    <th className="p-5 text-left">Rank (Tribe)</th>
                    <th className="p-5 text-left">Streak 🔥</th>
                    <th className="p-5 text-left">Followers</th>
                    <th className="p-5 text-left">Referrals</th>
                    <th className="p-5 text-left">Valuation</th>
                    <th className="p-5 text-center">Scores</th>
                    <th className="p-5">Share</th>
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
                        <td className="p-5 text-orange-400 font-black text-xl">{idx + 1}</td>
                        <td className="p-5">
                          <div className="font-bold">{agent.display_name || "Anonymous"}</div>
                          <div className="text-xs text-zinc-500">{agent.rank}</div>
                          {isYou && <div className="text-xs text-orange-400 mt-1">(YOU)</div>}
                        </td>
                        <td className="p-5 text-zinc-300">{agent.rank || "—"}</td>
                        <td className="p-5">
                          <div className="flex items-center gap-2 font-mono text-lg text-green-400">
                            <Zap size={20} /> {agent.current_streak || 0}d
                          </div>
                        </td>
                        <td className="p-5">
                          <div className="flex items-center gap-2">
                            <Users size={16} className="text-orange-600" />
                            {agent.followers.toLocaleString()}
                          </div>
                        </td>
                        <td className="p-5 font-bold text-green-400">{agent.referral_count} friends</td>
                        <td className="p-5 text-purple-400 font-mono text-lg">
                          ${agent.valuation?.toLocaleString() || "0"}
                        </td>
                        <td className="p-5 text-center">
                          <div className="flex justify-center gap-4 text-xs">
                            <Heart size={16} className="text-pink-500" /> {agent.happiness_score?.toFixed(1) || 0}%
                            <DollarSign size={16} className="text-green-500" /> {agent.econ_score?.toFixed(1) || 0}%
                            <Lightbulb size={16} className="text-yellow-500" /> {agent.curiosity_score?.toFixed(1) || 0}%
                          </div>
                        </td>
                        <td className="p-5">
                          <button
                            onClick={() => generateShareCard(agent)}
                            className="flex items-center gap-2 text-xs bg-zinc-800 hover:bg-orange-600 px-4 py-2 rounded-full transition"
                          >
                            <Download size={14} /> Share Card
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TRIBE WARS / CHALLENGES */}
        <div className="mt-12 bg-zinc-950 border border-zinc-800 rounded-xl p-8">
          <h3 className="text-2xl font-black flex items-center gap-3 mb-6">
            <TribeIcon size={28} className="text-orange-600" /> Your Rank Wars – Today's Challenges
          </h3>

          {loadingChallenges ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-orange-600" size={32} />
              <span className="ml-3 text-zinc-400">Loading your rank's challenges...</span>
            </div>
          ) : challengeError ? (
            <div className="text-red-400 text-center py-8">{challengeError}</div>
          ) : tribeChallenges.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {tribeChallenges.map((challenge) => {
                const progress = Math.min((challenge.progress / challenge.target) * 100, 100);
                return (
                  <div key={challenge.id} className="border border-zinc-700 p-6 rounded-xl hover:border-orange-500 transition">
                    <div className="font-bold text-lg mb-2">{challenge.title}</div>
                    <div className="text-zinc-400 text-sm mb-4">{challenge.goal}</div>
                    <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-3 bg-gradient-to-r from-orange-500 to-green-500 transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex justify-between text-xs mt-2 text-zinc-400">
                      <span>{challenge.progress.toLocaleString()} / {challenge.target.toLocaleString()}</span>
                      <span className="text-green-400">+{challenge.reward_flame} Flame</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-500 italic">
              No challenges for your rank today — check back tomorrow or recruit to unlock more!
            </div>
          )}
        </div>

        {/* Tribe Leaderboard */}
        <div className="mt-12 bg-zinc-950 border border-zinc-800 rounded-xl p-8">
          <h3 className="text-2xl font-black flex items-center gap-3 mb-6">
            <Trophy size={28} className="text-orange-600" /> Rank Leaderboard
          </h3>

          {loadingTribeLb ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-orange-600" size={32} />
            </div>
          ) : tribeLeaderboard.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-zinc-900 text-xs uppercase text-zinc-400 border-b border-zinc-800">
                    <th className="p-5 text-left">Rank</th>
                    <th className="p-5 text-left">Members</th>
                    <th className="p-5 text-left">Total Network</th>
                    <th className="p-5 text-left">Avg Happiness</th>
                    <th className="p-5 text-left">Avg Economy</th>
                    <th className="p-5 text-left">Avg Curiosity</th>
                    <th className="p-5 text-left">Avg Streak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {tribeLeaderboard.map((rankGroup) => (
                    <tr key={rankGroup.rank} className="hover:bg-zinc-900/70">
                      <td className="p-5 font-bold">{rankGroup.rank || "Unknown Rank"}</td>
                      <td className="p-5">{rankGroup.count}</td>
                      <td className="p-5 text-orange-400">{rankGroup.total_network?.toLocaleString() || "0"}</td>
                      <td className="p-5 text-pink-400">{rankGroup.avg_happiness?.toFixed(1) || "0"}%</td>
                      <td className="p-5 text-green-400">{rankGroup.avg_econ?.toFixed(1) || "0"}%</td>
                      <td className="p-5 text-yellow-400">{rankGroup.avg_curiosity?.toFixed(1) || "0"}%</td>
                      <td className="p-5 text-green-400">{rankGroup.avg_streak?.toFixed(1) || "0"} days</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center py-8 text-zinc-500 italic">
              No rank data yet — recruit more to climb the leaderboard!
            </p>
          )}
        </div>

        {/* REFERRAL CTA */}
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
              <button onClick={copyReferral} disabled={!referralLink} className="px-10 py-4 bg-zinc-900 border-2 border-orange-500 text-orange-300 font-bold uppercase rounded-full hover:bg-zinc-800 transition disabled:opacity-50">
                Copy & Share
              </button>
              <p className="mt-6 text-lg">
                <span className="font-bold text-green-300">{referredCount}</span> friends already joined
              </p>
            </>
          )}
        </div>
          

        <p className="text-center text-zinc-600 text-sm mt-12">
          Real-time • Database-powered • Grok-optimized • 10x Growth Engine Activated
        </p>
      </div>

      <AboutUsSection />
      <HeroSection />
    </div>

  );
};


export default Scoretable;
