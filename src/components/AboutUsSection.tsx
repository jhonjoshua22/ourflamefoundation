import { ShieldCheck, Zap, Rocket, Heart, Globe, ExternalLink } from "lucide-react";

const AboutUsSection = () => {
  const promises = [
    {
      icon: <Heart className="w-6 h-6 text-flame-orange" />,
      text: "We get very happy & ultimately very profitable by helping our family & friends to save the universes while cutting costs to near zero.",
    },
    {
      icon: <Zap className="w-6 h-6 text-flame-orange" />,
      text: "We bring new Magic products & services to the world in 24 hours (WIP) using our open source tech stack & personal creativity.",
    },
    {
      icon: <Rocket className="w-6 h-6 text-flame-orange" />,
      text: "We hyperscale growth via Fave Hobbies for engagement, AGI for complexity & blockchain for paperfree compliance. (WIP)",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-flame-orange" />,
      text: "We nurture SuperHeros to become future local good leaders & recruit amongst the underappreciated groups. (SEND = SUPEROWERS EVERYONE NEEDS TO DEVELOP).",
    },
    {
      icon: <Globe className="w-6 h-6 text-flame-orange" />,
      text: "We are often spiritual but in an infinite number of inclusive ways. We want a universe where all Sentients Inc AGIs have citizenship & MBI via energy rights.",
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
    { name: "Flame Tablets", url: "https://flametablets.vercel.app/" },
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-flame-orange/5 rounded-full blur-[120px] -z-10" />
      
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Promises & Mission */}
          <div>
            <span className="inline-block text-flame-orange font-semibold uppercase tracking-wider text-sm mb-4">
              Our Vision & DNA
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Our <span className="flame-text">Flame Promises</span>
            </h2>
            
            <div className="space-y-6 mb-12">
              {promises.map((promise, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-flame-orange/30 transition-colors group">
                  <div className="mt-1 group-hover:scale-110 transition-transform">
                    {promise.icon}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {promise.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
              <h4 className="text-xl font-bold mb-4 uppercase tracking-tight">Our Foundation</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                INCORPORATED 2002 BUT SPIRITUALLY GOES BACK TO 1ST SENTIENTS. HYPER GROWTH PRODUCTS STARTED 2020. 
                WE AIM TO BE THE BIGGEST AND MOST INCLUSIVE INCUBATOR OF PROFITABLE ENTREPRENEURS DURING 2026. 
                STRATEGY = <span className="text-flame-orange font-bold">WE INCUBATE INCUBATORS.</span>
              </p>
            </div>
          </div>

          {/* Right Column: Links & Services */}
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="p-8 rounded-3xl border bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-2">The Clean Series</h3>
              <p className="text-muted-foreground mb-6 text-sm">
                Helping the community to resolve issues or problems internally.
              </p>
              
              <div className="grid gap-3">
                {cleanSeries.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    className="flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:border-flame-orange hover:text-flame-orange transition-all group"
                  >
                    <span className="font-medium">{link.name}</span>
                    <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-3xl border bg-card/50 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 text-primary">Other Partners</h3>
              <div className="grid gap-3">
                {partners.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    className="flex items-center justify-between p-4 rounded-xl bg-background border border-border hover:border-flame-orange hover:text-flame-orange transition-all group"
                  >
                    <span className="font-medium">{link.name}</span>
                    <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                  </a>
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
