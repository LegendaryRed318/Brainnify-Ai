import { useState, useEffect } from "react";
import logo from "@/assets/logo-brain-transparent.png";

const words = ["Welcome", "to", "the", "future", "of", "studying."];

const CinematicIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"words" | "logo" | "exit" | "done">("words");
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    // Stagger words 500ms apart starting at 300ms
    const wordTimers = words.map((_, i) =>
      setTimeout(() => setVisibleWords(i + 1), 300 + i * 120)
    );

    // Logo fades in at 2000ms
    const logoTimer = setTimeout(() => setPhase("logo"), 2000);

    // Start exit fade at 4000ms (fade takes 1000ms so done at 5000ms)
    const exitTimer = setTimeout(() => setPhase("exit"), 4000);

    // Fully done at 5000ms
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 5000);

    return () => {
      wordTimers.forEach(clearTimeout);
      clearTimeout(logoTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background transition-opacity duration-1000 ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Tagline */}
      <div className="px-8 text-center w-full max-w-[90vw] mx-auto mb-10">
        <p className="font-heading font-bold leading-tight tracking-tight text-foreground whitespace-normal break-words"
          style={{ fontSize: "clamp(1.4rem, 5vw, 2.8rem)" }}
        >
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block mr-[0.3em]"
              style={{
                opacity: i < visibleWords ? 1 : 0,
                transform: i < visibleWords ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Logo */}
      <div
        style={{
          opacity: phase === "logo" || phase === "exit" ? 1 : 0,
          transform: phase === "logo" || phase === "exit"
            ? "translateY(0) scale(1)"
            : "translateY(16px) scale(0.92)",
          transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
          filter: "drop-shadow(0 0 60px rgba(139,92,246,0.7))",
        }}
      >
        <img
          src={logo}
          alt="Brainnify AI"
          style={{
            width: "clamp(100px, 20vw, 160px)",
            height: "clamp(100px, 20vw, 160px)",
            objectFit: "contain",
            // No mixBlendMode - transparent PNG doesn't need it
          }}
        />
      </div>

      {/* Subtle bottom brand line */}
      <div
        style={{
          opacity: phase === "logo" || phase === "exit" ? 0.4 : 0,
          transition: "opacity 0.7s ease",
          marginTop: "2rem",
        }}
        className="text-xs font-medium tracking-[0.3em] uppercase text-muted-foreground"
      >
        Brainnify AI
      </div>
    </div>
  );
};

export default CinematicIntro;