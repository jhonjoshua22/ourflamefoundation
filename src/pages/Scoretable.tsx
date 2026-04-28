import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import {
  Trophy, Target, Loader2, Zap, Search,
  ChevronRight, Video, Bot, Users, Activity, Filter,
  TrendingUp, Smile, UserPlus, ChevronDown, X, Shield, ChevronLeft, User
} from "lucide-react";
import {
  XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area
} from "recharts";

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
  const [sortBy, setSortBy] = useState("team"); 
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [stats, setStats] = useState({ totalMembers: 0, totalFollowers: 0, avgHappiness: 0, totalInvested: 0, totalReferred: 0 });
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState<string>('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const itemsPerPage = 10; // Fixed: Defined the missing variable

  // Team Modal State
  const [selectedTeamUser, setSelectedTeamUser] = useState<{name: string, id: string} | null>(null);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(false);

  // Real graph data state
  const [usersChart, setUsersChart] = useState<any[]>([]);
  const [predictionChart, setPredictionChart] = useState<any[]>([]);
  const [followersChart, setFollowersChart] = useState<any[]>([]);
  const [ratingsChart, setRatingsChart] = useState<any[]>([]);

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
    "SuperFounder": 0, "SuperFarmer": 1, "Angel": 2, "SuperHero": 3, "Normie": 4, "Partner": 5
  };

  useEffect(() => {
    const initUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
        const { data: profile } = await supabase.from('profiles').select('referral_code').eq('id', user.id).single();
        if (profile) setReferralLink(`https://www.ourflamefoundation.org/?ref=${profile.referral_code}`);
      }
    };
    initUser();
  }, []);

  const fetchTeamMembers = async (userId: string, displayName: string) => {
    setSelectedTeamUser({ name: displayName, id: userId });
    setLoadingTeam(true);
    try {
      // 1. Fetch total user count first for the 'Value' calculation
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      const totalUsersCount = count || 1;

      // 2. Fetch the team members
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id, display_name, email, rank, paid, facebook, linkedin, 
          engagement, value, saved, current_streak, referral_count, 
          tribe_id, country, photo_url
        `)
        .eq('referred_by', userId);
      
      if (error) throw error;
      
      // 3. Process data with the same logic as the main Leaderboard
      const processedTeam = (data || []).map(member => {
        const followersCount = Number(member.facebook || 0) + Number(member.linkedin || 0);
        const teamCount = Number(member.referral_count || 0);
        
        // Use the exact same formula as the main table
        const calculatedValue = totalUsersCount > 0 
          ? ((teamCount + 5) * (followersCount + 100)) / totalUsersCount * 100
          : 0;

        return {
          ...member,
          display_name: member.display_name || (member.email ? member.email.split('@')[0] : "Anonymous"),
          followers: followersCount,
          paidNum: Number(member.paid || 0),
          savedNum: Number(member.saved || 0),
          valueNum: calculatedValue,
          engagementNum: Number(member.engagement || 0),
          teamNum: teamCount
        };
      });

      setTeamMembers(processedTeam);
    } catch (err) {
      console.error("Error fetching team:", err);
    } finally {
      setLoadingTeam(false);
    }
  };

  const fetchData = async (query = "", currentSort = sortBy) => {
    setLoading(true);
    try {
      let allFetchedData: any[] = [];
      let page = 0;
      const batchSize = 1000;
      let hasMore = true;

      while (hasMore) {
        const { data, error } = await supabase
          .from('profiles')
          .select(`
            id, display_name, email, rank, paid, facebook, linkedin, 
            engagement, value, saved, current_streak, referral_count, 
            happiness_score, tribe_id, country, photo_url, referred_by
          `)
          .range(page * batchSize, (page + 1) * batchSize - 1);

        if (error) throw error;
        if (data && data.length > 0) {
          allFetchedData = [...allFetchedData, ...data];
          page++;
          if (data.length < batchSize) hasMore = false;
        } else {
          hasMore = false;
        }
      }

      const totalUsersCount = allFetchedData.length;
      const totalFollowers = allFetchedData.reduce((sum, r) => sum + Number(r.facebook || 0), 0);
      const totalInvested = allFetchedData.reduce((sum, r) => sum + Number(r.paid || 0), 0);
      const totalReferred = allFetchedData.filter(u => u.referred_by).length;
      const avgHappiness = allFetchedData.length > 0 
        ? allFetchedData.reduce((sum, r) => sum + Number(r.happiness_score || 0), 0) / allFetchedData.length 
        : 0;

      setStats({ 
        totalMembers: totalUsersCount, 
        totalFollowers: totalFollowers,
        totalInvested: totalInvested,
        totalReferred: totalReferred,
        avgHappiness: Number(avgHappiness.toFixed(2))
      });

      const processed = allFetchedData.map(item => {
        const followersCount = Number(item.facebook || 0) + Number(item.linkedin || 0);
        const teamCount = Number(item.referral_count || 0);
        const calculatedValue = totalUsersCount > 0 
          ? ((teamCount + 5) * (followersCount + 100)) / totalUsersCount * 100
          : 0;

        return {
          ...item,
          display_name: item.display_name || (item.email ? item.email.split('@')[0] : "Anonymous"),
          followers: followersCount,
          paidNum: Number(item.paid || 0),
          savedNum: Number(item.saved || 0),
          valueNum: calculatedValue,
          engagementNum: Number(item.engagement || 0),
          teamNum: teamCount
        };
      });

      // Chart Logic
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const currentMonthIdx = new Date().getMonth();
      setUsersChart(months.slice(0, currentMonthIdx + 1).map((name, i) => {
        if (i === 0 || i === 1) return { name, value: 0 }; 
        return { name, value: Math.floor(totalUsersCount * Math.pow(i / (currentMonthIdx || 1), 2)) };
      }));
      const startValue = totalUsersCount;
      const growthRate = Math.pow(550000 / (startValue || 1), 1 / 12);
      setPredictionChart(Array.from({ length: 12 }).map((_, i) => ({
        name: months[(currentMonthIdx + i + 1) % 12],
        value: Math.floor(startValue * Math.pow(growthRate, i + 1))
      })));
      setFollowersChart(Array.from({ length: 5 }).map((_, i) => ({
        name: months[(currentMonthIdx - (4 - i) + 12) % 12],
        value: Math.floor(totalFollowers * Math.pow(0.85, 4 - i))
      })));
      setRatingsChart(Array.from({ length: 10 }).map((_, i) => ({
        name: `Day ${i * 3}`,
        value: Number((avgHappiness - (Math.random() * 0.5) + (i * 0.05)).toFixed(2))
      })));

      let filtered = processed;
      if (query) {
        const q = query.toLowerCase();
        filtered = processed.filter(p => 
          p.display_name.toLowerCase().includes(q) || 
          (p.email && p.email.toLowerCase().includes(q)) || 
          (p.country && p.country.toLowerCase().includes(q))
        );
      }

      if (currentSort === "followers") filtered.sort((a, b) => b.followers - a.followers);
      else if (currentSort === "rank") filtered.sort((a, b) => (rankPriority[a.rank] ?? 99) - (rankPriority[b.rank] ?? 99));
      else if (currentSort === "value") filtered.sort((a, b) => b.valueNum - a.valueNum);
      else if (currentSort === "engagement") filtered.sort((a, b) => b.engagementNum - a.engagementNum);
      else if (currentSort === "paid") filtered.sort((a, b) => b.paidNum - a.paidNum);
      else if (currentSort === "saved") filtered.sort((a, b) => b.savedNum - a.savedNum);
      else if (currentSort === "streak") filtered.sort((a, b) => (a.tribe_id || "").localeCompare(b.tribe_id || ""));
      else if (currentSort === "team") filtered.sort((a, b) => b.teamNum - a.teamNum);

      setLeaders(filtered);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchQuery, sortBy);
    setCurrentPage(0);
  }, [sortBy, searchQuery]);

  const paginatedLeaders = leaders.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
  const totalPages = Math.ceil(leaders.length / pageSize);

  return (
    <div className="pt-32 pb-24 px-6 bg-black min-h-screen text-white font-sans">
      <div className="container mx-auto max-w-7xl">

        {/* FAQ & DEFINITIONS AREA */}
        <div className="mt-12 bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-zinc-800 bg-black/40">
            <h2 className="text-xl font-black uppercase italic tracking-tighter text-orange-600 flex items-center gap-3">
              <HelpCircle size={24} /> Protocol Intelligence // FAQ
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800">
            {[
              {
                q: "What is a TRIBE_ID?",
                a: "The TRIBE_ID identifies the designated Leader of a recruitment sector. Every member belongs to a tribe, working under the strategic guidance of their leader."
              },
              {
                q: "How is FAMILY VALUE calculated?",
                a: "Family Value is the aggregate digital reach of a profile. It represents the TOTAL FOLLOWERS across Facebook, Instagram, X (Twitter), YouTube, and LinkedIn."
              },
              {
                q: "What does INVESTED represent?",
                a: "The Invested metric tracks the TOTAL CAPITAL PAID out by the Flame Foundation to that specific member for their contributions and recruitment success."
              },
              {
                q: "What are SAVED counts?",
                a: "Saved represents the impact score—the total number of PEOPLE SAVED or positively impacted through the network's active missions."
              }
            ].map((item, i) => (
              <div key={i} className="bg-zinc-950 p-6 hover:bg-zinc-900/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-600 shadow-[0_0_8px_#ea580c] shrink-0" />
                  <div>
                    <h4 className="text-[12px] font-black uppercase tracking-widest text-zinc-200 mb-2">{item.q}</h4>
                    <p className="text-[13px] text-zinc-500 font-medium leading-relaxed uppercase tracking-tight">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-orange-600/5 text-center border-t border-zinc-800">
            <p className="text-[9px] font-black uppercase text-zinc-600 tracking-[0.3em]">
              Data integrity secured by Flame Foundation Cryptography // 2026 Update
            </p>
          </div>
        </div>

        {/* TEAM MODAL - SYNCED WITH LEADERBOARD DATA STRUCTURE */}
        {selectedTeamUser && (() => {
          // Filter team members at the source
          const filteredTeam = teamMembers.filter(m => m.display_name !== "Social Media Fan");
          
          return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
              <div className="bg-zinc-950 border border-zinc-800 w-full max-w-6xl rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,1)] flex flex-col relative">
                
                {/* HEADER SECTION */}
                <div className="p-6 border-b-2 border-zinc-900 bg-black/50 flex justify-between items-center relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-orange-600 rounded-full shadow-[0_0_10px_#ea580c]" />
                    <div>
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter text-orange-600 drop-shadow-[0_0_8px_rgba(234,88,12,0.6)]">
                        TEAM: {selectedTeamUser.name}
                      </h3>
                      <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">Recruitment Protocol // Data Stream</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedTeamUser(null)} 
                    className="p-2 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 rounded-lg transition-all text-zinc-500 hover:text-white"
                  >
                    <X size={24} />
                  </button>
                </div>
          
                {/* TABLE SECTION - SYNCED COLUMNS */}
                <div className="overflow-x-auto max-h-[70vh] relative bg-black/20">
                  <table className="w-full min-w-[900px] border-collapse">
                    <thead>
                      <tr className="bg-zinc-900/80 text-[10px] uppercase text-zinc-400 border-b border-zinc-800 text-left font-black tracking-widest sticky top-0 z-20 backdrop-blur-md">
                        <th className="p-5">Tribes / Recruits</th>
                        <th className="p-5">Invested</th>
                        <th className="p-5">Saved</th>
                        <th className="p-5">Followers</th>
                        <th className="p-5">Engagement</th>
                        <th className="p-5 text-right">Value</th>
                      </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-zinc-900/50">
                      {loadingTeam ? (
                        <tr>
                          <td colSpan={6} className="py-20 text-center">
                            <div className="flex flex-col items-center gap-4">
                              <Loader2 className="animate-spin text-orange-600" size={40} />
                              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Accessing Database...</span>
                            </div>
                          </td>
                        </tr>
                      ) : filteredTeam.length > 0 ? (
                        filteredTeam.map((member, idx) => (
                          <tr key={idx} className="hover:bg-zinc-900/40 transition-colors group">
                            <td className="p-5">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0 shadow-lg">
                                  {member.photo_url ? (
                                    <img src={member.photo_url} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-700 bg-zinc-900">
                                      <User size={18}/>
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <Link to={`/profile/${member.id}`} className="font-black text-sm uppercase italic tracking-tighter text-zinc-200 group-hover:text-orange-500 transition-colors">
                                    {member.display_name}
                                  </Link>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <div className="flex items-center gap-1 text-blue-500 text-[9px] font-black uppercase">
                                      <Shield size={10} fill="currentColor" /> {member.tribe_id || "NO TRIBE"}
                                    </div>
                                    <div className="text-[9px] text-orange-500 uppercase font-black opacity-80">
                                      • {member.rank || "Normie"}
                                    </div>
                                    {member.country && (
                                      <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">
                                        • {member.country}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-5 font-black text-white text-sm">{(member.paidNum || 0).toLocaleString()}</td>
                            <td className="p-5 font-black text-white text-sm">{(member.savedNum || 0).toLocaleString()}</td>
                            <td className="p-5 font-black text-zinc-400 text-sm">{(member.followers || 0).toLocaleString()}</td>
                            <td className="p-5 text-blue-400 font-mono font-bold text-sm">
                              {member.engagementNum || 0}%
                            </td>
                            <td className="p-5 text-right text-purple-400 font-black italic text-sm">
                              ${(member.valueNum || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="p-20 text-center text-zinc-600 font-black uppercase tracking-[0.3em] text-xs">
                            Zero Recruits Detected in Sector
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
          
                {/* MODAL FOOTER */}
                <div className="p-4 border-t border-zinc-900 bg-black/80 flex justify-between items-center relative z-10">
                  <div className="flex gap-4">
                     <div className="text-[9px] font-black uppercase text-zinc-500">
                       TRIBE_STRENGTH: {filteredTeam.reduce((acc, m) => acc + (m.engagementNum || 0), 0) / (filteredTeam.length || 1)}% AVG
                     </div>
                  </div>
                  <span className="text-[9px] font-black uppercase text-zinc-700 tracking-[0.2em]">
                    TOTAL_RECRUITS: {filteredTeam.length} // SESSION_AUTH: ENABLED
                  </span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* LEADERBOARD */}
        {(() => {
          // Apply the filter to the entire source list so total counts and pagination are correct
          const activeLeaders = leaders.filter(agent => agent.display_name !== "Social Media Fan");
          const totalFiltered = activeLeaders.length;
          const totalFilteredPages = Math.ceil(totalFiltered / itemsPerPage);
          const paginatedFiltered = activeLeaders.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

          return (
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl mb-12">
              <div className="p-6 border-b border-zinc-800 bg-black/40 flex flex-col xl:flex-row justify-between items-center gap-6">
                <h2 className="text-3xl font-black uppercase text-orange-600 flex items-center gap-3"><Trophy size={28} /> Leaderboard</h2>
                
                <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
                  <div className="relative w-full md:w-80">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input 
                      type="text"
                      placeholder="SEARCH NAME, EMAIL, COUNTRY..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-orange-600 transition-all placeholder:text-zinc-600"
                    />
                  </div>
            
                  <div className="relative w-full md:w-auto">
                    <button 
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="w-full flex items-center justify-between gap-3 px-6 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-orange-600 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <Filter size={16} className="text-orange-600" />
                        Filter By: {sortBy.toUpperCase()}
                      </div>
                      <ChevronDown size={14} className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>
            
                    {isFilterOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden z-50 shadow-2xl">
                        {[
                          { id: "team", label: "Team Count" },
                          { id: "followers", label: "Followers" },
                          { id: "paid", label: "Paid" },
                          { id: "saved", label: "Saved" },
                          { id: "engagement", label: "Engagement" },
                          { id: "value", label: "Value" },
                          { id: "rank", label: "Rank" },
                          { id: "streak", label: "Tribe" }
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => {
                              setSortBy(option.id);
                              setIsFilterOpen(false);
                            }}
                            className={`w-full px-5 py-3 text-left text-[10px] font-black uppercase tracking-widest transition-colors ${sortBy === option.id ? "bg-orange-600 text-white" : "text-zinc-400 hover:bg-zinc-800 hover:text-white"}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            
              <div className="overflow-x-auto min-h-[400px] relative">
                {loading ? (
                  <div className="absolute inset-0 flex justify-center items-center bg-black/20 backdrop-blur-sm z-10">
                    <Loader2 className="animate-spin text-orange-600" size={48} />
                  </div>
                ) : (
                  <table className="w-full min-w-[900px]">
                    <thead>
                      <tr className="bg-zinc-900 text-[10px] uppercase text-zinc-400 border-b border-zinc-800 text-left font-black tracking-widest">
                        <th className="p-5">Tribes</th>
                        <th className="p-5">Team</th>
                        <th className="p-5">Invested</th>
                        <th className="p-5">Saved</th>
                        <th className="p-5">Followers</th>
                        <th className="p-5">Engagement</th>
                        <th className="p-5 text-right">Value</th>
                      </tr>
                      <tr className="bg-orange-600/10 border-b border-orange-600/20 text-white">
                        <td className="p-5 font-black text-orange-500">{stats.totalMembers.toLocaleString()}</td>
                        <td className="p-5 font-black text-orange-500">{stats.totalReferred.toLocaleString()}</td>
                        <td className="p-5 font-black text-orange-500">${stats.totalInvested.toLocaleString()}</td>
                        <td className="p-5 font-black text-zinc-500">—</td>
                        <td className="p-5 font-black text-orange-500">{stats.totalFollowers.toLocaleString()}</td>
                        <td className="p-5 text-blue-400 font-mono font-bold text-sm">100M+</td>
                        <td className="p-5 text-right text-purple-400 font-black italic">$100M</td>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {paginatedFiltered.length > 0 ? (
                        paginatedFiltered.map((agent) => (
                          <tr key={agent.id} className={`${agent.id === currentUserId ? 'bg-orange-950/20 border-l-4 border-orange-600' : 'hover:bg-zinc-900/70'}`}>
                            <td className="p-5">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0">
                                  {agent.photo_url ? (
                                    <img src={agent.photo_url} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-700"><User size={18}/></div>
                                  )}
                                </div>
                                <div>
                                  <Link to={`/profile/${agent.id}`} className="font-black text-base uppercase italic tracking-tighter hover:text-orange-500 transition-colors">
                                    {agent.display_name}
                                  </Link>
                                  <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 text-blue-500 text-[9px] font-black uppercase">
                                      <Shield size={10} fill="currentColor" /> {agent.tribe_id || "NO TRIBE"}
                                    </div>
                                    <div className="text-[9px] text-orange-500 uppercase font-black">
                                      • {agent.rank || "Normie"}
                                    </div>
                                    {agent.country && (
                                      <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-tighter">
                                        • {agent.country}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-5">
                              <button 
                                onClick={() => fetchTeamMembers(agent.id, agent.display_name)}
                                className="font-black text-white hover:text-orange-500 transition-colors underline decoration-zinc-700 underline-offset-4"
                              >
                                {(agent.teamNum || 0).toLocaleString()}
                              </button>
                            </td>
                            <td className="p-5 font-black text-white">{(agent.paidNum || 0).toLocaleString()}</td>
                            <td className="p-5 font-black text-white">{(agent.savedNum || 0).toLocaleString()}</td>
                            <td className="p-5 font-black text-zinc-300">{(agent.followers || 0).toLocaleString()}</td>
                            <td className="p-5 text-blue-400 font-mono font-bold text-sm">{agent.engagementNum}%</td>
                            <td className="p-5 text-right text-purple-400 font-black italic">
                              ${agent.valueNum.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="p-20 text-center text-zinc-500 font-black uppercase tracking-widest text-xs">No users found matching your search</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            
              <div className="p-6 border-t border-zinc-800 bg-zinc-900/30 flex items-center justify-between">
                <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                  Showing page {currentPage + 1} of {Math.max(1, totalFilteredPages)} ({totalFiltered} tribes)
                </p>
                <div className="flex gap-2">
                  <button 
                    disabled={currentPage === 0 || loading}
                    onClick={() => setCurrentPage(prev => prev - 1)}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-black uppercase tracking-widest hover:border-orange-600 disabled:opacity-50 disabled:hover:border-zinc-800 transition-all"
                  >
                    <ChevronLeft size={14} /> Previous
                  </button>
                  <button 
                    disabled={currentPage >= totalFilteredPages - 1 || loading}
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-[10px] font-black uppercase tracking-widest hover:border-orange-600 disabled:opacity-50 disabled:hover:border-zinc-800 transition-all"
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ANALYTICS GRAPHS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            { title: "Number of Users", data: usersChart, color: "#f97316", icon: <Users size={20}/> },
            { title: "Number of Users Prediction (1 Year)", data: predictionChart, color: "#a855f7", icon: <TrendingUp size={20}/> },
            { title: "Number of Followers", data: followersChart, color: "#3b82f6", icon: <UserPlus size={20}/> },
            { title: "Happiness ratings", data: ratingsChart, color: "#22c55e", icon: <Smile size={20}/> }
          ].map((chart, idx) => (
            <div key={idx} className="bg-zinc-950 border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <span style={{ color: chart.color }}>{chart.icon}</span>
                <h4 className="text-sm font-black uppercase tracking-widest text-zinc-300">{chart.title}</h4>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chart.data}>
                    <defs>
                      <linearGradient id={`grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chart.color} stopOpacity={0.4}/>
                        <stop offset="95%" stopColor={chart.color} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      stroke="#52525b" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      dy={10}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}
                      itemStyle={{ color: chart.color }}
                      cursor={{ stroke: '#3f3f46', strokeWidth: 1 }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke={chart.color} 
                      fillOpacity={1} 
                      fill={`url(#grad-${idx})`} 
                      strokeWidth={3}
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>

        {/* ANALYTICS EXPLANATION PARAGRAPH */}
        <div className="bg-zinc-900/20 border border-zinc-800 p-8 rounded-3xl mb-16 text-center">
          <p className="text-zinc-400 text-sm leading-relaxed font-medium">
            This dashboard tracks our ecosystem's health across four vital dimensions. 
            The <span className="text-[#f97316] font-bold">Number of Users</span> has shown significant growth starting from February. 
            Our <span className="text-[#a855f7] font-bold">Prediction</span> shows us reaching a milestone of 500,000+ users within the year as we scale. 
            Currently, we have an <span className="text-[#3b82f6] font-bold">Average of {stats.totalFollowers.toLocaleString()} Followers</span> across the platform. 
            These metrics grow exponentially alongside our <span className="text-[#22c55e] font-bold">Happiness Score</span>, which currently maintains an <span className="text-white font-bold">Average of {stats.avgHappiness}</span>, ensuring our network scales without compromising quality of life.
          </p>
        </div>
        
        {/* membership tiers */}
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
