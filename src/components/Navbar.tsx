import { Flame, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Our Impact", href: "#impact" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group z-[60]">
            <div className="relative">
              <Flame className="w-10 h-10 text-flame-orange animate-flicker" />
              <div className="absolute inset-0 blur-lg bg-flame-orange/30 -z-10" />
            </div>
            <span className="font-display font-bold text-2xl flame-text">
              Flames Charity
            </span>
          </a>

          {/* Desktop Navigation */}
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
            <a
              href="#contact"
              className="flame-gradient px-6 py-2.5 rounded-full font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Get Involved
            </a>
          </div>

          {/* Mobile Menu Button - Increased Z-index to stay on top */}
          <button
            className="md:hidden text-foreground z-[60] p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Full-Screen Mobile Navigation Overlay */}
        <div
          className={`fixed inset-0 bg-background z-[50] flex flex-col items-center justify-center transition-all duration-300 ease-in-out md:hidden ${
            isOpen 
              ? "opacity-100 pointer-events-auto translate-y-0" 
              : "opacity-0 pointer-events-none -translate-y-4"
          }`}
        >
          <div className="flex flex-col items-center gap-8 w-full px-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-3xl font-display font-bold text-foreground hover:text-flame-orange transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="flame-gradient w-full max-w-xs py-4 rounded-full font-bold text-xl text-primary-foreground text-center mt-4 shadow-lg"
              onClick={() => setIsOpen(false)}
            >
              Get Involved
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
