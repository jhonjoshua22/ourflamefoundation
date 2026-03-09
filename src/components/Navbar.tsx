import { Menu, X, User, LogOut, Sun, Moon, Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import logo from "../assets/ourflamelogo.png"; 
import clickSound from "../assets/button.m4a"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Helper function to play the sound
  const playClickSound = () => {
    const audio = new Audio(clickSound);
    audio.play().catch(e => console.log("Audio playback failed", e));
  };
  
  // Theme State
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved === "dark" || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false; 
  });

  // THEME EFFECT: This is what makes light/dark mode actually work
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

  // Auth Listener
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
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Flame Game", href: "/#flame-game" },
    { name: "GameGallery", href: "/#gallery" },
    { name: "Scoretable", href: "/scoretable", isPage: true },
    { name: "Services", href: "/#services" },
    { name: "Presence", href: "/#presence" },
    { name: "News", href: "/#news" },
    { name: "Process", href: "/#process" },
    { name: "Impact", href: "/#impact" },
    { name: "Partners", href: "/#people" },
    { name: "Contact", href: "/#footer" },
  ];

  const NavItem = ({ link, className }: { link: any, className: string }) => {
    const isHome = location.pathname === "/";
    
    // Logic: If we are on a different page, ALWAYS use <Link> to go home first
    if (link.isPage || !isHome) {
      return (
        <Link to={link.href} className={className} onClick={() => { playClickSound(); setIsOpen(false); }}>
          {link.name}
        </Link>
      );
    }

    // If on home, use <a> for smooth scrolling
    return (
      <a href={link.href} className={className} onClick={() => { playClickSound(); setIsOpen(false); }}>
        {link.name}
      </a>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a] dark:bg-black text-white border-b border-white/10 font-sans">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => { playClickSound(); setIsOpen(false); }}>
            <img src={logo} alt="Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            <div className="flex flex-col text-left">
              <h2 className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
                Our <span className="text-orange-600">Flame</span>
              </h2>
              <span className="text-[8px] md:text-[10px] font-light tracking-[0.2em] uppercase text-gray-400">Foundation</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-4 xl:gap-6">
              {navLinks.map((link) => (
                <NavItem 
                  key={link.name} 
                  link={link} 
                  className={`text-[10px] font-black uppercase tracking-widest transition-colors ${
                    location.pathname === link.href ? "text-orange-600" : "text-gray-400 hover:text-white"
                  }`} 
                />
              ))}
            </div>

            <div className="h-6 w-px bg-white/10 mx-2" />

            <div className="flex items-center gap-3">
              <button onClick={() => { playClickSound(); setIsDark(!isDark); }} className="p-2 hover:bg-white/5 transition-all outline-none">
                {isDark ? <Sun size={16} className="text-yellow-500" /> : <Moon size={16} className="text-gray-400" />}
              </button>

              {user ? (
                <div className="flex items-center gap-3">
                  <Link to="/profile" onClick={playClickSound} className="text-gray-400 hover:text-white transition-colors">
                    <User size={18} />
                  </Link>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={playClickSound} className="text-[10px] font-black uppercase tracking-widest px-3 py-2 border border-white/10 hover:bg-white/5 transition-all">
                  Sign In
                </Link>
              )}
            </div>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <button onClick={() => { playClickSound(); setIsDark(!isDark); }} className="p-2 text-white bg-white/5 border border-white/10">
              {isDark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-gray-400" />}
            </button>
            <button className="p-2 text-white bg-white/5 border border-white/10" onClick={() => { playClickSound(); setIsOpen(!isOpen); }}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden fixed inset-x-0 top-20 bottom-0 bg-[#0a0a0a] z-[99] transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full overflow-y-auto bg-[#0a0a0a] p-6 pb-12 space-y-4">
          {navLinks.map((link) => (
            <NavItem 
              key={link.name} 
              link={link} 
              className="text-2xl font-black uppercase italic tracking-tighter text-white border-b border-white/5 py-4 block" 
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
