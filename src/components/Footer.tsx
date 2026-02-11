import { Flame, Facebook, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/MagikWorlds/", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/MagicWorlds3", label: "Twitter" },
    { icon: Youtube, href: "https://www.youtube.com/@MagicworldsTV", label: "Youtube" },
  ];

  return (
    <footer className="bg-flame-dark border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Flame className="w-8 h-8 text-flame-orange" />
            <span className="font-display font-bold text-xl flame-text">
              Our Flame Foundation
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="p-2 rounded-full bg-muted hover:bg-primary/20 text-muted-foreground hover:text-flame-orange transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right text-muted-foreground text-sm">
            <p>mflynn1999@gmail.com</p>
            <p>+44 7762 293742</p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            🄯 {currentYear} Our Flame Foundation. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            Improving families lives via expert support & modern tools, funded by pro investors.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
