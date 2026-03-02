import { Menu, X, User, LogOut, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import logo from "../assets/ourflamelogo.png"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved === "dark";
    }
    return false; 
  });

  // Theme Sync
  useEffect(() => {
    const root = window.document.documentElement;
    isDark ? root.classList.add("dark") : root.classList.remove("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  // Auth Sync
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => setUser(session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  // --- SECTION OBSERVER LOGIC ---
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveSection("");
      return;
    }

    const options = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    const sections = ["home", "about", "flame-game", "services", "presence", "news", "process", "impact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsOpen(false);
    navigate("/");
  };

  const navLinks = [
    { name: "Home", href: "/", id: "home" },
    { name: "About", href: "/", id: "about" },
    { name: "Flame Game", href: "/", id: "flame-game" },
    { name: "Scoretable & Rewards", href: "/scoretable", isPage: true },
    { name: "Services", href: "/", id: "services" },
    { name: "Presence", href: "/", id: "presence" },
    { name: "News", href: "/", id: "news" },
    { name: "Process", href: "/", id: "process" },
    { name: "Impact", href: "/", id: "impact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a] text-white border-b border-white/10 font-sans">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setIsOpen(false)}>
            <img src={logo} alt="Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
                Our <span className="text-orange-600">Flame</span>
              </h2>
              <span className="text-[8px] md:text-[10px] font-light tracking-[0.2em] uppercase text-gray-400">Foundation</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-3 xl:gap-5">
            {navLinks.map((link) => {
              const isActive = link.isPage 
                ? location.pathname === link.href 
                : activeSection === link.id;

              return (
                <Link 
                  key={link.name} 
                  to={link.isPage ? link.href : `/#${link.id}`}
                  className={`text-[9px] xl:text-[10px] font-black uppercase tracking-widest transition-colors ${
                    isActive ? "text-orange-600" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setIsDark(!isDark)} className="p-2 hover:bg-white/5 transition-all">
              {isDark ? <Sun size={16} className="text-yellow-500" /> : <Moon size={16} className="text-gray-400" />}
            </button>
            {user ? (
              <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors"><LogOut size={18} /></button>
            ) : (
              <Link to="/login" className="text-[10px] font-black uppercase tracking-widest px-3 py-2 border border-white/10 hover:bg-white/5 transition-all">Sign In</Link>
            )}
            <a href="#footer" className="bg-orange-600 px-4 py-2 font-black text-[10px] uppercase tracking-widest text-white hover:bg-orange-500 transition-all">Contact</a>
            
            <button className="lg:hidden p-2 text-white bg-white/5 border border-white/10" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`lg:hidden fixed inset-x-0 top-20 bottom-0 bg-[#0a0a0a] z-[99] transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full overflow-y-auto p-6 space-y-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.isPage ? link.href : `/#${link.id}`} 
              className={`text-xl font-black uppercase italic tracking-tighter border-b border-white/5 py-4 ${
                (link.isPage ? location.pathname === link.href : activeSection === link.id) ? "text-orange-600" : "text-white"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
