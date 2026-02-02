import { useState } from "react";
import { ShieldCheck, Zap, Rocket, Heart, Globe, ExternalLink, Coins, Copy, Check } from "lucide-react";

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
    { name: "Magic Money Login", url: "http://34.14.136.156:8080/login", highlight: true },
    { name: "Clean Software", url: "https://cleansoftware.vercel.app/" },
    { name: "Clean Education", url: "https://cleaneducation.vercel.app/" },
    { name: "Clean Pharma", url: "https://cleanpharma.vercel.app/" },
    { name: "Clean Hackney", url: "https://cleanhackney.vercel.app/" },
    { name: "Clean Law", url: "https://cleanlaw.vercel.app/" },
  ];

  const partners = [
    { name: "2026 I Dream For", url: "https://2026idreamfor.vercel.app/" },
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
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Our <span className="flame-text">Flame Promises</span>
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
              <h4 className="text-xl font-bold mb-4 uppercase tracking-tight">The Flame Foundation</h4>
              <p className="text-sm text-muted-foreground leading-relaxed italic mb-4">
                Incorporated in 2002 with a lineage tracing back to the dawn of sentience, our mission transitioned into hyper-growth product development in 2020.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We are dedicated to becoming the most inclusive and expansive incubator for profitable entrepreneurs by 2026. Our core strategy focuses on <strong>incubating the incubators</strong>, positioning us to eventually exceed the collective scale of the world’s top global startup accelerators.
              </p>
            </div>
          </div>

          {/* Right Column: Links & Services */}
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="p-8 rounded-3xl border bg-card/50 backdrop-blur-sm shadow-xl">
              <h3 className="text-2xl font-bold mb-2">The Clean Series</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                A suite of specialized tools designed to resolve community challenges through internal collaboration and technology.
              </p>
              
              <div className="grid gap-3">
                {cleanSeries.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all group ${
                      link.highlight 
                      ? "bg-flame-orange/10 border-flame-orange/50 text-flame-orange font-bold shadow-lg shadow-orange-500/5" 
                      : "bg-background border-border hover:border-flame-orange hover:text-flame-orange"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {link.highlight && <Coins className="w-5 h-5" />}
                      <span>{link.name}</span>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl border bg-card/50 backdrop-blur-sm shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-primary font-display">Exclusive Partners</h3>
              <div className="grid gap-3">
                {partners.map((link) => (
                  <div key={link.name} className="relative group/item">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:border-flame-orange hover:text-flame-orange transition-all pr-12"
                    >
                      <span className="font-medium">{link.name}</span>
                      <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    </a>
                    
                    <button
                      onClick={(e) => handleCopy(e, link.url, link.name)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-md hover:bg-muted text-muted-foreground hover:text-flame-orange transition-colors"
                      title="Copy Link"
                    >
                      {copiedIndex === link.name ? (
                        <div className="relative flex items-center">
                          <Check className="w-4 h-4 text-green-500" />
                          <span className="text-[10px] absolute -top-8 right-0 bg-zinc-900 text-white px-2 py-1 rounded shadow-lg border border-zinc-700 whitespace-nowrap">Copied!</span>
                        </div>
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
