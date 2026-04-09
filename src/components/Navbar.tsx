import { Menu, X, User, LogOut, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import logo from "../assets/ourflamelogo.png"; 
import clickSound from "../assets/button.m4a"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play().catch(e => console.log("Audio playback failed", e));
  };
  
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved === "dark" || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false; 
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove('dark');
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
    playClickSound();
    await supabase.auth.signOut();
    setUser(null);
    setIsOpen(false);
    navigate("/login");
  };

  const flatNavigation = [
    { name: "What", href: "/#flame-game" },
    { name: "How", href: "/scoretable" },
    { name: "Why", href: "/scoretable#home" },
    { name: "Where", href: "/#presence" },
    { name: "When", href: "/#news" },
    { name: "Who", href: "/#impact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a] text-white border-b border-white/10">
      <div className="w-full px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => { playClickSound(); setIsOpen(false); }}>
            <img src={logo} alt="Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            <div className="flex flex-col text-left">
              <h2 className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
                Our <span className="text-orange-600">Flame</span>
              </h2>
              <span className="text-[8px] md:text-[10px] font-light tracking-[0.2em] uppercase text-gray-400">Foundation</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-6">
              {flatNavigation.map((item) => (
                <a key={item.name} href={item.href} className="text-[10px] text-gray-400 hover:text-white uppercase tracking-widest font-black whitespace-nowrap transition-colors" onClick={playClickSound}>
                  {item.name}
                </a>
              ))}
            </div>
            <div className="h-6 w-px bg-white/20" />
            <div className="flex items-center gap-4">
              <button onClick={() => { playClickSound(); setIsDark(!isDark); }} className="p-2 hover:bg-white/5 transition-all">
                {isDark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-gray-400" />}
              </button>
              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/profile" onClick={playClickSound} className="text-gray-400 hover:text-white"><User size={20} /></Link>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-red-500"><LogOut size={20} /></button>
                </div>
              ) : (
                <Link to="/login" onClick={playClickSound} className="text-[11px] font-black uppercase tracking-widest px-6 py-2.5 bg-orange-600 text-white hover:bg-orange-500 transition-all">Sign In</Link>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex lg:hidden items-center gap-4">
            <button onClick={() => { playClickSound(); setIsDark(!isDark); }} className="p-2 text-white bg-white/5 border border-white/10">
              {isDark ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} className="text-gray-400" />}
            </button>
            <button className="p-2 text-white bg-white/5 border border-white/10" onClick={() => { playClickSound(); setIsOpen(!isOpen); }}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU - Fixed Z-Index and Scrolling */}
      <div className={`lg:hidden fixed inset-0 top-20 bg-[#0a0a0a] z-[99] overflow-y-auto transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col p-10 min-h-[calc(100vh-80px)]">
          {flatNavigation.map((item) => (
            <a key={item.name} href={item.href} className="text-xl font-bold uppercase text-gray-300 hover:text-white py-6 border-b border-white/5" onClick={() => { playClickSound(); setIsOpen(false); }}>
              {item.name}
            </a>
          ))}
          
          <div className="mt-auto pt-8 border-t-2 border-white/10">
            {user ? (
              <button onClick={handleLogout} className="text-2xl font-black text-red-500 uppercase flex items-center gap-3">
                <LogOut size={24} /> Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => { playClickSound(); setIsOpen(false); }} className="text-2xl font-black text-orange-600 uppercase flex items-center gap-3">
                <User size={24} /> Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
