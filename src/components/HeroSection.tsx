import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HeroSection = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const texts = ["Learn Faster", "Think Deeper", "Study Smarter"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "conic-gradient(from 0deg at 50% 50%, #0a0a0f, #1a0533, #0d1b4a, #0a0a0f)",
            "conic-gradient(from 90deg at 50% 50%, #0a0a0f, #1a0533, #0d1b4a, #0a0a0f)",
            "conic-gradient(from 180deg at 50% 50%, #0a0a0f, #1a0533, #0d1b4a, #0a0a0f)",
            "conic-gradient(from 270deg at 50% 50%, #0a0a0f, #1a0533, #0d1b4a, #0a0a0f)",
            "conic-gradient(from 360deg at 50% 50%, #0a0a0f, #1a0533, #0d1b4a, #0a0a0f)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 text-center">
        {/* Glassmorphism Card */}
        <motion.div
          className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Typewriter Headline */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-clash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="text-white">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentTextIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block"
                >
                  {texts[currentTextIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Transform your study sessions with AI-powered learning that adapts to your unique style
          </motion.p>

          {/* CTA Button with Static Gradient */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <motion.button
              className="px-8 py-3.5 text-lg font-semibold text-white rounded-xl"
              style={{
                background: "linear-gradient(135deg, #a855f7, #6366f1)",
                borderRadius: "12px",
                padding: "14px 32px",
                fontWeight: 600,
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Learning Free
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 w-full min-w-0">
              <div className="text-3xl font-bold text-purple-400 mb-2">50,000+</div>
              <div className="text-sm text-gray-400">Active Students</div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 w-full min-w-0">
              <div className="text-3xl font-bold text-indigo-400 mb-2">4.9★</div>
              <div className="text-sm text-gray-400">User Rating</div>
            </div>
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 w-full min-w-0">
              <div className="text-3xl font-bold text-purple-400 mb-2">200+</div>
              <div className="text-sm text-gray-400">Study Topics</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Neural Network SVG */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 opacity-20"
          animate={{
            rotate: [0, 360],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="8" fill="currentColor" className="text-purple-400" />
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <g key={i}>
                <line
                  x1="50"
                  y1="50"
                  x2={50 + 30 * Math.cos((angle * Math.PI) / 180)}
                  y2={50 + 30 * Math.sin((angle * Math.PI) / 180)}
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-indigo-400"
                />
                <circle
                  cx={50 + 30 * Math.cos((angle * Math.PI) / 180)}
                  cy={50 + 30 * Math.sin((angle * Math.PI) / 180)}
                  r="4"
                  fill="currentColor"
                  className="text-purple-400"
                />
              </g>
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Scroll to Explore Chevron */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, -10, 0],
          opacity: scrollY > 100 ? 0 : 1,
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
          opacity: {
            duration: 0.3,
          },
        }}
      >
        <div className="flex flex-col items-center text-gray-400">
          <span className="text-sm mb-2">Scroll to explore</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;