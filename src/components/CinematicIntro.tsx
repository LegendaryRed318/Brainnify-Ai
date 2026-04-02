import { useState, useEffect } from "react";
import logo from "@/assets/logo-brain-transparent.png";

const words = ["Welcome", "to", "the", "future", "of", "studying."];

const CinematicIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"words" | "logo" | "exit" | "done">("words");
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    const wordTimers = words.map((_, i) =>
      setTimeout(() => setVisibleWords(i + 1), 500 + i * 60)
    );
    const logoTimer = setTimeout(() => setPhase("logo"), 2000);
    const exitTimer = setTimeout(() => setPhase("exit"), 3500);
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
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background transition-opacity duration-700 ${
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="px-6 text-center w-full max-w-[90vw] mx-auto mb-8">
        <p className="font-heading text-[clamp(1.2rem,5vw,2.5rem)] font-bold leading-tight tracking-tight text-foreground whitespace-normal break-words">
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block mr-[0.3em] transition-all duration-500"
              style={{
                opacity: i < visibleWords ? 1 : 0,
                transform: i < visibleWords ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {word}
            </span>
          ))}
        </p>
      </div>

      <div
        className="transition-all duration-500"
        style={{
          opacity: phase === "logo" || phase === "exit" ? 1 : 0,
          transform: phase === "logo" || phase === "exit" ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
        }}
      >
        <div style={{ filter: "drop-shadow(0 0 60px rgba(139,92,246,0.6))" }}>
          <img
            src={logo}
            alt="Brainify AI"
            className="w-[120px] h-[120px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default CinematicIntro;
