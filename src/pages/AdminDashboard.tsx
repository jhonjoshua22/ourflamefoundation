import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { 
  Users, 
  Gamepad2, 
  Info, 
  Newspaper, 
  Contact, 
  LogOut, 
  ShieldCheck,
  Search,
  RefreshCw,
  UserPlus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setProfiles(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const filteredProfiles = profiles.filter(p => 
    p.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.display_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#050505] text-white font-sans">
      {/* SIDE NAVBAR */}
      <nav className="w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col p-6 sticky top-0 h-screen">
        <div className="mb-10">
          <h1 className="text-orange-600 font-black uppercase italic tracking-tighter text-xl">
            Flame <span className="text-white not-italic text-sm">CMS</span>
          </h1>
        </div>

        <div className="flex-1 space-y-2">
          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.2em] mb-4">Management</p>
          
          <NavItem icon={<Users size={18} />} label="Users" active />
          <NavItem icon={<Gamepad2 size={18} />} label="Flame Game" />
          <NavItem icon={<Newspaper size={18} />} label="News" />
          
          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.2em] mt-8 mb-4">General</p>
          <NavItem icon={<Info size={18} />} label="About" />
          <NavItem icon={<Contact size={18} />} label="Contacts" />
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 text-zinc-500 hover:text-red-500 transition-colors uppercase text-[10px] font-black tracking-widest pt-6 border-t border-white/5"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-black uppercase tracking-tighter italic">User <span className="text-orange-600 not-italic">Intel</span></h2>
            <p className="text-zinc-500 text-[10px] uppercase font-black tracking-[0.3em]">Command Center / Profiles</p>
          </div>
          
          <div className="flex gap-3">
             <button onClick={fetchProfiles} className="p-3 bg-zinc-900 border border-white/10 hover:border-orange-600 transition-all">
                <RefreshCw size={18} className={loading ? "animate-spin text-orange-600" : "text-zinc-400"} />
             </button>
          </div>
        </header>

        {/* SEARCH & FILTERS */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
          <input 
            type="text" 
            placeholder="SEARCH BY EMAIL OR NAME..." 
            className="w-full bg-[#111] border border-white/5 py-4 pl-12 pr-6 text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-orange-600/50 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* DATA TABLE */}
        <div className="bg-[#0a0a0a] border border-white/5 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-900/50 border-bottom border-white/5">
                <th className="p-4 text-zinc-500 text-[9px] font-black uppercase tracking-widest">Profile</th>
                <th className="p-4 text-zinc-500 text-[9px] font-black uppercase tracking-widest">Rank</th>
                <th className="p-4 text-zinc-500 text-[9px] font-black uppercase tracking-widest">Status</th>
                <th className="p-4 text-zinc-500 text-[9px] font-black uppercase tracking-widest">Last Active</th>
                <th className="p-4 text-zinc-500 text-[9px] font-black uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProfiles.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black uppercase text-white">{p.display_name || "Unknown Agent"}</span>
                      <span className="text-[10px] text-zinc-500 tracking-tighter">{p.email}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-[9px] font-black uppercase px-2 py-1 bg-zinc-800 border border-zinc-700 text-zinc-300">
                      {p.rank}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${p.is_admin ? "bg-orange-600 shadow-[0_0_8px_rgba(234,88,12,0.8)]" : "bg-zinc-600"}`} />
                      <span className="text-[9px] font-black uppercase text-zinc-400">{p.is_admin ? "Admin" : "Normie"}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[10px] font-mono text-zinc-500">
                    {p.last_active ? new Date(p.last_active).toLocaleDateString() : "Never"}
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-[9px] font-black uppercase text-zinc-500 hover:text-white transition-colors border border-transparent hover:border-white/10 px-3 py-1">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProfiles.length === 0 && (
             <div className="p-20 text-center text-zinc-600 uppercase text-[10px] font-black tracking-widest">
                No Data Found in Flame Archives
             </div>
          )}
        </div>
      </main>
    </div>
  );
};

// SUB-COMPONENT FOR NAV ITEMS
const NavItem = ({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`
    flex items-center gap-3 px-4 py-3 cursor-pointer transition-all border
    ${active 
      ? "bg-orange-600/10 border-orange-600 text-white" 
      : "bg-transparent border-transparent text-zinc-500 hover:text-white hover:bg-white/5"}
  `}>
    <span className={active ? "text-orange-600" : "text-inherit"}>{icon}</span>
    <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
  </div>
);

export default AdminDashboard;
