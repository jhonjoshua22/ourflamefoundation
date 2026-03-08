import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // Import a close icon
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Asset
import promoGif from "./assets/intro.gif"; // Make sure your GIF is here

// Layout & Pages
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./components/AuthPage"; 
import PrivacyPolicy from "./pages/PrivacyPolicy"; 
import TermsPage from "./pages/TermsPage"; 
import Profile from "./pages/Profile";
import Scoretable from "./pages/Scoretable";

const queryClient = new QueryClient();

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup 1.5 seconds after landing
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
      if (!hasSeenPopup) {
        setShowPopup(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    sessionStorage.setItem("hasSeenPopup", "true");
    setShowPopup(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* POPUP OVERLAY */}
        <AnimatePresence>
          {showPopup && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
              {/* Dark Blur Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closePopup}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-zinc-900 border border-zinc-800 p-2 rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
              >
                {/* X Close Button */}
                <button 
                  onClick={closePopup}
                  className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-orange-600 rounded-full text-white transition-colors"
                >
                  <X size={20} strokeWidth={3} />
                </button>

                {/* The GIF */}
                <div className="rounded-2xl overflow-hidden aspect-square bg-black">
                  <img src={promoGif} alt="Intro" className="w-full h-full object-cover" />
                </div>

                {/* Text & Action */}
                <div className="p-6 text-center">
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-2">
                    Welcome to <span className="text-orange-600">Our Flame Foundation.</span>
                  </h2>
                  <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                    Explore our initiatives and see how we are lighting the path forward together. Join us in fueling the change our community deserves.
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/scoretable" element={<Scoretable />} />
            </Route>
            <Route path="/login" element={<AuthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
