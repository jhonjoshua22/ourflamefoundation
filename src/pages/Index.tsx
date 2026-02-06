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

      // Wait until the select actually exists
      const interval = setInterval(() => {
        const select = document.querySelector(
          ".goog-te-combo"
        ) as HTMLSelectElement | null;

        const container = document.getElementById(
          "google_translate_element"
        );

        if (select && container) {
          // Force default to English
          select.value = "en";
          select.dispatchEvent(new Event("change"));

          // Reveal container (kills the dot)
          container.style.opacity = "1";

          clearInterval(interval);
        }
      }, 100);
    };

    // Inject Google Translate script
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* LANGUAGE SWITCHER */}
      <div className="fixed bottom-10 left-10 z-[9999] flex flex-col-reverse items-start gap-3">
        
        {/* Google Translate Mount Point */}
        <div
          id="google_translate_element"
          className="min-w-[180px] min-h-[40px] flex items-center justify-center opacity-0 transition-opacity duration-300"
        />

        {/* Label */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-md border border-flame-orange/30 shadow-2xl pointer-events-none">
          <Globe className="w-4 h-4 text-flame-orange animate-pulse" />
          <span className="text-[11px] uppercase font-black tracking-widest text-flame-orange">
            Select Language
          </span>
        </div>
      </div>

      {/* MAIN CONTENT */}
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
