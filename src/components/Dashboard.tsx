import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { CheckCircle2, Star, Shield, Zap, Flame, LayoutGrid, Trophy } from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading || !user) return null;

  const taskData = [
    {
      id: "01",
      category: "Social",
      scouts: "Follow social media & repost relevant content",
      supertroopers: "Same as Scouts + Share #MagicWorlds content",
      angels: "Recruit using chosen colours (excl. red/blue)",
    },
    {
      id: "02",
      category: "Content",
      scouts: "Record hobby videos locally & share #FlameGame",
      supertroopers: "Visit Education & Health MagicBots",
      angels: "Join and host daily relevant events",
    },
    {
      id: "03",
      category: "Field",
      scouts: "Scout local streets/parks on maps for hobbies",
      supertroopers: "Visit OtherWorld MagicBot based on hobbies",
      angels: "Soft recommend solutions to families in need",
    },
  ];

  return (
    <section className="w-full py-24 px-4 bg-zinc-50 dark:bg-black transition-colors duration-500">
      <div className="container mx-auto max-w-6xl">
        
        {/* Header Graphic */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-xs">
              <Flame size={14} /> Mission Control Center
            </div>
            <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white">
              Daily <span className="text-orange-600">Objectives</span>
            </h2>
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
          {/* Decorative Glow behind table */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-orange-600 to-yellow-500 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          
          <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 backdrop-blur-3xl shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800">
                    <th className="p-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500">
                      Objective
                    </th>
                    <th className="p-8 bg-blue-50/30 dark:bg-blue-900/10">
                      <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                        <Zap size={20} />
                        <span className="font-black uppercase italic tracking-tighter text-xl">Scouts</span>
                      </div>
                    </th>
                    <th className="p-8 bg-orange-50/30 dark:bg-orange-900/10">
                      <div className="flex items-center gap-3 text-orange-600 dark:text-orange-500">
                        <Star size={20} />
                        <span className="font-black uppercase italic tracking-tighter text-xl">Supertroopers</span>
                      </div>
                    </th>
                    <th className="p-8 bg-yellow-50/30 dark:bg-yellow-900/10">
                      <div className="flex items-center gap-3 text-yellow-600 dark:text-yellow-500">
                        <Shield size={20} />
                        <span className="font-black uppercase italic tracking-tighter text-xl">Angels</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {taskData.map((row) => (
                    <tr key={row.id} className="group/row transition-colors hover:bg-zinc-50/50 dark:hover:bg-white/[0.02]">
                      <td className="p-8 align-top">
                        <div className="flex items-center gap-4">
                          <span className="text-2xl font-black text-zinc-200 dark:text-zinc-800 group-hover/row:text-orange-600/20 transition-colors">
                            {row.id}
                          </span>
                          <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                            {row.category}
                          </span>
                        </div>
                      </td>
                      
                      {/* Scouts Column */}
                      <td className="p-8 align-top bg-blue-50/10 dark:bg-blue-900/[0.02]">
                        <div className="flex gap-3">
                          <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-1 opacity-40 group-hover/row:opacity-100 transition-opacity" />
                          <p className="text-sm font-medium leading-relaxed text-zinc-600 dark:text-zinc-400 group-hover/row:text-zinc-900 dark:group-hover/row:text-white transition-colors">
                            {row.scouts}
                          </p>
                        </div>
                      </td>

                      {/* Supertroopers Column */}
                      <td className="p-8 align-top border-x border-zinc-100 dark:border-zinc-800 bg-orange-50/10 dark:bg-orange-900/[0.02]">
                        <div className="flex gap-3">
                          <CheckCircle2 size={18} className="text-orange-600 shrink-0 mt-1 opacity-40 group-hover/row:opacity-100 transition-opacity" />
                          <p className="text-sm font-medium leading-relaxed text-zinc-600 dark:text-zinc-400 group-hover/row:text-zinc-900 dark:group-hover/row:text-white transition-colors">
                            {row.supertroopers}
                          </p>
                        </div>
                      </td>

                      {/* Angels Column */}
                      <td className="p-8 align-top bg-yellow-50/10 dark:bg-yellow-900/[0.02]">
                        <div className="flex gap-3">
                          <CheckCircle2 size={18} className="text-yellow-500 shrink-0 mt-1 opacity-40 group-hover/row:opacity-100 transition-opacity" />
                          <p className="text-sm font-medium leading-relaxed text-zinc-600 dark:text-zinc-400 group-hover/row:text-zinc-900 dark:group-hover/row:text-white transition-colors">
                            {row.angels}
                          </p>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 px-8 py-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50">
          <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
            <span className="flex items-center gap-2"><LayoutGrid size={12} /> Sync: Online</span>
            <span className="flex items-center gap-2 text-green-500"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" /> Verified Session</span>
          </div>
          <p className="text-[10px] font-bold text-zinc-500 uppercase italic">
            All ranks must complete primary objectives for full reward eligibility.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
