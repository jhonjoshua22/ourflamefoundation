import { useEffect, useState, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { Globe, Music, Music2 } from "lucide-react"; // Added music icons

const LANGUAGES = [
  { code: "en", label: "English" }, { code: "es", label: "Spanish" },
  { code: "fr", label: "French" }, { code: "de", label: "German" },
  { code: "zh-CN", label: "Chinese" }, { code: "ar", label: "Arabic" },
  { code: "hi", label: "Hindi" }, { code: "ja", label: "Japanese" },
];

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [isMuted, setIsMuted] = useState(false); // Added mute tracking state
  const menuRef = useRef<HTMLDivElement>(null);
  const { pathname, hash } = useLocation();

  // --- SCROLL TO HASH LOGIC ---
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [pathname, hash]);

  useEffect(() => {
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: LANGUAGES.map((l) => l.code).join(","), autoDisplay: false },
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

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false);
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

  // Dispatches custom event to App.tsx
  const toggleMusic = () => {
    const event = new CustomEvent("toggleBackgroundMusic");
    window.dispatchEvent(event);
    setIsMuted(!isMuted);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div id="google_translate_element" style={{ visibility: "hidden", position: "absolute" }} />
      
      {/* Dynamic Controls Group: Music and Language */}
      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col gap-3" ref={menuRef}>
        
        {/* Music Toggle Button (Above Languages) */}
        <button 
          onClick={toggleMusic} 
          title={isMuted ? "Turn music on" : "Turn music off"}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-slate-700 border border-slate-200 shadow-xl hover:bg-slate-50 transition-all active:scale-90"
        >
          {isMuted ? <Music2 size={20} className="text-slate-400" /> : <Music size={20} className="text-orange-600" />}
        </button>

        {/* Language Button */}
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-slate-700 border border-slate-200 shadow-xl hover:bg-slate-50 transition-all active:scale-90">
            <Globe size={20} />
          </button>
          
          {isOpen && (
            <div className="absolute bottom-16 left-0 min-w-[140px] bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 max-h-[300px] overflow-y-auto">
              {LANGUAGES.map((lang) => (
                <button key={lang.code} onClick={() => changeLanguage(lang.code)} className={`w-full text-left px-4 py-2 text-sm ${currentLang === lang.code ? "bg-blue-50 text-blue-600 font-semibold" : "text-slate-600 hover:bg-slate-50"}`}>
                  {lang.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <Navbar />
      <main><Outlet /></main>
      <Footer />
      <Chatbot />

      <style>{`
        .goog-te-banner-frame, .goog-te-balloon-frame, .goog-te-gadget-icon { display: none !important; }
        body { top: 0 !important; }
      `}</style>
    </div>
  );
};

export default MainLayout;
