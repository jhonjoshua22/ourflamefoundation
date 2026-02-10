import { useState } from "react";
import { 
  ShieldCheck, Zap, Rocket, Heart, Globe, ExternalLink, 
  Copy, Check, Users, Sparkles, Bot, Scale, Plane
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
    { name: "Clean Software", url: "https://cleansoftware.vercel.app/" },
    { name: "Clean Education", url: "https://cleaneducation.vercel.app/" },
    { name: "Clean Pharma", url: "https://cleanpharma.vercel.app/" },
    { name: "Clean Hackney", url: "https://cleanhackney.vercel.app/" },
    { name: "Clean Law", url: "https://cleanlaw.vercel.app/" },
    { name: "Clean Film", url: "https://cleanfilm.vercel.app/" },
    { name: "Clean TV", url: "https://cleantv.vercel.app/" },
    { name: "Clean Data", url: "https://cleandata-two.vercel.app/" },
    { name: "Clean Energy", url: "https://cleanenergy-omega.vercel.app/" },
    { name: "Clean Music", url: "https://cleanmusic.vercel.app/" },
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
          
          {/* Left Column: Promises & Mission */}
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
                    <div className="mt-1 group-hover:scale-110 transition-transform shrink-0">
                      {promise.icon}
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {promise.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 shadow-inner">
              <h4 className="text-xl font-bold mb-4 uppercase tracking-tight text-flame-orange flex items-center gap-2">
                <Users className="w-5 h-5" /> Incubator of Incubators
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                We are a global collective of <strong>100+ engineers and product creators</strong> building in public. We are multifaith, inclusive, and proudly neurodiverse. Our goal is to <strong>10x every 2 months</strong> through the fusion of AI, Blockchain, Gaming, and Hardware.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6 text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-flame-orange"/> Prediction</div>
                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-flame-orange"/> Trustless</div>
                <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-flame-orange"/> Engaging</div>
                <div className="flex items-center gap-2"><Heart className="w-4 h-4 text-flame-orange"/> Protection</div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed italic border-l-2 border-flame-orange/30 pl-4">
                Flame Members follow a "pay what you can" model starting from <strong>$1 per month</strong> per solution. With 50+ products already live, we aim for <strong>1 million members by 2027</strong>.
              </p>
            </div>
          </div>

          {/* Right Column: Links & Services */}
          <div className="space-y-6">
            {/* The Clean Series */}
            <div className="p-6 rounded-3xl border bg-card/50 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-flame-orange">The Clean Series</h3>
                <Sparkles className="w-5 h-5 text-flame-orange/50" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {cleanSeries.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl border bg-background border-border hover:border-flame-orange/50 hover:bg-flame-orange/5 transition-all group"
                  >
                    <span className="text-sm font-medium">{link.name}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

            {/* The Travel Series */}
            <div className="p-6 rounded-3xl border bg-card/50 backdrop-blur-sm shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-flame-orange">The Travel Series</h3>
                <Plane className="w-5 h-5 text-flame-orange/50" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {travelSeries.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl border bg-background border-border hover:border-flame-orange/50 hover:bg-flame-orange/5 transition-all text-center"
                  >
                    <span className="text-xs font-semibold">{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* The Free Series & Partners Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl border bg-card/50 backdrop-blur-sm shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-flame-orange">The Free Series</h3>
                <div className="space-y-2">
                  {freeSeries.slice(0, 4).map((link) => (
                    <a key={link.name} href={link.url} className="block text-sm hover:text-flame-orange transition-colors">• {link.name}</a>
                  ))}
                  <details className="cursor-pointer">
                    <summary className="text-xs text-muted-foreground hover:text-flame-orange">View all</summary>
                    <div className="pt-2 space-y-2">
                       {freeSeries.slice(4).map((link) => (
                        <a key={link.name} href={link.url} className="block text-sm hover:text-flame-orange transition-colors">• {link.name}</a>
                      ))}
                    </div>
                  </details>
                </div>
              </div>

              <div className="p-6 rounded-3xl border bg-card/50 backdrop-blur-sm shadow-lg">
                <h3 className="text-lg font-bold mb-3 text-flame-orange">Partners</h3>
                <div className="space-y-3">
                  {partners.map((link) => (
                    <div key={link.name} className="flex items-center justify-between group/item">
                      <a href={link.url} target="_blank" className="text-sm font-medium hover:text-flame-orange transition-colors truncate mr-2">
                        {link.name}
                      </a>
                      <button onClick={(e) => handleCopy(e, link.url, link.name)} className="p-1.5 rounded-md hover:bg-muted transition-colors">
                        {copiedIndex === link.name ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conclusion Section */}
        <div className="mt-16 p-10 rounded-[2rem] bg-gradient-to-br from-flame-orange/10 to-transparent border border-flame-orange/20">
          <div className="max-w-4xl mx-auto text-center">
            <Bot className="w-12 h-12 text-flame-orange mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-6 text-flame-orange font-display">
              Flame Magic Worlds: Supporting the Busy Family
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We know families are super busy; extra tasks often lead to excessive stress. 
              <strong> Flame Magic Worlds</strong> is our solution. With your permission, your information feeds into a dedicated 
              <strong> Magic World Master Bot</strong>.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-card p-6 rounded-2xl border border-border hover:shadow-md transition-shadow">
                <h5 className="font-bold mb-2 text-flame-orange flex items-center gap-2"><Scale className="w-4 h-4"/> Life Management</h5>
                <p className="text-sm text-muted-foreground">Support in money management, job seeking, legal prep, and stress coping.</p>
              </div>
              <div className="bg-card p-6 rounded-2xl border border-border hover:shadow-md transition-shadow">
                <h5 className="font-bold mb-2 text-flame-orange flex items-center gap-2"><Heart className="w-4 h-4"/> Modern Living</h5>
                <p className="text-sm text-muted-foreground">Advice on modern relationships, healthy relaxation, and sustainable fun.</p>
              </div>
              <div className="bg-card p-6 rounded-2xl border border-border hover:shadow-md transition-shadow">
                <h5 className="font-bold mb-2 text-flame-orange flex items-center gap-2"><Globe className="w-4 h-4"/> Universal Good</h5>
                <p className="text-sm text-muted-foreground">Making this universe (and others) better for all sentient beings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
