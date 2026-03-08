import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Assets
import promoGif from "./assets/intro.gif";
import introAudio from "./assets/intro.mp3";

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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize Audio
    audioRef.current = new Audio(introAudio);
    audioRef.current.loop = true;

    // Show popup after 1.5 seconds if not seen
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
      if (!hasSeenPopup) {
        setShowPopup(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    // Start music on user action
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play blocked", e));
    }
    sessionStorage.setItem("hasSeenPopup", "true");
    setShowPopup(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* POPUP MODAL */}
        <AnimatePresence>
          {showPopup && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closePopup}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-zinc-900 border border-zinc-800 p-2 rounded-3xl max-w-md w-full"
              >
                <button 
                  onClick={closePopup}
                  className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-orange-600 rounded-full text-white transition-colors"
                >
                  <X size={20} strokeWidth={3} />
                </button>

                <div className="rounded-2xl overflow-hidden aspect-square bg-black">
                  <img src={promoGif} alt="Intro" className="w-full h-full object-cover" />
                </div>

                <div className="p-6 text-center">
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-2">
                    Welcome to <span className="text-orange-600">Our Flame Foundation</span>
                  </h2>
                  <p className="text-zinc-400 text-sm font-medium leading-relaxed">
                    Igniting potential and building a legacy that lasts. <br />
                    Join us in fueling the change our community deserves.
                  </p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ROUTING */}
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
