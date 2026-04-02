import { useState, useEffect } from "react";
import logo from "@/assets/logo-brain-transparent.png";

const words = ["Welcome", "to", "the", "future", "of", "studying."];

const CinematicIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"words" | "logo" | "exit" | "done">("words");
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    // Stagger words
    const wordTimers = words.map((_, i) =>
      setTimeout(() => setVisibleWords(i + 1), 500 + i * 60)
    );
    // Show logo
    const logoTimer = setTimeout(() => setPhase("logo"), 2000);
    // Exit
    const exitTimer = setTimeout(() => setPhase("exit"), 3500);
    // Done
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
      <p className="font-heading text-[clamp(1.4rem,3vw,2.2rem)] font-bold tracking-tight text-foreground mb-8">
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

      <div
        className="transition-all duration-500"
        style={{
          opacity: phase === "logo" || phase === "exit" ? 1 : 0,
          transform: phase === "logo" || phase === "exit" ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
        }}
      >
        <div className="drop-shadow-[0_0_60px_rgba(139,92,246,0.5)]">
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
