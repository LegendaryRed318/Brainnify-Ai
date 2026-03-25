import { useState } from "react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState<"macos" | "linux">("macos");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const ref = useInViewAnimation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("https://formsubmit.co/ajax/LegendaryRed318@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          platform: platform === "macos" ? "macOS" : "Linux",
          _subject: `Brainify AI Waitlist - ${platform === "macos" ? "macOS" : "Linux"}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="waitlist" className="relative z-[1] py-24" ref={ref}>
      <div className="container">
        <div className="fade-up max-w-2xl mx-auto bg-surface border border-border rounded-2xl p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.05] to-accent/[0.03] pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-6">
              ✦ Coming Soon
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold leading-tight tracking-tight mb-4">
              Get notified when<br />your platform launches
            </h2>
            <p className="text-muted-foreground text-sm font-light leading-relaxed mb-8 max-w-md mx-auto">
              macOS & Linux versions are in development. Join the waitlist and we'll let you know when they're ready.
            </p>

            {/* Platform toggle */}
            <div className="flex justify-center gap-2 mb-8">
              <button
                onClick={() => setPlatform("macos")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  platform === "macos"
                    ? "bg-primary/20 border border-primary/40 text-electric"
                    : "bg-foreground/5 border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                🍎 macOS
              </button>
              <button
                onClick={() => setPlatform("linux")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  platform === "linux"
                    ? "bg-primary/20 border border-primary/40 text-electric"
                    : "bg-foreground/5 border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                🐧 Linux
              </button>
            </div>

            {status === "success" ? (
              <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-6 text-emerald-300 text-sm font-medium">
                ✅ Thanks for your interest! We'll reach out when {platform === "macos" ? "macOS" : "Linux"} is ready.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === "loading"}
                  className="flex-1 bg-foreground/[0.05] border border-border rounded-xl px-5 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-gradient text-primary-foreground px-7 py-3.5 rounded-xl font-semibold text-sm transition-all shrink-0 disabled:opacity-50 hover:scale-105"
                >
                  {status === "loading" ? "Sending..." : "Join Waitlist"}
                </button>
              </form>
            )}

            {status === "error" && (
              <p className="text-destructive text-sm mt-3">Something went wrong. Please try again.</p>
            )}

            <p className="text-dim text-xs mt-5">No spam, ever. Just one email when your platform is ready.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
