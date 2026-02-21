import React from "react";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Joshua",
      content: "The Magic World Master Bot has completely changed how I manage my family's budget. It's like having a personal assistant that actually cares about our values.",
      rating: 5
    },
    {
      name: "Emeka",
      content: "Being part of this incubator is exhilarating. The 24-hour cycle for innovation isn't just a promise; it's a reality I experience every single day.",
      rating: 5
    },
    {
      name: "Veronie",
      content: "Finally, a foundation that prioritizes ethical capital and long-term legacy over quick wins. The transparency here is refreshing and necessary.",
      rating: 5
    },
    {
      name: "Eddy",
      content: "The tech stack is incredibly robust. Integrating AGI and Blockchain for paperless compliance has halved our operational complexity.",
      rating: 5
    },
    {
      name: "James",
      content: "The SEND initiative found talent in our community that everyone else overlooked. Truly empowering the next generation of local leaders.",
      rating: 5
    }
  ];

  // Double the array to ensure the loop is seamless
  const infiniteTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-20 bg-background overflow-hidden">
      {/* Animation Logic */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto px-6 mb-12 text-center">
        <span className="text-flame-orange font-semibold uppercase tracking-widest text-sm">
          Community Feedback
        </span>
        <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground mt-3">
          What they say about us
        </h2>
      </div>

      <div className="relative">
        {/* Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="animate-marquee flex gap-6">
          {infiniteTestimonials.map((item, index) => (
            <div 
              key={index} 
              className="w-[380px] p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:border-flame-orange/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-flame-orange text-flame-orange" />
                  ))}
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-flame-orange/10 -z-0" />
                  <p className="text-muted-foreground text-sm leading-relaxed italic relative z-10">
                    "{item.content}"
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground text-lg">{item.name}</p>
                  <p className="text-[10px] text-flame-orange font-bold uppercase tracking-widest">
                    Verified Member
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-flame-orange/10 flex items-center justify-center text-flame-orange font-bold">
                  {item.name.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
