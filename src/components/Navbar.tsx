import { Menu, X, User, LogOut, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import logo from "../assets/ourflamelogo.png"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  
  // Initialize theme from localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Sync Theme with HTML class and LocalStorage
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

  // Auth State Listener
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
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-background/90 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <img 
                src={logo} 
                alt="Our Flame Logo" 
                className="w-10 h-10 object-contain animate-flicker" 
              />
              <div className="absolute inset-0 blur-lg bg-flame-orange/30 -z-10" />
            </div>
            <span className="font-display font-bold text-xl flame-text hidden sm:block">
              Our Flame Foundation
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-8 mr-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-medium text-muted-foreground hover:text-flame-orange transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-xl bg-muted hover:bg-accent transition-all duration-300 border border-border group"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-yellow-500 group-hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 group-hover:-rotate-12 transition-transform" />
              )}
            </button>

            <div className="h-6 w-px bg-border mx-2" />

            {/* Auth Actions */}
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-full bg-flame-orange/10 flex items-center justify-center border border-flame-orange/20 overflow-hidden">
                    {user.user_metadata?.avatar_url ? (
                      <img src={user.user_metadata.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-4 h-4 text-flame-orange" />
                    )}
                  </div>
                  <span className="text-sm font-medium hidden lg:block">
                    {user.user_metadata?.full_name?.split(' ')[0] || 'Profile'}
                  </span>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-muted-foreground hover:text-destructive transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-sm font-semibold hover:text-flame-orange transition-colors flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}

            <a 
              href="#contact" 
              className="flame-gradient px-6 py-2.5 rounded-full font-bold text-white shadow-lg shadow-flame-orange/20 hover:scale-105 active:scale-95 transition-all"
            >
              Get Involved
            </a>
          </div>

          {/* Mobile Menu Actions */}
          <div className="flex items-center gap-3 md:hidden">
             <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-muted border border-border"
            >
              {isDark ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-slate-700" />}
            </button>
            <button 
              className="p-2 text-foreground" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`
        md:hidden fixed inset-0 top-20 bg-background/95 backdrop-blur-xl transition-all duration-300 z-40
        ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}
      `}>
        <div className="flex flex-col gap-6 p-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-2xl font-bold hover:text-flame-orange transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <hr className="border-border" />
          
          {user ? (
            <div className="space-y-6">
              <Link 
                to="/profile" 
                className="flex items-center gap-4 text-xl font-medium" 
                onClick={() => setIsOpen(false)}
              >
                <div className="w-10 h-10 rounded-full bg-flame-orange/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-flame-orange" />
                </div>
                My Profile
              </Link>
              <button 
                onClick={handleLogout} 
                className="w-full py-4 rounded-2xl bg-destructive/10 text-destructive font-bold text-lg flex items-center justify-center gap-3"
              >
                <LogOut className="w-6 h-6" />
                Sign Out
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="w-full py-4 rounded-2xl bg-muted text-foreground font-bold text-lg flex items-center justify-center gap-3"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-6 h-6 text-flame-orange" />
              Sign In / Register
            </Link>
          )}
          
          <a 
            href="#contact" 
            onClick={() => setIsOpen(false)}
            className="flame-gradient w-full py-4 rounded-2xl text-white font-bold text-center text-lg shadow-xl shadow-flame-orange/20"
          >
            Get Involved
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
