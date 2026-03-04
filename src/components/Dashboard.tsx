import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { CheckCircle2, Star, Shield, Zap, Flame, LayoutGrid, Trophy, Loader2 } from "lucide-react";

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
        // Reset logic: If it's a new day, ignore the old completed tasks
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
      // Append the taskId to the completed_tasks array
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

      setProfile({ 
        ...profile, 
        points: (profile.points || 0) + pointsToAdd,
        completed_tasks: newCompletedTasks,
        last_reset_date: todayUTC
      });
      
    } catch (error) {
      console.error("Transmission Error:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return null;
  if (!profile) return <div className="py-24 text-center font-black uppercase italic">Access Denied</div>;

  const taskData = [
    { id: "01", category: "Social", scouts: "Follow social media & repost", supertroopers: "Share #MagicWorlds content", angels: "Recruit using chosen colours", pts: { Scout: 50, Supertrooper: 150, Angel: 500 } },
    { id: "02", category: "Content", scouts: "Record hobby videos locally", supertroopers: "Visit Education MagicBots", angels: "Host daily relevant events", pts: { Scout: 100, Supertrooper: 300, Angel: 1000 } },
    { id: "03", category: "Field", scouts: "Scout local streets/parks", supertroopers: "Visit OtherWorld MagicBots", angels: "Soft recommend solutions", pts: { Scout: 150, Supertrooper: 500, Angel: 2000 } },
  ];

  return (
    <section id="dashboard" className="w-full py-24 px-4 bg-zinc-50 dark:bg-black transition-colors duration-500 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-xs">
              <Flame size={14} className="animate-pulse" /> Mission Control Center
            </div>
            <h2 className="text-5xl font-black uppercase italic tracking-tighter dark:text-white">
              Daily <span className="text-orange-600">Objectives</span>
            </h2>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Rank: <span className="text-orange-600">{profile.rank}</span> | Balance: <span className="text-orange-600">{profile.points?.toLocaleString()} PTS</span>
            </p>
          </div>
          <div className="text-right bg-zinc-100 dark:bg-zinc-900 px-4 py-2 border border-zinc-200 dark:border-zinc-800 rounded-lg">
             <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest">Reset: 00:00 UTC</p>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-white/[0.02]">
                  <th className="p-8 text-[10px] font-black uppercase text-zinc-400">Task</th>
                  <th className="p-8 border-l border-zinc-100 dark:border-zinc-900 text-blue-600 font-black italic">SCOUTS</th>
                  <th className="p-8 border-l border-zinc-100 dark:border-zinc-900 text-orange-600 font-black italic">SUPERtroopers</th>
                  <th className="p-8 border-l border-zinc-100 dark:border-zinc-900 text-yellow-500 font-black italic">ANGELS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                {taskData.map((row) => (
                  <tr key={row.id} className="group/row">
                    <td className="p-8">
                       <span className="text-2xl font-black text-zinc-200 dark:text-zinc-800">{row.id}</span>
                    </td>

                    {['Scout', 'Supertrooper', 'Angel'].map((rankType) => {
                      const isUserRank = profile.rank === rankType;
                      const taskText = rankType === 'Scout' ? row.scouts : rankType === 'Supertrooper' ? row.supertroopers : row.angels;
                      const taskPoints = (row.pts as any)[rankType];
                      
                      // Check if THIS SPECIFIC task ID is in the completed array
                      const isTaskDone = profile.completed_tasks?.includes(row.id);

                      return (
                        <td key={rankType} className={`p-8 align-top border-l border-zinc-100 dark:border-zinc-900 ${isUserRank ? 'bg-orange-600/[0.02]' : 'opacity-30'}`}>
                          <div className="flex flex-col h-full justify-between gap-6">
                            <p className={`text-sm ${isUserRank ? 'text-zinc-900 dark:text-white font-bold' : 'text-zinc-500'}`}>
                              {taskText}
                            </p>
                            
                            {isUserRank && (
                              <button
                                disabled={isTaskDone || updatingId === row.id}
                                onClick={() => handleTaskDone(row.id, taskPoints)}
                                className={`w-full py-3 rounded-xl font-black uppercase italic text-[10px] tracking-widest transition-all flex items-center justify-center gap-2 ${
                                  isTaskDone 
                                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                                  : 'bg-orange-600 hover:bg-orange-700 text-white'
                                }`}
                              >
                                {updatingId === row.id ? <Loader2 className="animate-spin" size={14} /> : isTaskDone ? <CheckCircle2 size={14} /> : <Zap size={14} />}
                                {isTaskDone ? "Secured" : `Claim ${taskPoints} PTS`}
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
