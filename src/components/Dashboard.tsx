import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { CheckCircle2, Star, Shield, Zap, Flame, LayoutGrid, Trophy, Loader2 } from "lucide-react";

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (!error) setProfile(data);
    }
    setLoading(false);
  };

  const handleTaskDone = async (pointsToAdd: number) => {
    if (!profile || updating) return;
    
    // Get current Date in YYYY-MM-DD format (UTC)
    const todayUTC = new Date().toISOString().split('T')[0];

    // Check if user already claimed today
    if (profile.last_claim_date === todayUTC) {
      alert("Objective already secured for today. System resets at 00:00 UTC.");
      return;
    }

    setUpdating(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ 
          points: (profile.points || 0) + pointsToAdd,
          last_claim_date: todayUTC 
        })
        .eq("id", profile.id);

      if (error) throw error;

      // Update local state so UI reflects change instantly
      setProfile({ 
        ...profile, 
        points: (profile.points || 0) + pointsToAdd,
        last_claim_date: todayUTC 
      });
      
    } catch (error) {
      console.error("Transmission Error:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return null;
  if (!profile) return <div className="py-24 text-center font-black uppercase italic">Access Denied: Authenticate Agent</div>;

  // Logic to determine if buttons should be disabled
  const todayUTC = new Date().toISOString().split('T')[0];
  const hasClaimedToday = profile?.last_claim_date === todayUTC;

  const taskData = [
    { id: "01", category: "Social", scouts: "Follow social media & repost relevant content", supertroopers: "Same as Scouts + Share #MagicWorlds content", angels: "Recruit using chosen colours (excl. red/blue)", pts: { Scout: 50, Supertrooper: 150, Angel: 500 } },
    { id: "02", category: "Content", scouts: "Record hobby videos locally & share #FlameGame", supertroopers: "Visit Education & Health MagicBots", angels: "Join and host daily relevant events", pts: { Scout: 100, Supertrooper: 300, Angel: 1000 } },
    { id: "03", category: "Field", scouts: "Scout local streets/parks on maps for hobbies", supertroopers: "Visit OtherWorld MagicBot based on hobbies", angels: "Soft recommend solutions to families in need", pts: { Scout: 150, Supertrooper: 500, Angel: 2000 } },
  ];

  return (
    <section id="dashboard" className="w-full py-24 px-4 bg-zinc-50 dark:bg-black transition-colors duration-500 scroll-mt-20 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-xs">
              <Flame size={14} className="animate-pulse" /> Mission Control Center
            </div>
            <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white">
              Daily <span className="text-orange-600">Objectives</span>
            </h2>
            <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">
               <p>Rank: <span className="text-orange-600 italic">{profile.rank}</span></p>
               <p>Balance: <span className="text-orange-600 italic">{profile.points?.toLocaleString() || 0} PTS</span></p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-600 tracking-widest">Global Reset</p>
              <p className="text-sm font-black text-zinc-900 dark:text-white uppercase italic">00:00 UTC</p>
            </div>
            <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800" />
            <Trophy className="text-orange-600" size={32} />
          </div>
        </div>

        {/* The Matrix Table */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-orange-600 to-yellow-500 rounded-[2rem] blur opacity-5 group-hover:opacity-10 transition duration-1000"></div>
          
          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-white/[0.02]">
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Objective</th>
                    <th className="p-8 border-l border-zinc-100 dark:border-zinc-900 text-blue-600 font-black italic text-xl">SCOUTS</th>
                    <th className="p-8 border-l border-zinc-100 dark:border-zinc-900 text-orange-600 font-black italic text-xl">SUPERtroopers</th>
                    <th className="p-8 border-l border-zinc-100 dark:border-zinc-900 text-yellow-500 font-black italic text-xl">ANGELS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                  {taskData.map((row) => (
                    <tr key={row.id} className="group/row transition-colors hover:bg-zinc-50/50 dark:hover:bg-white/[0.01]">
                      <td className="p-8">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-black text-zinc-200 dark:text-zinc-800 group-hover/row:text-orange-600/30 transition-colors">{row.id}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">{row.category}</span>
                        </div>
                      </td>

                      {['Scout', 'Supertrooper', 'Angel'].map((rankType) => {
                        const isUserRank = profile.rank === rankType;
                        const taskText = rankType === 'Scout' ? row.scouts : rankType === 'Supertrooper' ? row.supertroopers : row.angels;
                        const taskPoints = (row.pts as any)[rankType];

                        return (
                          <td key={rankType} className={`p-8 align-top border-l border-zinc-100 dark:border-zinc-900 ${isUserRank ? 'bg-orange-600/[0.02]' : 'opacity-30'}`}>
                            <div className="flex flex-col h-full justify-between gap-6">
                              <p className={`text-sm leading-relaxed ${isUserRank ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-500 italic'}`}>
                                {taskText}
                              </p>
                              
                              {isUserRank && (
                                <button
                                  disabled={hasClaimedToday || updating}
                                  onClick={() => handleTaskDone(taskPoints)}
                                  className={`w-full py-3 rounded-xl font-black uppercase italic text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 ${
                                    hasClaimedToday 
                                    ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                                    : 'bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20'
                                  }`}
                                >
                                  {updating ? <Loader2 className="animate-spin" size={14} /> : hasClaimedToday ? <CheckCircle2 size={14} /> : <Zap size={14} />}
                                  {hasClaimedToday ? "Objective Secured" : `Claim ${taskPoints} PTS`}
                                </button>
                              )}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
