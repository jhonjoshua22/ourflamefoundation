import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { 
  LogIn, 
  Heart, 
  Share2, 
  Zap, 
  Radio, 
  ChevronRight, 
  ShieldCheck
} from "lucide-react";

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Status Logic: 'green' (Done), 'amber' (In Progress), 'red' (Action Required)
  const [taskStatus, setTaskStatus] = useState({
    login: "green",
    deeds: "amber",
    spread: "red"
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) { setLoading(false); return; }

    const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single();
    if (data) setProfile(data);
    setLoading(false);
  };

  const StatusIndicator = ({ status }: { status: string }) => {
    const colors = {
      green: "bg-emerald-500 shadow-[0_0_15px_#10b981]",
      amber: "bg-amber-500 shadow-[0_0_15px_#f59e0b]",
      red: "bg-red-500 shadow-[0_0_15px_#ef4444]"
    };
    return (
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full animate-pulse ${colors[status as keyof typeof colors]}`} />
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
          {status === 'green' ? 'Success' : status === 'amber' ? 'Pending' : 'Required'}
        </span>
      </div>
    );
  };

  if (loading || !profile) return null;

  return (
    <section className="min-h-screen bg-white dark:bg-black py-24 px-6 transition-colors duration-500">
      <div className="container mx-auto max-w-6xl">
        
        {/* HEADER: HYPER-BOLD & SIMPLE */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b-4 border-black dark:border-white pb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.4em] text-[10px]">
              <Radio size={16} className="animate-pulse" /> Mission Control Center
            </div>
            <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-black dark:text-white">
              Daily <span className="text-orange-600">Objectives</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-900 p-4 rounded-2xl border-2 border-black dark:border-white">
            <div className="text-right">
              <p className="text-[9px] font-black uppercase text-zinc-500 tracking-widest">Active Rank</p>
              <p className="text-xl font-black italic uppercase text-black dark:text-white">{profile.rank || "Normie"}</p>
            </div>
            <div className="bg-orange-600 p-3 rounded-xl">
              <Zap size={24} className="text-white fill-white" />
            </div>
          </div>
        </div>

        {/* THE 3 TASKS: BIG, CLEAN, IMPACTFUL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* TASK 1: LOGIN */}
          <div className="group relative p-10 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900/40 border-2 border-transparent hover:border-emerald-500 transition-all duration-500">
            <div className="flex justify-between items-start mb-16">
              <div className="p-5 bg-white dark:bg-black rounded-2xl shadow-xl group-hover:scale-110 transition-transform">
                <LogIn size={40} className="text-emerald-500" />
              </div>
              <StatusIndicator status={taskStatus.login} />
            </div>
            <h3 className="text-5xl font-black uppercase italic text-black dark:text-white mb-4">1. Help</h3>
          </div>

          {/* TASK 2: TRACK GOOD DEEDS */}
          <div className="group relative p-10 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900/40 border-2 border-transparent hover:border-amber-500 transition-all duration-500">
            <div className="flex justify-between items-start mb-16">
              <div className="p-5 bg-white dark:bg-black rounded-2xl shadow-xl group-hover:scale-110 transition-transform">
                <Heart size={40} className="text-amber-500" />
              </div>
              <StatusIndicator status={taskStatus.deeds} />
            </div>
            <h3 className="text-5xl font-black uppercase italic text-black dark:text-white mb-4">2. Share</h3>
          </div>

          {/* TASK 3: SPREAD THE WORD */}
          <div className="group relative p-10 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900/40 border-2 border-transparent hover:border-red-500 transition-all duration-500 shadow-2xl shadow-transparent hover:shadow-red-500/5">
            <div className="flex justify-between items-start mb-16">
              <div className="p-5 bg-white dark:bg-black rounded-2xl shadow-xl group-hover:scale-110 transition-transform">
                <Share2 size={40} className="text-red-500" />
              </div>
              <StatusIndicator status={taskStatus.spread} />
            </div>
            <h3 className="text-5xl font-black uppercase italic text-black dark:text-white mb-4">3. Enjoy</h3>
          </div>

        </div>

        {/* FOOTER INFO */}
        <div className="mt-24 pt-12 border-t border-zinc-100 dark:border-zinc-900 flex flex-wrap justify-between gap-6">
          <div className="flex items-center gap-3 opacity-30">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white">Auto-Rating System Active</span>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
            Next Reset: <span className="text-black dark:text-white">00:00 UTC</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Dashboard;
