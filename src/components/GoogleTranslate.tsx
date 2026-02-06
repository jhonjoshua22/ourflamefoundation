import { useEffect, useState } from "react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  // ... rest of your languages
];

const GoogleTranslate = () => {
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    // 1. Setup the Init function for Google
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: LANGUAGES.map((l) => l.code).join(","),
          // Use SIMPLE layout to keep it lightweight
          layout: window.google?.translate?.TranslateElement?.InlineLayout?.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    // 2. Add script if not exists
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    const changeLanguage = () => {
      const googleSelect = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      
      if (googleSelect) {
        googleSelect.value = selectedLang;
        googleSelect.dispatchEvent(new Event("change"));
      } else {
        // If the widget isn't ready yet, try again in 100ms
        setTimeout(changeLanguage, 100);
      }
    };

    if (selectedLang) {
      changeLanguage();
    }
  }, [selectedLang]);

  return (
    <>
      {/* Hidden Google Widget */}
      <div id="google_translate_element" style={{ display: "none" }} />

      {/* Your Custom UI */}
      <select
        value={selectedLang}
        onChange={(e) => setSelectedLang(e.target.value)}
        style={selectStyle}
      >
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>{label}</option>
        ))}
      </select>

      {/* CSS to hide the Google "Top Bar" frame that appears after translation */}
      <style>{`
        body { top: 0 !important; }
        .goog-te-banner-frame { display: none !important; }
        .goog-te-menu-value { display: none !important; }
        .goog-tooltip { display: none !important; }
        .goog-tooltip:hover { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; box-shadow: none !important; }
      `}</style>
    </>
  );
};

const selectStyle: React.CSSProperties = {
  position: "fixed",
  bottom: "20px",
  left: "20px",
  zIndex: 10000,
  padding: "8px",
  borderRadius: "4px"
};

export default GoogleTranslate;
