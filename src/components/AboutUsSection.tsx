import { useState } from "react";
import { 
  ShieldCheck, Zap, Rocket, Heart, Globe, ExternalLink, 
  Copy, Check, Users, Sparkles, Bot, Scale 
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

            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 shadow-inner mb-8">
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
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                Flame Members follow a "pay what you can" model starting from <strong>$1 per month</strong> per solution. With 50+ products already live, we aim for <strong>1 million members by 2027</strong>—surpassing the scale of YC and 10,000 global incubators combined.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-card border border-border/50 shadow-sm">
              <h4 className="text-xl font-bold mb-4 uppercase tracking-tight text-flame-orange">
                Legacy & Ethical Capital
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                This is my <strong>final project before retirement and my lasting legacy</strong>. We fundraise exclusively through our own crowdfunding platform, opening doors only to <strong>ethical investors</strong> with proven track records and proper KYC.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To ensure a personal touch at scale, <strong>my AI will speak to every new member</strong>. My wider family's involvement ensures this remains a multi-generational effort to protect and serve.
              </p>
            </div>
          </div>

          {/* Right Column: Links & Services */}
          <div className="lg:sticky lg:top-32 space-y-8">
            {/* The Clean Series */}
            <div className="p-8 rounded-3xl border bg-card/50 backdrop-blur-sm shadow-xl">
              <h3 className="text-2xl font-bold mb-2 text-flame-orange">The Clean Series</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                A suite of specialized tools designed to resolve community challenges.
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
                    <span className="font-medium">{link.name}</span>
                    <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

            {/* The Free Series */}
            <div className="p-8 rounded-3xl border bg-card/50 backdrop-blur-sm shadow-xl">
              <h3 className="text-2xl font-bold mb-2 text-flame-orange">The Free Series</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Accessible ecosystem tools designed for the community.
              </p>
              <div className="grid gap-3">
                {freeSeries.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border bg-background border-border hover:border-flame-orange hover:text-flame-orange transition-all group"
                  >
                    <span className="font-medium">{link.name}</span>
                    <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

            {/* Strategic Partnerships */}
            <div className="p-8 rounded-3xl border bg-card/50 backdrop-blur-sm shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-flame-orange font-display">
                Strategic Partnerships
              </h3>
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
                        <Check className="w-4 h-4 text-green-500" />
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
              <div className="bg-card p-6 rounded-2xl border border-border">
                <h5 className="font-bold mb-2 text-flame-orange flex items-center gap-2"><Scale className="w-4 h-4"/> Life Management</h5>
                <p className="text-sm text-muted-foreground">Support in money management, job seeking, legal prep, and stress coping.</p>
              </div>
              <div className="bg-card p-6 rounded-2xl border border-border">
                <h5 className="font-bold mb-2 text-flame-orange flex items-center gap-2"><Heart className="w-4 h-4"/> Modern Living</h5>
                <p className="text-sm text-muted-foreground">Advice on modern relationships, healthy relaxation, and sustainable fun.</p>
              </div>
              <div className="bg-card p-6 rounded-2xl border border-border">
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
