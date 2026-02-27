import { useEffect, useState, useRef } from "react";
// 1. Import the Cosmic Components
import Starfield from "@/components/Starfield";
import GalaxySVG from "@/components/GalaxySVG";

// Your original component imports
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import Testimonials from "@/components/Testimonials";
import ProcessSection from "@/components/ProcessSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import AboutUsSection from "@/components/AboutUsSection";
import FlameGame from "@/components/FlameGame";
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

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initialize Google Translate
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

    // 2. Add Script safely
    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const addScript = document.createElement("script");
      addScript.id = scriptId;
      addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.async = true;
      document.body.appendChild(addScript);
    }

    // 3. Close menu on outside click
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
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      
      {/* --- BACKGROUND LAYER --- */}
      {/* Fixed canvas starfield - Layer -1 */}
      <Starfield />
      
      {/* Rotating Galaxy - Layer 0 */}
      <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center opacity-40">
        <GalaxySVG />
      </div>

      {/* --- UI OVERLAYS --- */}
      {/* Hidden container - keep it in DOM but visually gone */}
      <div id="google_translate_element" style={{ visibility: "hidden", position: "absolute" }} />

      {/* MINIMALIST FLOATING UI (Highest Z-index) */}
      <div className="fixed bottom-6 left-6 z-[9999]" ref={menuRef}>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-slate-700 border border-slate-200 shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all duration-200 active:scale-90"
          >
            <Globe size={20} />
          </button>

          {isOpen && (
            <div className="absolute bottom-16 left-0 min-w-[140px] bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden py-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
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

      {/* --- CONTENT LAYER --- */}
      {/* Wrapping content in relative z-10 ensures it stays above the stars */}
      <main className="relative z-10">
        <Navbar />
        <HeroSection />
        <ImpactSection />
        <NewsEventsSection />
        <AboutUsSection />
        <FlameGame />
        <GlobalMap />
        <ProcessSection />
        <Testimonials />
        <PartnerSection />
        <Footer />
        <Chatbot />
      </main>

      {/* FORCE HIDE GOOGLE UI ELEMENTS */}
      <style>{`
        .goog-te-banner-frame, .goog-te-balloon-frame, .goog-te-gadget-icon { display: none !important; }
        .goog-te-menu-value span:nth-child(2) { display: none !important; }
        .goog-te-gadget-simple { background: transparent !important; border: none !important; }
        body { top: 0 !important; }
        .VIpgJd-ZVi9nd-ORHb-nS19Ww { display: none !important; } 
      `}</style>
    </div>
  );
};

export default Index;
