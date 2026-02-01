import { Rocket, Target, Video, Info, Flame } from "lucide-react";

const ProcessSection = () => {
  const rankingItems = [
    { label: ">100% Complete", rank: "Flame Flyer Rank + Bonus Prize" },
    { label: "100% Complete", rank: "3 Flame Rank - Top Performer Bonus" },
    { label: "<100% Complete", rank: "2 Flame Rank - Extra Support" },
    { label: "<50% Complete", rank: "1 Flame Rank - Pivot" },
  ];

  return (
    <section id="process" className="py-24 relative">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-card -z-10" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-flame-orange font-semibold uppercase tracking-wider text-sm mb-4">
            How it Works
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Our Flame <span className="flame-text">Game Process</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Follow our simple three-step process to start your journey toward improvement and success.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Step-by-Step Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border">
              <div className="p-3 rounded-xl flame-gradient">
                <Rocket className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">1. Onboard</h3>
                <p className="text-muted-foreground">
                  Onboard via your chosen session and receive your exclusive Flame merch.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border">
              <div className="p-3 rounded-xl flame-gradient">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">2. Complete Activities</h3>
                <p className="text-muted-foreground">
                  Try to complete your improvement activities weekly—your Flame team aims to cheer you to success!
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border">
              <div className="p-3 rounded-xl flame-gradient">
                <Video className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">3. Report Success</h3>
                <p className="text-muted-foreground">
                  Report daily successes via video for weekly prize opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Ranking & NB Section */}
          <div className="bg-card p-8 rounded-2xl border border-border flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Flame className="text-flame-orange w-6 h-6" />
                Ranking System
              </h3>
              <div className="space-y-4 mb-8">
                {rankingItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-input/50 border border-border/50">
                    <span className="font-medium text-flame-orange">{item.label}</span>
                    <span className="text-sm text-muted-foreground">{item.rank}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 bg-input/30 rounded-xl border border-dashed border-flame-orange/30">
              <h4 className="font-bold mb-3 flex items-center gap-2 text-flame-orange">
                <Info className="w-5 h-5" /> NB (Nota Bene)
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-4">
                <li>Activities relate to the problems you requested help with (e.g., Money, Jobs, Love, etc).</li>
                <li>All activities can be done in pockets of otherwise wasted time day to day.</li>
                <li>No blocking of quality family & work time permitted.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
