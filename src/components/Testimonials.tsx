import React from "react";
import { Link } from "react-router-dom"; // Added for local navigation
import { Star, CheckCircle, Rocket, Linkedin } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Google", 
      role: "Enterprise Partner",
      content: "Revolutionary", 
      initials: "GO", 
      accent: "border-orange-600",
      isHighlight: true 
    },
    {
      name: "Microsoft",
      role: "Ecosystem Supporter",
      content: "Incredible",
      initials: "MS",
      accent: "border-orange-600"
    },
    {
      name: "Apple",
      role: "Hardware Integrator",
      content: "Flawless",
      initials: "AP",
      accent: "border-zinc-300"
    },
    {
      name: "Amazon",
      role: "Logistics Partner",
      content: "Essential",
      initials: "AZ",
      accent: "border-zinc-300"
    },
    {
      name: "Meta",
      role: "Community Node",
      content: "Visionary",
      initials: "ME",
      accent: "border-zinc-300"
    },
    {
      name: "SpaceX",
      role: "Strategy Partner",
      content: "Unstoppable",
      initials: "SX",
      accent: "border-orange-600"
    }
  ];

  const infiniteTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="impact" className="py-24 bg-white dark:bg-zinc-950 border-y border-zinc-100 dark:border-zinc-900 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header Updated */}
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase text-zinc-900 dark:text-white">
          TESTIMONIALS
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
              className={`w-[320px] p-10 border-l-[4px] flex flex-col justify-between transition-all hover:scale-[1.02] shadow-sm
                ${item.isHighlight 
                  ? 'bg-orange-50/50 dark:bg-orange-950/10 border-orange-600' 
                  : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800'}`}
            >
              {/* Testimonial Content */}
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className="fill-orange-600 text-orange-600 opacity-80" />
                    ))}
                  </div>
                  {item.isHighlight && <Rocket size={16} className="text-orange-600 animate-pulse" />}
                </div>
                <blockquote className="text-zinc-800 dark:text-zinc-100 text-3xl font-black uppercase tracking-tight italic mb-8">
                  "{item.content}"
                </blockquote>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 font-bold text-xs bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                  {item.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm tracking-wide uppercase">{item.name}</p>
                    <CheckCircle size={12} className="text-orange-600" />
                  </div>
                  <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-widest mt-1">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Encouragement & Login CTA added */}
      <div className="mt-20 text-center max-w-2xl mx-auto px-6">
        <h3 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white uppercase italic mb-4">
          Want to share your experience?
        </h3>
        <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
          We love hearing from our community partners and builders. Log in now to post your own official testimonial or read verified operational reviews.
        </p>
        <Link 
          to="/login" 
          className="inline-block bg-orange-600 text-white text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-orange-700 transition-colors rounded-lg shadow-lg shadow-orange-600/20"
        >
          Login
        </Link>
      </div>

      {/* Verification Links - Made noticeably bigger */}
      <div className="mt-24 pt-12 border-t border-zinc-200 dark:border-zinc-800 flex flex-col items-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 text-center">Community Verified</p>
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Google Reviews - Increased padding, text size, and icon size */}
          <a 
            href="https://maps.app.goo.gl/p1LM7Dg2smJc73vH9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-10 py-5 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all group"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
            <span className="text-lg font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
              Google Reviews
            </span>
          </a>

          {/* Trustpilot Placeholder - Added inline height scaling to prompt widget expansion */}
          <div 
            className="trustpilot-widget scale-125 origin-center" 
            data-locale="en-US" 
            data-template-id="56278e9abfbbba0bdcd568bc" 
            data-businessunit-id="699ebadf007f4226955833d3" 
            data-style-height="52px" 
            data-style-width="100%" 
            data-token="4e8d4fbe-5696-46e2-b37e-ae0f6476f3a2"
          >
            <a href="https://www.trustpilot.com/review/ourflamefoundation.vercel.app" target="_blank" rel="noopener noreferrer" className="text-lg font-bold">Trustpilot</a>
          </div>

          {/* LinkedIn Link - Increased padding, text size, and icon size */}
          <a 
            href="https://www.linkedin.com/company/flamefoundation/people/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-10 py-5 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors group"
          >
            <Linkedin size={28} className="text-[#0077B5] fill-[#0077B5]" />
            <span className="text-lg font-bold text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
              LinkedIn <span className="text-xs font-medium opacity-50 block">Verified People</span>
            </span>
          </a>
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
