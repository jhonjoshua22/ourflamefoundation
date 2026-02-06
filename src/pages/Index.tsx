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

// Extend the window interface for TypeScript
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const Index = () => {
  useEffect(() => {
    // 1. Initialize Google Translate
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

    // 2. Inject Script
    const addScript = document.createElement("script");
    addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      
      {/* LANGUAGE SWITCHER: Bottom-Left, Label Above, No Logo */}
      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col-reverse items-start gap-2">
        
        {/* The Dropdown (At the bottom, forces list to open upwards) */}
        <div 
          id="google_translate_element" 
          className="hover:scale-105 transition-transform duration-300"
        />

        {/* The Label (Appears above the dropdown) */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/60 backdrop-blur-md border border-flame-orange/20 shadow-lg pointer-events-none">
          <Globe className="w-3.5 h-3.5 text-flame-orange animate-flicker" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-flame-orange/80">
            Select Language
          </span>
        </div>
      </div>

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
