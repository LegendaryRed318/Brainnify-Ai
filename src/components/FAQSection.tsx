import { useState, useEffect, useRef } from "react";

const faqs = [
  { q: "Is it really free?", a: "Yes — download free, no credit card needed. The free plan gives you 10 AI generations every day, permanently. Upgrade to Pro only when you want more." },
  { q: "What platforms does it run on?", a: "Brainify AI runs on Windows 10/11, macOS 12+, and Linux. Download the version for your system and you're ready in under a minute." },
  { q: "What kinds of content can I use?", a: "You can paste text directly, upload a PDF, paste a YouTube transcript, or drop in an article URL. Works with any text-based content from any subject." },
  { q: "How accurate is the AI?", a: "Brainify uses Gemini 2.0 Flash, one of Google's most capable models. It works directly from your content — so accuracy depends on what you feed it. Always cross-check critical facts." },
  { q: "How do I cancel Pro?", a: "Cancel any time from your account settings. You keep Pro access until the end of your billing period. No questions asked." },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
    <section id="faq" className="relative z-[1] py-24" ref={ref}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-20 items-start">
          <div className="fade-up">
            <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-5">
              ✦ FAQ
            </div>
            <h2 className="font-heading text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight tracking-tight mb-4">
              Questions?<br />We've got<br />answers.
            </h2>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Can't find what you're looking for? Reach out anytime.
            </p>
          </div>

          <div className="flex flex-col fade-up fade-up-d1">
            {faqs.map((faq, i) => (
              <div key={i} className="border-b border-border overflow-hidden">
                <div
                  className="flex items-center justify-between py-5 cursor-pointer font-medium text-sm text-foreground select-none gap-4 hover:text-electric transition-colors"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  {faq.q}
                  <div className={`shrink-0 w-[22px] h-[22px] rounded-full border border-border flex items-center justify-center text-sm text-muted-foreground transition-all duration-300 ${openIndex === i ? "rotate-45 bg-primary/20 border-primary text-electric" : ""}`}>
                    +
                  </div>
                </div>
                <div className={`overflow-hidden transition-all duration-350 ${openIndex === i ? "max-h-[200px]" : "max-h-0"}`}>
                  <div className="pb-4 text-muted-foreground text-sm font-light leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
