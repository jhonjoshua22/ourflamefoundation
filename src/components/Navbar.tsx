import { Menu, X, User, LogOut, Sun, Moon, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import logo from "../assets/ourflamelogo.png"; 
import clickSound from "../assets/button.m4a"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
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
    navigate("/login");
  };

  // Structured Nav Data
  const navigation = [
    { 
      name: "Flame Game", 
      href: "/#flame-game",
      dropdown: [
        { name: "Ranks", href: "/#tiers" },
        { name: "Our Games", href: "/#gallery" },
        { name: "Play", href: "/#flame-game" },
      ]
    },
    { 
      name: "About", 
      href: "/#home",
      dropdown: [
        { name: "Growth", href: "/#presence" },
        { name: "Products", href: "/#products" },
        { name: "Resources", href: "/#resources" },
        { name: "Events", href: "/#news" },
        { name: "New", href: "/#services" },
        { name: "Support", href: "/#people" },
      ]
    },
    { name: "Reviews", href: "/#impact" },
    { name: "Rewards", href: "/scoretable", isPage: true },
    { name: "Contacts", href: "/#contacts" },
  ];

  const NavItem = ({ item, isMobile = false }: { item: any, isMobile?: boolean }) => {
    const hasDropdown = !!item.dropdown;
    const isHome = location.pathname === "/";

    const linkContent = (
      <span className="flex items-center gap-1 uppercase tracking-widest font-black italic">
        {item.name}
        {hasDropdown && <ChevronDown size={12} className={`transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />}
      </span>
    );

    const handleClick = () => {
      if (isMobile && hasDropdown) {
        setActiveDropdown(activeDropdown === item.name ? null : item.name);
      } else {
        playClickSound();
        setIsOpen(false);
      }
    };

    return (
      <div 
        className={`relative group ${isMobile ? 'w-full' : ''}`}
        onMouseEnter={() => !isMobile && setActiveDropdown(item.name)}
        onMouseLeave={() => !isMobile && setActiveDropdown(null)}
      >
        {item.isPage || !isHome ? (
          <Link 
            to={item.href} 
            className={`${isMobile ? 'text-2xl py-4 border-b border-white/5 w-full block' : 'text-[10px] text-gray-400 hover:text-white px-3 py-2 transition-colors'}`}
            onClick={handleClick}
          >
            {linkContent}
          </Link>
        ) : (
          <a 
            href={item.href} 
            className={`${isMobile ? 'text-2xl py-4 border-b border-white/5 w-full block' : 'text-[10px] text-gray-400 hover:text-white px-3 py-2 transition-colors'}`}
            onClick={handleClick}
          >
            {linkContent}
          </a>
        )}

        {/* Dropdown Menu */}
        {hasDropdown && (activeDropdown === item.name) && (
          <div className={`${isMobile 
            ? 'flex flex-col pl-6 bg-white/5 border-l-2 border-orange-600 space-y-2 py-4' 
            : 'absolute top-full left-0 w-48 bg-zinc-900 border border-white/10 shadow-2xl py-2 z-[110]'}`}>
            {item.dropdown.map((sub: any) => (
              <a 
                key={sub.name}
                href={sub.href}
                onClick={() => { playClickSound(); setIsOpen(false); }}
                className={`${isMobile 
                  ? 'text-lg text-gray-400 py-2 italic font-bold uppercase' 
                  : 'block px-4 py-3 text-[10px] text-gray-400 hover:text-orange-600 hover:bg-white/5 font-black uppercase tracking-widest'}`}
              >
                {sub.name}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0a0a] text-white border-b border-white/10">
      <div className="w-full px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => { playClickSound(); setIsOpen(false); }}>
            <img src={logo} alt="Logo" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            <div className="flex flex-col text-left">
              <h2 className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase italic leading-none">
                Our <span className="text-orange-600">Flame</span>
              </h2>
              <span className="text-[8px] md:text-[10px] font-light tracking-[0.2em] uppercase text-gray-400">Foundation</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center">
              {navigation.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </div>

            <div className="h-6 w-px bg-white/10 mx-2" />

            <div className="flex items-center gap-4">
              <button onClick={() => { playClickSound(); setIsDark(!isDark); }} className="p-2 hover:bg-white/5 transition-all outline-none">
                {isDark ? <Sun size={16} className="text-yellow-500" /> : <Moon size={16} className="text-gray-400" />}
              </button>

              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/profile" onClick={playClickSound} className="text-gray-400 hover:text-white transition-colors">
                    <User size={18} />
                  </Link>
                  <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <Link to="/login" onClick={playClickSound} className="text-[10px] font-black uppercase tracking-widest px-4 py-2 bg-orange-600 text-white hover:bg-orange-500 transition-all shadow-lg shadow-orange-600/20">
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-3">
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
      <div className={`lg:hidden fixed inset-x-0 top-20 bottom-0 bg-[#0a0a0a] z-[99] transform transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full overflow-y-auto bg-[#0a0a0a] p-8 space-y-2">
          {navigation.map((item) => (
            <NavItem key={item.name} item={item} isMobile={true} />
          ))}
          
          <div className="pt-8">
            {user ? (
              <button onClick={handleLogout} className="text-2xl font-black uppercase italic tracking-tighter text-red-500 py-4 block">Logout</button>
            ) : (
              <Link to="/login" onClick={() => { playClickSound(); setIsOpen(false); }} className="text-3xl font-black uppercase italic tracking-tighter text-orange-600">Sign In</Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
