import { useState, useEffect, useRef } from "react";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState<"macos" | "linux">("macos");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const subject = encodeURIComponent(`Brainify AI Waitlist - ${platform === "macos" ? "macOS" : "Linux"}`);
    const body = encodeURIComponent(`Hi! I'd like to join the waitlist for Brainify AI on ${platform === "macos" ? "macOS" : "Linux"}.\n\nEmail: ${email}\nPlatform: ${platform === "macos" ? "macOS" : "Linux"}`);
    window.open(`mailto:LegendaryRed318@gmail.com?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="relative z-[1] py-24" ref={ref}>
      <div className="container">
        <div className="fade-up max-w-[600px] mx-auto bg-surface border border-border rounded-2xl p-10 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-accent/[0.03] pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-5">
              ✦ Coming Soon
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold leading-snug tracking-tight mb-4">
              Get notified when<br />your platform launches
            </h2>
            <p className="text-muted-foreground text-sm font-light leading-relaxed mb-8">
              macOS & Linux versions are in development. Join the waitlist and we'll let you know when they're ready.
            </p>

            {/* Platform toggle */}
            <div className="flex justify-center gap-2 mb-6">
              <button
                onClick={() => setPlatform("macos")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  platform === "macos"
                    ? "bg-primary/20 border border-primary/40 text-electric"
                    : "bg-foreground/5 border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                🍎 macOS
              </button>
              <button
                onClick={() => setPlatform("linux")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  platform === "linux"
                    ? "bg-primary/20 border border-primary/40 text-electric"
                    : "bg-foreground/5 border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                🐧 Linux
              </button>
            </div>

            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-6 text-emerald-300 text-sm font-medium">
                ✅ Thanks for your interest! We'll reach out when {platform === "macos" ? "macOS" : "Linux"} is ready.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3 max-w-[400px] mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-foreground/[0.05] border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  type="submit"
                  className="btn-gradient text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm transition-all shrink-0"
                >
                  Join Waitlist
                </button>
              </form>
            )}

            <p className="text-dim text-xs mt-4">No spam, ever. Just one email when your platform is ready.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
