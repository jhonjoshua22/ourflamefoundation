import { useEffect, useState, useRef } from "react";
// Your original component imports
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import Testimonials from "@/components/Testimonials";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import AboutUsSection from "@/components/AboutUsSection";
import GlobalMap from "@/components/GlobalMap";
import PartnerSection from "@/components/PartnerSection";
import NewsEventsSection from "@/components/NewsEventsSection";
import { Globe } from "lucide-react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "zh-CN", label: "Chinese" },
  { code: "ar", label: "Arabic" },
  { code: "hi", label: "Hindi" },
  { code: "ja", label: "Japanese" },
];

// --- GALAXY COMPONENT ---
const GalaxyBackground = () => (
  <div className="fixed inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-25 z-[-1] bg-black">
    <svg
      className="animate-galaxy-rotate w-[1000px] h-[1000px] md:w-[1600px] md:h-[1600px]"
      viewBox="0 0 800 800"
      fill="none"
    >
      {[0, 72, 144, 216, 288].map((rotation, i) => (
        <g key={i} transform={`rotate(${rotation} 400 400)`}>
          <path
            d={`M 400 400 Q ${450 + i * 10} ${300 - i * 5} ${500 + i * 15} ${200 - i * 10} Q ${550 + i * 10} ${100} ${600} ${80}`}
            stroke={`hsl(${210 + i * 30}, 80%, 60%)`}
            strokeWidth="2"
            fill="none"
            opacity="0.6"
          />
          <path
            d={`M 400 400 Q ${460 + i * 8} ${320 - i * 4} ${520 + i * 12} ${220 - i * 8} Q ${560 + i * 8} ${120} ${620} ${100}`}
            stroke={`hsl(${45}, 100%, 56%)`}
            strokeWidth="1"
            fill="none"
            opacity="0.3"
          />
        </g>
      ))}
      <circle cx="400" cy="400" r="30" fill="url(#coreGlow)" />
      <circle cx="400" cy="400" r="80" fill="url(#coreGlow2)" />
      {Array.from({ length: 120 }).map((_, i) => {
        const angle = (i / 120) * Math.PI * 6;
        const dist = 50 + (i / 120) * 350;
        const x = 400 + Math.cos(angle) * dist + (Math.random() - 0.5) * 60;
        const y = 400 + Math.sin(angle) * dist + (Math.random() - 0.5) * 60;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={Math.random() * 2 + 0.5}
            fill="hsl(45, 100%, 80%)"
            opacity={Math.random() * 0.7 + 0.2}
          />
        );
      })}
      <defs>
        <radialGradient id="coreGlow">
          <stop offset="0%" stopColor="hsl(45, 100%, 80%)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(45, 100%, 56%)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="coreGlow2">
          <stop offset="0%" stopColor="hsl(210, 100%, 70%)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  </div>
);

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: LANGUAGES.map((l) => l.code).join(","),
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const addScript = document.createElement("script");
      addScript.id = scriptId;
      addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.async = true;
      document.body.appendChild(addScript);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (code: string) => {
    const googleSelect = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (googleSelect) {
      googleSelect.value = code;
      googleSelect.dispatchEvent(new Event("change"));
      setCurrentLang(code);
    }
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen bg-transparent relative selection:bg-yellow-400 selection:text-black">
      {/* 1. THE GALAXY BACKGROUND */}
      <GalaxyBackground />

      {/* Hidden Translate container */}
      <div id="google_translate_element" style={{ visibility: "hidden", position: "absolute" }} />

      {/* FLOATING LANGUAGE UI */}
      <div className="fixed bottom-6 left-6 z-[9999]" ref={menuRef}>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-md text-slate-700 border border-white/20 shadow-xl hover:shadow-yellow-400/20 hover:bg-white transition-all duration-200 active:scale-90"
          >
            <Globe size={20} />
          </button>

          {isOpen && (
            <div className="absolute bottom-16 left-0 min-w-[140px] bg-white/95 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Language</div>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    currentLang === lang.code 
                      ? "bg-blue-50 text-blue-600 font-semibold" 
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .goog-te-banner-frame, .goog-te-balloon-frame, .goog-te-gadget-icon { display: none !important; }
        body { top: 0 !important; }
        .VIpgJd-ZVi9nd-ORHb-nS19Ww { display: none !important; }
        /* Smooth scrolling for the whole page */
        html { scroll-behavior: smooth; }
      `}</style>

      {/* MAIN CONTENT WRAPPER */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <ImpactSection />
        <NewsEventsSection />
        <AboutUsSection />
        <GlobalMap />
        <ProcessSection />
        <Testimonials />
        <PartnerSection />
        <Footer />
        <Chatbot />
      </div>
    </div>
  );
};

export default Index;
