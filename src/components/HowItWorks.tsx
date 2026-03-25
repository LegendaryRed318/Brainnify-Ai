import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const steps = [
  { num: "01", title: "Download the app", desc: "Free to install on Windows. macOS and Linux coming soon. Takes less than a minute to set up." },
  { num: "02", title: "Drop in your content", desc: "Paste text, upload a PDF, or add a YouTube transcript. Brainify handles the rest." },
  { num: "03", title: "Study, save, and ace it", desc: "Your study kit is ready instantly. Quiz yourself, save to your library, and go into exams confident." },
];

const HowItWorks = () => {
  const ref = useInViewAnimation();

  return (
    <section id="how" className="relative z-[1] py-28" ref={ref}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center max-w-5xl mx-auto">
          {/* Left */}
          <div className="fade-up">
            <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-6">
              ✦ How it works
            </div>
            <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight mb-5">
              From content to<br />comprehension<br />in seconds
            </h2>

            <div className="flex flex-col">
              {steps.map((s, i) => (
                <div key={s.num} className={`flex gap-5 py-8 ${i < steps.length - 1 ? "border-b border-border" : ""}`}>
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-heading font-bold text-sm text-primary-foreground">
                    {s.num}
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold mb-2">{s.title}</h3>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <a href="#download" className="btn-gradient text-primary-foreground px-10 py-4 rounded-xl no-underline font-semibold text-base inline-flex items-center gap-2 transition-all hover:scale-105">
                ⬇️ Download Now — It's Free
              </a>
            </div>
          </div>

          {/* Right visual */}
          <div className="fade-up fade-up-d2 bg-surface border border-border rounded-2xl p-9 shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
            <div className="text-[0.7rem] tracking-widest text-muted-foreground uppercase font-semibold mb-4">📥 Input Sources</div>
            <div className="flex gap-2 flex-wrap mb-6">
              {[
                { label: "📄 Text notes", active: true },
                { label: "🎬 YouTube", active: true },
                { label: "📁 PDF", active: false },
                { label: "🔗 Article", active: false },
              ].map((chip) => (
                <div
                  key={chip.label}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium border ${
                    chip.active
                      ? "bg-primary/20 border-primary/40 text-electric"
                      : "bg-foreground/5 border-border text-muted-foreground"
                  }`}
                >
                  {chip.label}
                </div>
              ))}
            </div>

            <div className="text-center text-dim text-xl my-5">↓</div>

            <div className="bg-gradient-to-br from-primary/25 to-accent/15 border border-primary/35 rounded-xl p-4 text-center mb-5">
              <div className="text-[0.72rem] text-electric font-semibold tracking-wider uppercase mb-1">Powered by</div>
              <div className="font-heading text-base font-bold">Gemini 2.0 Flash ⚡</div>
            </div>

            <div className="text-center text-dim text-xl my-5">↓</div>

            <div className="text-[0.7rem] tracking-widest text-muted-foreground uppercase font-semibold mb-4">📤 Study Outputs</div>
            <div className="flex gap-2 flex-wrap">
              {[
                { label: "📋 Summary", cls: "bg-primary/20 text-[#c4b5fd] border-primary/30" },
                { label: "🎴 Flashcards", cls: "bg-cyan-500/15 text-cyan-200 border-cyan-500/25" },
                { label: "🧩 Quiz", cls: "bg-emerald-500/15 text-emerald-200 border-emerald-500/25" },
                { label: "💡 Simplified", cls: "bg-amber-500/15 text-amber-200 border-amber-500/25" },
              ].map((chip) => (
                <div key={chip.label} className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 border ${chip.cls}`}>
                  {chip.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
