import { Menu, X, User, LogOut, Sun, Moon, Shield, Target, Zap, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import logo from "../assets/ourflamelogo.png"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  // MOCK RANK DATA (You can later pull this from your Supabase 'profiles' table)
  const userRank = {
    level: "Bronze",
    title: "Scout",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/30",
    icon: <Target className="w-3 h-3" />
  };

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved === "dark";
    }
    return false; 
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#about" },
    { name: "Our Impact", href: "#impact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[1000] bg-[#0a0a0a] text-white border-b border-white/10 transition-all duration-300 font-sans">
      
      {/* GAMIFIED TOP BAR: Scrolling Mission Status */}
      <div className="bg-orange-600/10 border-b border-orange-600/20 py-1 overflow-hidden hidden md:block">
        <div className="flex whitespace-nowrap animate-pulse">
          <p className="text-[9px] font-mono uppercase tracking-[0.3em] text-orange-500 px-6">
            SYSTEM_STATUS: ACTIVE // MISSION: RECRUIT_TALENT // SECTOR: GLOBAL_FLAME
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 shrink-0 group" onClick={() => setIsOpen(false)}>
            <div className="relative transition-transform duration-500 group-hover:rotate-12">
              <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
              <div className="absolute inset-0 blur-lg bg-orange-600/30 -z-10" />
            </div>
            <h2 className="text-3xl font-black tracking-tighter text-white uppercase italic leading-none hidden sm:block">
              Our <span className="text-orange-600">Flame</span> <br /> 
              <span className="text-xl not-italic font-light tracking-[0.2em]">Foundation</span>
            </h2>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-8 mr-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="relative text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Rank Badge - Only if logged in */}
            {user && (
              <div className={`flex items-center gap-2 px-3 py-1.5 border ${userRank.borderColor} ${userRank.bgColor} animate-in fade-in slide-in-from-right-4 duration-700`}>
                {userRank.icon}
                <span className={`text-[9px] font-black uppercase tracking-tighter ${userRank.color}`}>
                  {userRank.level} {userRank.title}
                </span>
              </div>
            )}

            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-90"
            >
              {isDark ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-gray-400" />}
            </button>

            <div className="h-6 w-px bg-white/10 mx-2" />

            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-none bg-orange-600/20 flex items-center justify-center border border-orange-600/40 group-hover:bg-orange-600 group-hover:border-orange-600 transition-all">
                    <User className="w-4 h-4 text-orange-600 group-hover:text-white" />
                  </div>
                </Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-white hover:text-orange-600 transition-colors flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-orange-600/50">
                <User className="w-4 h-4" /> LOGIN_MISSION
              </Link>
            )}

            <a 
              href="#footer" 
              className="bg-orange-600 px-6 py-2.5 rounded-none font-black text-[10px] uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all active:scale-95 flex items-center gap-2"
            >
              ENLIST_NOW <ChevronRight size={14}/>
            </a>
          </div>

          {/* MOBILE TOGGLES */}
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setIsDark(!isDark)} className="p-2 text-white bg-white/5 border border-white/10">
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-400" />}
            </button>
            <button className="p-2 text-white bg-white/5 border border-white/10" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6 text-orange-600" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU - Slide In from Bottom for "UI Terminal" feel */}
      <div className={`md:hidden fixed inset-x-0 bottom-0 top-20 z-[99] bg-[#0a0a0a] border-t border-orange-600/30 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full p-8 space-y-8 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
          
          {user && (
            <div className={`p-6 border ${userRank.borderColor} ${userRank.bgColor}`}>
              <p className="text-[10px] font-mono text-orange-500 tracking-widest mb-1">CURRENT_RANK</p>
              <h3 className="text-3xl font-black uppercase italic italic">{userRank.level} {userRank.title}</h3>
            </div>
          )}

          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-3xl font-black uppercase italic tracking-tighter text-white hover:text-orange-600 transition-colors flex items-center justify-between group" onClick={() => setIsOpen(false)}>
                {link.name} <ChevronRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
              </a>
            ))}
          </div>

          <div className="mt-auto space-y-4 pb-12">
            <a href="#footer" onClick={() => setIsOpen(false)} className="bg-orange-600 block w-full py-5 text-white font-black text-center text-sm uppercase tracking-[0.3em] active:scale-95 transition-transform">
              ENLIST_NOW
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
