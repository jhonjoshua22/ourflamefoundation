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
    { name: "Home", href: "/" },
    { name: "About Us", href: "#about" },
    { name: "Our Impact", href: "#impact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a] text-white border-b border-white/10 transition-all duration-300 font-sans">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand - Sharp/Italic Style */}
          <Link to="/" className="flex items-center gap-3 shrink-0" onClick={() => setIsOpen(false)}>
            <div className="relative">
              <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
              <div className="absolute inset-0 blur-lg bg-flame-orange/30 -z-10" />
            </div>
            <h2 className="text-4xl font-black tracking-tighter text-white uppercase italic leading-none">
              Our <span className="text-orange-600">Flame</span> <br /> 
              <span className="text-2xl not-italic font-light tracking-[0.2em]">Foundation</span>
            </h2>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-8 mr-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Theme Toggle - Square */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all rounded-none"
            >
              {isDark ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-gray-400" />}
            </button>

            <div className="h-6 w-px bg-white/10 mx-2" />

            {/* Auth State - Sign In Button Restored */}
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-none bg-orange-600/20 flex items-center justify-center border border-orange-600/40">
                    <User className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-orange-600 transition-colors">
                    Profile
                  </span>
                </Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-white hover:text-orange-600 transition-colors flex items-center gap-2">
                <User className="w-4 h-4" /> Sign In
              </Link>
            )}

            {/* UPDATED: DIRECTS TO #FOOTER */}
            <a 
              href="#footer" 
              className="bg-orange-600 px-6 py-2.5 rounded-none font-black text-[10px] uppercase tracking-[0.2em] text-white hover:bg-orange-500 transition-all active:scale-95"
            >
              Get In Touch
            </a>
          </div>

          {/* MOBILE TOGGLES */}
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setIsDark(!isDark)} className="p-2 text-white bg-white/5 rounded-none border border-white/10">
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-gray-400" />}
            </button>
            <button className="p-2 text-white bg-white/5 rounded-none border border-white/10" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`md:hidden fixed inset-x-0 bottom-0 top-20 z-[99] bg-[#0a0a0a] border-t border-white/10 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full p-8 space-y-8">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-2xl font-black uppercase italic tracking-tighter text-white hover:text-orange-600 transition-colors border-b border-white/5 pb-2" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-auto space-y-4 pb-12">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center justify-center gap-3 w-full py-4 rounded-none bg-white/5 text-white font-black uppercase border border-white/10" onClick={() => setIsOpen(false)}>
                  <User className="w-5 h-5 text-orange-600" /> Profile
                </Link>
                <button onClick={handleLogout} className="w-full py-4 rounded-none bg-red-500/10 text-red-500 font-black uppercase border border-red-500/20">
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center justify-center gap-3 w-full py-4 rounded-none bg-white/5 text-white font-black uppercase border border-white/10" onClick={() => setIsOpen(false)}>
                Sign In / Register
              </Link>
            )}
            
            {/* MOBILE UPDATED TO #FOOTER */}
            <a href="#footer" onClick={() => setIsOpen(false)} className="bg-orange-600 block w-full py-5 rounded-none text-white font-black text-center text-sm uppercase tracking-[0.2em]">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
