import { useEffect } from "react";
import Lenis from "lenis";
import { useScroll } from "framer-motion";

export const useLenis = () => {
  const { scrollY } = useScroll();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Sync with Framer Motion's scroll
    lenis.on('scroll', ({ scroll }) => {
      // Update Framer Motion's scrollY if needed
      window.dispatchEvent(new CustomEvent('lenis-scroll', { detail: scroll }));
    });

    return () => {
      lenis.destroy();
    };
  }, []);
};
