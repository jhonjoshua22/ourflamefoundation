import { 
  Facebook, Twitter, Youtube, Github, Linkedin, 
  Globe, MessageSquare, Shield, ScrollText, Mail, Phone 
} from "lucide-react";
import logo from "../assets/ourflamelogo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/MagikWorlds/", label: "Facebook" },
    { icon: Twitter, href: "https://x.com/MagicWorlds3", label: "Twitter" },
    { icon: Youtube, href: "https://www.youtube.com/@MagicworldsTV", label: "Youtube" },
    { icon: MessageSquare, href: "https://discord.com/invite/NcNSaTVNdn", label: "Discord" },
    { icon: Github, href: "https://github.com/TheMagicWorlds", label: "Github" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/magic-worlds", label: "Linkedin" },
  ];

  const resources = [
    { name: "Magic Worlds", href: "https://www.themagicworlds.com/", icon: Globe },
    { name: "Customer Service", href: "https://www.facebook.com/MagikWorlds", icon: Facebook },
    { name: "News", href: "https://x.com/magicworlds3", icon: Twitter },
    { name: "TV", href: "https://www.youtube.com/@magicworldstv", icon: Youtube },
    { name: "Teams", href: "https://www.linkedin.com/company/magic-worlds", icon: Linkedin },
    { name: "Code", href: "https://github.com/TheMagicWorlds", icon: Github },
  ];

  return (
    <footer className="bg-flame-dark border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand & About Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
              {/* Force white text as requested */}
              <span className="font-display font-bold text-2xl text-white">
                Our Flame Foundation
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Our Flame Foundation is a global incubator dedicated to reducing 
              operational complexity for families. By fusing AI, blockchain, and 
              expert human support, we empower communities to reclaim their time, 
              minimize costs, and focus on building a sustainable legacy for future generations.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-card border border-border hover:border-flame-orange hover:text-flame-orange transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links / Resources */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-tighter text-sm">Resources</h4>
              {resources.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  target="_blank"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-flame-orange transition-colors"
                >
                  <link.icon className="w-3 h-3" />
                  {link.name}
                </a>
              ))}
            </div>
            <div className="space-y-4">
              <h4 className="text-white font-bold uppercase tracking-tighter text-sm">Legal</h4>
              <a href="https://ourflamefoundation.vercel.app/terms" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-flame-orange transition-colors">
                <ScrollText className="w-3 h-3" /> Terms of Service
              </a>
              <a href="https://ourflamefoundation.vercel.app/privacy" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-flame-orange transition-colors">
                <Shield className="w-3 h-3" /> Privacy Policy
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4 md:text-right">
            <h4 className="text-white font-bold uppercase tracking-tighter text-sm">Get in Touch</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="mailto:mflynn1999@gmail.com" className="flex items-center md:justify-end gap-2 hover:text-flame-orange">
                mflynn1999@gmail.com <Mail className="w-4 h-4" />
              </a>
              <a href="tel:+447762293742" className="flex items-center md:justify-end gap-2 hover:text-flame-orange">
                +44 7762 293742 <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-muted-foreground text-xs">
              🄯 {currentYear} <span className="text-white font-medium">Our Flame Foundation</span>. All rights reserved.
            </p>
            <p className="text-muted-foreground text-[10px] uppercase tracking-widest italic">
              Improving lives via expert support & modern tools
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
