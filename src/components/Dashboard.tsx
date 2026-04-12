import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { 
  Video, 
  Bot, 
  Users, 
  Zap, 
  Radio, 
  ShieldCheck,
  Award,
  Activity,
  Target
} from "lucide-react";

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // GLOBAL PERFORMANCE STATE
  // Logic: GREEN (Daily), AMBER (Weekly), RED (MIA)
  const [performance, setPerformance] = useState("green"); 

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

  if (loading || !profile) return null;

  return (
    <section className="min-h-screen bg-white dark:bg-black py-20 px-6 transition-colors duration-500 font-sans">
      <div className="container mx-auto max-w-6xl">
        
        {/* TOP STATUS BAR: SEPARATED PERFORMANCE */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12 p-6 bg-zinc-50 dark:bg-zinc-900/50 border-2 border-zinc-200 dark:border-zinc-800 rounded-3xl">
          <div className="flex items-center gap-4">
             <div className="bg-black dark:bg-white p-3 rounded-2xl">
                <Activity size={20} className="text-white dark:text-black" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Global Performance</p>
                <div className="flex items-center gap-2">
                   <div className={`w-3 h-3 rounded-full animate-pulse ${
                      performance === 'green' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 
                      performance === 'amber' ? 'bg-amber-500 shadow-[0_0_10px_#f59e0b]' : 'bg-red-500 shadow-[0_0_10px_#ef4444]'
                   }`} />
                   <span className="text-lg font-black uppercase italic tracking-tighter">
                      {performance === 'green' ? 'Daily Missions Active' : performance === 'amber' ? 'Weekly Consistency' : 'Status: MIA'}
                   </span>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-4 border-l border-zinc-300 dark:border-zinc-700 pl-6">
            <div className="text-right">
              <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">MBI Rank</p>
              <p className="text-xl font-black italic uppercase text-orange-600">{profile.rank || "Normie"}</p>
            </div>
            <Zap size={24} className="text-black dark:text-white fill-current" />
          </div>
        </div>

        {/* MAIN HEADER */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.4em] text-[10px] mb-2">
            <Radio size={14} className="animate-pulse" /> Mission Control System
          </div>
          <h1 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.8] text-black dark:text-white">
            DAILY<br />TASKS
          </h1>
        </div>

        {/* THE 3 OBJECTIVES: CLEAN & COLOR-NEUTRAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          
          {/* OBJ 1 */}
          <div className="group p-10 rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 border-2 border-transparent hover:border-orange-600 transition-all">
            <Video size={40} className="mb-8 text-black dark:text-white group-hover:text-orange-600 transition-colors" />
            <h3 className="text-2xl font-black uppercase italic mb-4">1. DO GOOD & SHARE</h3>
            <p className="text-[11px] font-bold uppercase text-zinc-500 leading-relaxed">
              Share video on Clapmi to set good example.
            </p>
          </div>

          {/* OBJ 2 */}
          <div className="group p-10 rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 border-2 border-transparent hover:border-orange-600 transition-all">
            <Bot size={40} className="mb-8 text-black dark:text-white group-hover:text-orange-600 transition-colors" />
            <h3 className="text-2xl font-black uppercase italic mb-4">2. SUPERBOTS</h3>
            <p className="text-[11px] font-bold uppercase text-zinc-500 leading-relaxed">
              Build your dreams & add to our $1 PM Wholesale Family Pack. Keep your markup.
            </p>
          </div>

          {/* OBJ 3 */}
          <div className="group p-10 rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-900 border-2 border-transparent hover:border-orange-600 transition-all">
            <Users size={40} className="mb-8 text-black dark:text-white group-hover:text-orange-600 transition-colors" />
            <h3 className="text-2xl font-black uppercase italic mb-4">3. RECRUIT 10</h3>
            <p className="text-[11px] font-bold uppercase text-zinc-500 leading-relaxed">
              Recruit from age decile below you per week via family friends network.
            </p>
          </div>
        </div>

        {/* REWARDS GRID */}
        <div className="bg-black text-white rounded-[3rem] p-10 md:p-16 border-t-8 border-orange-600">
          <div className="flex items-center gap-4 mb-12">
            <Award className="text-orange-600" size={32} />
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">MBI REWARDS</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <div>
              <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-2">Normies / Partners</p>
              <p className="text-lg font-black uppercase italic leading-none">Free & Premium Content</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-2">Superheros</p>
              <p className="text-lg font-black uppercase italic leading-none">$5-25 PW</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-2">Angels</p>
              <p className="text-lg font-black uppercase italic leading-none">$25-50 PW</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-2">Superfarmers</p>
              <p className="text-lg font-black uppercase italic leading-none">$50-100 PM</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-orange-600 uppercase tracking-widest mb-2">Superfounders</p>
              <p className="text-lg font-black uppercase italic leading-none">$100-500 PW</p>
            </div>
          </div>
        </div>

        {/* SYSTEM FOOTER */}
        <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Concessions & Markup Protections Active</span>
          </div>
          
          <div className="flex gap-6 items-center">
             <div className="flex items-center gap-2 text-emerald-500 font-black text-[9px] uppercase tracking-widest">
                <div className="w-2 h-2 bg-current rounded-full" /> Daily Missions
             </div>
             <div className="flex items-center gap-2 text-amber-500 font-black text-[9px] uppercase tracking-widest">
                <div className="w-2 h-2 bg-current rounded-full" /> Weekly Only
             </div>
             <div className="flex items-center gap-2 text-red-500 font-black text-[9px] uppercase tracking-widest">
                <div className="w-2 h-2 bg-current rounded-full" /> MIA
             </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Dashboard;
