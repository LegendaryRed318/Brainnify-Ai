import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { BrainifyLogo } from "@/components/BrainifyLogo";

const navLinks = [
  { href: "#features", label: "Features" },
  { href: "#how", label: "How it works" },
  { href: "#subjects", label: "✦ Popular Subjects" },
  { href: "#comparison", label: "✦ Why Switch" },
  { href: "#pricing", label: "Pricing" },
  { href: "#download", label: "Download" },
];

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();
  
  // Transform scrollY to background opacity and border
  const backgroundColor = useTransform(scrollY, [0, 50], [0, 0.4]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 0.1]);
  const scrollProgress = useTransform(scrollY, [0, 1000], [0, 100]);

  useEffect(() => {
    const sections = navLinks.map(l => l.href.slice(1)).map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] px-[5%] h-[72px] flex items-center justify-between transition-all duration-300"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${backgroundColor})`,
          backdropFilter: scrollY.get() > 50 ? "blur(12px)" : "none",
          borderBottom: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <motion.a 
          href="#" 
          className="no-underline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BrainifyLogo size={36} showText={true} />
        </motion.a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className={`relative no-underline text-sm font-medium transition-colors ${
                activeSection === link.href 
                  ? "text-electric" 
                  : "text-foreground/80 hover:text-foreground"
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
              {activeSection === link.href && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500"
                  layoutId="navIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.a>
          ))}
          <motion.a
            href="#download"
            className="btn-gradient text-primary-foreground px-6 py-2.5 rounded-xl no-underline font-semibold text-sm inline-flex items-center gap-2"
            whileHover={{ scale: 1.05, filter: "brightness(1.15)" }}
            whileTap={{ scale: 0.95 }}
          >
            ⬇️ Download
          </motion.a>
        </div>

        {/* Mobile menu button */}
        <motion.button
          className="lg:hidden p-2 rounded-lg bg-foreground/10 border border-border"
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-6 h-5 flex flex-col justify-center gap-1">
            <motion.div
              className="h-0.5 bg-foreground rounded-full"
              animate={open ? { rotate: 45, y: 8 } : {}}
            />
            <motion.div
              className="h-0.5 bg-foreground rounded-full"
              animate={open ? { opacity: 0 } : {}}
            />
            <motion.div
              className="h-0.5 bg-foreground rounded-full"
              animate={open ? { rotate: -45, y: -8 } : {}}
            />
          </div>
        </motion.button>
      </motion.nav>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-[72px] left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 z-[101] origin-left"
        style={{ scaleX: scrollProgress.get() / 100 }}
        initial={{ scaleX: 0 }}
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[99] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-80 max-w-[80vw] bg-surface border-l border-border shadow-2xl p-6"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-8">
                <BrainifyLogo size={32} showText={true} />
                <motion.button
                  className="p-2 rounded-lg bg-foreground/10 border border-border"
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ✕
                </motion.button>
              </div>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    className={`no-underline text-sm font-medium p-3 rounded-lg transition-colors ${
                      activeSection === link.href 
                        ? "bg-primary/20 text-electric" 
                        : "text-foreground/80 hover:text-foreground hover:bg-foreground/5"
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href="#download"
                  className="btn-gradient text-primary-foreground px-6 py-3 rounded-xl no-underline font-semibold text-sm inline-flex items-center justify-center gap-2 mt-4"
                  whileHover={{ scale: 1.05, filter: "brightness(1.15)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOpen(false)}
                >
                  ⬇️ Download
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
