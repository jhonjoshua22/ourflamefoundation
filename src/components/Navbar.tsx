import { Menu, X, User, LogOut, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import logo from "../assets/ourflamelogo.png"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
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

  // Nav links updated to point to the correct sections
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#about" },
    { name: "Our Impact", href: "#impact" },
    { name: "Get In Touch", href: "#contact" }, // Pointing to Footer ID
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a] text-white border-b border-white/10 transition-all duration-300 font-sans">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-4 shrink-0" onClick={() => setIsOpen(false)}>
            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
            <span className="font-black text-lg tracking-tighter uppercase italic hidden sm:block">
              Our <span className="text-orange-600 not-italic">Flame</span> Foundation
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-orange-600 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Theme Toggle - Square */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 bg-zinc-900 border border-zinc-800 text-white transition-all hover:border-orange-600"
            >
              {isDark ? <Sun size={14} className="text-yellow-500" /> : <Moon size={14} className="text-zinc-500" />}
            </button>

            <div className="h-4 w-px bg-zinc-800" />

            {/* Auth State */}
            {user ? (
              <div className="flex items-center gap-6">
                <Link to="/profile" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                    <User size={14} className="text-orange-600" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest group-hover:text-orange-600 transition-colors">
                    Profile
                  </span>
                </Link>
                <button onClick={handleLogout} className="text-zinc-500 hover:text-red-500 transition-colors">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-[10px] font-black uppercase tracking-widest text-white hover:text-orange-600 transition-colors flex items-center gap-2">
                <User size={14} /> Sign In
              </Link>
            )}

            {/* Primary Action - Square Edge */}
            <a href="#contact" className="bg-orange-600 px-6 py-3 font-black text-[10px] uppercase tracking-[0.2em] text-white hover:bg-orange-500 transition-all">
              Join the Flame
            </a>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex md:hidden items-center gap-4">
            <button onClick={() => setIsDark(!isDark)} className="p-2 bg-zinc-900 border border-zinc-800">
              {isDark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} />}
            </button>
            <button className="p-2 bg-zinc-900 border border-zinc-800" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`
        md:hidden fixed inset-x-0 bottom-0 top-20 z-[99] 
        bg-[#0a0a0a] border-t border-zinc-900
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        <div className="flex flex-col p-8 space-y-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-2xl font-black uppercase italic tracking-tighter text-white hover:text-orange-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          
          <div className="pt-8 space-y-4 border-t border-zinc-900">
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="block w-full py-5 bg-orange-600 text-white font-black text-center text-sm uppercase tracking-[0.2em]"
            >
              Join the Flame
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
