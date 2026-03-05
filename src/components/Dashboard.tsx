import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { CheckCircle2, Star, Shield, Zap, Flame, Sprout, Trophy, Loader2, ChevronRight } from "lucide-react";

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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

      if (!error) {
        const todayUTC = new Date().toISOString().split('T')[0];
        if (data.last_reset_date !== todayUTC) {
          data.completed_tasks = [];
        }
        setProfile(data);
      }
    }
    setLoading(false);
  };

  const handleTaskDone = async (taskId: string, pointsToAdd: number) => {
    if (!profile || updatingId) return;
    const todayUTC = new Date().toISOString().split('T')[0];
    setUpdatingId(taskId);

    try {
      const newCompletedTasks = [...(profile.completed_tasks || []), taskId];
      const { error } = await supabase
        .from("profiles")
        .update({ 
          points: (profile.points || 0) + pointsToAdd,
          completed_tasks: newCompletedTasks,
          last_reset_date: todayUTC
        })
        .eq("id", profile.id);

      if (error) throw error;
      setProfile({ ...profile, points: (profile.points || 0) + pointsToAdd, completed_tasks: newCompletedTasks, last_reset_date: todayUTC });
    } catch (error) {
      console.error("Transmission Error:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return null;
  if (!profile) return <div className="py-24 text-center font-black uppercase italic tracking-tighter text-4xl">Access Denied</div>;

  // Updated Task Data with SuperFarmer logic
  const taskData = [
    { 
      id: "01", 
      category: "Social", 
      normies: "Follow social media & repost content", 
      superheros: "Share #MagicWorlds & Recruit Normies", 
      angels: "Recruit SuperHeros & Mentor",
      superfarmers: "Strategic Recruitment & Funding",
      pts: { Normie: 50, SuperHero: 150, Angel: 500, SuperFarmer: 2000 } 
    },
    { 
      id: "02", 
      category: "Content", 
      normies: "Record local hobby/good deed videos", 
      superheros: "Launch products via MagicBots", 
      angels: "Host daily coaching events",
      superfarmers: "Seed Fund Projects & Direct AI Strategy",
      pts: { Normie: 100, SuperHero: 300, Angel: 1000, SuperFarmer: 5000 } 
    },
    { 
      id: "03", 
      category: "Field", 
      normies: "Scout local community improvements", 
      superheros: "Educate others on OtherWorld AI", 
      angels: "Recommend Angel Fund solutions",
      superfarmers: "Finalize Seed Agreements & Partnerships",
      pts: { Normie: 150, SuperHero: 500, Angel: 2000, SuperFarmer: 10000 } 
    },
  ];

  return (
    <section id="dashboard" className="w-full py-24 px-4 bg-white dark:bg-black transition-colors duration-500 min-h-screen">
      <div className="container mx-auto max-w-7xl">
        
        {/* Mission Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-[10px]">
              <Flame size={14} className="animate-pulse" /> Mission Control Center
            </div>
            <h2 className="text-6xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white leading-none">
              Daily <span className="text-orange-600">Objectives</span>
            </h2>
            <div className="flex items-center gap-4 mt-4">
              <span className="px-3 py-1 bg-zinc-900 text-white text-[10px] font-black uppercase italic rounded-full">Rank: {profile.rank}</span>
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{profile.points?.toLocaleString()} Network Points</span>
            </div>
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-900 px-6 py-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
              <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest flex items-center gap-2">
                System Reset <ChevronRight size={10} /> 00:00 UTC
              </p>
          </div>
        </div>

        {/* Matrix - 4 Column Layout */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="p-8 text-[10px] font-black uppercase text-zinc-400">Mission</th>
                  <th className="p-8 border-l border-zinc-100 dark:border-zinc-900 text-blue-500 font-black italic uppercase tracking-tighter text-xl">Normies</th>
                  <th className="p-8 border-l border-zinc-100 dark:border-zinc-900 text-orange-600 font-black italic uppercase tracking-tighter text-xl">SuperHeros</th>
                  <th className="p-8 border-l border-zinc-100 dark:border-zinc-900 text-yellow-500 font-black italic uppercase tracking-tighter text-xl">Angels</th>
                  <th className="p-8 border-l border-zinc-100 dark:border-zinc-900 text-green-500 font-black italic uppercase tracking-tighter text-xl">SuperFarmers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                {taskData.map((row) => (
                  <tr key={row.id} className="group/row">
                    <td className="p-8">
                        <span className="text-4xl font-black text-zinc-200 dark:text-zinc-800 group-hover/row:text-orange-600 transition-colors">{row.id}</span>
                    </td>

                    {['Normie', 'SuperHero', 'Angel', 'SuperFarmer'].map((rankType) => {
                      const isUserRank = profile.rank === rankType;
                      const taskText = rankType === 'Normie' ? row.normies : rankType === 'SuperHero' ? row.superheros : rankType === 'Angel' ? row.angels : row.superfarmers;
                      const taskPoints = (row.pts as any)[rankType];
                      const isTaskDone = profile.completed_tasks?.includes(row.id);

                      return (
                        <td key={rankType} className={`p-8 align-top border-l border-zinc-100 dark:border-zinc-900 transition-all ${isUserRank ? 'bg-orange-600/[0.03]' : 'opacity-20 grayscale'}`}>
                          <div className="flex flex-col h-full justify-between gap-8">
                            <p className={`text-sm leading-relaxed ${isUserRank ? 'text-zinc-900 dark:text-zinc-100 font-bold' : 'text-zinc-500'}`}>
                              {taskText}
                            </p>
                            
                            {isUserRank && (
                              <button
                                disabled={isTaskDone || updatingId === row.id}
                                onClick={() => handleTaskDone(row.id, taskPoints)}
                                className={`w-full py-4 rounded-xl font-black uppercase italic text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 ${
                                  isTaskDone 
                                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed' 
                                  : 'bg-zinc-900 dark:bg-white text-white dark:text-black hover:scale-[1.02] active:scale-95 shadow-xl'
                                }`}
                              >
                                {updatingId === row.id ? <Loader2 className="animate-spin" size={14} /> : isTaskDone ? <CheckCircle2 size={14} /> : <Zap size={14} className="fill-current" />}
                                {isTaskDone ? "Mission Secured" : `Execute for ${taskPoints} PTS`}
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
    </section>
  );
};

export default Dashboard;
