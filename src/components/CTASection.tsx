import { useEffect, useRef } from "react";

const CTASection = () => {
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
    <section id="cta" className="relative z-[1] py-36 px-[5%] text-center" ref={ref}>
      <div className="max-w-[700px] mx-auto relative">
        <div className="absolute w-[500px] h-[300px] bg-[radial-gradient(ellipse,rgba(124,58,237,0.25)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="relative inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-5 fade-up">
          ✦ Get Started
        </div>
        <h2 className="relative font-heading text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight tracking-tight mb-5 fade-up fade-up-d1">
          Ready to study smarter?
        </h2>
        <p className="relative text-muted-foreground text-lg font-light max-w-[520px] mx-auto leading-relaxed mb-12 text-center fade-up fade-up-d2">
          Download free and start saving hours every week. No sign-up, no credit card.
        </p>
        <a href="#download" className="relative btn-gradient text-primary-foreground px-8 py-3.5 rounded-xl no-underline font-semibold text-base inline-flex items-center gap-2 transition-all fade-up fade-up-d3">
          ⬇️ Download Brainify AI — Free
        </a>
        <p className="relative text-dim text-xs mt-4 fade-up fade-up-d4">Windows · macOS · Linux · Free forever</p>
      </div>
    </section>
  );
};

export default CTASection;
