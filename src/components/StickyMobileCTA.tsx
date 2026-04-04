import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const StickyMobileCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // Show when user scrolls past 300px
      setIsVisible(scrollY > 300);
      
      // Hide when user reaches footer
      const footer = document.getElementById('footer');
      if (footer) {
        const footerTop = footer.getBoundingClientRect().top;
        setShouldHide(scrollY + window.innerHeight > footerTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && !shouldHide && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 20
          }}
        >
          <div className="w-full bg-black/80 backdrop-blur-lg border-t border-white/10 p-4">
            <a
              href="#download"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg text-center block transition-all hover:scale-105"
            >
              Download Free — 4.2MB
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyMobileCTA;
