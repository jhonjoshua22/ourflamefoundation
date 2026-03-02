import { Menu, X, User, LogOut, Sun, Moon, Trophy } from "lucide-react"; // Added Trophy icon
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Added useLocation
import { supabase } from "../lib/supabaseClient";
import logo from "../assets/ourflamelogo.png"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to check what page we are on
  
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved === "dark";
    }
    return false; 
  });

  // ... (Theme and Auth Sync effects remain the same)

  // Updated Links: Use /#id instead of just #id
  const navLinks = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Flame Game", href: "/#flame-game" },
    { name: "Scoretable", href: "/scoretable", isPage: true },
    { name: "Services", href: "#services" },
    { name: "Presence", href: "/#presence" },
    { name: "News", href: "/#news" },
    { name: "Process", href: "/#process" },
    { name: "Impact", href: "/#impact" },
  ];

  // Helper to determine if we should use <Link> or <a>
  const NavItem = ({ link, className }: { link: any, className: string }) => {
    // If it's a separate page (like /scoretable), use Link
    if (link.isPage) {
      return (
        <Link to={link.href} className={className} onClick={() => setIsOpen(false)}>
          {link.name}
        </Link>
      );
    }
    
    // If we are ALREADY on the home page, standard <a> is fine for smooth scroll
    // If we are NOT on home page, we use <Link> to go home first
    if (location.pathname !== "/") {
      return (
        <Link to={link.href} className={className} onClick={() => setIsOpen(false)}>
          {link.name}
        </Link>
      );
    }

    return (
      <a href={link.href} className={className} onClick={() => setIsOpen(false)}>
        {link.name}
      </a>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a] text-white border-b border-white/10 font-sans">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setIsOpen(false)}>
            <img src={logo} alt="Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            <div className="flex flex-col text-left">
              <h2 className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
                Our <span className="text-orange-600">Flame</span>
              </h2>
              <span className="text-[8px] md:text-[10px] font-light tracking-[0.2em] uppercase text-gray-400">Foundation</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
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
              <button onClick={() => setIsDark(!isDark)} className="p-2 hover:bg-white/5 transition-all">
                {isDark ? <Sun size={16} className="text-yellow-500" /> : <Moon size={16} className="text-gray-400" />}
              </button>

              {user ? (
                <div className="flex items-center gap-3">
                  <Link to="/profile" className="text-gray-400 hover:text-white transition-colors">
                    <User size={18} />
                  </Link>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-[10px] font-black uppercase tracking-widest px-3 py-2 border border-white/10 hover:bg-white/5 transition-all">
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={() => setIsDark(!isDark)} className="p-2 text-white bg-white/5 border border-white/10">
              {isDark ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-gray-400" />}
            </button>
            <button className="p-2 text-white bg-white/5 border border-white/10" onClick={() => setIsOpen(!isOpen)}>
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
          
          <div className="pt-6 space-y-4">
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
