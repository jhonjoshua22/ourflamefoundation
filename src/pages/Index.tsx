import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot"; 
import AboutUsSection from "@/components/AboutUsSection";
import NewsEventsSection from "@/components/NewsEventsSection";
import { Globe } from "lucide-react";

// Extend window for Google Translate
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const Index = () => {
  useEffect(() => {
    // 1. Initialize Google Translate with the "Simple" layout
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,es,tl,fr,de,zh-CN",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // 2. Load the Google Script
    const addScript = document.createElement("script");
    addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      
      {/* LANGUAGE SWITCHER UI 
          - fixed bottom-10 left-10: Places in bottom-left corner
          - flex-col-reverse: Places the Label ABOVE the Select box
          - z-[9999]: Ensures it stays on top of all other sections
      */}
      <div className="fixed bottom-10 left-10 z-[9999] flex flex-col-reverse items-start gap-3">
        
        {/* The Google Dropdown Container */}
        <div 
          id="google_translate_element" 
          className="hover:scale-105 transition-transform duration-300 min-h-[40px]"
        />

        {/* The Themed "Flame" Label */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md border border-flame-orange/30 shadow-2xl pointer-events-none">
          <Globe className="w-4 h-4 text-flame-orange animate-pulse" />
          <span className="text-[11px] uppercase font-black tracking-widest text-flame-orange">
            Select Language
          </span>
        </div>
      </div>

      {/* Main Sections */}
      <Navbar />
      <HeroSection />
      <ImpactSection />
      <AboutUsSection />
      <NewsEventsSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
