import { Menu, X, User, LogOut, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import logo from "../assets/ourflamelogo.png"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
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
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" }, // Shortened
    { name: "Flame Game", href: "#flame-game" },
    { name: "Services", href: "#services" },
    { name: "Presence", href: "#presence" },
    { name: "News", href: "#news" },
    { name: "Process", href: "#process" },
    { name: "Impact", href: "#impact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a]/90 backdrop-blur-md text-white border-b border-white/10 transition-all duration-300 font-sans">
      {/* Container max-width increased and padding tightened to reduce crowding */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setIsOpen(false)}>
            <img src={logo} alt="Logo" className="w-14 h-14 object-contain" />
            <div className="hidden sm:block">
              <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
                Our <span className="text-orange-600">Flame</span>
              </h2>
              <span className="text-[10px] font-light tracking-[0.25em] uppercase text-gray-400">Foundation</span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION - Balanced spacing */}
          <div className="hidden xl:flex items-center gap-4">
            <div className="flex items-center gap-5">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 hover:text-white transition-colors py-2"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="h-4 w-px bg-white/10 mx-2" />

            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button 
                onClick={() => setIsDark(!isDark)}
                className="p-2 hover:text-orange-600 transition-all"
                title="Toggle Theme"
              >
                {isDark ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-gray-400" />}
              </button>

              {/* Auth State */}
              {user ? (
                <div className="flex items-center gap-3">
                  <Link to="/profile" className="flex items-center gap-2 group">
                    <div className="w-7 h-7 bg-orange-600/20 flex items-center justify-center border border-orange-600/40">
                      <User className="w-3.5 h-3.5 text-orange-600" />
                    </div>
                  </Link>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-[9px] font-black uppercase tracking-widest text-white hover:text-orange-600 transition-colors flex items-center gap-1.5 border border-white/10 px-3 py-1.5 bg-white/5">
                  Sign In
                </Link>
              )}

              <a 
                href="#footer" 
                className="bg-orange-600 px-5 py-2 font-black text-[9px] uppercase tracking-[0.2em] text-white hover:bg-orange-500 transition-all active:scale-95"
              >
                Contact
              </a>
            </div>
          </div>

          {/* MOBILE TOGGLES */}
          <div className="flex items-center gap-3 xl:hidden">
            <button onClick={() => setIsDark(!isDark)} className="p-2 text-white bg-white/5 border border-white/10">
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-400" />}
            </button>
            <button className="p-2 text-white bg-white/5 border border-white/10" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`xl:hidden fixed inset-0 top-20 z-[99] bg-[#0a0a0a] transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full p-8 space-y-6 overflow-y-auto">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-3xl font-black uppercase italic tracking-tighter text-white border-b border-white/5 pb-4" onClick={() => setIsOpen(false)}>
              {link.name}
            </a>
          ))}
          <div className="pt-6 space-y-4">
            {user ? (
              <Link to="/profile" className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 text-white font-black uppercase border border-white/10" onClick={() => setIsOpen(false)}>
                Profile
              </Link>
            ) : (
              <Link to="/login" className="flex items-center justify-center w-full py-4 bg-white/5 text-white font-black uppercase border border-white/10" onClick={() => setIsOpen(false)}>
                Sign In
              </Link>
            )}
            <a href="#footer" onClick={() => setIsOpen(false)} className="bg-orange-600 block w-full py-5 text-white font-black text-center uppercase tracking-[0.2em]">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
