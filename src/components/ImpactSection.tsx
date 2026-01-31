import community1 from "@/assets/jobs.png";
import community2 from "@/assets/money.jpeg";
import community3 from "@/assets/legal.png";
import community5 from "@/assets/superpets.jpeg";
import community6 from "@/assets/holidays.jpeg";
import community7 from "@/assets/health.jpeg";
import community8 from "@/assets/pitch.jpeg";
import community9 from "@/assets/malesinger.jpeg";
import community11 from "@/assets/film.jpeg";
import community12 from "@/assets/bookcontract.jpeg";
import joshua from "@/assets/joshua.png";
import moyasis from "@/assets/moyasis.jpeg";
import emeka from "@/assets/emeka.png";
import food from "@/assets/food.jpeg";
import childsdream from "@/assets/childsdream.jpeg";
import motel from "@/assets/motel.jpeg";
import clothes from "@/assets/clothes.jpeg";
import play2world from "@/assets/play2world.jpeg";

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
  {
    image: childsdream,
    title: "EVERY CHILD'S DREAM 2026",
    description:
      "Live daily every 6:15GMT",
  },
  {
    image: motel,
    title: "MO MOTELS",
    description:
      "Live daily every 6:15GMT",
  },
  {
    image: food,
    title: "MO FOOD",
    description:
      "Live daily every 6:15GMT",
  },
    {
    image: clothes,
    title: "MO CLOTHES,
    description:
      "Live daily every 6:15GMT",
  },
  {
    image: play2world,
    title: "PLAY2WORLD",
    description:
      "Live daily every 6:15GMT",
  },
  {
    image: joshua,
    title: "JOSHUA'S PRODUCTS",
    description:
      "Live daily every 6:15GMT",
  },
    {
    image: emeka,
    title: "EMEKA'S PRODUCTS",
    description:
      "Live daily every 6:15GMT",
  },
  {
    image: moyasis,
    title: "MOYASIS' PRODUCTS",
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
            Our Hot topics 2026
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Making a <span className="flame-text">Difference</span> Together
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            See how our community-driven approach is solving real problems.
          </p>
        </div>

        {/* Updated Grid: Shows all images, 3 per row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {impactItems.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border bg-background card-hover"
            >
              {/* Removed 'aspect-[4/3]' to prevent cropping. 
                  Using 'object-contain' ensures the full width/height is seen.
              */}
              <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Text Overlay Details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="font-display text-xl font-bold mb-2 text-white">
                  {item.title}
                </h3>
                <p className="text-gray-200 text-sm">
                  {item.description}
                </p>
              </div>

              {/* Title label that hides on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="font-display text-lg font-bold text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
