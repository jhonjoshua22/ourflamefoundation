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
  Award,
  CircleDot
} from "lucide-react";

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // PERFORMANCE LOGIC:
  // GREEN: Completed Daily Missions
  // AMBER: Completed Weekly
  // RED: MIA (Missing in Action)
  const [userPerformance, setUserPerformance] = useState({
    mission1: "green",
    mission2: "amber",
    mission3: "red"
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

  const PerformanceBadge = ({ status }: { status: string }) => {
    const config = {
      green: { color: "bg-emerald-500", shadow: "shadow-[0_0_15px_#10b981]", label: "DAILY ACTIVE" },
      amber: { color: "bg-amber-500", shadow: "shadow-[0_0_15px_#f59e0b]", label: "WEEKLY ONLY" },
      red: { color: "bg-red-500", shadow: "shadow-[0_0_15px_#ef4444]", label: "MIA" }
    };
    const current = config[status as keyof typeof config];
    
    return (
      <div className="flex flex-col items-end gap-1">
        <div className={`w-4 h-4 rounded-full animate-pulse ${current.color} ${current.shadow}`} />
        <span className="text-[9px] font-black uppercase tracking-tighter text-zinc-500">{current.label}</span>
      </div>
    );
  };

  if (loading || !profile) return null;

  return (
    <section className="min-h-screen bg-white dark:bg-black py-20 px-6 transition-colors duration-500">
      <div className="container mx-auto max-w-6xl">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8 border-b-8 border-black dark:border-white pb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4">
              <Radio size={16} className="animate-pulse" /> Mission Control // Performance: {userPerformance.mission1.toUpperCase()}
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8] text-black dark:text-white">
              FLAMING <br /><span className="text-orange-600">PRIORITIES</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-zinc-100 dark:bg-zinc-900 p-6 rounded-3xl border-4 border-black dark:border-white">
            <div className="text-right">
              <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">MBI RANK</p>
              <p className="text-2xl font-black italic uppercase text-black dark:text-white">{profile.rank || "Normie"}</p>
            </div>
            <div className="bg-orange-600 p-4 rounded-2xl shadow-lg shadow-orange-600/40">
              <Zap size={28} className="text-white fill-white" />
            </div>
          </div>
        </div>

        {/* THE 3 MISSIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* PRIORITY 1 */}
          <div className="group relative p-10 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900/40 border-2 border-transparent hover:border-black dark:hover:border-white transition-all duration-300">
            <div className="flex justify-between items-start mb-12">
              <div className="p-4 bg-white dark:bg-black rounded-2xl shadow-xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Video size={36} />
              </div>
              <PerformanceBadge status={userPerformance.mission1} />
            </div>
            <h3 className="text-3xl font-black uppercase italic leading-none mb-4">1. DO GOOD & SHARE</h3>
            <p className="text-xs font-bold uppercase text-zinc-500 leading-relaxed">
              Share video on Clapmi to set good example.
            </p>
          </div>

          {/* PRIORITY 2 */}
          <div className="group relative p-10 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900/40 border-2 border-transparent hover:border-black dark:hover:border-white transition-all duration-300">
            <div className="flex justify-between items-start mb-12">
              <div className="p-4 bg-white dark:bg-black rounded-2xl shadow-xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Bot size={36} />
              </div>
              <PerformanceBadge status={userPerformance.mission2} />
            </div>
            <h3 className="text-3xl font-black uppercase italic leading-none mb-4">2. SUPERBOTS</h3>
            <p className="text-xs font-bold uppercase text-zinc-500 leading-relaxed">
              Build your dreams & add to our $1 PM Wholesale Family Pack. You keep markup.
            </p>
          </div>

          {/* PRIORITY 3 */}
          <div className="group relative p-10 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900/40 border-2 border-transparent hover:border-black dark:hover:border-white transition-all duration-300">
            <div className="flex justify-between items-start mb-12">
              <div className="p-4 bg-white dark:bg-black rounded-2xl shadow-xl group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Users size={36} />
              </div>
              <PerformanceBadge status={userPerformance.mission3} />
            </div>
            <h3 className="text-3xl font-black uppercase italic leading-none mb-4">3. RECRUIT 10</h3>
            <p className="text-xs font-bold uppercase text-zinc-500 leading-relaxed">
              10 people from age decile below you per week thru family friends network.
            </p>
          </div>

        </div>

        {/* MBI REWARDS SECTION */}
        <div className="bg-zinc-100 dark:bg-zinc-900 rounded-[3.5rem] p-10 md:p-14 border-2 border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-4 mb-12">
            <Award className="text-orange-600" size={40} />
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">MBI REWARDS</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Normies & Partners</p>
              <p className="text-xl font-black uppercase italic">Free & Premium Content</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Superheros</p>
              <p className="text-xl font-black uppercase italic">$5-25 PW</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Angels</p>
              <p className="text-xl font-black uppercase italic">$25-50 PW</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Superfarmers</p>
              <p className="text-xl font-black uppercase italic">$50-100 PM</p>
            </div>
            <div className="space-y-1 lg:col-span-2">
              <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest">Superfounders</p>
              <p className="text-xl font-black uppercase italic">$100-500 PW</p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-12 flex flex-wrap justify-between items-center gap-6 opacity-60">
          <div className="flex items-center gap-3">
            <ShieldCheck size={18} className="text-emerald-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Concessions Available // Markup Retained</span>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2">
                <CircleDot size={12} className="text-emerald-500" />
                <span className="text-[9px] font-bold uppercase">Green: Daily</span>
             </div>
             <div className="flex items-center gap-2">
                <CircleDot size={12} className="text-amber-500" />
                <span className="text-[9px] font-bold uppercase">Amber: Weekly</span>
             </div>
             <div className="flex items-center gap-2">
                <CircleDot size={12} className="text-red-500" />
                <span className="text-[9px] font-bold uppercase">Red: MIA</span>
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Dashboard;
