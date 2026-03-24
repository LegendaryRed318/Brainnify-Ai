import { useEffect, useRef } from "react";

const DownloadSection = () => {
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
    <section id="download" className="relative z-[1] py-24" ref={ref}>
      <div className="container">
        <div className="fade-up bg-surface border border-primary/30 rounded-[20px] p-16 md:p-16 p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-accent/[0.04] pointer-events-none" />

          <div className="relative inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-5">
            ✦ Download
          </div>
          <h2 className="relative font-heading text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight tracking-tight mb-4">
            Get Brainify AI
          </h2>
          <p className="relative text-muted-foreground text-lg font-light max-w-[520px] mx-auto leading-relaxed mb-12">
            Free to download and use. Available on all major platforms.
          </p>

          <div className="relative flex justify-center gap-4 flex-wrap mb-8">
            {[
              { icon: "🪟", label: "Windows", primary: true },
              { icon: "🍎", label: "macOS", primary: false },
              { icon: "🐧", label: "Linux", primary: false },
            ].map((dl) => (
              <a
                key={dl.label}
                href="#"
                className={`flex items-center gap-3 rounded-xl px-6 py-3.5 no-underline text-foreground min-w-[180px] transition-all hover:-translate-y-0.5 ${
                  dl.primary
                    ? "btn-gradient text-primary-foreground border-transparent"
                    : "bg-foreground/[0.06] border border-foreground/[0.12] hover:bg-foreground/10 hover:border-primary/40"
                }`}
              >
                <span className="text-2xl">{dl.icon}</span>
                <div className="text-left">
                  <small className="block text-[0.7rem] opacity-50">Download for</small>
                  <strong className="block text-sm font-semibold">{dl.label}</strong>
                </div>
              </a>
            ))}
          </div>

          <p className="relative text-dim text-xs">Current version: v1.0.0 · Free · 45MB</p>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
