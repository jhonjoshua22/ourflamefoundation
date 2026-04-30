import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { 
  Users, 
  Gamepad2, 
  Info, 
  Newspaper, 
  Contact, 
  LogOut, 
  Search,
  RefreshCw,
  TrendingUp,
  ShieldCheck,
  Globe
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({ total: 0, admins: 0, avgHappiness: 0 });

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProfiles(data);
      
      // Calculate Stats from Database Details
      const admins = data.filter(p => p.is_admin).length;
      const avgHappiness = data.reduce((acc, curr) => acc + (Number(curr.happiness_score) || 0), 0) / data.length;
      
      setStats({
        total: data.length,
        admins: admins,
        avgHappiness: parseFloat(avgHappiness.toFixed(2))
      });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const filteredProfiles = profiles.filter(p => 
    p.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.display_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      {/* SIDE NAVBAR */}
      <nav className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col p-6 sticky top-0 h-screen">
        <div className="mb-10 flex items-center gap-2">
           <div className="w-8 h-8 bg-orange-600 rounded-sm flex items-center justify-center">
              <ShieldCheck size={20} className="text-black" />
           </div>
          <h1 className="text-white font-black uppercase tracking-tighter text-lg">
            FLAME <span className="text-orange-600 italic">CMS</span>
          </h1>
        </div>

        <div className="flex-1 space-y-1">
          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.2em] mb-4">Command</p>
          <NavItem icon={<Users size={18} />} label="Profiles" active />
          <NavItem icon={<Gamepad2 size={18} />} label="Flame Game" />
          <NavItem icon={<Newspaper size={18} />} label="News" />
          
          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.2em] mt-8 mb-4">Foundation</p>
          <NavItem icon={<Info size={18} />} label="About" />
          <NavItem icon={<Contact size={18} />} label="Contacts" />
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-zinc-600 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest pt-6 border-t border-white/5"
        >
          <LogOut size={16} />
          Terminate Session
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter italic">Mission <span className="text-orange-600 not-italic">Control</span></h2>
            <p className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.3em] mt-1">Real-time Database Intel</p>
          </div>
          <button onClick={fetchProfiles} className="group p-3 bg-zinc-900 border border-white/10 hover:border-orange-600 transition-all">
            <RefreshCw size={20} className={`${loading ? "animate-spin" : ""} text-orange-600 group-hover:scale-110 transition-transform`} />
          </button>
        </header>

        {/* QUICK STATS FROM DB */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <StatCard title="Total Agents" value={stats.total} icon={<Users className="text-orange-600" />} />
          <StatCard title="Commanders" value={stats.admins} icon={<ShieldCheck className="text-orange-600" />} />
          <StatCard title="Happiness Level" value={`${stats.avgHappiness}/10`} icon={<TrendingUp className="text-orange-600" />} />
        </div>

        {/* SEARCH */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
          <input 
            type="text" 
            placeholder="SEARCH REGISTRY BY NAME, EMAIL, OR COUNTRY..." 
            className="w-full bg-[#111] border border-white/5 py-5 pl-14 pr-6 text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-orange-600 transition-all placeholder:text-zinc-700"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* DATA TABLE */}
        <div className="bg-[#0a0a0a] border border-white/5 rounded-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900/30 border-b border-white/5">
                <th className="p-5 text-zinc-500 text-[10px] font-black uppercase tracking-widest">Agent Detail</th>
                <th className="p-5 text-zinc-500 text-[10px] font-black uppercase tracking-widest">Rank</th>
                <th className="p-5 text-zinc-500 text-[10px] font-black uppercase tracking-widest text-center">Location</th>
                <th className="p-5 text-zinc-500 text-[10px] font-black uppercase tracking-widest">Auth Level</th>
                <th className="p-5 text-zinc-500 text-[10px] font-black uppercase tracking-widest text-right">Operation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProfiles.map((p) => (
                <tr key={p.id} className="hover:bg-orange-600/[0.02] transition-colors">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-zinc-900 border border-white/5 flex items-center justify-center overflow-hidden">
                          {p.photo_url ? <img src={p.photo_url} alt="" /> : <span className="text-zinc-700 font-black">?</span>}
                       </div>
                       <div className="flex flex-col">
                        <span className="text-[12px] font-black uppercase text-white leading-none mb-1">{p.display_name || "REDACTED"}</span>
                        <span className="text-[10px] text-zinc-500 font-mono tracking-tight">{p.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className={`text-[10px] font-black uppercase px-2 py-1 border ${p.rank === 'SuperFounder' ? 'border-orange-600 text-orange-600' : 'border-zinc-800 text-zinc-400'}`}>
                      {p.rank}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex flex-col items-center gap-1">
                       <Globe size={14} className="text-zinc-700" />
                       <span className="text-[10px] font-black uppercase text-zinc-500">{p.country || "GLOBAL"}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${p.is_admin ? "border-orange-600/30 bg-orange-600/5" : "border-white/5 bg-white/5"}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${p.is_admin ? "bg-orange-600 shadow-[0_0_10px_rgba(234,88,12,1)]" : "bg-zinc-500"}`} />
                      <span className="text-[9px] font-black uppercase text-zinc-300">{p.is_admin ? "COMMANDER" : "NORMIE"}</span>
                    </div>
                  </td>
                  <td className="p-5 text-right">
                    <button className="text-[10px] font-black uppercase text-orange-600 hover:text-white transition-colors tracking-tighter">
                      MODIFY PROFILE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

// HELPER COMPONENTS
const NavItem = ({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-4 px-4 py-4 cursor-pointer transition-all border-l-2 mb-1 ${active ? "bg-orange-600/5 border-orange-600 text-white" : "bg-transparent border-transparent text-zinc-600 hover:text-white hover:bg-white/5"}`}>
    <span className={active ? "text-orange-600" : "text-inherit"}>{icon}</span>
    <span className="text-[11px] font-black uppercase tracking-[0.2em]">{label}</span>
  </div>
);

const StatCard = ({ title, value, icon }: { title: string, value: any, icon: any }) => (
  <div className="bg-[#0a0a0a] border border-white/5 p-6 flex items-center justify-between">
    <div>
      <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-2xl font-black text-white italic">{value}</h3>
    </div>
    <div className="p-3 bg-zinc-900 border border-white/5">{icon}</div>
  </div>
);

export default AdminDashboard;
