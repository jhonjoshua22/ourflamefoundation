import React, { useState, useEffect } from "react";
import scoretableBg from "../assets/scoretable.png"; 
import { supabase } from "../lib/supabaseClient"; 
import { 
  Trophy, Target, Zap, Star, Shield, Activity, 
  Loader2, Search, X, Network as NetworkIcon, Gift, Sprout
} from "lucide-react";

const Scoretable = () => {
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [stats, setStats] = useState({ totalFlame: 0, totalReach: 0 });

  const calculateFlameDollars = (networkVal: number) => {
    return (1000000000 * 0.0001533 * (networkVal || 0)) / 50000;
  };

  const fetchScores = async (query = "") => {
    try {
      setLoading(true);
      
      // ✅ GET TOTAL REACH (SUM OF FOLLOWERS)
      const { data: allData, error: fetchError } = await supabase
        .from("profiles")
        .select("followers");

      if (fetchError) throw fetchError;

      const totalReach =
        allData?.reduce(
          (acc, curr) => acc + (Number(curr.followers) || 0),
          0
        ) || 0;

      // 🔥 LEADERBOARD QUERY
      let supabaseQuery = supabase.from("profiles").select(`
        id, 
        display_name, 
        email, 
        network, 
        received,
        Rebirth,
        rank,
        team:team_lead (
          display_name
        )
      `);

      if (query) {
        supabaseQuery = supabaseQuery.or(
          `display_name.ilike.%${query}%,email.ilike.%${query}%`
        );
      } else {
        supabaseQuery = supabaseQuery
          .order("network", { ascending: false })
          .limit(20);
      }

      const { data: tableData, error: tableError } = await supabaseQuery;
      if (tableError) throw tableError;

      if (tableData) {
        const sortedData = [...tableData].sort(
          (a, b) => (b.network || 0) - (a.network || 0)
        );
        
        if (!query) {
          const top10 = sortedData.slice(0, 10);
          setLeaders(top10);

          const totalFlame = top10.reduce(
            (acc, curr) => acc + calculateFlameDollars(curr.network),
            0
          );

          setStats({ totalFlame, totalReach });
        } else {
          setLeaders(sortedData);
        }
      }
    } catch (error) {
      console.error("Foundation Sync Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();
    const channel = supabase.channel("live-scoreboard")
      .on("postgres_changes", { event: "*", schema: "public", table: "profiles" }, () => {
        if (!searchQuery) fetchScores();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const classRewards = [
    { class: "Normie", icon: <Zap size={20} className="text-blue-500" />, rewards: ["Do Good", "Share Content", "Win Prizes"] },
    { class: "SuperHero", icon: <Star size={20} className="text-orange-600" />, rewards: ["Recruit Normies", "Educate All", "Launch Products"] },
    { class: "Angel", icon: <Shield size={20} className="text-yellow-500" />, rewards: ["Recruit SuperHeros", "Mentor & Coach", "Angel Fund"] },
    { class: "SuperFarmer", icon: <Sprout size={20} className="text-green-500" />, rewards: ["Recruit Angels", "Mentor & Coach", "Seed Fund"] }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-white dark:bg-black min-h-screen transition-colors duration-500 font-sans">
      <div className="container mx-auto max-w-6xl">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-12">
          
          <div>
            <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter">
              Flame Foundation <span className="text-orange-600">Rewards</span>
            </h1>
          </div>
          
          <div className="grid grid-cols-2 gap-px bg-zinc-200">
            <div className="bg-white p-4">
              <p className="text-[9px] font-bold uppercase">Top 10 Value</p>
              <p className="text-xl font-black text-orange-600">
                ${stats.totalFlame.toLocaleString()}
              </p>
            </div>
            <div className="bg-white p-4">
              <p className="text-[9px] font-bold uppercase">Total Reach</p>
              <p className="text-xl font-black">
                {stats.totalReach.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="relative border overflow-hidden min-h-[500px] bg-zinc-950">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url(${scoretableBg})` }} />
          <div className="absolute inset-0 bg-black/70" />

          <div className="relative z-20">
            {loading ? (
              <div className="flex h-[500px] items-center justify-center">
                <Loader2 className="animate-spin text-orange-600" size={32} />
              </div>
            ) : (
              <table className="w-full text-white">
                <thead>
                  <tr>
                    {/* ❌ REMOVED RANK COLUMN */}
                    <th className="p-6">Agent</th>
                    <th className="p-6">Team</th>
                    <th className="p-6">Rebirth</th>
                    <th className="p-6 text-right">Flame Value</th>
                    <th className="p-6 text-right text-green-500">Received</th>
                  </tr>
                </thead>

                <tbody>
                  {leaders.map((agent) => (
                    <tr key={agent.id}>
                      <td className="p-6">{agent.display_name}</td>
                      <td className="p-6">{agent.team?.display_name || "Independent"}</td>
                      <td className="p-6">{agent.Rebirth}</td>
                      <td className="p-6 text-right">
                        ${calculateFlameDollars(agent.network).toLocaleString()}
                      </td>
                      <td className="p-6 text-right text-green-500">
                        ${Number(agent.received || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Scoretable;
