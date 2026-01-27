import community1 from "@/assets/community-1.jpg";
import community2 from "@/assets/community-2.jpg";
import community3 from "@/assets/community-3.jpg";

const impactItems = [
  {
    image: community1,
    title: "Food Security Initiatives",
    description:
      "Our volunteers distribute essential supplies to over 500 families weekly.",
  },
  {
    image: community2,
    title: "Community Voting Events",
    description:
      "Citizens gather to prioritize local issues and allocate resources fairly.",
  },
  {
    image: community3,
    title: "Neighborhood Improvement",
    description:
      "Together we've transformed 30+ public spaces into thriving green areas.",
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
