import { Menu, X, User, LogOut } from "lucide-react"; // Removed 'Flame'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

// 1. Import your custom logo from the assets folder
import logo from "../assets/ourflamelogo.png"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

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
    navigate("/");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#about" },
    { name: "Our Impact", href: "#impact" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* 2. Replaced <Flame /> with your <img> tag */}
              <img 
                src={logo} 
                alt="Our Flame Foundation Logo" 
                className="w-10 h-10 object-contain animate-flicker" 
              />
              <div className="absolute inset-0 blur-lg bg-flame-orange/30 -z-10" />
            </div>
            <span className="font-display font-bold text-xl flame-text">
              Our Flame Foundation
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                {link.name}
              </a>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 text-foreground hover:text-flame-orange transition-colors font-medium"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} className="w-8 h-8 rounded-full border border-flame-orange" alt="profile" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                  <span>{user.user_metadata?.full_name?.split(' ')[0] || 'Profile'}</span>
                </Link>
                <button onClick={handleLogout} className="text-muted-foreground hover:text-red-500 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-foreground hover:text-flame-orange transition-colors font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}

            <a href="#contact" className="flame-gradient px-6 py-2.5 rounded-full font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
              Get Involved
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-background animate-fade-in">
          <div className="flex flex-col gap-6 px-6 py-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-lg text-muted-foreground" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
            <hr className="border-border" />
            
            {user ? (
              <>
                <Link to="/profile" className="text-lg font-medium flex items-center gap-3" onClick={() => setIsOpen(false)}>
                  <User className="w-6 h-6 text-flame-orange" />
                  My Profile ({user.user_metadata?.full_name})
                </Link>
                <button onClick={handleLogout} className="text-lg font-medium text-left flex items-center gap-3 text-red-500">
                  <LogOut className="w-6 h-6" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="text-lg font-medium flex items-center gap-2" onClick={() => setIsOpen(false)}>
                <User className="w-5 h-5 text-flame-orange" />
                Sign In / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

