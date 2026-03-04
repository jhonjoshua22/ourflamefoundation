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

      if (!error) setProfile(data);
    }
    setLoading(false);
  };

  const handleTaskDone = async (taskId: string, pointsToAdd: number) => {
    if (!profile) return;
    setUpdatingId(taskId);

    try {
      // Logic: Update points in the database
      const { error } = await supabase
        .from("profiles")
        .update({ points: (profile.points || 0) + pointsToAdd })
        .eq("id", profile.id);

      if (error) throw error;

      // Local state update so the UI reflects the change immediately
      setProfile({ ...profile, points: (profile.points || 0) + pointsToAdd });
      alert(`Objective ${taskId} Secured! +${pointsToAdd} Points.`);
    } catch (error) {
      console.error("Transmission Error:", error);
      alert("Failed to sync points with Foundation.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return null;
  if (!profile) return <div className="py-24 text-center font-black uppercase italic">Access Denied: Authenticate Agent</div>;

  const taskData = [
    {
      id: "01",
      category: "Social",
      scouts: "Follow social media & repost relevant content",
      supertroopers: "Same as Scouts + Share #MagicWorlds content",
      angels: "Recruit using chosen colours (excl. red/blue)",
      points: { Scout: 50, Supertrooper: 150, Angel: 500 }
    },
    {
      id: "02",
      category: "Content",
      scouts: "Record hobby videos locally & share #FlameGame",
      supertroopers: "Visit Education & Health MagicBots",
      angels: "Join and host daily relevant events",
      points: { Scout: 100, Supertrooper: 300, Angel: 1000 }
    },
    {
      id: "03",
      category: "Field",
      scouts: "Scout local streets/parks on maps for hobbies",
      supertroopers: "Visit OtherWorld MagicBot based on hobbies",
      angels: "Soft recommend solutions to families in need",
      points: { Scout: 150, Supertrooper: 500, Angel: 2000 }
    },
  ];

  // Helper to render the cell and the button if rank matches
  const TaskCell = ({ type, text, points }: { type: string, text: string, points: number }) => {
    const isUserRank = profile.rank === type;
    
    return (
      <div className="flex flex-col h-full justify-between gap-4">
        <div className="flex gap-3">
          <CheckCircle2 size={18} className={`${isUserRank ? 'text-orange-600' : 'text-zinc-300'} shrink-0 mt-1`} />
          <p className={`text-sm font-medium leading-relaxed ${isUserRank ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>
            {text}
          </p>
        </div>
        
        {isUserRank && (
          <button 
            onClick={() => handleTaskDone(type, points)}
            disabled={updatingId !== null}
            className="mt-4 w-full py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-zinc-700 text-white text-[10px] font-black uppercase italic tracking-widest transition-all rounded-lg flex items-center justify-center gap-2"
          >
            {updatingId === type ? <Loader2 size={12} className="animate-spin" /> : <Flame size={12} />}
            Claim {points} PTS
          </button>
        )}
      </div>
    );
  };

  return (
    <section id="dashboard" className="w-full py-24 px-4 bg-zinc-50 dark:bg-black transition-colors duration-500 scroll-mt-20">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header Graphic */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-xs">
              <Flame size={14} className="animate-pulse" /> Mission Control Center
            </div>
            <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white">
              Agent <span className="text-orange-600">Portal</span>
            </h2>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
              Current Rank: <span className="text-orange-600 italic">{profile.rank}</span> | Total Points: <span className="text-orange-600 italic">{profile.points || 0}</span>
            </p>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase text-zinc-400 dark:text-zinc-600 tracking-widest">Next Reset</p>
              <p className="text-sm font-black text-zinc-900 dark:text-white uppercase italic">Sat 0700 UTC</p>
            </div>
            <div className="h-10 w-px bg-zinc-200 dark:bg-zinc-800" />
            <Trophy className="text-orange-600" size={32} />
          </div>
        </div>

        {/* The Matrix Table */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-orange-600 to-yellow-500 rounded-[2rem] blur opacity-5 group-hover:opacity-15 transition duration-1000"></div>
          
          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/90 backdrop-blur-3xl shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">Objective</th>
                    <th className="p-8 bg-blue-50/30 dark:bg-blue-900/10"><div className="flex items-center gap-3 text-blue-600"><Zap size={20} /><span className="font-black uppercase italic text-xl">Scouts</span></div></th>
                    <th className="p-8 bg-orange-50/30 dark:bg-orange-900/10"><div className="flex items-center gap-3 text-orange-600"><Star size={20} /><span className="font-black uppercase italic text-xl">Supertroopers</span></div></th>
                    <th className="p-8 bg-yellow-50/30 dark:bg-yellow-900/10"><div className="flex items-center gap-3 text-yellow-600"><Shield size={20} /><span className="font-black uppercase italic text-xl">Angels</span></div></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                  {taskData.map((row) => (
                    <tr key={row.id} className="group/row transition-colors hover:bg-zinc-50/50 dark:hover:bg-white/[0.01]">
                      <td className="p-8 align-top">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-black text-zinc-200 group-hover/row:text-orange-600/30">{row.id}</span>
                          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover/row:bg-orange-600 group-hover/row:text-white transition-all">
                            {row.category}
                          </span>
                        </div>
                      </td>

                      <td className="p-8 align-top bg-blue-50/10 dark:bg-blue-900/[0.01]">
                        <TaskCell type="Scout" text={row.scouts} points={row.points.Scout} />
                      </td>

                      <td className="p-8 align-top border-x border-zinc-100 dark:border-zinc-900 bg-orange-50/10 dark:bg-orange-900/[0.01]">
                        <TaskCell type="Supertrooper" text={row.supertroopers} points={row.points.Supertrooper} />
                      </td>

                      <td className="p-8 align-top bg-yellow-50/10 dark:bg-yellow-900/[0.01]">
                        <TaskCell type="Angel" text={row.angels} points={row.points.Angel} />
                      </td>
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
