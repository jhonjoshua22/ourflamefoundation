import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Rocket, Linkedin } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    { name: "Fujitsu Exec", content: "Revolutionary" },
    { name: "Retailer PLC", content: "Fascinating" },
    { name: "Unique Games Exec", content: "Unique" },
    { name: "Ad Giant Global", content: "Love It" },
    { name: "Google Exec", content: "Compelling", isHighlight: true },
    { name: "Pharma UK", content: "Worthwhile" },
    { name: "Police UK", content: "Useful" },
    { name: "NHS London", content: "Wonderful" },
    { name: "Army UK", content: "Helpful" },
    { name: "School Group London", content: "Inspired" }
  ];

  const infiniteTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="impact" className="py-24 bg-white dark:bg-black border-y border-black dark:border-white overflow-hidden transition-colors duration-500">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 45s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header - Forced Black/White */}
      <div className="container mx-auto px-6 mb-16 text-center">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase text-black dark:text-white">
          TESTIMONIALS
        </h2>
        <div className="w-12 h-[2px] bg-orange-600 mx-auto mt-6" />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-black to-transparent z-10" />

        <div className="animate-marquee flex gap-10">
          {infiniteTestimonials.map((item, index) => (
            <div 
              key={index} 
              className={`w-[320px] p-10 border-l-[4px] flex flex-col justify-between transition-all hover:scale-[1.02] shadow-sm
                ${item.isHighlight 
                  ? 'bg-orange-50/50 dark:bg-orange-950/20 border-orange-600' 
                  : 'bg-white dark:bg-black border-black dark:border-white border-2'}`}
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div />
                  {item.isHighlight && <Rocket size={16} className="text-orange-600 animate-pulse" />}
                </div>
                <blockquote className="text-black dark:text-white text-3xl font-black uppercase tracking-tight italic mb-8">
                  "{item.content}"
                </blockquote>
              </div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-black dark:text-white text-sm tracking-wide uppercase">{item.name}</p>
                <CheckCircle size={12} className="text-orange-600" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section - Forced Black/White */}
      <div className="mt-20 text-center max-w-2xl mx-auto px-6">
        <h3 className="text-xl md:text-2xl font-black text-black dark:text-white uppercase italic mb-4">
          Grab Rewards
        </h3>
        <p className="text-black dark:text-white text-sm mb-8 leading-relaxed font-medium">
          We love hearing from our community partners and builders. Log in now to post your own official testimonial or read verified operational reviews.
        </p>
        <Link 
          to="/login" 
          className="inline-block bg-orange-600 text-white text-xs font-black uppercase tracking-widest px-8 py-4 hover:bg-orange-700 transition-all rounded shadow-lg"
        >
          Login
        </Link>
      </div>

      {/* Verification Links - High Contrast */}
      <div className="mt-24 pt-12 border-t border-black dark:border-white flex flex-col items-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black dark:text-white mb-8 text-center">Community Verified</p>
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Google */}
          <a 
            href="https://maps.app.goo.gl/p1LM7Dg2smJc73vH9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-10 py-5 border-2 border-black dark:border-white rounded-xl hover:bg-orange-600 hover:text-white transition-all group"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
            <span className="text-lg font-bold text-black dark:text-white group-hover:text-white">
              Google Reviews
            </span>
          </a>

          {/* Trustpilot */}
          <a 
            href="https://www.trustpilot.com/review/ourflamefoundation.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-lg font-black uppercase tracking-tighter text-black dark:text-white hover:text-orange-600 transition-colors"
          >
            Trustpilot
          </a>

          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/company/flamefoundation/people/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-4 px-10 py-5 border-2 border-black dark:border-white rounded-xl hover:bg-[#0077B5] hover:text-white transition-all group"
          >
            <Linkedin size={28} className="text-[#0077B5] group-hover:text-white fill-current" />
            <span className="text-lg font-bold text-black dark:text-white group-hover:text-white">
              LinkedIn
            </span>
          </a>
        </div>
      </div>

      {/* Footer Badges */}
      <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-12 opacity-100">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black dark:text-white italic border-b border-orange-600">24-Hour Innovation Cycle</span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black dark:text-white italic border-b border-orange-600">Ethical Capital Certified</span>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black dark:text-white italic border-b border-orange-600">Open Source Technology</span>
      </div>
    </section>
  );
};

export default Testimonials;
