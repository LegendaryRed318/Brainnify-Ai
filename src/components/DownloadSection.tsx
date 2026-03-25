import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const DownloadSection = () => {
  const ref = useInViewAnimation();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/downloads/Brainify-Setup.exe";
    link.download = "Brainify-Setup.exe";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const platforms = [
    { icon: "🪟", label: "Windows", primary: true, available: true },
    { icon: "🍎", label: "macOS", primary: false, available: false },
    { icon: "🐧", label: "Linux", primary: false, available: false },
  ];

  return (
    <section id="download" className="relative z-[1] py-28" ref={ref}>
      <div className="container">
        <div className="fade-up bg-surface border border-primary/30 rounded-2xl p-10 md:p-16 text-center relative overflow-hidden max-w-3xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-accent/[0.04] pointer-events-none" />

          <div className="relative inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-6">
            ✦ Download
          </div>
          <h2 className="relative font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight mb-5">
            Get Brainify AI
          </h2>
          <p className="relative text-muted-foreground text-base font-light max-w-lg mx-auto leading-relaxed mb-12">
            Free to download and use. Windows available now.
          </p>

          <div className="relative flex justify-center gap-5 flex-wrap mb-8">
            {platforms.map((dl) => (
              <button
                key={dl.label}
                onClick={dl.available ? handleDownload : undefined}
                disabled={!dl.available}
                className={`flex items-center gap-3 rounded-xl px-8 py-4 min-w-[200px] transition-all text-left ${
                  dl.primary
                    ? "btn-gradient text-primary-foreground cursor-pointer hover:scale-105"
                    : "bg-foreground/[0.03] border border-foreground/[0.08] opacity-50 cursor-default"
                }`}
              >
                <span className={`text-2xl ${!dl.available ? "grayscale" : ""}`}>{dl.icon}</span>
                <div>
                  <small className={`block text-[0.7rem] ${dl.available ? "opacity-60" : "text-muted-foreground"}`}>
                    {dl.available ? "Download for" : "Coming Soon"}
                  </small>
                  <strong className={`block text-sm font-semibold ${!dl.available ? "text-muted-foreground" : ""}`}>{dl.label}</strong>
                </div>
              </button>
            ))}
          </div>

          <p className="relative text-dim text-xs">Current version: v1.0.0 · Free · 45MB</p>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
