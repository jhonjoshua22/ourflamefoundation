import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    const addScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);
      }
    };

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    addScript();
  }, []);

  return (
    <div
      id="google_translate_element"
      style={{
        position: "fixed",
        bottom: "20px",
        left: "20px",
        zIndex: 9999,
        backgroundColor: "#fff",
        borderRadius: "4px",
        padding: "5px 10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
      }}
    ></div>
  );
};

export default GoogleTranslate;

