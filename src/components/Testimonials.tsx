import React from "react";
import { Star, CheckCircle, Rocket } from "lucide-react"; // Added Rocket for your specific highlight

const Testimonials = () => {
  const testimonials = [
    {
      name: "You", // Your name can go here
      role: "Web Developer",
      content: "I started as a Social Media Manager and am now their Web Developer. This journey helped me grow my skills and secure a wide range of clients through the foundation's incredible network.",
      initials: "YD", // Your initials
      accent: "border-orange-600",
      isHighlight: true // Flag to give your story extra flair
    },
    {
      name: "Joshua",
      role: "Family Beneficiary",
      content: "The Magic World Master Bot has completely changed how I manage my family's budget. It's like having a personal assistant that actually cares about our values.",
      initials: "JS",
      accent: "border-orange-600"
    },
    {
      name: "Emeka",
      role: "Community Developer",
      content: "Being part of this incubator is exhilarating. The 24-hour cycle for innovation isn't just a promise; it's a reality I experience every single day.",
      initials: "EM",
      accent: "border-zinc-300"
    },
    {
      name: "Veronie",
      role: "Foundation Partner",
      content: "Finally, a foundation that prioritizes ethical capital and long-term legacy over quick wins. The transparency here is refreshing and necessary.",
      initials: "VR",
      accent: "border-zinc-300"
    },
    {
      name: "Eddy",
      role: "Technical Volunteer",
      content: "The tech stack is incredibly robust. Integrating AGI and Blockchain for paperless compliance has halved our operational complexity.",
      initials: "ED",
      accent: "border-zinc-300"
    },
    {
      name: "James",
      role: "SEND Initiative Leader",
      content: "The SEND initiative found talent in our community that everyone else overlooked. Truly empowering the next generation of local leaders.",
      initials: "JM",
      accent: "border-orange-600"
    }
  ];

  // Double for seamless loop
  const infiniteTestimonials = [...testimonials, ...testimonials];

  return (
    // Added id="impact" here
    <section id="impact" className="py-24 bg-white dark:bg-zinc-950 border-y border-zinc-100 dark:border-zinc-900 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 50s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto px-6 mb-16 text-center">
        <h4 className="text-orange-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
          Human Impact
        </h4>
        <h2 className="text-4xl font-light tracking-tight text-zinc-900 dark:text-zinc-100 uppercase italic">
          Voices of the <span className="font-bold text-orange-600 not-italic uppercase">Foundation</span>
        </h2>
        <div className="w-12 h-[1px] bg-zinc-300 mx-auto mt-6" />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent z-10" />

        <div className="animate-marquee flex gap-10">
          {infiniteTestimonials.map((item, index) => (
            <div 
              key={index} 
              className={`w-[420px] p-12 border-l-[4px] flex flex-col justify-between transition-all hover:scale-[1.02] shadow-sm
                ${item.isHighlight 
                  ? 'bg-orange-50/50 dark:bg-orange-950/10 border-orange-600' 
                  : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800'}`}
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-orange-600 text-orange-600 opacity-80" />
                    ))}
                  </div>
                  {item.isHighlight && <Rocket size={16} className="text-orange-600 animate-pulse" />}
                </div>
                
                <blockquote className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed font-serif italic mb-10">
                  "{item.content}"
                </blockquote>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 font-bold text-xs bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                  {item.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm tracking-wide uppercase">
                      {item.name}
                    </p>
                    <CheckCircle size={12} className="text-orange-600" />
                  </div>
                  <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest mt-1">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 flex justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">24-Hour Innovation Cycle</span>
         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">Ethical Capital Certified</span>
         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 italic">Open Source Technology</span>
      </div>
    </section>
  );
};

export default Testimonials;
