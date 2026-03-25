import { useEffect, useRef, useState } from "react";
import logo from "@/assets/brainify-logo.png";

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

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);
  const counter = useCountUp(12847, 2500);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          counter.start();
        }
      }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="relative z-[1] pt-40 pb-24 px-[5%]" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="fade-up mb-8">
          <img
            src={logo}
            alt="Brainify AI"
            className="h-16 w-16 mx-auto drop-shadow-[0_0_20px_rgba(124,58,237,0.4)] md:h-16 sm:h-12"
          />
        </div>

        {/* Badge */}
        <div className="fade-up mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/35 rounded-full px-5 py-2 text-xs font-medium text-electric tracking-wide">
            <span className="w-1.5 h-1.5 bg-electric rounded-full animate-pulse-dot" />
            Desktop App — Free to Download
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-heading text-[clamp(2.2rem,5vw,3.8rem)] font-bold leading-[1.1] tracking-tight max-w-3xl mx-auto mb-8 fade-up">
          <span className="text-foreground">Turn </span>
          <span className="gradient-text">2 hours of studying</span>
          <br />
          <span className="text-foreground">into </span>
          <span className="gradient-text">10 minutes.</span>
        </h1>

        {/* Description */}
        <p className="text-muted-foreground text-[clamp(1rem,1.8vw,1.15rem)] max-w-xl mx-auto mb-14 font-light leading-relaxed fade-up">
          Paste your notes, upload a PDF, or drop in a YouTube transcript. Brainify AI instantly creates summaries, flashcards, quizzes and simple explanations.
        </p>

        {/* CTAs */}
        <div className="flex gap-5 justify-center flex-wrap mb-6 fade-up">
          <a href="#download" className="btn-gradient text-primary-foreground px-10 py-4 rounded-xl no-underline font-semibold text-lg inline-flex items-center gap-2 transition-all hover:scale-105">
            ⬇️ Download Free
          </a>
          <a href="#how" className="btn-ghost text-foreground px-10 py-4 rounded-xl no-underline font-semibold text-lg inline-flex items-center gap-2 transition-all hover:scale-105">
            See how it works
          </a>
        </div>

        <p className="text-dim text-sm mb-10 fade-up">Windows available now · macOS & Linux coming soon · Mobile coming later</p>

        {/* Platform badges */}
        <div className="flex justify-center gap-3 flex-wrap mb-10 fade-up">
          <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/25 rounded-full px-4 py-1.5 text-xs font-medium text-electric">
            🪟 Windows 10/11
          </div>
          <div className="flex items-center gap-1.5 bg-foreground/[0.04] border border-border rounded-full px-4 py-1.5 text-xs text-muted-foreground">
            🍎 macOS 12+ <span className="bg-foreground/10 rounded px-1.5 py-0.5 text-[0.6rem] ml-1">Soon</span>
          </div>
          <div className="flex items-center gap-1.5 bg-foreground/[0.04] border border-border rounded-full px-4 py-1.5 text-xs text-muted-foreground">
            🐧 Linux <span className="bg-foreground/10 rounded px-1.5 py-0.5 text-[0.6rem] ml-1">Soon</span>
          </div>
        </div>

        {/* Student counter */}
        <div className="flex items-center justify-center gap-3 text-muted-foreground text-sm fade-up">
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
              {counter.count.toLocaleString()}
            </span>
            {" "}students already studying smarter
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
