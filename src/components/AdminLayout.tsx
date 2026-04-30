import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { 
  Users, Gamepad2, Info, Newspaper, 
  Contact, LogOut, ShieldCheck, Menu, X, ChevronLeft, ChevronRight 
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const menuItems = [
    { label: "Profiles", path: "/admin/dashboard", icon: <Users size={18} /> },
    { label: "Flame Game", path: "/admin/flamegame", icon: <Gamepad2 size={18} /> },
    { label: "News", path: "/admin/news", icon: <Newspaper size={18} /> },
    { label: "About Us", path: "/admin/aboutus", icon: <Info size={18} /> },
    { label: "Footer", path: "/admin/footer", icon: <Contact size={18} /> },
  ];

  const SidebarContent = () => (
    <>
      <div className={`mb-10 flex items-center gap-3 transition-all duration-300 ${isCollapsed ? "justify-center" : ""}`}>
        <div className="min-w-[32px] h-8 bg-orange-600 rounded-sm flex items-center justify-center shrink-0">
          <ShieldCheck size={20} className="text-black" />
        </div>
        {!isCollapsed && (
          <h1 className="text-white font-black uppercase tracking-tighter text-lg whitespace-nowrap">
            FLAME <span className="text-orange-600 italic">CMS</span>
          </h1>
        )}
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} className="block">
            <NavItem 
              icon={item.icon} 
              label={item.label} 
              active={location.pathname === item.path} 
              isCollapsed={isCollapsed} 
            />
          </Link>
        ))}
      </div>

      <button 
        onClick={handleLogout}
        className={`flex items-center gap-3 text-zinc-600 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest pt-6 border-t border-white/5 mt-auto ${isCollapsed ? "justify-center" : ""}`}
      >
        <LogOut size={16} className="shrink-0" />
        {!isCollapsed && <span className="whitespace-nowrap">Terminate Session</span>}
      </button>
    </>
  );

  return (
    <div className="flex h-screen w-full bg-[#050505] text-white font-sans overflow-hidden">
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0a0a0a] border-b border-white/5 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-2">
          <ShieldCheck size={20} className="text-orange-600" />
          <span className="font-black uppercase tracking-tighter">FLAME CMS</span>
        </div>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-white">
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE NAVIGATION OVERLAY */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex flex-col p-8 pt-24">
          <SidebarContent />
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <nav className={`hidden lg:flex flex-col bg-[#0a0a0a] border-r border-white/5 p-6 h-full transition-all duration-300 relative z-30 ${isCollapsed ? "w-20" : "w-64"}`}>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 bg-orange-600 rounded-full p-1 text-black hover:scale-110 transition-transform hidden lg:block z-50"
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
        <SidebarContent />
      </nav>

      {/* MAIN CONTENT - scroll handled here to prevent page jitter */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden pt-24 lg:pt-0">
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const NavItem = ({ icon, label, active = false, isCollapsed = false }: { icon: any, label: string, active?: boolean, isCollapsed?: boolean }) => (
  <div className={`flex items-center gap-4 px-4 py-4 cursor-pointer transition-colors border-l-2 mb-1 group relative ${active ? "bg-orange-600/5 border-orange-600 text-white" : "bg-transparent border-transparent text-zinc-600 hover:text-white hover:bg-white/5"}`}>
    <span className={`${active ? "text-orange-600" : "text-inherit"} shrink-0`}>{icon}</span>
    {!isCollapsed && (
      <span className="text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
        {label}
      </span>
    )}
    
    {/* Tooltip for collapsed state */}
    {isCollapsed && (
      <div className="absolute left-full ml-4 px-3 py-2 bg-orange-600 text-black text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity rounded whitespace-nowrap z-50">
        {label}
      </div>
    )}
  </div>
);

export default AdminLayout;
