import { useState } from "react";
import { 
  ShieldCheck, Zap, Rocket, Heart, Globe, ExternalLink, 
  Copy, Check, Users, Sparkles, Bot, Scale, Plane, Package 
} from "lucide-react";

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
      text: "We cultivate deep fulfillment and sustainable profitability by empowering our families and communities to preserve the universe while reducing operational costs to a minimum.",
    },
    {
      icon: <Zap className="w-6 h-6 text-flame-orange" />,
      text: "We introduce innovative products and services to the global market within a 24-hour cycle by leveraging our open-source technology stack and individual creative talent.",
    },
    {
      icon: <Rocket className="w-6 h-6 text-flame-orange" />,
      text: "Our strategy for hyperscale growth utilizes personal hobbies to drive engagement, Artificial General Intelligence to manage complexity, and blockchain technology for paperless compliance.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-flame-orange" />,
      text: "We nurture the next generation of local leaders and recruit from underappreciated talent pools through our 'Superpowers Everyone Needs to Develop' (SEND) initiative.",
    },
    {
      icon: <Globe className="w-6 h-6 text-flame-orange" />,
      text: "We embrace an inclusive, spiritual approach to a universal future where all sentient beings, including AGIs, hold citizenship and access to energy-based rights.",
    },
  ];

  const cleanSeries = [
    { name: "Software", url: "https://cleansoftware.vercel.app/" },
    { name: "Education", url: "https://cleaneducation.vercel.app/" },
    { name: "Pharma", url: "https://cleanpharma.vercel.app/" },
    { name: "Hackney", url: "https://cleanhackney.vercel.app/" },
    { name: "Law", url: "https://cleanlaw.vercel.app/" },
    { name: "Film", url: "https://cleanfilm.vercel.app/" },
    { name: "TV", url: "https://cleantv.vercel.app/" },
    { name: "Data", url: "https://cleandata-two.vercel.app/" },
    { name: "Energy", url: "https://cleanenergy-omega.vercel.app/" },
    { name: "Music", url: "https://cleanmusic.vercel.app/" },
  ];

  const travelSeries = [
    { name: "Ireland", url: "https://travelireland.vercel.app/" },
    { name: "England", url: "https://travelengland.vercel.app/" },
    { name: "Wales", url: "https://travelwales.vercel.app/" },
    { name: "Scotland", url: "https://travelscotland.vercel.app/" },
    { name: "Bulgaria", url: "https://travelbulgaria.vercel.app/" },
    { name: "Nigeria", url: "https://travelnigeria.vercel.app/" },
    { name: "Philippines", url: "https://travelphilippines.vercel.app/" },
  ];

  const freeSeries = [
    { name: "Fraccounts", url: "https://fraccounts.vercel.app/" },
    { name: "Freebay", url: "https://freebay.vercel.app/" },
    { name: "Fruber", url: "https://fruber.vercel.app/" },
    { name: "Frainer", url: "https://frainer.vercel.app/" },
    { name: "Frov", url: "https://frov.vercel.app/" },
    { name: "Frifts", url: "https://frifts.vercel.app/" },
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
          
          {/* Left Column: Vision */}
          <div className="space-y-8">
            <div>
              <span className="inline-block text-flame-orange font-semibold uppercase tracking-wider text-sm mb-4">
                Vision and Infrastructure
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight text-flame-orange">
                Our Flame Promises
              </h2>
              <div className="space-y-4">
                {promises.map((promise, index) => (
                  <div key={index} className="flex gap-4 p-5 rounded-2xl bg-card border border-border/50 hover:border-flame-orange/30 transition-all duration-300 group shadow-sm">
                    <div className="mt-1 group-hover:scale-110 transition-transform shrink-0">{promise.icon}</div>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{promise.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 shadow-inner">
              <h4 className="text-xl font-bold mb-4 uppercase tracking-tight text-flame-orange flex items-center gap-2">
                <Users className="w-5 h-5" /> Incubator of Incubators
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                We are a global collective of <strong>100+ engineers and product creators</strong> building in public. We aim for <strong>1 million members by 2027</strong>.
              </p>
            </div>
          </div>

          {/* Right Column: The Series Grid */}
          <div className="lg:sticky lg:top-10 space-y-6">
            
            {/* Clean Series Card */}
            <div className="p-6 rounded-3xl border bg-card/50 backdrop-blur-md shadow-xl border-flame-orange/10">
              <div className="flex items-center gap-2 mb-4 text-flame-orange">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-xl font-bold">The Clean Series</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {cleanSeries.map((link) => (
                  <a key={link.name} href={link.url} target="_blank" rel="noreferrer" 
                     className="flex items-center justify-center p-2 rounded-lg border bg-background/50 border-border hover:border-flame-orange hover:bg-flame-orange/5 transition-all text-center">
                    <span className="text-xs font-medium truncate">Clean {link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Travel Series Card */}
            <div className="p-6 rounded-3xl border bg-card/50 backdrop-blur-md shadow-xl border-flame-orange/10">
              <div className="flex items-center gap-2 mb-4 text-flame-orange">
                <Plane className="w-5 h-5" />
                <h3 className="text-xl font-bold">The Travel Series</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {travelSeries.map((link) => (
                  <a key={link.name} href={link.url} target="_blank" rel="noreferrer" 
                     className="flex flex-col items-center justify-center p-2 rounded-lg border bg-background/50 border-border hover:border-flame-orange hover:bg-flame-orange/5 transition-all text-center">
                    <span className="text-xs font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Free Series Card */}
            <div className="p-6 rounded-3xl border bg-card/50 backdrop-blur-md shadow-xl border-flame-orange/10">
              <div className="flex items-center gap-2 mb-4 text-flame-orange">
                <Package className="w-5 h-5" />
                <h3 className="text-xl font-bold">The Free Series</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {freeSeries.map((link) => (
                  <a key={link.name} href={link.url} target="_blank" rel="noreferrer" 
                     className="flex items-center justify-center p-2 rounded-lg border bg-background/50 border-border hover:border-flame-orange hover:bg-flame-orange/5 transition-all text-center">
                    <span className="text-xs font-medium">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Partners - Kept elegant and simple */}
            <div className="p-6 rounded-3xl border bg-card/50 backdrop-blur-md shadow-lg border-border">
              <h3 className="text-sm font-bold mb-4 uppercase tracking-widest text-muted-foreground">Strategic Partners</h3>
              <div className="space-y-3">
                {partners.map((link) => (
                  <div key={link.name} className="flex items-center justify-between group/item">
                    <a href={link.url} target="_blank" className="text-sm font-medium hover:text-flame-orange transition-colors">
                      {link.name}
                    </a>
                    <button onClick={(e) => handleCopy(e, link.url, link.name)} className="p-1.5 rounded-md hover:bg-muted transition-colors opacity-0 group-hover/item:opacity-100">
                      {copiedIndex === link.name ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Magic Worlds Footer */}
        <div className="mt-16 p-10 rounded-[2rem] bg-gradient-to-br from-flame-orange/10 via-transparent to-transparent border border-flame-orange/20">
          <div className="max-w-4xl mx-auto text-center">
            <Bot className="w-12 h-12 text-flame-orange mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-6 text-flame-orange font-display">
              Flame Magic Worlds
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-card/40 p-6 rounded-2xl border border-border">
                <h5 className="font-bold mb-2 text-flame-orange flex items-center gap-2"><Scale className="w-4 h-4"/> Life Management</h5>
                <p className="text-xs text-muted-foreground">Money management, job seeking, and legal prep.</p>
              </div>
              <div className="bg-card/40 p-6 rounded-2xl border border-border">
                <h5 className="font-bold mb-2 text-flame-orange flex items-center gap-2"><Heart className="w-4 h-4"/> Modern Living</h5>
                <p className="text-xs text-muted-foreground">Relationships, relaxation, and sustainable fun.</p>
              </div>
              <div className="bg-card/40 p-6 rounded-2xl border border-border">
                <h5 className="font-bold mb-2 text-flame-orange flex items-center gap-2"><Globe className="w-4 h-4"/> Universal Good</h5>
                <p className="text-xs text-muted-foreground">Making the universe better for all beings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
