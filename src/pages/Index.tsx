import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import ProcessSection from "@/components/ProcessSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import AboutUsSection from "@/components/AboutUsSection";
import NewsEventsSection from "@/components/NewsEventsSection";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "zh-CN", label: "Chinese (Simplified)" },
  { code: "ar", label: "Arabic" },
  { code: "hi", label: "Hindi" },
  { code: "ja", label: "Japanese" },
];

const Index = () => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(addScript);

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: LANGUAGES.map((l) => l.code).join(","),
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element_hidden"
      );
    };

    return () => {
      document.body.removeChild(addScript);
    };
  }, []);

  const changeLanguage = (code: string) => {
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
      setLang(code);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hidden Google Translate widget */}
      <div
        id="google_translate_element_hidden"
        style={{ display: "none" }}
      ></div>

      {/* Minimalist language selector */}
      <div
        style={{
          position: "fixed",
          bottom: 10,
          left: 10,
          zIndex: 1000,
          fontFamily: "Inter, sans-serif",
        }}
      >
        <select
          value={lang}
          onChange={(e) => changeLanguage(e.target.value)}
          style={{
            background: "none",
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: "6px 12px",
            fontSize: 14,
            cursor: "pointer",
            color: "#222",
            fontWeight: 500,
          }}
          aria-label="Select Language"
        >
          {LANGUAGES.map(({ code, label }) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Your site components */}
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

