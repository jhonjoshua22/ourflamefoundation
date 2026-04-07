import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { Radio, ChevronRight, ExternalLink, Zap, Shield, Atom, Orbit, Cpu } from "lucide-react";

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
      superfarmers: "Sovereign Command: Establish Permanent Foundation Embassies (Local Groups)",
      pts: { Normie: 250, SuperHero: 750, Angel: 3000, SuperFarmer: 20000 } 
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
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6 border-b-4 border-black dark:border-white pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-orange-600 font-black uppercase tracking-[0.4em] text-[10px]">
              <Radio size={14} className="animate-pulse" /> Sub-Space Data-Link: ONLINE
            </div>
            <h2 className="text-7xl font-black uppercase italic tracking-tighter text-black dark:text-white leading-none">
              MISSION <span className="text-orange-600">LOG</span>
            </h2>
            <div className="flex items-center gap-6 mt-6">
              <div className="flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-sm shadow-[4px_4px_0px_#ea580c]">
                <Shield size={14} />
                <span className="text-[11px] font-black uppercase">CLEARANCE: {profile.rank || "NORMIE"}</span>
              </div>
              <div className="flex flex-col border-l-2 border-orange-600 pl-4">
                <span className="text-black dark:text-white text-[12px] font-black uppercase tracking-tighter italic">
                  Energy Levels: {profile.points?.toLocaleString() || 0} PU
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
             <div className="text-black dark:text-white text-[10px] font-black uppercase tracking-[0.2em] mb-2">Cycle Reset Approaching</div>
             <div className="bg-orange-600 px-6 py-2 text-white font-black italic text-xl skew-x-[-10deg]">00:00 UTC</div>
          </div>
        </div>

        {/* Task Table */}
        <div className="relative overflow-hidden border-4 border-black dark:border-white bg-white dark:bg-black shadow-[20px_20px_0px_rgba(0,0,0,0.1)] dark:shadow-[20px_20px_0px_rgba(255,255,255,0.05)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1400px]">
              <thead>
                <tr className="border-b-4 border-black dark:border-white bg-black dark:bg-white">
                  <th className="p-8 text-[14px] font-black uppercase text-white dark:text-black italic">Directive</th>
                  {['Normie', 'SuperHero', 'Angel', 'SuperFarmer'].map((rank) => (
                    <th key={rank} className="p-8 border-l-4 border-white dark:border-black">
                      <div className="flex flex-col gap-2">
                        <span className="font-black italic uppercase tracking-tighter text-3xl text-orange-600 leading-none">
                          {rank}s
                        </span>
                        <a 
                          href={columnLinks[rank as keyof typeof columnLinks].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between mt-2 text-[10px] font-black uppercase text-white dark:text-black hover:text-orange-600 transition-colors"
                        >
                          Access Terminal <ExternalLink size={12} className="ml-2" />
                        </a>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y-4 divide-black dark:divide-white">
                {taskData.map((row) => (
                  <tr key={row.id} className="group">
                    <td className="p-8 font-black text-6xl text-black dark:text-white opacity-10 group-hover:opacity-100 group-hover:text-orange-600 transition-all duration-500">
                      {row.id}
                    </td>
                    {['Normie', 'SuperHero', 'Angel', 'SuperFarmer'].map((rankType) => {
                      const taskText = rankType === 'Normie' ? row.normies : rankType === 'SuperHero' ? row.superheros : rankType === 'Angel' ? row.angels : row.superfarmers;
                      const taskValue = (row.pts as any)[rankType];

                      return (
                        <td key={rankType} className="p-8 align-top border-l-4 border-black dark:border-white">
                          <div className="flex flex-col h-full justify-between gap-10">
                            <p className="text-md leading-tight text-black dark:text-white font-black uppercase italic tracking-tight group-hover:translate-x-1 transition-transform">
                              {taskText}
                            </p>
                            <div className="flex items-center justify-between border-t-2 border-black/10 dark:border-white/10 pt-4">
                              <div className="flex items-center gap-2">
                                <Zap size={16} className="text-orange-600 fill-orange-600" />
                                <span className="text-[12px] font-black uppercase text-black dark:text-white">
                                  +{taskValue} PU
                                </span>
                              </div>
                              <div className="h-2 w-2 bg-orange-600 rounded-full animate-ping" />
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
        
        {/* Footer Technical Specs */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t-2 border-black dark:border-white pt-8">
           <div className="flex items-center gap-4">
              <Atom className="text-orange-600" size={32} />
              <p className="text-[9px] font-black uppercase text-black dark:text-white leading-tight">Quantum Encryption Standard<br/>B-99.8 Active</p>
           </div>
           <div className="flex items-center gap-4">
              <Orbit className="text-orange-600 animate-spin-slow" size={32} />
              <p className="text-[9px] font-black uppercase text-black dark:text-white leading-tight">Orbital Sync Status<br/>Locked & Verified</p>
           </div>
           <div className="flex items-center gap-4">
              <Cpu className="text-orange-600" size={32} />
              <p className="text-[9px] font-black uppercase text-black dark:text-white leading-tight">Neural Core Integrity<br/>100% Operational</p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
