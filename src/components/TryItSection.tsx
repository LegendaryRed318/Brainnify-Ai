import { useState, useCallback, useEffect, useRef } from "react";

const sampleTexts: Record<string, string> = {
  "🔬 Science": `Photosynthesis is the process by which green plants convert sunlight into food. Using chlorophyll in their leaves, plants absorb carbon dioxide from the air and water from the soil. With sunlight as energy, they produce glucose and release oxygen as a byproduct. This process is essential for life on Earth.`,
  "📜 History": `The French Revolution (1789–1799) was a period of radical political and societal change in France. It began with the Estates General of 1789 and ended with the formation of the French Consulate. The revolution overthrew the monarchy, established a republic, and culminated in Napoleon Bonaparte's rise to power.`,
  "⚖️ Law": `The rule of law is a fundamental principle where all persons and institutions are accountable to laws that are publicly promulgated, equally enforced, and independently adjudicated. It requires measures to ensure adherence to the principles of supremacy of the law, equality before the law, and accountability to the law.`,
  "💊 Medicine": `The human heart is a muscular organ that pumps blood through the circulatory system. It has four chambers: two atria and two ventricles. The right side pumps deoxygenated blood to the lungs, while the left side pumps oxygenated blood to the body. It beats approximately 100,000 times per day.`,
};

const summaryOutputs: Record<string, string[]> = {
  "🔬 Science": [
    "📋 Summary",
    "",
    "• Photosynthesis converts sunlight → glucose + oxygen",
    "• Key ingredient: chlorophyll (found in leaves)",
    "• Inputs: CO₂ + H₂O + light energy",
    "• Output: glucose (C₆H₁₂O₆) + O₂",
    "• Foundation of almost all food chains on Earth",
  ],
  "📜 History": [
    "📋 Summary",
    "",
    "• French Revolution lasted 1789–1799",
    "• Began with the Estates General of 1789",
    "• Overthrew the monarchy, established a republic",
    "• Culminated in Napoleon's rise to power",
    "• Radical political and societal transformation",
  ],
  "⚖️ Law": [
    "📋 Summary",
    "",
    "• Rule of law: all are accountable to public laws",
    "• Laws must be equally enforced",
    "• Independent adjudication is required",
    "• Supremacy of law over individuals",
    "• Ensures equality and accountability",
  ],
  "💊 Medicine": [
    "📋 Summary",
    "",
    "• Heart pumps blood through circulatory system",
    "• Four chambers: 2 atria + 2 ventricles",
    "• Right side → lungs (deoxygenated blood)",
    "• Left side → body (oxygenated blood)",
    "• Beats ~100,000 times per day",
  ],
};

const flashcardData: Record<string, { q: string; a: string }[]> = {
  "🔬 Science": [
    { q: "What is photosynthesis?", a: "Converting sunlight into glucose using chlorophyll" },
    { q: "What are the inputs?", a: "CO₂ + water + light energy" },
    { q: "What is released as a byproduct?", a: "Oxygen (O₂)" },
  ],
  "📜 History": [
    { q: "When was the French Revolution?", a: "1789–1799" },
    { q: "What did it overthrow?", a: "The French monarchy" },
    { q: "Who rose to power after?", a: "Napoleon Bonaparte" },
  ],
  "⚖️ Law": [
    { q: "What is the rule of law?", a: "All persons are accountable to publicly promulgated laws" },
    { q: "What does it require?", a: "Equal enforcement and independent adjudication" },
    { q: "What principle does it uphold?", a: "Supremacy of law over individuals" },
  ],
  "💊 Medicine": [
    { q: "How many chambers does the heart have?", a: "Four: 2 atria and 2 ventricles" },
    { q: "What does the right side pump?", a: "Deoxygenated blood to the lungs" },
    { q: "How many times does it beat daily?", a: "Approximately 100,000 times" },
  ],
};

const quizData: Record<string, { q: string; options: string[]; correct: number }[]> = {
  "🔬 Science": [
    { q: "What pigment do plants use?", options: ["Melanin", "Chlorophyll", "Carotene", "Keratin"], correct: 1 },
    { q: "What gas is released?", options: ["CO₂", "Nitrogen", "Oxygen", "Hydrogen"], correct: 2 },
  ],
  "📜 History": [
    { q: "When did the French Revolution begin?", options: ["1776", "1789", "1804", "1815"], correct: 1 },
    { q: "Who rose to power after?", options: ["Louis XVI", "Robespierre", "Napoleon", "Voltaire"], correct: 2 },
  ],
  "⚖️ Law": [
    { q: "What does rule of law ensure?", options: ["Monarchy", "Equality before law", "Anarchy", "Dictatorship"], correct: 1 },
    { q: "Laws must be?", options: ["Secret", "Equally enforced", "Optional", "Verbal"], correct: 1 },
  ],
  "💊 Medicine": [
    { q: "How many chambers in the heart?", options: ["2", "3", "4", "5"], correct: 2 },
    { q: "Right side pumps blood to?", options: ["Brain", "Lungs", "Liver", "Kidneys"], correct: 1 },
  ],
};

const personas = Object.keys(sampleTexts);

const TryItSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [persona, setPersona] = useState(personas[0]);
  const [text, setText] = useState(sampleTexts[personas[0]]);
  const [activeTab, setActiveTab] = useState<"summary" | "flashcards" | "quiz">("summary");
  const [generated, setGenerated] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [streamedText, setStreamedText] = useState("");
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([false, false, false]);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>([null, null]);
  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(new Set());
  const [showCompleteCta, setShowCompleteCta] = useState(false);

  const handleGenerate = useCallback(() => {
    setGenerated(false);
    setShowSkeleton(true);
    setStreamedText("");
    setFlippedCards([false, false, false]);
    setQuizAnswers([null, null]);
    setVisitedTabs(new Set(["summary"]));
    setShowCompleteCta(false);

    setTimeout(() => {
      setShowSkeleton(false);
      setStreaming(true);
      setGenerated(true);
      const fullText = summaryOutputs[persona].join("\n");
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setStreamedText(fullText.slice(0, i));
        if (i >= fullText.length) {
          clearInterval(interval);
          setStreaming(false);
        }
      }, 12);
    }, 1200);
  }, [persona]);

  const handleTabChange = useCallback((tab: "summary" | "flashcards" | "quiz") => {
    setActiveTab(tab);
    setVisitedTabs((prev) => {
      const next = new Set(prev);
      next.add(tab);
      if (next.size === 3 && generated) {
        setTimeout(() => setShowCompleteCta(true), 300);
      }
      return next;
    });
  }, [generated]);

  const handleFlip = (i: number) => {
    setFlippedCards((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const handleQuizAnswer = (qi: number, ai: number) => {
    if (quizAnswers[qi] !== null) return;
    setQuizAnswers((prev) => {
      const next = [...prev];
      next[qi] = ai;
      return next;
    });
  };

  const quizScore = quizAnswers.filter((a, i) => a === quizData[persona][i].correct).length;
  const quizComplete = quizAnswers.every((a) => a !== null);

  const suggestedTopics = ["GCSE Biology", "WW2 causes", "Newton's Laws", "The French Revolution"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="tryit" className="relative z-[1] py-28" ref={ref}>
      <div className="container">
        <div className="text-center mb-14 fade-up">
          <div className="inline-flex items-center gap-1.5 bg-primary/[0.12] border border-primary/25 rounded-full px-3.5 py-1 text-xs text-electric font-medium tracking-wider uppercase mb-6">
            ✦ Try It Now
          </div>
          <h2 className="font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-tight tracking-tight mb-5">
            Paste anything. Get a full study kit.
          </h2>
          <p className="text-muted-foreground text-base font-light max-w-xl mx-auto leading-relaxed">
            No account needed. See exactly what Brainify does — right here.
          </p>
        </div>

        <div className="max-w-3xl mx-auto fade-up fade-up-d1">
          {/* Persona chips */}
          <div className="flex gap-2 mb-5 flex-wrap justify-center">
            {personas.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setPersona(p);
                  setText(sampleTexts[p]);
                  setGenerated(false);
                  setStreamedText("");
                  setShowSkeleton(false);
                  setFlippedCards([false, false, false]);
                  setQuizAnswers([null, null]);
                  setVisitedTabs(new Set());
                  setShowCompleteCta(false);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  persona === p
                    ? "bg-primary text-primary-foreground"
                    : "bg-foreground/[0.05] border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Textarea */}
          <div className="relative mb-5">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 1000))}
              placeholder="Paste your notes or any text here..."
              className="w-full min-h-[140px] bg-surface border border-border rounded-xl p-5 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(139,92,246,0.15)] transition-all"
            />
            <span className="absolute bottom-3 right-4 text-xs text-dim">{text.length}/1000</span>
          </div>

          <button
            onClick={handleGenerate}
            disabled={!text.trim() || streaming}
            className="w-full btn-gradient text-primary-foreground py-4 rounded-xl font-semibold text-base transition-all hover:scale-[1.02] hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed mb-8"
          >
            {streaming ? "Generating..." : "Generate study kit →"}
          </button>

          {/* Tab system */}
          {(generated || showSkeleton) && (
            <div className="fade-up visible">
              <div className="flex gap-1 bg-surface border border-border rounded-full p-1 mb-6 w-fit mx-auto">
                {(["summary", "flashcards", "quiz"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                      activeTab === tab
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Progress */}
              <div className="flex items-center gap-2 justify-center mb-6 text-xs text-muted-foreground">
                <span>{visitedTabs.size}/3 complete</span>
                <div className="w-24 h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(visitedTabs.size / 3) * 100}%` }}
                  />
                </div>
              </div>

              {/* Tab content */}
              <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 min-h-[280px] transition-opacity duration-150">
                {activeTab === "summary" && (
                  <div>
                    {showSkeleton ? (
                      <div className="space-y-3">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="h-4 rounded bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 animate-pulse" style={{ width: `${80 - i * 10}%` }} />
                        ))}
                      </div>
                    ) : (
                      <>
                        <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">{streamedText}{streaming && <span className="animate-blink text-electric">|</span>}</pre>
                        {!streaming && generated && (
                          <div className="mt-6 p-4 rounded-xl bg-foreground/[0.03] border border-border relative overflow-hidden">
                            <div className="blur-[4px] text-sm text-muted-foreground">+ 3 more insights available in the app</div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs text-muted-foreground flex items-center gap-1.5">🔒 Available in app</span>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {activeTab === "flashcards" && generated && (
                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" style={{ perspective: "1000px" }}>
                      {flashcardData[persona].map((card, i) => (
                        <div
                          key={i}
                          onClick={() => handleFlip(i)}
                          className="cursor-pointer h-[160px] relative"
                          style={{ transformStyle: "preserve-3d", transition: "transform 0.6s" }}
                        >
                          <div
                            className="absolute inset-0 rounded-2xl transition-transform duration-500"
                            style={{
                              transformStyle: "preserve-3d",
                              transform: flippedCards[i] ? "rotateY(180deg)" : "rotateY(0deg)",
                            }}
                          >
                            {/* Front */}
                            <div
                              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 border border-primary/30 p-5 flex items-center justify-center text-center"
                              style={{ backfaceVisibility: "hidden" }}
                            >
                              <p className="text-sm font-medium text-foreground">{card.q}</p>
                            </div>
                            {/* Back */}
                            <div
                              className="absolute inset-0 rounded-2xl bg-surface border border-emerald-500/30 p-5 flex items-center justify-center text-center"
                              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                            >
                              <p className="text-sm font-medium text-emerald-400">{card.a}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-xs text-muted-foreground mb-4">Click any card to flip it ↩</p>
                    {flippedCards.every(Boolean) && (
                      <div className="p-4 rounded-xl bg-foreground/[0.03] border border-border relative overflow-hidden">
                        <div className="blur-[4px] text-sm text-muted-foreground">+ 5 more flashcards waiting in the app</div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground flex items-center gap-1.5">🔒 Available in app</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "quiz" && generated && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-sm font-medium text-foreground">Quiz</span>
                      <span className="text-sm font-medium text-electric">Score: {quizScore}/{quizData[persona].length}</span>
                    </div>
                    <div className="space-y-6">
                      {quizData[persona].map((q, qi) => (
                        <div key={qi} className="bg-foreground/[0.03] border border-border rounded-xl p-5">
                          <p className="text-sm font-medium mb-4">{q.q}</p>
                          <div className="grid grid-cols-2 gap-2">
                            {q.options.map((opt, oi) => {
                              const answered = quizAnswers[qi] !== null;
                              const isCorrect = oi === q.correct;
                              const isSelected = quizAnswers[qi] === oi;
                              let cls = "bg-foreground/[0.04] border border-border text-foreground hover:border-primary/40";
                              if (answered) {
                                if (isCorrect) cls = "bg-emerald-500/15 border-emerald-500/40 text-emerald-400";
                                else if (isSelected) cls = "bg-destructive/15 border-destructive/40 text-destructive";
                                else cls = "bg-foreground/[0.02] border-border text-muted-foreground opacity-50";
                              }
                              return (
                                <button
                                  key={oi}
                                  onClick={() => handleQuizAnswer(qi, oi)}
                                  disabled={answered}
                                  className={`py-3 px-4 rounded-xl text-sm font-medium transition-all text-left ${cls}`}
                                >
                                  {answered && isCorrect && "✓ "}{answered && isSelected && !isCorrect && "✗ "}{opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                    {quizComplete && (
                      <div className={`mt-6 p-4 rounded-xl text-center text-sm font-medium ${
                        quizScore === 2
                          ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                          : quizScore === 1
                          ? "bg-amber-500/15 border border-amber-500/30 text-amber-400"
                          : "bg-foreground/[0.05] border border-border text-muted-foreground"
                      }`}>
                        {quizScore === 2 && "🎉 Perfect score!"}
                        {quizScore === 1 && "Good effort! Review your notes."}
                        {quizScore === 0 && "Keep studying — Brainify's got you."}
                        <button
                          onClick={() => setQuizAnswers([null, null])}
                          className="block mx-auto mt-3 text-xs text-electric hover:underline"
                        >
                          Try again →
                        </button>
                      </div>
                    )}
                    {quizComplete && (
                      <div className="mt-4 p-4 rounded-xl bg-foreground/[0.03] border border-border relative overflow-hidden">
                        <div className="blur-[4px] text-sm text-muted-foreground">Full quiz analysis + weak spot detection available in app</div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs text-muted-foreground flex items-center gap-1.5">🔒 Available in app</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Complete CTA */}
              {showCompleteCta && (
                <div className="mt-8 text-center fade-up visible">
                  <p className="text-muted-foreground text-sm mb-4">You've seen what Brainify can do. Now keep it.</p>
                  <a href="#download" className="btn-gradient text-primary-foreground px-10 py-4 rounded-xl no-underline font-semibold text-base inline-flex items-center gap-2 transition-all hover:scale-105">
                    ⬇️ Download free
                  </a>
                  <p className="text-dim text-xs mt-3">No account required · 4.2 MB · Uninstall in one click</p>
                </div>
              )}
            </div>
          )}

          {/* Suggested topics */}
          {generated && !streaming && (
            <div className="mt-10 text-center fade-up visible">
              <p className="text-muted-foreground text-sm mb-3">Try another topic →</p>
              <div className="flex gap-2 justify-center flex-wrap">
                {suggestedTopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => {
                      setText(topic);
                      setGenerated(false);
                      setStreamedText("");
                    }}
                    className="bg-foreground/[0.05] border border-border rounded-full px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TryItSection;
