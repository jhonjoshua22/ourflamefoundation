import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { CheckCircle2, Zap, Flame, Loader2, ChevronRight, ExternalLink, Radio } from "lucide-react";

const Dashboard = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  const taskData = [
    { 
      id: "01", 
      normies: "Broadcast Signal: Sync Neural Links & Amplify Global Transmissions", 
      superheros: "Quantum Outreach: Deploy #MagicWorlds Protocols & Recruit New Operatives", 
      angels: "Neural Command: Initialize Superhero Onboarding & Core Mentorship",
      superfarmers: "Empire Architecture: Design Galactic Funding Loops & Strategic Expansion",
      pts: { Normie: 50, SuperHero: 150, Angel: 500, SuperFarmer: 2000 } 
    },
    { 
      id: "02", 
      normies: "Data Logging: Capture Terrestrial Milestones & Earthbound Good Deeds", 
      superheros: "Tech Deployment: Activate MagicBots & Launch Digital Artifacts", 
      angels: "Direct Interface: Lead High-Frequency Coaching & Event Synchronizations",
      superfarmers: "The Seed Engine: Allocate Biological Capital & Direct AI Evolution",
      pts: { Normie: 100, SuperHero: 300, Angel: 1000, SuperFarmer: 5000 } 
    },
    { 
      id: "03", 
      normies: "Scout Protocol: Identify Local Anomalies & Community Infrastructure Needs", 
      superheros: "Enlightenment Phase: Distribute OtherWorld AI Intelligence Streams", 
      angels: "Angel Grid: Optimize Fiscal Solutions & Capital Distribution",
      superfarmers: "Treaty Execution: Finalize Inter-Agency Agreements & Power Alliances",
      pts: { Normie: 150, SuperHero: 500, Angel: 2000, SuperFarmer: 10000 } 
    },
    { 
      id: "04", 
      normies: "Atmospheric Stabilizer: Engage in Eco-Preservation & Local Habitat Support", 
      superheros: "Nexus Breach: Host Community Workshops on Advanced Web3 Tech", 
      angels: "Guardian Protocol: Audit Operational Security Across Foundation Nodes",
      superfarmers: "Universal Treasury: Architect New Liquidity Sinks for Global Rewards",
      pts: { Normie: 200, SuperHero: 600, Angel: 2500, SuperFarmer: 15000 } 
    },
    { 
      id: "05", 
      normies: "Final Convergence: Submit Daily Progress Report to the Flame Terminal", 
      superheros: "Vanguard Sweep: Moderate the Foundation Forums & Silence Disruptors", 
      angels: "Oracle Sight: Forecast Monthly Trends & Pitch Expansion Sectors",
      superfarmers: "Sovereign Command: Establish Permanent Foundation Embassies",
      pts: { Normie: 300, SuperHero: 1000, Angel: 5000, SuperFarmer: 50000 } 
    },
  ];

  const columnLinks = {
    Normie: { label: "Clapmi", url: "https://app.clapmi.com/" },
    SuperHero: { label: "Itch.io", url: "https://magicworlds.itch.io/magic-world" },
    Angel: { label: "Scoretable", url: "https://ourflamefoundation.vercel.app/scoretable" },
    SuperFarmer: { label: "Scoretable", url: "https://ourflamefoundation.vercel.app/scoretable" }
  };

  if (loading || !profile) return null;

  return (
    <section id="dashboard" className="w-full py-24 px-4 bg-white dark:bg-black min-h-screen transition-colors duration-500">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 border-b border-black dark:border-white pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.3em] text-[10px]">
              <Radio size={14} className="animate-pulse" /> Mission Control Center
            </div>
            <h2 className="text-6xl font-black uppercase italic tracking-tighter text-black dark:text-white leading-none">
              Daily <span className="text-orange-600">Objectives</span>
            </h2>
            <div className="flex items-center gap-4 mt-4">
              <span className="px-4 py-1 bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase italic rounded-full shadow-lg">
                Rank: {profile.rank || "Normie"}
              </span>
              <div className="flex flex-col">
                <span className="text-black dark:text-white text-[10px] font-black uppercase tracking-widest">
                  {profile.points?.toLocaleString() || 0} Points Accumulated
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-black px-6 py-4 border border-black dark:border-white rounded-2xl text-[10px] font-black uppercase text-black dark:text-white tracking-widest flex items-center gap-2">
            System Reset <ChevronRight size={10} /> 00:00 UTC
          </div>
        </div>

        {/* Task Table */}
        <div className="relative overflow-hidden rounded-3xl border border-black dark:border-white bg-white dark:bg-black backdrop-blur-xl shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="border-b border-black dark:border-white">
                  {['Normie', 'SuperHero', 'Angel', 'SuperFarmer'].map((rank) => (
                    <th key={rank} className="p-8 first:border-l-0 border-l border-black dark:border-white">
                      <div className="flex flex-col gap-4">
                        <span className={`font-black italic uppercase tracking-tighter text-xl ${
                          rank === 'Normie' ? 'text-blue-600' : 
                          rank === 'SuperHero' ? 'text-orange-600' : 
                          rank === 'Angel' ? 'text-yellow-500' : 'text-green-600'
                        }`}>
                          {rank}s
                        </span>
                        <a 
                          href={columnLinks[rank as keyof typeof columnLinks].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 border border-black dark:border-white hover:border-orange-600 transition-colors group"
                        >
                          <span className="text-[9px] font-black uppercase tracking-widest text-black dark:text-white group-hover:text-orange-600">
                            {columnLinks[rank as keyof typeof columnLinks].label}
                          </span>
                          <ExternalLink size={10} className="text-black dark:text-white" />
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-black dark:divide-white">
                {taskData.map((row) => (
                  <tr key={row.id}>
                    {['Normie', 'SuperHero', 'Angel', 'SuperFarmer'].map((rankType) => {
                      const taskText = rankType === 'Normie' ? row.normies : rankType === 'SuperHero' ? row.superheros : rankType === 'Angel' ? row.angels : row.superfarmers;
                      const taskValue = (row.pts as any)[rankType];

                      return (
                        <td key={rankType} className="p-8 align-top first:border-l-0 border-l border-black dark:border-white transition-all duration-500">
                          <div className="flex flex-col h-full justify-between gap-8">
                            <p className="text-sm leading-relaxed text-black dark:text-white font-bold uppercase tracking-tight">
                              {taskText}
                            </p>
                            <div className="flex items-center gap-2">
                              <Zap size={14} className="text-orange-600 fill-orange-600" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-black dark:text-white italic">
                                Value: {taskValue} Pts
                              </span>
                            </div>
                          </div>
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
    </section>
  );
};

export default Dashboard;
