import { useEffect, useState, useRef } from "react";
import Starfield from "@/components/Starfield"; // Import your starfield here
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import NewsEventsSection from "@/components/NewsEventsSection";
import AboutUsSection from "@/components/AboutUsSection";
import GlobalMap from "@/components/GlobalMap";
import ProcessSection from "@/components/ProcessSection";
import Testimonials from "@/components/Testimonials";
import PartnerSection from "@/components/PartnerSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
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

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Google Translate Initialization
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
    // We use bg-transparent because the Starfield has its own background color
    <div className="min-h-screen bg-transparent relative selection:bg-yellow-400 selection:text-black">
      
      {/* 1. THE MOVING STARS (HYPERSPACE) */}
      <Starfield />

      {/* Hidden Translate container */}
      <div id="google_translate_element" style={{ visibility: "hidden", position: "absolute" }} />

      {/* Language UI */}
      <div className="fixed bottom-6 left-6 z-[9999]" ref={menuRef}>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-2xl hover:bg-white/20 transition-all active:scale-95"
          >
            <Globe size={20} />
          </button>
          {isOpen && (
            <div className="absolute bottom-16 left-0 min-w-[140px] bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-bottom-4">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    currentLang === lang.code ? "text-yellow-400 font-bold" : "text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. THE CONTENT LAYER */}
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

      <style>{`
        .goog-te-banner-frame, .goog-te-balloon-frame, .goog-te-gadget-icon { display: none !important; }
        body { top: 0 !important; }
        .VIpgJd-ZVi9nd-ORHb-nS19Ww { display: none !important; }
      `}</style>
    </div>
  );
};

export default Index;
