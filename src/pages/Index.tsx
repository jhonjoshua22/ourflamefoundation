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
    // Initialize Google Translate
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

      // Force default language to English
      setTimeout(() => {
        const select = document.querySelector(
          ".goog-te-combo"
        ) as HTMLSelectElement | null;

        if (select) {
          select.value = "en";
          select.dispatchEvent(new Event("change"));
        }
      }, 800);
    };

    // Load Google Translate script
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Language Switcher */}
      <div className="fixed bottom-10 left-10 z-[9999] flex flex-col-reverse items-start gap-3">
        {/* Google Dropdown */}
        <div
          id="google_translate_element"
          className="hover:scale-105 transition-transform duration-300"
        />

        {/* Flame Label */}
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

