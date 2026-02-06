import { useEffect } from "react";
// ... (your other imports)
import { Globe } from "lucide-react"; // Import Globe for a better UI icon

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
    addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    addScript.async = true;
    document.body.appendChild(addScript);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      
      {/* IMPROVED UI: Bottom-Left Language Switcher */}
      <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start group">
        <div className="flex items-center gap-2 mb-2 bg-card/80 backdrop-blur-md border border-border/50 p-2 px-3 rounded-full shadow-lg">
          <Globe className="w-4 h-4 text-flame-orange animate-flicker" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
            Select Language
          </span>
        </div>
        
        {/* The Google Element Container */}
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
