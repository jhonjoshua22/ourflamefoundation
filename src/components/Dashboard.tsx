import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { 
  Video, 
  Bot, 
  Users, 
  Zap, 
  Radio, 
  ShieldCheck,
  TrendingUp,
  Gift,
  AlertTriangle,
  CheckCircle2,
  Clock
} from "lucide-react";

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Status Logic: 'green' (Daily Done), 'amber' (Weekly Pending), 'red' (MIA)
  const [taskStatus, setTaskStatus] = useState({
    missions: "green",
    weekly: "amber",
    recruitment: "red"
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
    const labels = {
      green: "Daily Mission",
      amber: "Weekly Goal",
      red: "MIA / Required"
    };
    return (
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full animate-pulse ${colors[status as keyof typeof colors]}`} />
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
          {labels[status as keyof typeof labels]}
        </span>
      </div>
    );
  };

  if (loading || !profile) return null;

  return (
    <section className="min-h-screen bg-white dark:bg-black py-24 px-6 transition-colors duration-500">
      <div className="container mx-auto max-w-6xl">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b-4 border-black dark:border-white pb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.4em] text-[10px]">
              <Radio size={16} className="animate-pulse" /> Mission Control Center
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-black dark:text-white">
              Flaming <span className="text-orange-600">Priorities</span>
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

        {/* MISSION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* MISSION 1: DO GOOD */}
          <div className="group relative p-8 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/40 border-2 border-transparent hover:border-emerald-500 transition-all duration-500">
            <div className="flex justify-between items-start mb-10">
              <div className="p-4 bg-white dark:bg-black rounded-2xl shadow-xl group-hover:scale-110 transition-transform">
                <Video size={32} className="text-emerald-500" />
              </div>
              <StatusIndicator status={taskStatus.missions} />
            </div>
            <h3 className="text-3xl font-black uppercase italic text-black dark:text-white mb-3">1. DO GOOD</h3>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight leading-relaxed">
              Share your video on Clapmi to set a good example.
            </p>
          </div>

          {/* MISSION 2: BUILD DREAMS */}
          <div className="group relative p-8 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/40 border-2 border-transparent hover:border-amber-500 transition-all duration-500">
            <div className="flex justify-between items-start mb-10">
              <div className="p-4 bg-white dark:bg-black rounded-2xl shadow-xl group-hover:scale-110 transition-transform">
                <Bot size={32} className="text-amber-500" />
              </div>
              <StatusIndicator status={taskStatus.weekly} />
            </div>
            <h3 className="text-3xl font-black uppercase italic text-black dark:text-white mb-3">2. SUPERBOTS</h3>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight leading-relaxed">
              Build your dreams + add to our $1 PM Family Pack (keep your markup).
            </p>
          </div>

          {/* MISSION 3: RECRUIT */}
          <div className="group relative p-8 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/40 border-2 border-transparent hover:border-red-500 transition-all duration-500 shadow-2xl shadow-transparent hover:shadow-red-500/5">
            <div className="flex justify-between items-start mb-10">
              <div className="p-4 bg-white dark:bg-black rounded-2xl shadow-xl group-hover:scale-110 transition-transform">
                <Users size={32} className="text-red-500" />
              </div>
              <StatusIndicator status={taskStatus.recruitment} />
            </div>
            <h3 className="text-3xl font-black uppercase italic text-black dark:text-white mb-3">3. RECRUIT 10</h3>
            <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight leading-relaxed">
              Recruit 10 people (age decile below you) per week via your network.
            </p>
          </div>
        </div>

        {/* MBI REWARDS TABLE */}
        <div className="bg-black text-white p-8 md:p-12 rounded-[3rem] border-2 border-orange-600/30 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Gift size={120} />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10">
              <TrendingUp className="text-orange-600" size={32} />
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">MBI Rewards Ledger</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { rank: "Normies", val: "Free Content" },
                { rank: "Superheros", val: "$5-25 PW" },
                { rank: "Angels", val: "$25-50 PW" },
                { rank: "Superfarmers", val: "$50-100 PM" },
                { rank: "Superfounders", val: "$100-500 PW" }
              ].map((item, i) => (
                <div key={i} className="bg-zinc-900/50 p-6 rounded-2xl border border-white/10 hover:border-orange-600 transition-colors">
                  <p className="text-[10px] font-black uppercase text-orange-600 tracking-[0.2em] mb-2">{item.rank}</p>
                  <p className="text-lg font-black italic uppercase">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER INFO */}
        <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-900 flex flex-wrap justify-between gap-6">
          <div className="flex items-center gap-3 opacity-50">
            <ShieldCheck size={16} className="text-orange-600" />
            <span className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white">Active Concessions Available</span>
          </div>
          <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">
            <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500" /> Green: Daily</span>
            <span className="flex items-center gap-2"><Clock size={12} className="text-amber-500" /> Amber: Weekly</span>
            <span className="flex items-center gap-2"><AlertTriangle size={12} className="text-red-500" /> Red: MIA</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Dashboard;
