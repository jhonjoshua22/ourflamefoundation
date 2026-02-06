import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Function to load the Google Translate script
    const addScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);
      }
    };

    // This function is called by the Google script after it loads
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en", // Your default site language
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
      style={{ marginLeft: "auto", marginRight: "10px" }} // adjust styling as needed
    ></div>
  );
};

export default GoogleTranslate;
