import React, { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  TrendingUp, 
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

interface Stats {
  total: number;
  founders: number;
  farmers: number;
  others: number;
}

const UserDashboard = () => {
  const [stats, setStats] = useState<Stats>({ total: 0, founders: 0, farmers: 0, others: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("rank");

    if (!error && data) {
      const counts = {
        total: data.length,
        founders: data.filter(u => u.rank === 'SuperFounder').length,
        farmers: data.filter(u => u.rank === 'SuperFarmer').length,
        others: data.filter(u => !['SuperFounder', 'SuperFarmer'].includes(u.rank)).length
      };
      setStats(counts);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black uppercase italic text-zinc-900 dark:text-white leading-tight">
            Priority <span className="text-orange-600">Hub</span>
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Real-time Overview</p>
        </div>
        <div className="p-3 bg-zinc-100 dark:bg-zinc-900 rounded-2xl">
          <LayoutDashboard className="text-orange-600" size={24} />
        </div>
      </div>

      {/* Main Grid - Mobile First (1 column) -> Desktop (3 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Total Members Card */}
        <div className="p-6 bg-zinc-900 text-white rounded-3xl relative overflow-hidden shadow-xl">
          <Users className="absolute -right-4 -bottom-4 w-24 h-24 opacity-10" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
            <ShieldCheck size={14} className="text-orange-500"/> Total Network
          </h2>
          <p className="text-5xl font-black italic">{stats.total}</p>
          <div className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase text-zinc-400">
            <TrendingUp size={12} className="text-green-500"/> +10x Growth Mode
          </div>
        </div>

        {/* Priority 1: SuperFounders */}
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900/40 border-2 border-zinc-100 dark:border-zinc-800 rounded-3xl group hover:border-orange-600/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-600/10 rounded-2xl">
              <Zap className="text-orange-600" size={20} />
            </div>
            <span className="text-[10px] font-black bg-orange-600 text-white px-2 py-1 rounded-md">P1</span>
          </div>
          <h3 className="text-sm font-black uppercase dark:text-white mb-1">SuperFounders</h3>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black dark:text-white">{stats.founders}</p>
            <ChevronRight className="text-zinc-400 group-hover:text-orange-600 transition-colors" size={20} />
          </div>
        </div>

        {/* Priority 2: SuperFarmers */}
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900/40 border-2 border-zinc-100 dark:border-zinc-800 rounded-3xl group hover:border-orange-600/30 transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-600/10 rounded-2xl">
              <UserCheck className="text-orange-600" size={20} />
            </div>
            <span className="text-[10px] font-black bg-orange-600/20 text-orange-600 px-2 py-1 rounded-md">P2</span>
          </div>
          <h3 className="text-sm font-black uppercase dark:text-white mb-1">SuperFarmers</h3>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-black dark:text-white">{stats.farmers}</p>
            <ChevronRight className="text-zinc-400 group-hover:text-orange-600 transition-colors" size={20} />
          </div>
        </div>

      </div>

      {/* Secondary Priority Section */}
      <div className="mt-8">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-4">Secondary Focus</h3>
        <div className="p-5 bg-zinc-50 dark:bg-zinc-900/20 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-black text-xs">
              {stats.others}
            </div>
            <div>
              <p className="text-[11px] font-black uppercase dark:text-white">Other Ranks</p>
              <p className="text-[9px] font-bold text-zinc-500 uppercase">Angels, Heroes, Normies</p>
            </div>
          </div>
          <Link to="/people" className="text-[10px] font-black uppercase text-orange-600">View All</Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
