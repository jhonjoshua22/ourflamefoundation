import React from "react";
import { CheckCircle2, Lock, Star, Shield, Zap } from "lucide-react";

const Dashboard = ({ userRole = "Scouts" }) => {
  const taskData = [
    {
      id: 1,
      category: "Social",
      scouts: "Follow social media & repost relevant content",
      supertroopers: "Same as Scouts + Share #MagicWorlds content",
      angels: "Recruit using chosen colors (excl. red/blue)",
    },
    {
      id: 2,
      category: "Content",
      scouts: "Record hobby videos locally & share #FlameGame",
      supertroopers: "Visit Education & Health MagicBots",
      angels: "Join and host daily relevant events",
    },
    {
      id: 3,
      category: "Exploration",
      scouts: "Scout local streets/parks on maps for hobbies",
      supertroopers: "Visit OtherWorld MagicBot based on hobbies",
      angels: "Soft recommend solutions to families in need",
    },
  ];

  const getRoleIcon = (role: string) => {
    if (role === "Scouts") return <Zap className="text-blue-500" size={18} />;
    if (role === "Supertroopers") return <Star className="text-orange-500" size={18} />;
    return <Shield className="text-yellow-500" size={18} />;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 mt-24">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black uppercase italic text-white">Daily Missions</h2>
          <p className="text-zinc-400">Current Rank: <span className="text-orange-600 font-bold uppercase">{userRole}</span></p>
        </div>
        <div className="px-4 py-2 bg-zinc-900 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
          Saturday 0700 UTC Reset
        </div>
      </div>

      <div className="overflow-x-auto border border-white/10 bg-zinc-900/50 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">Category</th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-2">
                <Zap size={14} /> Scouts
              </th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-orange-500">
                <div className="flex items-center gap-2">
                   <Star size={14} /> Supertroopers
                </div>
              </th>
              <th className="p-4 text-[10px] font-black uppercase tracking-widest text-yellow-500">
                <div className="flex items-center gap-2">
                  <Shield size={14} /> Angels
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {taskData.map((row) => (
              <tr key={row.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-4 font-bold text-zinc-300 uppercase text-xs tracking-tighter border-r border-white/5">
                  {row.category}
                </td>
                
                {/* Scouts Column */}
                <td className={`p-4 text-sm ${userRole === "Scouts" ? "text-white" : "text-zinc-500"}`}>
                  <div className="flex gap-3">
                    <CheckCircle2 size={16} className={userRole === "Scouts" ? "text-blue-500" : "opacity-20"} />
                    {row.scouts}
                  </div>
                </td>

                {/* Supertroopers Column */}
                <td className={`p-4 text-sm border-x border-white/5 ${userRole === "Supertroopers" ? "text-white" : "text-zinc-500"}`}>
                  <div className="flex gap-3">
                    {userRole === "Scouts" ? <Lock size={16} className="opacity-20" /> : <CheckCircle2 size={16} className="text-orange-500" />}
                    {row.supertroopers}
                  </div>
                </td>

                {/* Angels Column */}
                <td className={`p-4 text-sm ${userRole === "Angels" ? "text-white" : "text-zinc-500"}`}>
                  <div className="flex gap-3">
                    {userRole !== "Angels" ? <Lock size={16} className="opacity-20" /> : <CheckCircle2 size={16} className="text-yellow-500" />}
                    {row.angels}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-orange-600/10 border border-orange-600/20">
          <h4 className="font-black uppercase text-orange-600 mb-2 italic">Proof of Mission</h4>
          <p className="text-xs text-zinc-400 mb-4">Upload screenshot or link to your repost/video to claim Saturday rewards.</p>
          <button className="w-full py-3 bg-orange-600 text-white font-black uppercase text-[10px] tracking-widest hover:bg-orange-500 transition-all">
            Submit Evidence
          </button>
        </div>
        <div className="p-6 bg-zinc-900 border border-white/10">
          <h4 className="font-black uppercase text-white mb-2 italic">MagicBot Quick-Links</h4>
          <div className="flex flex-wrap gap-2 mt-3">
            {["EducationWorld", "HealthWorld", "OtherWorld"].map(world => (
              <button key={world} className="px-3 py-1.5 border border-white/10 text-[9px] uppercase font-bold text-zinc-400 hover:text-white hover:border-white transition-all">
                Visit {world}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
