import { useEffect, useRef } from "react";

const testimonials = [
  {
    text: `"I had a biology exam the next day and 60 pages of notes. Brainify turned it into <strong>flashcards in under a minute.</strong> Passed with distinction."`,
    name: "Amara K.",
    role: "A-Level Biology Student",
    avatar: "A",
    gradient: "from-primary to-accent",
  },
  {
    text: `"The <strong>Explain Simply mode is unreal.</strong> I've been struggling with economics for months. One paste and I finally understood supply and demand."`,
    name: "Josh M.",
    role: "GCSE Student",
    avatar: "J",
    gradient: "from-cyan-600 to-cyan-400",
  },
  {
    text: `"I use it every single day. <strong>Saved me so many hours</strong> of revision. The quiz feature especially is something I didn't know I needed."`,
    name: "Sophie R.",
    role: "University First Year",
    avatar: "S",
    gradient: "from-emerald-600 to-emerald-400",
  },
];

const TestimonialsSection = () => {
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
    <section id="testimonials" className="relative z-[1] py-24" ref={ref}>
      <div className="container">
        <div className="text-center mb-16 fade-up">
          <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-5">
            ✦ Social Proof
          </div>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-tight tracking-tight mb-4">Students love it</h2>
          <p className="text-muted-foreground text-lg font-light max-w-[520px] mx-auto leading-relaxed">
            See what students are saying after using Brainify AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={t.name} className={`fade-up fade-up-d${i + 1} bg-surface border border-border rounded-[14px] p-7`}>
              <div className="text-amber-400 text-sm mb-4 tracking-widest">★★★★★</div>
              <p className="text-muted-foreground text-sm leading-relaxed font-light italic mb-5" dangerouslySetInnerHTML={{ __html: t.text }} />
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center font-bold text-sm text-primary-foreground`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
