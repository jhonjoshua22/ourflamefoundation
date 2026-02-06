import { useEffect, useState } from "react";

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
  { code: "zh-CN", label: "Chinese (Simplified)" },
  { code: "ja", label: "Japanese" },
  { code: "ru", label: "Russian" },
  { code: "ar", label: "Arabic" },
  { code: "hi", label: "Hindi" },
  { code: "pt", label: "Portuguese" },
];

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
    // Google Translate cookie function
    googleTranslateGetCurrentLang?: () => string;
  }
}

const GoogleTranslate = () => {
  const [selectedLang, setSelectedLang] = useState("en");

  useEffect(() => {
    // Remove previous google translate elements if any
    const existing = document.getElementById("google_translate_element");
    if (existing) {
      existing.remove();
    }
    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: LANGUAGES.map((l) => l.code).join(","),
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );

        // Set initial language if not English
        if (selectedLang !== "en") {
          setTimeout(() => {
            const select = document.querySelector<HTMLSelectElement>(
              "#google_translate_element select"
            );
            if (select) {
              select.value = selectedLang;
              select.dispatchEvent(new Event("change"));
            }
          }, 500);
        }
      }
    };

    return () => {
      // Cleanup script
      const oldScript = document.getElementById("google-translate-script");
      if (oldScript) oldScript.remove();
      const oldElement = document.getElementById("google_translate_element");
      if (oldElement) oldElement.remove();
    };
  }, [selectedLang]);

  return (
    <>
      {/* Hidden container for Google Translate */}
      <div id="google_translate_element" style={{ display: "none" }}></div>

      {/* Minimalist visible selector */}
      <select
        value={selectedLang}
        onChange={(e) => setSelectedLang(e.target.value)}
        style={{
          position: "fixed",
          bottom: 20,
          left: 20,
          zIndex: 9999,
          padding: "6px 12px",
          borderRadius: 4,
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          fontSize: 14,
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          appearance: "none",
          WebkitAppearance: "none",
          MozAppearance: "none",
        }}
        aria-label="Select language"
      >
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
};

export default GoogleTranslate;

