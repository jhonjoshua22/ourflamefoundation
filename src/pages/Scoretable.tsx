import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import scoretableBg from "../assets/scoretable.png";
import { supabase } from "../lib/supabaseClient";
import {
  Trophy, Target, Loader2, Search, Zap, Download, 
  ChevronRight, LogIn, Share2, Award
} from "lucide-react";

import AboutUsSection from "@/components/AboutUsSection";
import HeroSection from "@/components/HeroSection";

// Tier Image Imports - Updated to match your specific filenames
import partnerImg from "../assets/partners.jpg"; 
import scoutImg from "../assets/scout.png";
import stormtrooperImg from "../assets/superheroes.png";
import angelImg from "../assets/angel.png";
import farmerImg from "../assets/superfarmer.png";
import founderImg from "../assets/founder.png"; // Placeholder for SuperFounder

const Scoretable = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("followers");
  const [stats, setStats] = useState({ totalMembers: 0 });
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState<string>('');

  const tiers = [
    { role: "Partner", image: partnerImg, price: "Forever Free", benefit: "Ethical stakeholder support.", button: "I'm Partner" },
    { role: "Normies", image: scoutImg, price: "From $1 pm", benefit: "Enjoy life, work, and family.", button: "I'm Normal" },
    { role: "SuperHeroes", image: stormtrooperImg, price: "From $5 pm", benefit: "10x Superbot powers for good.", button: "I'm SuperHero" },
    { role: "Angels", image: angelImg, price: "From $50 pm", benefit: "Fuel the mission, share magic.", button: "I'm Angel" },
    { role: "SuperFarmers", image: farmerImg, price: "From $500 pm", benefit: "Boost ecosystem growth.", button: "I'm SuperFarmer" },
    { role: "SuperFounder", image: founderImg, price: "From $5,000 pm", benefit: "Founding legacy & elite governance.", button: "I'm SuperFounder" },
  ];

  const staticChallenges = [
    { id: 1, title: "1. Login", goal: "Access your dashboard daily to maintain your streak.", icon: <LogIn size={20} className="text-orange-500" /> },
    { id: 2, title: "2. Track Good Deeds", goal: "Log your daily impact and contributions to the community.", icon: <Award size={20} className="text-orange-500" /> },
    { id: 3, title: "3. Spread The Word", goal: "Share the mission and recruit new agents to the foundation.", icon: <Share2 size={20} className="text-orange-500" /> },
  ];

  const rankPriority: Record<string, number> = {
    "SuperFounder": 0,
    "SuperFarmer": 1,
    "Angel": 2,
    "SuperHero": 3,
    "Normie": 4
  };

  useEffect(() => {
    const initUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
        const { data: profile } = await supabase
          .from('profiles')
          .select('referral_code')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setReferralLink(`https://ourflamefoundation.vercel.app/?ref=${profile.referral_code}`);
        }
      }
    };
    initUser();
  }, []);

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
    
    const sub = supabase.channel("profiles-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        if (!searchQuery) fetchData("", sortBy);
      }).subscribe();

    return () => {
      supabase.removeChannel(sub);
    };
  }, [sortBy, searchQuery]);

  return (
    <div className="pt-32 pb-24 px-6 bg-black min-h-screen text-white font-sans">
      <div className="container mx-auto max-w-7xl">
        
        {/* MEMBERSHIP TIERS */}
        <div id="tiers" className="mb-32 space-y-12">
          <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-zinc-400 text-center">Membership Tiers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {tiers.map((tier, i) => (
              <div key={i} className="p-10 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-[3rem] flex flex-col items-center text-center group hover:border-orange-600 transition-all duration-500">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl mb-8 bg-zinc-100 dark:bg-zinc-800 transform group-hover:scale-105 transition-transform duration-500">
                  <img src={tier.image} alt={tier.role} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-2xl font-black text-zinc-900 dark:text-white uppercase italic mb-2">{tier.role}</h4>
                <p className="text-orange-600 font-bold text-sm mb-4 tracking-widest">{tier.price}</p>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 italic mb-8 leading-relaxed h-12 flex items-center justify-center">"{tier.benefit}"</p>
                <Link 
                  to="/login" 
                  className="mt-auto w-full py-4 text-[10px] font-black uppercase tracking-widest bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 dark:hover:bg-orange-600 hover:text-white transition-all shadow-lg"
                >
                  {tier.button} <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>

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
            <div className="bg-zinc-900 p-4 border border-zinc-700 rounded text-center">
               <p className="text-[10px] text-zinc-400 uppercase mb-1">Total Network Followers</p>
               <p className="text-xl font-black">{stats.totalMembers.toLocaleString()} +</p>
            </div>
          </div>
        </div>

        {/* LEADERBOARD */}
        {loading ? (
          <div className="flex justify-center py-32"><Loader2 className="animate-spin text-orange-600" size={48} /></div>
        ) : (
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl mb-12">
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
                      <td className="p-5 font-bold">
                        {agent.display_name || "Anonymous"}
                        <div className="text-[10px] text-zinc-500 uppercase font-black">{agent.rank}</div>
                      </td>
                      <td className="p-5 text-green-400 font-mono"><Zap size={16} className="inline mr-1" />{agent.current_streak || 0}d</td>
                      <td className="p-5 text-zinc-300">{agent.followers.toLocaleString()}</td>
                      <td className="p-5 text-purple-400 font-mono">${agent.valuation?.toLocaleString()}</td>
                      <td className="p-5 text-right">
                        <button className="bg-zinc-800 hover:bg-orange-600 p-2 rounded-full transition"><Download size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* DAILY OBJECTIVES */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-black flex items-center gap-3 mb-8 uppercase italic text-orange-600">
            <Target size={28} /> Daily Objectives
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {staticChallenges.map((challenge) => (
              <div key={challenge.id} className="border border-zinc-700 p-6 rounded-xl bg-black/50 hover:border-orange-500 transition-all group">
                <div className="flex items-center gap-3 mb-3">
                  {challenge.icon}
                  <div className="font-bold text-xl text-white group-hover:text-orange-500 transition-colors">{challenge.title}</div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">{challenge.goal}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RECRUIT CTA */}
        {referralLink && (
          <div className="mt-12 bg-gradient-to-br from-orange-700 to-purple-800 p-10 rounded-3xl text-center border border-orange-500/40 shadow-2xl">
            <h3 className="text-4xl font-black mb-4 italic uppercase">Recruit & Explode 🔥</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
              <div className="bg-black/40 p-4 rounded-xl font-mono text-sm border border-white/10 break-all">{referralLink}</div>
              <button 
                onClick={() => { navigator.clipboard.writeText(referralLink); alert("Copied!"); }} 
                className="whitespace-nowrap px-8 py-4 bg-white text-orange-700 font-black rounded-xl hover:scale-105 transition active:scale-95"
              >
                COPY LINK
              </button>
            </div>
          </div>
        )}

      </div>
      
      <AboutUsSection />
      <HeroSection />
    </div>
  );
};

export default Scoretable;
