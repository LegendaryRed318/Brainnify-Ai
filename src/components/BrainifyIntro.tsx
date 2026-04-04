import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

// Particle component
const Particle: React.FC<{
  delay: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}> = ({ delay, startX, startY, endX, endY }) => {
  const frame = useCurrentFrame();
  const progress = spring({
    frame: Math.max(0, frame - delay),
    fps: 60,
    config: {
      damping: 12,
      stiffness: 80,
      mass: 1,
    },
  });

  const x = interpolate(progress, [0, 1], [startX, endX]);
  const y = interpolate(progress, [0, 1], [startY, endY]);
  const opacity = interpolate(progress, [0, 0.8, 1], [0, 1, 0.3]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 4,
        height: 4,
        borderRadius: "50%",
        backgroundColor: "#a855f7",
        opacity,
        boxShadow: `0 0 8px rgba(168, 85, 247, 0.8)`,
      }}
    />
  );
};

// Brain logo placeholder component
const BrainLogo: React.FC<{ opacity: number; scale: number }> = ({ opacity, scale }) => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "40%",
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        fontSize: 80,
        width: 80,
        height: 80,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: `linear-gradient(135deg, #a855f7, #6366f1)`,
        boxShadow: `0 0 30px rgba(168, 85, 247, 0.6)`,
      }}
    >
      🧠
    </div>
  );
};

export const BrainifyIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // Particle animation (frames 0-30)
  const particleProgress = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Brain logo animation (frames 20-60)
  const logoProgress = spring({
    frame: Math.max(0, frame - 20),
    fps: 60,
    config: {
      damping: 15,
      stiffness: 100,
      mass: 1,
    },
  });
  const logoOpacity = interpolate(frame, [20, 60], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoScale = interpolate(logoProgress, [0, 1], [0, 1]);

  // Brainify text animation (frames 50-100)
  const textProgress = spring({
    frame: Math.max(0, frame - 50),
    fps: 60,
    config: {
      damping: 12,
      stiffness: 80,
      mass: 1,
    },
  });
  const textOpacity = interpolate(frame, [50, 100], [0, 1], {
    extrapolateRight: "clamp",
  });
  const textY = interpolate(textProgress, [0, 1], [50, 0]);

  // Tagline animation (frames 90-150)
  const taglineOpacity = interpolate(frame, [90, 150], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fade out animation (frames 160-210)
  const fadeOutProgress = interpolate(frame, [160, 180, 200, 210], [0, 0, 1, 0], {
    extrapolateRight: "clamp",
  });

  // Generate particles from edges
  const particles = [];
  for (let i = 0; i < 20; i++) {
    const angle = (i / 20) * Math.PI * 2;
    const startRadius = Math.max(width, height);
    const startX = width / 2 + Math.cos(angle) * startRadius;
    const startY = height / 2 + Math.sin(angle) * startRadius;
    
    particles.push({
      delay: i * 2,
      startX,
      startY,
      endX: width / 2 + (Math.random() - 0.5) * 200,
      endY: height / 2 + (Math.random() - 0.5) * 200,
    });
  }

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: "#0a0a0f",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Particles */}
      {particles.map((particle, i) => (
        <Particle
          key={i}
          delay={particle.delay}
          startX={particle.startX}
          startY={particle.startY}
          endX={particle.endX}
          endY={particle.endY}
        />
      ))}

      {/* Brain Logo */}
      <BrainLogo opacity={logoOpacity} scale={logoScale} />

      {/* Brainify Text */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%, calc(-50% + ${textY}px))`,
          opacity: textOpacity,
          fontFamily: "Clash Display, sans-serif",
          fontSize: 120,
          fontWeight: 700,
          color: "white",
          textAlign: "center",
          textShadow: `
            0 0 20px #a855f7,
            0 0 40px #a855f7,
            0 0 80px #7c3aed
          `,
          letterSpacing: "-2px",
        }}
      >
        Brainify
      </div>

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "65%",
          transform: "translateX(-50%)",
          opacity: taglineOpacity,
          fontFamily: "Clash Display, sans-serif",
          fontSize: 32,
          fontWeight: 600,
          color: "white",
          textAlign: "center",
          textShadow: "0 0 10px rgba(168, 85, 247, 0.5)",
        }}
      >
        Learn Smarter. Not Harder.
      </div>

      {/* Fade to white flash then black */}
      {frame >= 160 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width,
            height,
            backgroundColor: frame < 200 ? "white" : "#0a0a0f",
            opacity: fadeOutProgress,
          }}
        />
      )}
    </div>
  );
};
