import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { 
  Users, Gamepad2, Info, Newspaper, 
  Contact, LogOut, ShieldCheck 
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const menuItems = [
    { label: "Profiles", path: "/admin/dashboard", icon: <Users size={18} />, group: "Command" },
    { label: "Flame Game", path: "/admin/flamegame", icon: <Gamepad2 size={18} />, group: "Command" },
    { label: "News", path: "/admin/news", icon: <Newspaper size={18} />, group: "Command" },
    { label: "About Us", path: "/admin/aboutus", icon: <Info size={18} />, group: "Foundation" },
    { label: "Contacts", path: "/admin/contacts", icon: <Contact size={18} />, group: "Foundation" },
  ];

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
          {menuItems.filter(i => i.group === "Command").map((item) => (
            <Link key={item.path} to={item.path}>
              <NavItem icon={item.icon} label={item.label} active={location.pathname === item.path} />
            </Link>
          ))}
          
          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.2em] mt-8 mb-4">Foundation</p>
          {menuItems.filter(i => i.group === "Foundation").map((item) => (
            <Link key={item.path} to={item.path}>
              <NavItem icon={item.icon} label={item.label} active={location.pathname === item.path} />
            </Link>
          ))}
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
        {children}
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <div className={`flex items-center gap-4 px-4 py-4 cursor-pointer transition-all border-l-2 mb-1 ${active ? "bg-orange-600/5 border-orange-600 text-white" : "bg-transparent border-transparent text-zinc-600 hover:text-white hover:bg-white/5"}`}>
    <span className={active ? "text-orange-600" : "text-inherit"}>{icon}</span>
    <span className="text-[11px] font-black uppercase tracking-[0.2em]">{label}</span>
  </div>
);

export default AdminLayout;
