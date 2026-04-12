import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import scoretableBg from "../assets/scoretable.png";
import { supabase } from "../lib/supabaseClient";
import {
  Trophy, Target, Loader2, Search, Zap, Download, 
  ChevronRight, Video, Bot, Users, Activity, ShieldCheck, Filter,
  Heart, CreditCard, BarChart3, Gem
} from "lucide-react";

import AboutUsSection from "@/components/AboutUsSection";
import HeroSection from "@/components/HeroSection";

// Tier Image Imports
import partnerImg from "../assets/partners.jpg"; 
import scoutImg from "../assets/scout.png";
import stormtrooperImg from "../assets/superheroes.png";
import angelImg from "../assets/angel.png";
import farmerImg from "../assets/superfarmer.png";
import founderImg from "../assets/founder.png";

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
    { id: 1, title: "1. DO GOOD & SHARE", goal: "Share video on Clapmi to set good example and inspire the network.", icon: <Video size={24} className="text-orange-500" /> },
    { id: 2, title: "2. SUPERBOTS", goal: "Build your dreams & add to our $1 PM Wholesale Family Pack. Keep your markup.", icon: <Bot size={24} className="text-orange-500" /> },
    { id: 3, title: "3. RECRUIT 10", goal: "Recruit 10 people from age decile below you per week thru family friends network.", icon: <Users size={24} className="text-orange-500" /> },
  ];

  const rankPriority: Record<string, number> = {
    "SuperFounder": 0,
    "SuperFarmer": 1,
    "Angel": 2,
    "SuperHero": 3,
    "Normie": 4,
    "Partner": 5
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

      let qb = supabase.from('profiles').select(`
        id, display_name, rank, paid, facebook, linkedin, 
        engagement, value, saved_count, email, current_streak
      `);
      
      if (query) qb = qb.or(`display_name.ilike.%${query}%,email.ilike.%${query}%`);
      const { data, error } = await qb;
      if (error) throw error;

      const processed = (data || []).map(item => ({
        ...item,
        followers: Number(item.facebook || 0) + Number(item.linkedin || 0),
      }));

      let sorted = [...processed];
      
      if (currentSort === "followers") sorted.sort((a, b) => b.followers - a.followers);
      else if (currentSort === "rank") sorted.sort((a, b) => (rankPriority[a.rank] ?? 99) - (rankPriority[b.rank] ?? 99));
      else if (currentSort === "value") sorted.sort((a, b) => (b.value || 0) - (a.value || 0));
      else if (currentSort === "engagement") sorted.sort((a, b) => (b.engagement || 0) - (a.engagement || 0));
      else if (currentSort === "saved") sorted.sort((a, b) => (b.saved_count || 0) - (a.saved_count || 0));
      else if (currentSort === "streak") sorted.sort((a, b) => (b.current_streak || 0) - (a.current_streak || 0));

      setLeaders(sorted.slice(0, 10));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchQuery, sortBy);
  }, [sortBy, searchQuery]);

  return (
    <div className="pt-32 pb-24 px-6 bg-black min-h-screen text-white font-sans">
      <div className="container mx-auto max-w-7xl">
        
        {/* MEMBERSHIP TIERS (Unchanged) */}
        <div id="tiers" className="mb-32 space-y-12">
          <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-zinc-400 text-center">Membership Tiers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {tiers.map((tier, i) => (
              <div key={i} className="p-10 bg-zinc-900/50 border border-zinc-800 rounded-[3rem] flex flex-col items-center text-center group hover:border-orange-600 transition-all duration-500">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl mb-8 bg-zinc-800 transform group-hover:scale-105 transition-transform duration-500">
                  <img src={tier.image} alt={tier.role} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-2xl font-black text-white uppercase italic mb-2">{tier.role}</h4>
                <p className="text-orange-600 font-bold text-sm mb-4 tracking-widest">{tier.price}</p>
                <p className="text-sm text-zinc-400 italic mb-8 leading-relaxed h-12 flex items-center justify-center">"{tier.benefit}"</p>
                <Link to="/login" className="mt-auto w-full py-4 text-[10px] font-black uppercase tracking-widest bg-white text-black rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 hover:text-white transition-all shadow-lg">
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
            <div className="p-6 border-b border-zinc-800 bg-black/40 flex flex-col md:flex-row justify-between items-center gap-4 relative">
              <div className="absolute inset-0 bg-cover opacity-10 pointer-events-none" style={{ backgroundImage: `url(${scoretableBg})` }} />
              <h2 className="relative text-3xl font-black uppercase text-orange-600 flex items-center gap-3"><Trophy size={28} /> Leaderboard</h2>
              
              <div className="relative flex items-center gap-2 bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg group">
                <Filter size={14} className="text-zinc-500" />
                <span className="text-[10px] font-black uppercase text-zinc-400">Sort By:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent text-xs font-black uppercase outline-none cursor-pointer text-white focus:text-orange-500 transition-colors"
                >
                  <option value="followers" className="bg-zinc-900">Followers</option>
                  <option value="value" className="bg-zinc-900">Value</option>
                  <option value="engagement" className="bg-zinc-900">Engagement</option>
                  <option value="saved" className="bg-zinc-900">Saved</option>
                  <option value="streak" className="bg-zinc-900">Streak</option>
                  <option value="rank" className="bg-zinc-900">Rank</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-zinc-900 text-[10px] uppercase text-zinc-400 border-b border-zinc-800 text-left font-black tracking-widest">
                    <th className="p-5">Display Name</th>
                    <th className="p-5">Rank</th>
                    <th className="p-5">Paid</th>
                    <th className="p-5">Followers</th>
                    <th className="p-5">Engagement</th>
                    <th className="p-5">Value</th>
                    <th className="p-5 text-right">Saved</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {leaders.map((agent) => (
                    <tr key={agent.id} className={`${agent.id === currentUserId ? 'bg-orange-950/20 border-l-4 border-orange-600' : 'hover:bg-zinc-900/70'}`}>
                      {/* Display Name + Streak below it */}
                      <td className="p-5">
                        <div className="font-black text-base uppercase italic tracking-tighter leading-none mb-1">
                          {agent.display_name || "Anonymous"}
                        </div>
                        <div className="flex items-center gap-1 text-green-500 text-[9px] font-black uppercase tracking-tighter">
                          <Zap size={10} fill="currentColor" /> {agent.current_streak || 0} DAY STREAK
                        </div>
                      </td>
                      
                      <td className="p-5">
                        <div className="text-[10px] text-orange-500 uppercase font-black tracking-widest">{agent.rank || "Normie"}</div>
                      </td>

                      <td className="p-5">
                        <div className="flex items-center gap-1 text-zinc-400">
                          <CreditCard size={14} className={agent.paid ? "text-green-500" : "text-zinc-700"} />
                          <span className="text-xs font-bold uppercase">{agent.paid ? "Yes" : "No"}</span>
                        </div>
                      </td>

                      <td className="p-5 font-black text-zinc-300">
                        {agent.followers.toLocaleString()}
                      </td>

                      <td className="p-5">
                        <div className="flex items-center gap-1 text-blue-400">
                          <BarChart3 size={14} />
                          <span className="text-sm font-mono font-bold">{agent.engagement || 0}%</span>
                        </div>
                      </td>

                      {/* Changed Valuation to Value */}
                      <td className="p-5 text-purple-400 font-black italic">
                        <div className="flex items-center gap-1">
                          <Gem size={14} />
                          ${(agent.value || 0).toLocaleString()}
                        </div>
                      </td>

                      <td className="p-5 text-right">
                        <div className="flex items-center justify-end gap-2 text-zinc-500">
                          <Heart size={14} className="text-red-500" fill="currentColor" />
                          <span className="text-sm font-bold">{agent.saved_count || 0}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REST OF SECTIONS (Unchanged) */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-[3rem] p-10 mb-12">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-3xl font-black flex items-center gap-3 uppercase italic text-orange-600">
              <Target size={32} /> Daily Tasks
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {staticChallenges.map((challenge) => (
              <div key={challenge.id} className="border border-zinc-800 p-8 rounded-3xl bg-black hover:border-orange-600 transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-zinc-900 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    {challenge.icon}
                  </div>
                  <div className="font-black text-xl text-white uppercase italic tracking-tighter leading-none">{challenge.title}</div>
                </div>
                <p className="text-zinc-500 text-xs font-bold uppercase leading-relaxed">{challenge.goal}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800 rounded-[3rem] p-10 md:p-14 mb-12 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-12">
              <Activity className="text-orange-600" size={32} />
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">MBI Rewards Ledger</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                { rank: "Normies / Partners", val: "Free & Premium Content" },
                { rank: "Superheros", val: "$5-25 PW" },
                { rank: "Angels", val: "$25-50 PW" },
                { rank: "Superfarmers", val: "$50-100 PM" },
                { rank: "Superfounders", val: "$100-500 PW" }
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-1">{item.rank}</p>
                  <p className="text-lg font-black uppercase italic">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {referralLink && (
          <div className="mt-12 bg-gradient-to-br from-orange-700 to-purple-800 p-10 rounded-[3rem] text-center border border-orange-500/40 shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-4xl md:text-5xl font-black mb-4 italic uppercase tracking-tighter">Recruit & Explode 🔥</h3>
              <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-8 italic">Add to our $1 PM Wholesale Family Pack</p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
                <div className="bg-black/40 p-5 rounded-2xl font-mono text-sm border border-white/10 break-all w-full md:w-auto">{referralLink}</div>
                <button 
                  onClick={() => { navigator.clipboard.writeText(referralLink); alert("Copied!"); }} 
                  className="whitespace-nowrap px-10 py-5 bg-white text-orange-700 font-black rounded-2xl hover:scale-105 transition shadow-xl"
                >
                  COPY LINK
                </button>
              </div>
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
