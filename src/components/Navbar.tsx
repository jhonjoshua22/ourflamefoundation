import { Flame, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom"; // 1. Import Link

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" }, // Changed to / for routing
    { name: "About Us", href: "#about" },
    { name: "Our Impact", href: "#impact" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Use Link to return home without refresh */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Flame className="w-10 h-10 text-flame-orange animate-flicker" />
              <div className="absolute inset-0 blur-lg bg-flame-orange/30 -z-10" />
            </div>
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
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 font-medium"
              >
                {link.name}
              </a>
            ))}
            
            {/* 2. SIGN IN BUTTON (Desktop) - Changed <a> to <Link> */}
            <Link 
              to="/login" 
              className="text-foreground hover:text-flame-orange transition-colors font-medium flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>

            <a
              href="#contact"
              className="flame-gradient px-6 py-2.5 rounded-full font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Get Involved
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden fixed top-20 left-0 w-full h-[calc(100vh-5rem)] bg-background animate-fade-in">
          <div className="flex flex-col gap-6 px-6 py-10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <hr className="border-border" />
            
            {/* 3. SIGN IN BUTTON (Mobile) - Changed <a> to <Link> */}
            <Link
              to="/login"
              className="text-lg font-medium flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-5 h-5 text-flame-orange" />
              Sign In / Register
            </Link>

            <a
              href="#contact"
              className="flame-gradient px-6 py-3 rounded-full font-semibold text-primary-foreground text-center mt-4"
              onClick={() => setIsOpen(false)}
            >
              Get Involved
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

