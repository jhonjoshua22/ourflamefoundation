import community1 from "@/assets/jobs.png";
import community2 from "@/assets/money.jpeg";
import community3 from "@/assets/legal.png";
import community4 from "@/assets/double.jpeg";
import community5 from "@/assets/superpets.jpeg";
import community6 from "@/assets/holidays.jpeg";
import community7 from "@/assets/health.jpeg";
import community8 from "@/assets/pitch.jpeg";
import community9 from "@/assets/malesinger.jpeg";
import community10 from "@/assets/femalesinger.jpeg";
import community11 from "@/assets/film.jpeg";
import community12 from "@/assets/bookcontract.jpeg";

const impactItems = [
  {
    image: community1,
    title: "FLAME JOBS",
    description:
      "Live daily every 6:15GMT",
  },
  {
    image: community2,
    title: "MAGIC MONEY TRAINING",
    description:
      "Live daily every 6:15GMT",
  },
  {
    image: community3,
    title: "FLAME LEGAL",
    description:
      "Live daily every 6:15GMT",
  },
    {
    image: community4,
    title: "DOUBLE YOUR MONEY TRAINING",
    description:
      "Live daily every 6:15GMT",
  },
  {
    image: community5,
    title: "SUPERPETS TRAINING",
    description:
      "Live daily every 6:15GMT",
  },
  {
    image: community6,
    title: "FREE HOLIDAYS",
    description:
      "Live daily every 6:15GMT",
  },
    {
    image: community7,
    title: "HAPPY HEALTH TRAINING",
    description:
      "Live daily every 6:15GMT",
  },
  {
    image: community8,
    title: "PITCH YOUR IDEA",
    description:
      "Live daily every 6:15GMT",
  },
  {
    image: community9,
    title: "TOP SINGER COMPETITION MALE",
    description:
      "Live daily every 6:15GMT",
  },
    {
    image: community10,
    title: "TOP SINGER COMPETITION FEMALE",
    description:
      "Live daily every 6:15GMT",
  },
  {
    image: community11,
    title: "FILM AUDITION",
    description:
      "Live daily every 6:15GMT",
  },
  {
    image: community12,
    title: "BOOK CONTRACT PROCESS",
    description:
      "Live daily every 6:15GMT",
  },
];

const ImpactSection = () => {
  return (
    <section id="impact" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-flame-orange font-semibold uppercase tracking-wider text-sm mb-4">
            Our Impact
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Making a <span className="flame-text">Difference</span> Together
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            See how our community-driven approach is solving real problems and
            creating lasting change in neighborhoods across the region.
          </p>
        </div>

        {/* Photo Grid - 2 columns, with last item centered */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {impactItems.slice(0, 2).map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl card-hover"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="font-display text-xl font-bold mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
              {/* Always visible overlay for title */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Third item centered below */}
        <div className="max-w-lg mx-auto mt-8">
          <div className="group relative overflow-hidden rounded-2xl card-hover">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={impactItems[2].image}
                alt={impactItems[2].title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="font-display text-xl font-bold mb-2">
                {impactItems[2].title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {impactItems[2].description}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="font-display text-xl font-bold">
                {impactItems[2].title}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
