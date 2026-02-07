import { Flame, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Our Impact", href: "#impact" },
    { name: "Contact", href: "#contact" },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground z-50"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md md:hidden animate-fade-in">

          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-foreground"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-8 h-8" />
          </button>

          {/* Menu Items */}
          <div className="flex flex-col items-center justify-center h-full gap-8 text-2xl">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}

            <a
              href="#contact"
              className="flame-gradient px-10 py-3 rounded-full font-semibold text-primary-foreground mt-6"
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
