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
  }
}

const GoogleTranslate = () => {
  const [selectedLang, setSelectedLang] = useState("en");

  // Load Google Translate script and initialize widget only once on mount
  useEffect(() => {
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }

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
      }
    };
  }, []);

  // Watch selectedLang change and trigger language switch on Google widget
  useEffect(() => {
    if (selectedLang === "en") {
      // Reload page to reset to original language (or clear cookies if preferred)
      window.location.reload();
      return;
    }

    const interval = setInterval(() => {
      const select = document.querySelector<HTMLSelectElement>("#google_translate_element select");
      if (select) {
        select.value = selectedLang;
        select.dispatchEvent(new Event("change"));
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [selectedLang]);

  return (
    <>
      {/* Hidden container for Google Translate widget */}
      <div
        id="google_translate_element"
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
        }}
      ></div>

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


