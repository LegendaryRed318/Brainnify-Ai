import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import logo from "@/assets/logo-brain-transparent.png";

const useCountUp = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);

  return { count, start: () => setStarted(true) };
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const counter = useCountUp(12847, 2500);
  const [liveExtra, setLiveExtra] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
      counter.start();
    }
  }, [isInView]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveExtra((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, (Math.random() * 45 + 45) * 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTryIt = useCallback(() => {
    document.getElementById("tryit")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="hero" className="relative pt-32 pb-24 px-[5%] overflow-hidden" ref={ref}>

      {/* Animated background orbs */}
      <motion.div
        className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[200px] left-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)" }}
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[100px] right-[5%] w-[250px] h-[250px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)" }}
        animate={{ x: [0, -15, 0], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <motion.div
        className="max-w-[1000px] mx-auto text-center relative"
        style={{ zIndex: 1 }}
        variants={stagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Logo */}
        <motion.div className="mb-10 flex items-center justify-center" variants={fadeUp} transition={{ duration: 0.7, ease: "easeOut" }}>
          <motion.div
            className="scale-110 md:scale-125"
            style={{ filter: "drop-shadow(0 0 50px rgba(139,92,246,0.4))" }}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={logo}
              alt="Brainify AI logo"
              className="w-[200px] md:w-[300px] lg:w-[380px] object-contain"
            />
          </motion.div>
        </motion.div>

        {/* Badge */}
        <motion.div className="mb-8" variants={fadeUp} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/35 rounded-full px-5 py-2 text-xs font-medium text-electric tracking-wide">
            <span className="w-1.5 h-1.5 bg-electric rounded-full animate-pulse-dot" />
            Desktop App — Free to Download
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="font-heading text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1.15] tracking-tight max-w-[800px] mx-auto mb-8"
          variants={fadeUp}
          transition={{ duration: 0.7 }}
        >
          <span className="text-foreground">Turn </span>
          <span className="gradient-text animate-shimmer" style={{ backgroundImage: "linear-gradient(120deg, #fff 0%, hsl(275 96% 75%) 50%, #fff 100%)" }}>
            2 hours of studying
          </span>
          <br />
          <span className="text-foreground">into </span>
          <span className="gradient-text animate-shimmer" style={{ backgroundImage: "linear-gradient(120deg, #fff 0%, hsl(275 96% 75%) 50%, #fff 100%)", animationDelay: "0.5s" }}>
            10 minutes.
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-muted-foreground text-[clamp(1rem,1.8vw,1.15rem)] max-w-xl mx-auto mb-14 font-light leading-relaxed"
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          Paste your notes, upload a PDF, or drop in a YouTube transcript. Brainify AI instantly creates summaries, flashcards, quizzes and simple explanations.
        </motion.p>

        {/* CTAs */}
        <motion.div className="flex gap-5 justify-center flex-wrap mb-3" variants={fadeUp} transition={{ duration: 0.6 }}>
          <motion.a
            href="#download"
            className="btn-gradient animate-cta-pulse text-primary-foreground px-10 py-4 rounded-xl no-underline font-semibold text-lg inline-flex items-center gap-2"
            whileHover={{ scale: 1.04, filter: "brightness(1.15)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            ⬇️ Download now
          </motion.a>
          <motion.a
            href="#how"
            className="btn-ghost text-foreground px-10 py-4 rounded-xl no-underline font-semibold text-lg inline-flex items-center gap-2"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            See how it works
          </motion.a>
        </motion.div>

        <motion.p className="text-dim text-xs mb-6" variants={fadeUp}>
          No account required · 4.2 MB · Uninstall in one click
        </motion.p>
        <motion.p className="text-dim text-sm mb-10" variants={fadeUp}>
          Windows available now · macOS &amp; Linux coming soon · Mobile coming later
        </motion.p>

        {/* Platform badges */}
        <motion.div className="flex justify-center gap-3 flex-wrap mb-8" variants={fadeUp}>
          <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/25 rounded-full px-4 py-1.5 text-xs font-medium text-electric">
            🪟 Windows 10/11
          </div>
          <div className="flex items-center gap-1.5 bg-foreground/[0.04] border border-border rounded-full px-4 py-1.5 text-xs text-muted-foreground">
            🍎 macOS 12+ <span className="bg-foreground/10 rounded px-1.5 py-0.5 text-[0.6rem] ml-1">Soon</span>
          </div>
          <div className="flex items-center gap-1.5 bg-foreground/[0.04] border border-border rounded-full px-4 py-1.5 text-xs text-muted-foreground">
            🐧 Linux <span className="bg-foreground/10 rounded px-1.5 py-0.5 text-[0.6rem] ml-1">Soon</span>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div className="flex justify-center gap-3 flex-wrap mb-10" variants={fadeUp}>
          {[
            { icon: "🔒", label: "No account needed" },
            { icon: "⚡", label: "Works offline" },
            { icon: "🆓", label: "Free forever" },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-1.5 bg-foreground/[0.03] border border-border rounded-full px-3.5 py-1.5 text-[0.7rem] text-muted-foreground">
              {badge.icon} {badge.label}
            </div>
          ))}
        </motion.div>

        {/* Student counter */}
        <motion.div className="flex items-center justify-center gap-3 text-muted-foreground text-sm mb-4" variants={fadeUp}>
          <div className="flex">
            {[
              "bg-gradient-to-br from-primary to-accent",
              "bg-gradient-to-br from-cyan-600 to-cyan-400",
              "bg-gradient-to-br from-emerald-600 to-emerald-400",
              "bg-gradient-to-br from-amber-600 to-amber-400",
              "bg-gradient-to-br from-red-600 to-red-400",
            ].map((bg, i) => (
              <div
                key={i}
                className={`w-8 h-8 rounded-full border-2 border-background ${bg} flex items-center justify-center text-[11px] font-semibold text-primary-foreground ${i > 0 ? "-ml-2" : ""}`}
              >
                {["A", "J", "S", "M", "R"][i]}
              </div>
            ))}
          </div>
          <span>
            <span className="font-heading font-bold text-foreground tabular-nums">
              {(counter.count + liveExtra).toLocaleString()}
            </span>{" "}
            students already studying smarter
          </span>
        </motion.div>

        <motion.p className="text-dim text-xs mb-10" variants={fadeUp}>
          3 students joined in the last hour
        </motion.p>

        {/* Mini TryIt input */}
        <motion.div
          className="max-w-xl mx-auto"
          variants={fadeUp}
          transition={{ duration: 0.7 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="bg-surface border border-border rounded-xl p-4 relative">
            <textarea
              placeholder="Paste any notes here for a free preview..."
              className="w-full min-h-[80px] bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none"
              onClick={scrollToTryIt}
              readOnly
            />
            <button
              onClick={scrollToTryIt}
              className="absolute bottom-4 right-4 bg-primary/20 border border-primary/30 text-electric px-4 py-2 rounded-lg text-xs font-medium hover:bg-primary/30 transition-all"
            >
              Generate summary →
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;