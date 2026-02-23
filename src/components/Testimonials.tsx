import React from "react";
import { Star, Quote, CheckCircle2 } from "lucide-react";

// --- CUSTOM GEOMETRIC AVATARS ---
const Avatar = ({ name, colorClass }) => (
  <div className={`w-12 h-12 flex-shrink-0 flex items-center justify-center border-2 border-current ${colorClass} bg-white dark:bg-zinc-900`}>
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
      <rect x="4" y="4" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
      <path d="M12 4L4 20H20L12 4Z" className="opacity-40" />
      <circle cx="12" cy="12" r="3" />
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="6" className="font-bold uppercase tracking-tighter">
        {name.charAt(0)}
      </text>
    </svg>
  </div>
);

const Testimonials = () => {
  const testimonials = [
    {
      name: "Joshua",
      role: "Family Lead",
      content: "The Magic World Master Bot has completely changed how I manage my family's budget. It's like having a personal assistant that actually cares about our values.",
      color: "text-orange-600 border-orange-600 shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]"
    },
    {
      name: "Emeka",
      role: "Product Creator",
      content: "Being part of this incubator is exhilarating. The 24-hour cycle for innovation isn't just a promise; it's a reality I experience every single day.",
      color: "text-emerald-600 border-emerald-600 shadow-[4px_4px_0px_0px_rgba(5,150,105,1)]"
    },
    {
      name: "Veronie",
      role: "Ethical Investor",
      content: "Finally, a foundation that prioritizes ethical capital and long-term legacy over quick wins. The transparency here is refreshing and necessary.",
      color: "text-blue-700 border-blue-700 shadow-[4px_4px_0px_0px_rgba(29,78,216,1)]"
    },
    {
      name: "Eddy",
      role: "Tech Engineer",
      content: "The tech stack is incredibly robust. Integrating AGI and Blockchain for paperless compliance has halved our operational complexity.",
      color: "text-zinc-800 border-zinc-800 shadow-[4px_4px_0px_0px_rgba(39,39,42,1)]"
    },
    {
      name: "James",
      role: "Local Leader",
      content: "The SEND initiative found talent in our community that everyone else overlooked. Truly empowering the next generation of local leaders.",
      color: "text-orange-600 border-orange-600 shadow-[4px_4px_0px_0px_rgba(234,88,12,1)]"
    }
  ];

  const infiniteTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-black overflow-hidden border-t border-zinc-200 dark:border-zinc-800">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="container mx-auto px-6 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-orange-600" />
              <span className="text-orange-600 font-black uppercase tracking-[0.2em] text-xs">Community Voices</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white uppercase">
              Truth in <span className="italic font-light">Service.</span>
            </h2>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium max-w-sm border-l-2 border-zinc-200 dark:border-zinc-800 pl-6">
            Our members are the soul of our foundation. Real people, real impact, 100% verified ethical growth.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="animate-marquee flex gap-8 py-10">
          {infiniteTestimonials.map((item, index) => (
            <div 
              key={index} 
              className={`w-[400px] bg-white dark:bg-zinc-900 border-2 p-10 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 ${item.color}`}
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-current" />
                    ))}
                  </div>
                  <Quote size={24} className="opacity-20" />
                </div>
                
                <p className="text-zinc-800 dark:text-zinc-200 text-lg leading-snug font-medium mb-12 tracking-tight">
                  "{item.content}"
                </p>
              </div>
              
              <div className="flex items-center gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-8">
                <Avatar name={item.name} colorClass={item.color.split(' ')[0]} />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="font-black text-zinc-900 dark:text-white uppercase tracking-tighter">{item.name}</p>
                    <CheckCircle2 size={12} className="text-emerald-500" />
                  </div>
                  <p className="text-[10px] uppercase font-black tracking-widest opacity-60">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 flex justify-center">
        <div className="inline-flex items-center gap-8 py-4 px-10 bg-zinc-900 dark:bg-white text-white dark:text-black">
          <span className="text-xs font-black uppercase tracking-[0.3em]">Verified Members Only</span>
          <div className="h-4 w-px bg-zinc-700 dark:bg-zinc-300" />
          <span className="text-xs font-black uppercase tracking-[0.3em]">Ethical Capital</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
