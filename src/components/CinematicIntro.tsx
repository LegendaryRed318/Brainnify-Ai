import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const CinematicIntro = ({ onComplete }: Props) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Check if intro was shown this session
    const hasShownIntro = sessionStorage.getItem("brainify_intro_shown");
    
    if (hasShownIntro) {
      setShow(false);
      onComplete();
      return;
    }

    // Mark as shown
    sessionStorage.setItem("brainify_intro_shown", "true");

    // Auto-hide after 3.5s
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 800); // Wait for exit animation
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
        style={{ background: "#0a0a0f" }}
        initial={{ opacity: 1, y: 0 }}
        exit={{ 
          opacity: 0, 
          y: "-100%",
          transition: {
            type: "spring",
            stiffness: 80,
            damping: 15
          }
        }}
      >
        {/* Simple animated background dots instead of particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Brain Logo */}
        <motion.img
          src="/logo-brain-transparent.png"
          alt="Brainify"
          style={{
            width: 120,
            height: 120,
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 25px #a855f7) drop-shadow(0 0 50px #7c3aed)',
          }}
          initial={{ opacity: 0, scale: 0.3, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, type: 'spring', stiffness: 80, damping: 14 }}
        />

        {/* Logo with Neon Glow - No background container */}
        <motion.h1
          className="relative z-10 text-6xl md:text-8xl lg:text-9xl font-bold text-center font-clash"
          style={{
            fontFamily: 'Clash Display, sans-serif',
            fontWeight: 800,
            fontSize: '5rem',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            textShadow: [
              "0 0 20px #a855f7, 0 0 40px #a855f7, 0 0 80px #7c3aed",
              "0 0 30px #8b5cf6, 0 0 60px #8b5cf6, 0 0 120px #6366f1",
              "0 0 25px #a855f7, 0 0 50px #a855f7, 0 0 100px #7c3aed",
              "0 0 20px #a855f7, 0 0 40px #a855f7, 0 0 80px #7c3aed",
            ],
          }}
          transition={{ 
            type: "spring", 
            stiffness: 100, 
            damping: 15,
            delay: 0.4
          }}
        >
          Brainify
        </motion.h1>
          
        {/* Subtitle */}
        <motion.p
          className="text-center mt-6 text-gray-400 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          The Future of Learning
        </motion.p>

        {/* Skip Button */}
        <motion.button
          className="absolute bottom-8 right-8 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          onClick={() => {
            setShow(false);
            setTimeout(onComplete, 800);
          }}
        >
          Skip →
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
};

export default CinematicIntro;