import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import scoretableBg from "../assets/scoretable.png";
import { supabase } from "../lib/supabaseClient";
import {
  Trophy, Target, Loader2, Search, Zap,
  ChevronRight, Video, Bot, Users, Activity, Filter,
  Heart, CreditCard, BarChart3, Gem, DollarSign
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

  const rankPriority: Record<string, number> = {
    "SuperFounder": 0, "SuperFarmer": 1, "Angel": 2, "SuperHero": 3, "Normie": 4, "Partner": 5
  };

  useEffect(() => {
    const initUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
        const { data: profile } = await supabase.from('profiles').select('referral_code').eq('id', user.id).single();
        if (profile) setReferralLink(`https://ourflamefoundation.vercel.app/?ref=${profile.referral_code}`);
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

      // ALL 4 NUMERIC METRICS IN ONE SELECT: paid, engagement, saved, value
      let qb = supabase.from('profiles').select(`
        id, display_name, rank, paid, facebook, linkedin, 
        engagement, value, saved, email, current_streak
      `);
      
      if (query) qb = qb.or(`display_name.ilike.%${query}%,email.ilike.%${query}%`);
      const { data, error } = await qb;
      if (error) throw error;

      const processed = (data || []).map(item => ({
        ...item,
        followers: Number(item.facebook || 0) + Number(item.linkedin || 0),
        paidNum: Number(item.paid || 0),
        savedNum: Number(item.saved || 0),
        valueNum: Number(item.value || 0),
        engagementNum: Number(item.engagement || 0)
      }));

      let sorted = [...processed];
      
      // NUMERIC SORTING LOGIC
      if (currentSort === "followers") sorted.sort((a, b) => b.followers - a.followers);
      else if (currentSort === "rank") sorted.sort((a, b) => (rankPriority[a.rank] ?? 99) - (rankPriority[b.rank] ?? 99));
      else if (currentSort === "value") sorted.sort((a, b) => b.valueNum - a.valueNum);
      else if (currentSort === "engagement") sorted.sort((a, b) => b.engagementNum - a.engagementNum);
      else if (currentSort === "paid") sorted.sort((a, b) => b.paidNum - a.paidNum);
      else if (currentSort === "saved") sorted.sort((a, b) => b.savedNum - a.savedNum);
      else if (currentSort === "streak") sorted.sort((a, b) => (b.current_streak || 0) - (a.current_streak || 0));

      setLeaders(sorted.slice(0, 10));
    } catch (err) {
      console.error("Fetch Error:", err);
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
        
        {/* TIERS SECTION */}
        <div id="tiers" className="mb-32 space-y-12">
          <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-zinc-400 text-center">Membership Tiers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {tiers.map((tier, i) => (
              <div key={i} className="p-10 bg-zinc-900/50 border border-zinc-800 rounded-[3rem] flex flex-col items-center text-center group hover:border-orange-600 transition-all duration-500">
                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-zinc-800 mb-8 transform group-hover:scale-105 transition-all">
                  <img src={tier.image} alt={tier.role} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-2xl font-black text-white uppercase italic mb-2">{tier.role}</h4>
                <p className="text-orange-600 font-bold text-sm mb-4 tracking-widest">{tier.price}</p>
                <Link to="/login" className="mt-auto w-full py-4 text-[10px] font-black uppercase tracking-widest bg-white text-black rounded-xl flex items-center justify-center gap-2 hover:bg-orange-600 hover:text-white transition-all">
                  {tier.button} <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* LEADERBOARD */}
        {loading ? (
          <div className="flex justify-center py-32"><Loader2 className="animate-spin text-orange-600" size={48} /></div>
        ) : (
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl mb-12">
            <div className="p-6 border-b border-zinc-800 bg-black/40 flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-3xl font-black uppercase text-orange-600 flex items-center gap-3"><Trophy size={28} /> Leaderboard</h2>
              <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg">
                <Filter size={14} className="text-zinc-500" />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent text-xs font-black uppercase outline-none text-white">
                  <option value="followers">Followers</option>
                  <option value="paid">Paid</option>
                  <option value="saved">Saved</option>
                  <option value="engagement">Engagement</option>
                  <option value="value">Value</option>
                  <option value="rank">Rank</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-zinc-900 text-[10px] uppercase text-zinc-400 border-b border-zinc-800 text-left font-black tracking-widest">
                    <th className="p-5">Agent</th>
                    <th className="p-5">Rank</th>
                    <th className="p-5">Paid (MBI)</th>
                    <th className="p-5">Saved</th>
                    <th className="p-5">Followers</th>
                    <th className="p-5">Engagement</th>
                    <th className="p-5 text-right">Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {leaders.map((agent) => (
                    <tr key={agent.id} className={`${agent.id === currentUserId ? 'bg-orange-950/20 border-l-4 border-orange-600' : 'hover:bg-zinc-900/70'}`}>
                      <td className="p-5">
                        <div className="font-black text-base uppercase italic tracking-tighter">{agent.display_name || "Anonymous"}</div>
                        <div className="flex items-center gap-1 text-green-500 text-[9px] font-black uppercase">
                          <Zap size={10} fill="currentColor" /> {agent.current_streak || 0} DAY STREAK
                        </div>
                      </td>
                      <td className="p-5 text-[10px] text-orange-500 uppercase font-black">{agent.rank || "Normie"}</td>
                      
                      <td className="p-5">
                        <div className="flex items-center gap-1 font-black text-white">
                          <CreditCard size={14} className="text-green-500" />
                          <span>{agent.paidNum.toLocaleString()}</span>
                        </div>
                      </td>

                      <td className="p-5">
                        <div className="flex items-center gap-1 font-black text-white">
                          <Heart size={14} className="text-red-500" fill="currentColor" />
                          <span>{agent.savedNum.toLocaleString()}</span>
                        </div>
                      </td>

                      <td className="p-5 font-black text-zinc-300">{(agent.followers || 0).toLocaleString()}</td>
                      <td className="p-5 text-blue-400 font-mono font-bold text-sm">{agent.engagementNum}%</td>
                      <td className="p-5 text-right text-purple-400 font-black italic">
                         <div className="flex items-center justify-end gap-1">
                            <Gem size={14} />
                            ${agent.valueNum.toLocaleString()}
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
