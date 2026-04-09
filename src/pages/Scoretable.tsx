import React, { useState, useEffect, useRef } from "react";
import scoretableBg from "../assets/scoretable.png";
import { supabase } from "../lib/supabaseClient";
import {
  Trophy, Target, Users, Filter, Loader2, Search, X,
  Heart, DollarSign, Lightbulb, Zap, Download, Users as TribeIcon,
} from "lucide-react";
import AboutUsSection from "@/components/AboutUsSection";
import HeroSection from "@/components/HeroSection";

const Scoretable = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [tribeChallenges, setTribeChallenges] = useState<any[]>([]);
  const [tribeLeaderboard, setTribeLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingChallenges, setLoadingChallenges] = useState(false); // Start false, trigger when rank ready
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 1. INITIAL LOAD: Get Auth User and their Rank Name
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
          setUserRank(profile.rank); // This will trigger the useEffect that calls fetchTribeChallenges
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
        const { data: profile } = await supabase
          .from('profiles')
          .select('referral_code, referral_count')
          .eq('id', user.id)
          .single();
        if (profile) {
          setReferralLink(`https://ourflamefoundation.vercel.app/?ref=${profile.referral_code}`);
          setReferredCount(profile.referral_count || 0);
        }
      } catch (err) {
        setReferralError("Failed to load referral");
      } finally {
        setLoadingReferral(false);
      }
    };
    fetchReferral();
  }, []);

  // 3. CORRECTED FETCH: Matches Rank Name -> Tribe ID -> Challenges
  const fetchTribeChallenges = async (rankName: string) => {
    setLoadingChallenges(true);
    setChallengeError(null);
    try {
      // Step A: Find the UUID from 'tribes' table where name matches the user's profile rank
      const { data: tribeData, error: tribeError } = await supabase
        .from('tribes')
        .select('id')
        .eq('name', rankName)
        .single();

      if (tribeError || !tribeData) {
        console.warn("No tribe found matching rank name:", rankName);
        setTribeChallenges([]);
        return;
      }

      const tribeUuid = tribeData.id;
      const now = new Date().toISOString();
      
      // Step B: Fetch challenges using that UUID as the tribe_id
      const { data, error: challengeFetchError } = await supabase
        .from('tribe_challenges')
        .select('*')
        .eq('tribe_id', tribeUuid) 
        .gt('ends_at', now) 
        .order('ends_at', { ascending: true });

      if (challengeFetchError) throw challengeFetchError;
      setTribeChallenges(data || []);
    } catch (err: any) {
      console.error("Challenges fetch error:", err);
      setChallengeError("Failed to load challenges");
    } finally {
      setLoadingChallenges(false);
    }
  };

  const fetchTribeLeaderboard = async () => {
    setLoadingTribeLb(true);
    try {
      const { data } = await supabase
        .from('profiles')
        .select('rank, id, network, happiness_score, econ_score, curiosity_score, current_streak');

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
      console.error("Leaderboard error:", err);
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

      let qb = supabase.from('profiles').select(`*`);
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

  useEffect(() => {
    fetchData(searchQuery, sortBy);
    fetchTribeLeaderboard();
    
    // Only fetch challenges if we actually have the rank name from the profile
    if (userRank) {
      fetchTribeChallenges(userRank);
    }

    const sub = supabase.channel("profiles-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        if (!searchQuery) fetchData("", sortBy);
      }).subscribe();

    return () => {
      supabase.removeChannel(sub);
    };
  }, [sortBy, searchQuery, userRank]);

  const copyReferral = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      alert("✅ Copied!");
    }
  };

  const generateShareCard = (agent: any) => {
    alert("Share card feature coming soon for " + agent.display_name);
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
            </form>
            <div className="bg-zinc-900 p-4 border border-zinc-700 rounded min-w-[220px] text-center">
              <p className="text-xs text-zinc-400 uppercase mb-1">Total Network Followers</p>
              <p className="text-2xl font-black">{stats.totalMembers.toLocaleString()} +</p>
            </div>
          </div>
        </div>

        {/* UNIFIED TABLE */}
        {loading ? (
          <div className="flex justify-center py-32"><Loader2 className="animate-spin text-orange-600" size={48} /></div>
        ) : (
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-zinc-800 bg-black/40 relative">
              <div className="absolute inset-0 bg-cover opacity-10" style={{ backgroundImage: `url(${scoretableBg})` }} />
              <h2 className="relative text-3xl font-black uppercase text-orange-600 flex items-center gap-3"><Trophy size={28} /> Leaderboard</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-zinc-900 text-xs uppercase text-zinc-400 border-b border-zinc-800 text-left">
                    <th className="p-5">Rank</th>
                    <th className="p-5">Agent</th>
                    <th className="p-5">Streak</th>
                    <th className="p-5">Followers</th>
                    <th className="p-5">Valuation</th>
                    <th className="p-5">Share</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {leaders.map((agent, idx) => (
                    <tr key={agent.id} className={`hover:bg-zinc-900/70 ${agent.id === currentUserId ? 'bg-orange-950/40 border-l-4 border-orange-600' : ''}`}>
                      <td className="p-5 text-orange-400 font-black text-xl">{idx + 1}</td>
                      <td className="p-5">
                        <div className="font-bold">{agent.display_name || "Anonymous"}</div>
                        <div className="text-xs text-zinc-500 uppercase">{agent.rank}</div>
                      </td>
                      <td className="p-5 text-green-400 font-mono"><Zap size={16} className="inline mr-1" />{agent.current_streak || 0}d</td>
                      <td className="p-5 text-zinc-300">{agent.followers.toLocaleString()}</td>
                      <td className="p-5 text-purple-400 font-mono">${agent.valuation?.toLocaleString()}</td>
                      <td className="p-5">
                        <button onClick={() => generateShareCard(agent)} className="bg-zinc-800 hover:bg-orange-600 p-2 rounded-full transition"><Download size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* RANK CHALLENGES SECTION */}
        <div className="mt-12 bg-zinc-950 border border-zinc-800 rounded-xl p-8">
          <h3 className="text-2xl font-black flex items-center gap-3 mb-6 uppercase italic text-orange-600">
            <TribeIcon size={28} /> {userRank || "Agent"} Challenges
          </h3>

          {loadingChallenges ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin text-orange-600" size={32} /></div>
          ) : tribeChallenges.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {tribeChallenges.map((challenge) => {
                const progress = Math.min((Number(challenge.progress) / Number(challenge.target)) * 100, 100);
                return (
                  <div key={challenge.id} className="border border-zinc-700 p-6 rounded-xl bg-black/50 hover:border-orange-500 transition">
                    <div className="font-bold text-xl mb-2 text-white">{challenge.title}</div>
                    <p className="text-zinc-400 text-sm mb-4">{challenge.goal}</p>
                    <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-3 bg-gradient-to-r from-orange-600 to-orange-400 transition-all" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex justify-between text-xs mt-3">
                      <span className="text-zinc-400 font-mono">{challenge.progress} / {challenge.target}</span>
                      <span className="text-green-400 font-bold">+{challenge.reward_flame} FLAME</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl text-zinc-500">
              {challengeError ? challengeError : `No active challenges found for your rank (${userRank}).`}
            </div>
          )}
        </div>

        {/* REFERRAL CTA */}
        <div className="mt-12 bg-gradient-to-br from-orange-700 to-purple-800 p-10 rounded-3xl text-center border border-orange-500/40 shadow-2xl">
          <h3 className="text-4xl font-black mb-4 italic uppercase">Recruit & Explode 🔥</h3>
          {referralLink && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
              <div className="bg-black/40 p-4 rounded-xl font-mono text-sm border border-white/10">{referralLink}</div>
              <button onClick={copyReferral} className="px-8 py-4 bg-white text-orange-700 font-black rounded-xl hover:scale-105 transition">COPY LINK</button>
            </div>
          )}
        </div>
      </div>

      <AboutUsSection />
      <HeroSection />
    </div>
  );
};

export default Scoretable;
