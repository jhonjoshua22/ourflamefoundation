import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { 
  LogIn, 
  Heart, 
  Share2, 
  Circle, 
  Activity, 
  Zap,
  ArrowUpRight
} from "lucide-react";

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Sample Status Logic (Red: Not Started, Amber: In Progress, Green: Done)
  const [status, setStatus] = useState({
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

  const StatusLight = ({ type }: { type: string }) => {
    const colors = {
      red: "bg-red-500 shadow-[0_0_15px_#ef4444]",
      amber: "bg-amber-500 shadow-[0_0_15px_#f59e0b]",
      green: "bg-emerald-500 shadow-[0_0_15px_#10b981]"
    };
    return <div className={`w-3 h-3 rounded-full ${colors[type as keyof typeof colors]} animate-pulse`} />;
  };

  if (loading || !profile) return null;

  return (
    <section className="min-h-screen bg-black text-white font-sans selection:bg-orange-600">
      <div className="container mx-auto max-w-6xl px-6 py-20">
        
        {/* TOP NAV-BAR STYLE HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b-2 border-zinc-900 pb-12 mb-16 gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-orange-600 mb-2">
              <Activity size={18} className="animate-spin-slow" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Operational Status: Active</span>
            </div>
            <h1 className="text-7xl font-black italic uppercase tracking-tighter leading-none">
              FLAME <span className="text-orange-600">TERMINAL</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-6 bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
             <div className="text-right">
               <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Operator Rank</p>
               <p className="text-2xl font-black italic text-orange-500">{profile.rank || "Normie"}</p>
             </div>
             <div className="h-10 w-[1px] bg-zinc-800" />
             <div className="bg-orange-600 p-3 rounded-xl shadow-lg shadow-orange-600/20">
               <Zap className="fill-white" />
             </div>
          </div>
        </div>

        {/* THE THREE CORE MISSIONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* TASK 1: LOGIN */}
          <div className="group relative bg-zinc-900/30 border-2 border-zinc-800 rounded-[2.5rem] p-10 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2">
            <div className="flex justify-between items-start mb-12">
              <div className="p-4 bg-zinc-800 rounded-2xl group-hover:bg-emerald-500 transition-colors">
                <LogIn className="text-white" size={32} />
              </div>
              <StatusLight type={status.login} />
            </div>
            <h3 className="text-3xl font-black uppercase italic mb-4">Neural<br/>Sync</h3>
            <p className="text-zinc-500 text-sm font-bold uppercase leading-relaxed mb-8">Establish secure connection to the foundation grid.</p>
            <button className="w-full py-4 bg-zinc-800 group-hover:bg-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all">
              Connection Verified
            </button>
          </div>

          {/* TASK 2: GOOD DEEDS */}
          <div className="group relative bg-zinc-900/30 border-2 border-zinc-800 rounded-[2.5rem] p-10 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2">
            <div className="flex justify-between items-start mb-12">
              <div className="p-4 bg-zinc-800 rounded-2xl group-hover:bg-amber-500 transition-colors">
                <Heart className="text-white" size={32} />
              </div>
              <StatusLight type={status.deeds} />
            </div>
            <h3 className="text-3xl font-black uppercase italic mb-4">Life<br/>Support</h3>
            <p className="text-zinc-500 text-sm font-bold uppercase leading-relaxed mb-8">Track terrestrial good deeds and impact milestones.</p>
            <button className="w-full py-4 bg-amber-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-amber-600/20 hover:scale-105 transition-all">
              Log Activity
            </button>
          </div>

          {/* TASK 3: SPREAD WORD */}
          <div className="group relative bg-zinc-900/30 border-2 border-zinc-800 rounded-[2.5rem] p-10 hover:border-red-500/50 transition-all duration-500 hover:-translate-y-2">
            <div className="flex justify-between items-start mb-12">
              <div className="p-4 bg-zinc-800 rounded-2xl group-hover:bg-red-500 transition-colors">
                <Share2 className="text-white" size={32} />
              </div>
              <StatusLight type={status.spread} />
            </div>
            <h3 className="text-3xl font-black uppercase italic mb-4">Signal<br/>Boost</h3>
            <p className="text-zinc-500 text-sm font-bold uppercase leading-relaxed mb-8">Amplify global transmissions to recruit new operatives.</p>
            <button className="w-full py-4 bg-zinc-800 group-hover:bg-red-600 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all">
              Launch Broadcast
            </button>
          </div>

        </div>

        {/* FOOTER SYSTEM INFO */}
        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-700">
           <div className="flex items-center gap-2 font-black italic text-[10px] uppercase tracking-widest">
             <Circle size={8} className="fill-white" /> Open Source Protocol
           </div>
           <div className="flex items-center gap-2 font-black italic text-[10px] uppercase tracking-widest">
             <Circle size={8} className="fill-white" /> Automated Rating v2.0
           </div>
           <div className="flex items-center gap-2 font-black italic text-[10px] uppercase tracking-widest">
             <Circle size={8} className="fill-white" /> Encrypted Neural Link
           </div>
        </div>

      </div>
    </section>
  );
};

export default Dashboard;
