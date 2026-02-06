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
    };

    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);

    const interval = setInterval(() => {
      const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (select) {
        if (
          select.options.length > 0 &&
          select.options[0].text.toLowerCase().includes("select")
        ) {
          select.remove(0);
        }
        select.value = "en";
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Bottom-left Language Switcher */}
      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/40 backdrop-blur-md border border-flame-orange/20 shadow-lg animate-flicker">
          <Globe className="w-3.5 h-3.5 text-flame-orange" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-flame-orange/80">
            Language
          </span>
        </div>

        <div
          id="google_translate_element"
          className="hover:scale-105 transition-transform duration-300"
        />
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

