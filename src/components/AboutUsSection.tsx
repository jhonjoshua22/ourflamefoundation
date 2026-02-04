import { useState } from "react";
import { ShieldCheck, Zap, Rocket, Heart, Globe, ExternalLink, Coins, Copy, Check, Users, Sparkles, ShieldAlert } from "lucide-react";

const AboutUsSection = () => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, url: string, name: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(url);
    setCopiedIndex(name);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const promises = [
    {
      icon: <Heart className="w-6 h-6 text-flame-orange" />,
      text: "We are a multifaith, inclusive, and neurodiverse community of 100+ engineers and creators building in public to preserve the universe.",
    },
    {
      icon: <Zap className="w-6 h-6 text-flame-orange" />,
      text: "Hyper-growth: We aim to 10x every 2 months by merging AI, Blockchain, Games, and Hardware into trustless, engaging solutions.",
    },
    {
      icon: <Rocket className="w-6 h-6 text-flame-orange" />,
      text: "Our 'Incubator of Incubators' model currently hosts 50+ products, funded through our own ethical crowdfunding platform.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-flame-orange" />,
      text: "Strictly ethical: We only partner with pro-investors with proven track records and rigorous KYC to ensure total protection.",
    },
    {
      icon: <Globe className="w-6 h-6 text-flame-orange" />,
      text: "Legacy focused: My AI personally greets every new member, ensuring our community remains human-centric as we scale.",
    },
  ];

  const cleanSeries = [
    { name: "Clean Software", url: "https://cleansoftware.vercel.app/" },
    { name: "Clean Education", url: "https://cleaneducation.vercel.app/" },
    { name: "Clean Pharma", url: "https://cleanpharma.vercel.app/" },
    { name: "Clean Hackney", url: "https://cleanhackney.vercel.app/" },
    { name: "Clean Law", url: "https://cleanlaw.vercel.app/" },
  ];

  const partners = [
    { name: "2026 I Dream For", url: "https://2026idreamfor.vercel.app/" },
    { name: "Magic Money", url: "http://34.14.136.156:8080/login"},
    { name: "Flame Tablets", url: "https://flametablets.vercel.app/" },
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-flame-orange/5 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Promises & Mission */}
          <div>
            <span className="inline-block text-flame-orange font-semibold uppercase tracking-wider text-sm mb-4">
              Vision and Infrastructure
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight text-flame-orange">
              Our Flame Promises
            </h2>
            
            <div className="space-y-6 mb-12">
              {promises.map((promise, index) => (
                <div key={index} className="flex gap-4 p-5 rounded-2xl bg-card border border-border/50 hover:border-flame-orange/30 transition-all duration-300 group shadow-sm">
                  <div className="mt-1 group-hover:scale-110 transition-transform">
                    {promise.icon}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {promise.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 shadow-inner">
              <h4 className="text-xl font-bold mb-4 uppercase tracking-tight text-flame-orange">
                The Flame Foundation (CIC)
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed italic mb-4">
                This is my final project before retirement—a legacy for the world.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed space-y-4">
                We are <strong>Incubating the Incubators</strong>. With a stretch goal of <strong>1 million members by 2027</strong>, we will surpass the scale of YC and 10,000 global incubators combined. 
                <br /><br />
                Our model is built on accessibility: Flame Members pay what they can (from $1 pp/pm per solution), with concessions available to ensure no one is left behind.
              </p>
            </div>
          </div>

          {/* Right Column: Links & Magic World Masterbot */}
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="p-8 rounded-3xl border bg-card/50 backdrop-blur-sm shadow-xl">
              <h3 className="text-2xl font-bold mb-2 text-flame-orange">The Clean Series</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                50+ solutions developed by our global engineering collective to solve real-world challenges.
              </p>
              
              <div className="grid gap-3">
                {cleanSeries.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border bg-background border-border hover:border-flame-orange hover:text-flame-orange transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span>{link.name}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

            {/* Magic World Masterbot Section */}
            <div className="p-8 rounded-3xl border border-flame-orange/20 bg-gradient-to-br from-card to-flame-orange/5 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-6 h-6 text-flame-orange" />
                <h3 className="text-2xl font-bold text-flame-orange font-display">
                  Flame Magic Worlds
                </h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Modern families are overworked. To reduce stress, our <strong>Magic World Masterbot</strong> acts as a dedicated educational and life advisor.
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-flame-orange shrink-0 mt-1" /> Money management & job finding</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-flame-orange shrink-0 mt-1" /> Legal preparation & stress coping</li>
                <li className="flex gap-2 items-start"><Check className="w-4 h-4 text-flame-orange shrink-0 mt-1" /> Healthy, sustainable relationship building</li>
              </ul>
              <div className="mt-6 p-4 rounded-xl bg-flame-orange/10 text-xs italic text-flame-orange border border-flame-orange/20">
                Helping make this universe—and any others we discover—better places for all sentient beings.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
