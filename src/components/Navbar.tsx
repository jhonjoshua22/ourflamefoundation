import { Menu, X, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
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
    /* Changed bg-background/90 to bg-[#0a0a0a] (Dark) and text to white */
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] text-white border-b border-white/10 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src={logo} 
                alt="Our Flame Foundation Logo" 
                className="w-10 h-10 object-contain animate-flicker" 
              />
              <div className="absolute inset-0 blur-lg bg-flame-orange/30 -z-10" />
            </div>
            {/* Kept flame-text gradient but ensured it's visible on dark */}
            <span className="font-display font-bold text-xl flame-text">
              Our Flame Foundation
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/profile" 
                  className="flex items-center gap-2 text-white hover:text-flame-orange transition-colors font-medium"
                >
                  {user.user_metadata?.avatar_url ? (
                    <img src={user.user_metadata.avatar_url} className="w-8 h-8 rounded-full border border-flame-orange" alt="profile" />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                  <span>{user.user_metadata?.full_name?.split(' ')[0] || 'Profile'}</span>
                </Link>
                <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-white hover:text-flame-orange transition-colors font-medium flex items-center gap-2">
                <User className="w-4 h-4" />
                Sign In
              </Link>
            )}

            <a href="#contact" className="flame-gradient px-6 py-2.5 rounded-full font-semibold text-white hover:opacity-90 transition-opacity">
              Get Involved
            </a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        /* Changed bg-background to bg-[#0a0a0a] for mobile menu consistency */
        <div className="md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-[#0a0a0a] animate-fade-in border-t border-white/5">
          <div className="flex flex-col gap-6 px-6 py-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-lg text-gray-300" onClick={() => setIsOpen(false)}>
                {link.name}
              </a>
            ))}
            <hr className="border-white/10" />
            
            {user ? (
              <>
                <Link to="/profile" className="text-lg font-medium text-white flex items-center gap-3" onClick={() => setIsOpen(false)}>
                  <User className="w-6 h-6 text-flame-orange" />
                  My Profile ({user.user_metadata?.full_name})
                </Link>
                <button onClick={handleLogout} className="text-lg font-medium text-left flex items-center gap-3 text-red-500">
                  <LogOut className="w-6 h-6" />
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" className="text-lg font-medium text-white flex items-center gap-2" onClick={() => setIsOpen(false)}>
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
