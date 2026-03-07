import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import introVideo from "./assets/intro.mp4";

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
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Check if the user has already seen the intro this session
    const hasSeenIntro = sessionStorage.getItem("hasSeenIntro");
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleFinishIntro = () => {
    sessionStorage.setItem("hasSeenIntro", "true");
    setShowIntro(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* INTRO OVERLAY */}
        <AnimatePresence>
          {showIntro && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
            >
              <video
                autoPlay
                muted
                playsInline
                onEnded={handleFinishIntro}
                className="w-full h-full object-cover"
              >
                <source src={introVideo} type="video/mp4" />
              </video>

              {/* SKIP BUTTON */}
              <button
                onClick={handleFinishIntro}
                className="absolute bottom-12 right-12 text-[10px] font-black uppercase tracking-[0.3em] text-orange-600 border border-orange-600/30 px-6 py-3 rounded-full hover:bg-orange-600 hover:text-white transition-all duration-300 z-[10000]"
              >
                Skip Intro
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MAIN APP CONTENT */}
        <div className={showIntro ? "hidden" : "block"}>
          <BrowserRouter>
            <Routes>
              {/* ROUTES WITH NAVBAR & FOOTER */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/scoretable" element={<Scoretable />} />
              </Route>

              {/* ROUTES WITHOUT NAVBAR (Clean Login) */}
              <Route path="/login" element={<AuthPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
