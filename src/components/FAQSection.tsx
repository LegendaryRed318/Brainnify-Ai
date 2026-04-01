import { useState } from "react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const faqs = [
  { q: "Is it really free?", a: "Yes — download free, no credit card needed. The free plan gives you 10 AI generations every day, permanently. Upgrade to Scholar Mode only when you want more." },
  { q: "What platforms does it run on?", a: "Brainify AI is currently available on Windows 10/11. macOS and Linux versions are in development and coming soon — join the waitlist to be notified." },
  { q: "What kinds of content can I use?", a: "You can paste text directly, upload a PDF, paste a YouTube transcript, or drop in an article URL. Works with any text-based content from any subject." },
  { q: "How accurate is the AI?", a: "Brainify uses Gemini 2.0 Flash, one of Google's most capable models. It works directly from your content — so accuracy depends on what you feed it. Always cross-check critical facts." },
  { q: "How do I cancel Scholar Mode?", a: "Cancel any time from your account settings. You keep Scholar Mode access until the end of your billing period. No questions asked." },
  { q: "Is my study content stored or shared?", a: "No. Your content is processed through the Gemini API to generate study kits but is never stored on our servers or shared with third parties." },
  { q: "Will there be a mobile app?", a: "Yes! iOS and Android apps are planned and will launch after the PC release. Stay tuned for updates." },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [question, setQuestion] = useState("");
  const [qStatus, setQStatus] = useState<"idle" | "loading" | "sent">("idle");
  const ref = useInViewAnimation();

  const filtered = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
  );

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setQStatus("loading");
    try {
      await fetch("https://formsubmit.co/ajax/LegendaryRed318@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ question, _subject: "Brainify AI — User Question" }),
      });
      setQStatus("sent");
      setQuestion("");
    } catch {
      setQStatus("idle");
    }
  };

  return (
    <section id="faq" className="relative z-[1] py-28" ref={ref}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-20 items-start max-w-5xl mx-auto">
          <div className="fade-up">
            <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-6">
              ✦ FAQ
            </div>
            <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight mb-4">
              Questions?<br />We've got<br />answers.
            </h2>
            <p className="text-muted-foreground text-base font-light leading-relaxed">
              Can't find what you're looking for? Ask us below.
            </p>
          </div>

          <div className="flex flex-col fade-up fade-up-d1">
            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-foreground/[0.04] border border-border rounded-xl px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] transition-all"
              />
            </div>

            {filtered.map((faq, i) => (
              <div key={i} className="border-b border-border overflow-hidden">
                <button
                  className="w-full flex items-center justify-between py-6 font-medium text-sm text-foreground select-none gap-4 hover:text-electric transition-colors text-left"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpenIndex(openIndex === i ? null : i); } }}
                >
                  {faq.q}
                  <div className={`shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-sm text-muted-foreground transition-all duration-300 ${openIndex === i ? "rotate-45 bg-primary/20 border-primary text-electric" : ""}`}>
                    +
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: openIndex === i ? "200px" : "0px",
                    opacity: openIndex === i ? 1 : 0,
                  }}
                >
                  <div className="pb-5 text-muted-foreground text-sm font-light leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <p className="text-muted-foreground text-sm py-6">No matching questions found.</p>
            )}

            {/* Question micro-form */}
            <div className="mt-8 bg-surface border border-border rounded-xl p-6">
              <p className="text-sm font-medium text-foreground mb-3">What's your biggest question about Brainify?</p>
              {qStatus === "sent" ? (
                <p className="text-emerald-400 text-sm">✅ Thanks! We'll get back to you.</p>
              ) : (
                <form onSubmit={handleQuestionSubmit} className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Type your question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="flex-1 bg-foreground/[0.04] border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
                  />
                  <button type="submit" disabled={qStatus === "loading"} className="bg-primary/20 border border-primary/30 text-electric px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/30 transition-all disabled:opacity-50">
                    {qStatus === "loading" ? "..." : "Ask"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
