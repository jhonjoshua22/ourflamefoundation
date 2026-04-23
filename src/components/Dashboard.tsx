import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Flame, ChevronRight, ExternalLink, Users, X, ShieldCheck } from "lucide-react";

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (!error && data) {
      setProfile(data);
    }
    setLoading(false);
  };

  const fetchTeamMembers = async () => {
    setLoadingTeam(true);
    setIsTeamModalOpen(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("display_name, rank, photo_url, email")
      .eq("referred_by", profile.id);
    
    if (!error) setTeamMembers(data || []);
    setLoadingTeam(false);
  };

  const taskData = [
    { 
      id: "01", 
      normies: "Follow social media & repost content", 
      superheros: "Share #MagicWorlds & Recruit Normies", 
      angels: "Recruit SuperHeros & Mentor",
      superfarmers: "Strategic Recruitment & Funding",
      superfounders: "Direct Global Expansion & Ecosystem Governance"
    },
    { 
      id: "02", 
      normies: "Record local hobby/good deed videos", 
      superheros: "Launch products via MagicBots", 
      angels: "Host daily coaching events",
      superfarmers: "Seed Fund Projects & Direct AI Strategy",
      superfounders: "Approve High-Level Resource Allocations"
    },
    { 
      id: "03", 
      normies: "Scout local community improvements", 
      superheros: "Educate others on OtherWorld AI", 
      angels: "Recommend Angel Fund solutions",
      superfarmers: "Finalize Seed Agreements & Partnerships",
      superfounders: "Establish Foundation Pillars & Legal Frameworks"
    },
  ];

  const columnLinks = {
    Normie: { label: "Clapmi", url: "https://app.clapmi.com/" },
    SuperHero: { label: "Itch.io", url: "https://magicworlds.itch.io/magic-world" },
    Angel: { label: "Scoretable", url: "https://ourflamefoundation.vercel.app/scoretable" },
    SuperFarmer: { label: "Scoretable", url: "https://ourflamefoundation.vercel.app/scoretable" },
    SuperFounder: { label: "Foundation", url: "https://ourflamefoundation.vercel.app/" }
  };

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'SuperFounder': return 'text-purple-500';
      case 'SuperFarmer': return 'text-green-500';
      case 'Angel': return 'text-yellow-500';
      case 'SuperHero': return 'text-orange-600';
      default: return 'text-blue-500';
    }
  };

  const getRankBg = (rank: string) => {
    switch (rank) {
      case 'SuperFounder': return 'bg-purple-600';
      case 'SuperFarmer': return 'bg-green-600';
      case 'Angel': return 'bg-yellow-500';
      case 'SuperHero': return 'bg-orange-600';
      default: return 'bg-zinc-900';
    }
  };

  if (loading || !profile) return null;

  const ranks = ['Normie', 'SuperHero', 'Angel', 'SuperFarmer', 'SuperFounder'];

  return (
    <section id="dashboard" className="w-full py-24 px-4 bg-white dark:bg-black min-h-screen">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 border-b border-zinc-200 dark:border-zinc-800 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-[10px]">
              <Flame size={14} className="animate-pulse" /> Mission Control Center
            </div>
            <h2 className="text-6xl font-black uppercase italic tracking-tighter text-zinc-900 dark:text-white leading-none">
              Daily <span className="text-orange-600">Objectives</span>
            </h2>
            <div className="flex items-center gap-4 mt-4">
              <span className={`px-4 py-1 text-white text-[10px] font-black uppercase italic rounded-full shadow-lg ${getRankBg(profile.rank)}`}>
                Rank: {profile.rank || "Normie"}
              </span>
              <button 
                onClick={fetchTeamMembers}
                className="flex flex-col text-left group"
              >
                <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest group-hover:text-orange-600 transition-colors">
                   {profile.referral_count || 0} Team Members
                </span>
                <span className="text-orange-600 text-[8px] font-black uppercase tracking-[0.2em]">
                  Click to view Recruitment Network
                </span>
              </button>
            </div>
          </div>
          <div className="bg-zinc-100 dark:bg-zinc-900 px-6 py-4 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-[10px] font-black uppercase text-zinc-500 tracking-widest flex items-center gap-2">
            System Reset <ChevronRight size={10} /> 00:00 UTC
          </div>
        </div>

        {/* Task Table */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-xl shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1400px]">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="p-8 text-[10px] font-black uppercase text-zinc-400">Mission</th>
                  {ranks.map((rank) => (
                    <th key={rank} className="p-8 border-l border-zinc-100 dark:border-zinc-900">
                      <div className="flex flex-col gap-4">
                        <span className={`font-black italic uppercase tracking-tighter text-xl ${getRankColor(rank)}`}>
                          {rank}s
                        </span>
                        <a 
                          href={(columnLinks as any)[rank].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 border border-zinc-200 dark:border-zinc-800 hover:border-orange-600 transition-colors group"
                        >
                          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-orange-600">
                            {(columnLinks as any)[rank].label}
                          </span>
                          <ExternalLink size={10} className="text-zinc-400" />
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-900">
                {taskData.map((row) => (
                  <tr key={row.id}>
                    <td className="p-8 font-black text-4xl text-zinc-200 dark:border-zinc-800">{row.id}</td>
                    {ranks.map((rankType) => {
                      const isUserRank = profile.rank === rankType;
                      let taskText = "";
                      if (rankType === 'Normie') taskText = row.normies;
                      else if (rankType === 'SuperHero') taskText = row.superheros;
                      else if (rankType === 'Angel') taskText = row.angels;
                      else if (rankType === 'SuperFarmer') taskText = row.superfarmers;
                      else if (rankType === 'SuperFounder') taskText = row.superfounders;

                      return (
                        <td key={rankType} className={`p-8 align-top border-l border-zinc-100 dark:border-zinc-900 transition-all duration-500 ${isUserRank ? 'bg-zinc-900/10' : ''}`}>
                          <p className={`text-sm leading-relaxed font-bold uppercase tracking-tight ${isUserRank ? getRankColor(rankType) : 'text-zinc-400 dark:text-white'}`}>
                            {taskText}
                          </p>
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

      {/* Team Modal */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-lg rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
            <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
              <div>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white">Network Members</h2>
                <p className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Active Recruitment Nodes</p>
              </div>
              <button onClick={() => setIsTeamModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              {loadingTeam ? (
                <div className="py-20 text-center animate-pulse text-zinc-500 uppercase font-black tracking-widest text-[10px]">Scanning Database...</div>
              ) : teamMembers.length > 0 ? (
                <div className="space-y-3">
                  {teamMembers.map((member, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900 border border-zinc-800">
                      <div className="w-12 h-12 rounded-xl bg-zinc-800 border border-zinc-700 overflow-hidden">
                        {member.photo_url ? <img src={member.photo_url} className="w-full h-full object-cover" /> : <Users className="w-full h-full p-3 text-zinc-600" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-white uppercase">{member.display_name || "Unknown Agent"}</p>
                        <p className={`text-[10px] font-black uppercase tracking-widest ${getRankColor(member.rank)}`}>{member.rank}</p>
                      </div>
                      <ShieldCheck size={16} className="text-zinc-700" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <Users size={40} className="mx-auto mb-4 text-zinc-800" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">No network nodes detected.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
