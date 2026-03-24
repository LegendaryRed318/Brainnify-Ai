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

  const platforms = [
    { icon: "🪟", label: "Windows", primary: true, available: true },
    { icon: "🍎", label: "macOS", primary: false, available: false },
    { icon: "🐧", label: "Linux", primary: false, available: false },
  ];

  return (
    <section id="download" className="relative z-[1] py-28" ref={ref}>
      <div className="container">
        <div className="fade-up bg-surface border border-primary/30 rounded-[20px] p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-accent/[0.04] pointer-events-none" />

          <div className="relative inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-5">
            ✦ Download
          </div>
          <h2 className="relative font-heading text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-snug tracking-tight mb-5">
            Get Brainify AI
          </h2>
          <p className="relative text-muted-foreground text-lg font-light max-w-[520px] mx-auto leading-relaxed mb-12">
            Free to download and use. Windows available now.
          </p>

          <div className="relative flex justify-center gap-4 flex-wrap mb-8">
            {platforms.map((dl) => (
              <div
                key={dl.label}
                className={`flex items-center gap-3 rounded-xl px-6 py-3.5 min-w-[180px] transition-all ${
                  dl.primary
                    ? "btn-gradient text-primary-foreground cursor-pointer hover:-translate-y-0.5"
                    : "bg-foreground/[0.03] border border-foreground/[0.08] opacity-50 cursor-default"
                }`}
              >
                <span className={`text-2xl ${!dl.available ? "grayscale" : ""}`}>{dl.icon}</span>
                <div className="text-left">
                  <small className={`block text-[0.7rem] ${dl.available ? "opacity-50" : "text-muted-foreground"}`}>
                    {dl.available ? "Download for" : "Coming Soon"}
                  </small>
                  <strong className={`block text-sm font-semibold ${!dl.available ? "text-muted-foreground" : ""}`}>{dl.label}</strong>
                </div>
              </div>
            ))}
          </div>

          <p className="relative text-dim text-xs">Current version: v1.0.0 · Free · 45MB</p>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
