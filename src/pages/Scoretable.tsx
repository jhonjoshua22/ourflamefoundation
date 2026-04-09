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

  // 1. INITIAL LOAD: Get Auth User and their Rank
  useEffect(() => {
    const initUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
        const { data: profile } = await supabase
          .from('profiles')
          .select('rank')
          .eq('id', user.id)
          .single();
        
        if (profile?.rank) {
          setUserRank(profile.rank);
          console.log("User Rank detected:", profile.rank);
        }
      }
    };
    initUser();
  }, []);

  // 2. Fetch referral data
  useEffect(() => {
    const fetchReferral = async () => {
      setLoadingReferral(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

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

  // 3. Main Fetch Function for Tribe Challenges
  const fetchTribeChallenges = async () => {
    // If rank isn't loaded yet, don't query
    if (!userRank) return;

    setLoadingChallenges(true);
    setChallengeError(null);
    try {
      const now = new Date().toISOString();
      
      // Removed created_at filter to show ALL active challenges
      const { data, error } = await supabase
        .from('tribe_challenges')
        .select('*')
        .eq('tribe_id', userRank) 
        .gt('ends_at', now) 
        .order('ends_at', { ascending: true });

      if (error) throw error;
      setTribeChallenges(data || []);
    } catch (err: any) {
      console.error("Challenges fetch error:", err);
      setChallengeError("Failed to load challenges");
    } finally {
      setLoadingChallenges(false);
    }
  };

  // 4. Tribe Leaderboard Logic
  const fetchTribeLeaderboard = async () => {
    setLoadingTribeLb(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('rank, id, network, happiness_score, econ_score, curiosity_score, current_streak');

      if (error) throw error;

      // Manual grouping since Supabase JS client doesn't support complex aggregates well
      const groups: Record<string, any> = {};
      data?.forEach(p => {
        const r = p.rank || "Unknown";
        if (!groups[r]) groups[r] = { rank: r, count: 0, total_network: 0, happiness: 0, econ: 0, curiosity: 0, streak: 0 };
        groups[r].count++;
        groups[r].total_network += (p.network || 0);
        groups[r].happiness += (p.happiness_score || 0);
        groups[r].econ += (p.econ_score || 0);
        groups[r].curiosity += (p.curiosity_score || 0);
        groups[r].streak += (p.current_streak || 0);
      });

      const processed = Object.values(groups).map(g => ({
        ...g,
        avg_happiness: g.happiness / g.count,
        avg_econ: g.econ / g.count,
        avg_curiosity: g.curiosity / g.count,
        avg_streak: g.streak / g.count,
      })).sort((a, b) => b.total_network - a.total_network);

      setTribeLeaderboard(processed);
    } catch (err) {
      console.error("Tribe leaderboard error:", err);
    } finally {
      setLoadingTribeLb(false);
    }
  };

  // 5. Global Leaderboard Data
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

      if (query) qb = qb.or(`display_name.ilike.%${query}%,email.ilike.%${query}%`);
      if (!query) qb = qb.limit(50);

      const { data, error } = await qb;
      if (error) throw error;

      const processed = (data || []).map(item => ({
        ...item,
        followers: Number(item.facebook || 0) + Number(item.linkedin || 0),
        referral_count: Number(item.referral_count || 0),
      }));

      let sorted = [...processed];
      if (currentSort === "followers") sorted.sort((a, b) => b.followers - a.followers);
      else if (currentSort === "rank") sorted.sort((a, b) => (rankPriority[a.rank] || 99) - (rankPriority[b.rank] || 99));
      else if (currentSort === "valuation") sorted.sort((a, b) => (b.valuation || 0) - (a.valuation || 0));
      else if (currentSort === "referrals") sorted.sort((a, b) => b.referral_count - a.referral_count);
      else if (currentSort === "streak") sorted.sort((a, b) => (b.current_streak || 0) - (a.current_streak || 0));

      setLeaders(sorted.slice(0, 10));
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 6. SYNC EFFECT: Runs when filters or userRank changes
  useEffect(() => {
    fetchData(searchQuery, sortBy);
    fetchTribeLeaderboard();
    
    if (userRank) {
      fetchTribeChallenges();
    }

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
      alert("✅ Referral link copied!");
    }
  };

  const generateShareCard = (agent: any) => {
    const canvas = document.createElement("canvas");
    canvas.width = 800; canvas.height = 500;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#0a0a0a"; ctx.fillRect(0, 0, 800, 500);
    ctx.fillStyle = "#f97316"; ctx.fillRect(0, 0, 800, 80);
    ctx.font = "bold 48px sans-serif"; ctx.fillStyle = "#ffffff"; ctx.fillText("FLAME FOUNDATION", 80, 55);
    ctx.font = "bold 120px sans-serif"; ctx.fillStyle = "#f97316"; ctx.fillText(`#${leaders.indexOf(agent) + 1}`, 80, 220);
    ctx.font = "bold 48px sans-serif"; ctx.fillStyle = "#ffffff"; ctx.fillText(agent.display_name || "Agent", 80, 300);
    ctx.font = "bold 42px monospace"; ctx.fillStyle = "#a855f7"; ctx.fillText(`$${agent.valuation?.toLocaleString() || "0"}`, 80, 430);
    const link = document.createElement("a");
    link.download = `flame-rank.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
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
              <p className="text-xs text-zinc-400 uppercase mb-1">Total Network Followers</p>
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
                      <tr key={agent.id} className={`hover:bg-zinc-900/70 ${isYou ? 'bg-orange-950/40 border-l-4 border-orange-600' : ''}`}>
                        <td className="p-5 text-orange-400 font-black text-xl">{idx + 1}</td>
                        <td className="p-5">
                          <div className="font-bold">{agent.display_name || "Anonymous"}</div>
                          <div className="text-xs text-zinc-500 uppercase">{agent.rank}</div>
                        </td>
                        <td className="p-5 text-green-400 font-mono text-lg"><Zap size={18} className="inline mr-1" />{agent.current_streak || 0}d</td>
                        <td className="p-5 text-zinc-300">{agent.followers.toLocaleString()}</td>
                        <td className="p-5 font-bold text-green-400">{agent.referral_count} friends</td>
                        <td className="p-5 text-purple-400 font-mono text-lg">${agent.valuation?.toLocaleString() || "0"}</td>
                        <td className="p-5 text-center">
                          <div className="flex justify-center gap-4 text-xs">
                            <span className="flex items-center gap-1"><Heart size={14} className="text-pink-500" /> {agent.happiness_score?.toFixed(0)}%</span>
                            <span className="flex items-center gap-1"><DollarSign size={14} className="text-green-500" /> {agent.econ_score?.toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="p-5">
                          <button onClick={() => generateShareCard(agent)} className="bg-zinc-800 hover:bg-orange-600 p-2 rounded-full transition"><Download size={16} /></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* RANK CHALLENGES SECTION */}
        <div className="mt-12 bg-zinc-950 border border-zinc-800 rounded-xl p-8">
          <h3 className="text-2xl font-black flex items-center gap-3 mb-6 uppercase italic">
            <TribeIcon size={28} className="text-orange-600" /> {userRank || "Agent"} Rank Challenges
          </h3>

          {loadingChallenges ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin text-orange-600" size={32} /></div>
          ) : tribeChallenges.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {tribeChallenges.map((challenge) => {
                const progress = Math.min((challenge.progress / challenge.target) * 100, 100);
                return (
                  <div key={challenge.id} className="border border-zinc-700 p-6 rounded-xl bg-black/50 hover:border-orange-500 transition">
                    <div className="font-bold text-xl mb-2 text-white">{challenge.title}</div>
                    <p className="text-zinc-400 text-sm mb-4">{challenge.goal}</p>
                    <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-3 bg-gradient-to-r from-orange-600 to-orange-400 transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex justify-between text-xs mt-3">
                      <span className="text-zinc-400 font-mono">{challenge.progress.toLocaleString()} / {challenge.target.toLocaleString()}</span>
                      <span className="text-green-400 font-bold">+{challenge.reward_flame} FLAME $</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl text-zinc-500">
              No active challenges for your rank. Invite more members to trigger new Rank Wars!
            </div>
          )}
        </div>

        {/* TRIBE LEADERBOARD */}
        <div className="mt-12 bg-zinc-950 border border-zinc-800 rounded-xl p-8">
          <h3 className="text-2xl font-black flex items-center gap-3 mb-6 uppercase italic">
            <Trophy size={28} className="text-orange-600" /> Tribe Power Ranking
          </h3>
          {loadingTribeLb ? (
            <div className="flex justify-center py-8"><Loader2 className="animate-spin text-orange-600" size={32} /></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-zinc-500 border-b border-zinc-800 text-left">
                    <th className="pb-4">Rank Tribe</th>
                    <th className="pb-4">Pop.</th>
                    <th className="pb-4">Net Value</th>
                    <th className="pb-4">Avg Streak</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {tribeLeaderboard.map((t) => (
                    <tr key={t.rank} className="group hover:bg-zinc-900/40">
                      <td className="py-4 font-black text-orange-500">{t.rank}</td>
                      <td className="py-4 text-zinc-400">{t.count} agents</td>
                      <td className="py-4 font-mono text-green-400">{t.total_network.toLocaleString()}</td>
                      <td className="py-4 text-zinc-300">{t.avg_streak.toFixed(1)}d</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* REFERRAL CTA */}
        <div className="mt-12 bg-gradient-to-br from-orange-700 to-purple-800 p-10 rounded-3xl text-center border border-orange-500/40 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-4xl font-black mb-4 italic uppercase">Recruit & Explode 🔥</h3>
            <p className="text-orange-100 mb-8 max-w-lg mx-auto">Share your flame link. For every agent who joins, your Valuation and Tribe Power skyrockets.</p>
            {referralLink && (
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl font-mono text-sm border border-white/10 w-full md:w-auto truncate">
                  {referralLink}
                </div>
                <button onClick={copyReferral} className="px-8 py-4 bg-white text-orange-700 font-black rounded-xl hover:scale-105 transition shadow-lg">COPY LINK</button>
              </div>
            )}
            <p className="mt-6 font-bold text-white/80">{referredCount} AGENTS RECRUITED</p>
          </div>
        </div>

        <p className="text-center text-zinc-700 text-xs mt-16 tracking-widest uppercase">
          Live Database Sync • Flame Foundation Core v3.0
        </p>
      </div>

      <AboutUsSection />
      <HeroSection />
    </div>
  );
};

export default Scoretable;
