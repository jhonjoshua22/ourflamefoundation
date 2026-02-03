import { Calendar, MapPin, ArrowRight } from "lucide-react";
import cebu from "@/assets/cebu.jpeg";
import glow from "@/assets/glow.png";
import dewdrops from "@/assets/dewdrops.jpeg";

const NewsEventsSection = () => {
  const events = [
    {
      title: "Glow and Tell",
      description: "An empowering event for women owning their menopause journey.",
      date: "October 12, 2025",
      location: "Beverly Hills, CA",
      image: glow,
      type: "Event",
    },
    {
      title: "Relief Operations for Typhoon Tino",
      description: "Our team is currently on the ground delivering food, clean water, and medical supplies to the families most affected by the devastation of Typhoon Tino.",
      date: "December 13, 2025",
      location: "Cebu, Philippines",
      image: cebu,
      type: "News",
    },
    {
      title: "Dewdrops Care Development Foundation",
      description: "Our program provides children with essential tools for play, learning, and faith, ensuring every child feels like a hero in their own story.",
      date: "December 22, 2025",
      location: "Lagos, Nigeria",
      image: dewdrops,
      type: "Foundation",
    }
  ];

  return (
    <section id="news" className="py-24 bg-background relative overflow-hidden">
      {/* Background Glow to match About Section */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-flame-orange/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-flame-orange font-semibold uppercase tracking-wider text-sm mb-4">
            Updates & Engagements
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight text-flame-orange">
            News & Events
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((item, index) => (
            <div 
              key={index} 
              className="group bg-card border border-border/50 rounded-3xl overflow-hidden hover:border-flame-orange/30 transition-all duration-500 hover:shadow-2xl hover:shadow-flame-orange/10"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-background/90 backdrop-blur-md text-flame-orange text-xs font-bold px-3 py-1.5 rounded-full border border-flame-orange/20 uppercase">
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8">
                <div className="flex flex-col gap-3 mb-4 text-xs font-medium text-muted-foreground uppercase tracking-tight">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-flame-orange" />
                    {item.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-flame-orange" />
                    {item.location}
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-flame-orange transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                <button className="flex items-center gap-2 text-sm font-bold text-flame-orange group/btn">
                  Read More 
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsEventsSection;
