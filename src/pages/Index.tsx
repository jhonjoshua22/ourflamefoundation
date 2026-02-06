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

// Extend the window interface for TypeScript
declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const Index = () => {
  useEffect(() => {
    // 1. Define the initialization function
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          // Add or remove languages here
          includedLanguages: "en,es,tl,fr,de,zh-CN", 
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // 2. Add the Google script to the page
    const addScript = document.createElement("script");
    addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      {/* 3. The Dropdown Container (Fixed at top-right) */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col items-end">
        <label className="text-[10px] uppercase font-bold text-gray-500 mb-1 mr-2">
          Select Language
        </label>
        <div id="google_translate_element" className="border rounded-lg shadow-md bg-white p-1" />
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
