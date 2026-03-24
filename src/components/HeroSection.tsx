import { useEffect, useRef } from "react";

const HeroSection = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="relative z-[1] pt-40 pb-24 px-[5%] text-center" ref={ref}>
      <div className="fade-up visible">
        <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/35 rounded-full px-4 py-1.5 text-xs font-medium text-electric tracking-wide mb-8">
          <span className="w-1.5 h-1.5 bg-electric rounded-full animate-pulse-dot" />
          Desktop App — Free to Download
        </div>
      </div>

      <h1 className="font-heading text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-[1.1] tracking-tight mb-8 gradient-text fade-up visible">
        Turn 2 hours of studying<br />into 10 minutes.
      </h1>

      <p className="text-[clamp(1rem,2.2vw,1.15rem)] text-muted-foreground max-w-[560px] mx-auto mb-14 font-light leading-[1.8] fade-up visible">
        Paste your notes, upload a PDF, or drop in a YouTube transcript. Brainify AI instantly creates summaries, flashcards, quizzes and simple explanations.
      </p>

      <div className="flex gap-4 justify-center flex-wrap mb-5 fade-up visible">
        <a href="#download" className="btn-gradient text-primary-foreground px-8 py-3.5 rounded-xl no-underline font-semibold text-base inline-flex items-center gap-2 transition-all">
          ⬇️ Download Free
        </a>
        <a href="#how" className="btn-ghost text-foreground px-8 py-3.5 rounded-xl no-underline font-semibold text-base inline-flex items-center gap-2 transition-all">
          See how it works
        </a>
      </div>

      <p className="text-dim text-xs mb-10 fade-up visible">Free forever · No credit card needed · Windows only (Mac & Linux coming soon)</p>

      <div className="flex justify-center gap-2.5 flex-wrap mb-12 fade-up visible">
        {["🪟 Windows 10/11", "🍎 macOS 12+", "🐧 Linux"].map((os) => (
          <div key={os} className="flex items-center gap-1.5 bg-foreground/[0.04] border border-border rounded-full px-3 py-1 text-xs text-muted-foreground">
            {os}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 text-muted-foreground text-sm fade-up visible">
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
              className={`w-[30px] h-[30px] rounded-full border-2 border-background ${bg} flex items-center justify-center text-xs font-semibold text-primary-foreground ${i > 0 ? "-ml-2" : ""}`}
            >
              {["A", "J", "S", "M", "R"][i]}
            </div>
          ))}
        </div>
        Join students already using Brainify AI
      </div>
    </section>
  );
};

export default HeroSection;
