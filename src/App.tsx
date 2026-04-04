import { useState, useEffect } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { useLenis } from "@/hooks/useLenis";
import CursorGlow from "@/components/CursorGlow";
import CinematicIntro from "@/components/CinematicIntro";
import Index from "./pages/Index.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import NotFound from "./pages/NotFound.tsx";

// Global animation preference
const shouldAnimate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const queryClient = new QueryClient();

const App = () => {
  const alreadySeen = sessionStorage.getItem('brainify_intro_shown') === 'true';
  const [showIntro, setShowIntro] = useState(!alreadySeen);

  const handleIntroComplete = () => {
    sessionStorage.setItem('brainify_intro_shown', 'true');
    setShowIntro(false);
  };

  useLenis();
  
  useEffect(() => {
    // Make shouldAnimate globally available
    (window as any).shouldAnimate = shouldAnimate;
  }, []);
  
  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <CinematicIntro key="intro" onComplete={handleIntroComplete} />
        )}
      </AnimatePresence>

      <motion.div
        style={{ visibility: showIntro ? 'hidden' : 'visible' }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              {shouldAnimate && <CursorGlow />}
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </QueryClientProvider>
        </ErrorBoundary>
      </motion.div>

      {/* Development reset button */}
      <button 
        onClick={() => { 
          sessionStorage.clear(); 
          window.location.reload(); 
        }} 
        style={{
          position:'fixed',
          bottom:8,
          left:8,
          zIndex:99999,
          fontSize:10,
          opacity:0.3
        }}
      >
        reset intro
      </button>
    </>
  );
};

export default App;
