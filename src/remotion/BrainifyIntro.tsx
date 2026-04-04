import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const BrainifyIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame: frame - 20, fps, config: { stiffness: 80, damping: 14 } });
  const logoOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' });
  const textY = interpolate(frame, [50, 90], [40, 0], { extrapolateRight: 'clamp' });
  const textOpacity = interpolate(frame, [50, 90], [0, 1], { extrapolateRight: 'clamp' });
  const taglineOpacity = interpolate(frame, [90, 130], [0, 1], { extrapolateRight: 'clamp' });
  const exitOpacity = interpolate(frame, [170, 210], [1, 0], { extrapolateRight: 'clamp' });
  const glowIntensity = interpolate(frame % 60, [0, 30, 60], [0.6, 1, 0.6], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: '#0a0a0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 16,
        opacity: exitOpacity,
      }}
    >
      {Array.from({ length: 40 }).map((_, i) => {
        const seed = i * 137.5;
        const x = seed % 100;
        const y = (seed * 1.7) % 100;
        const particleOpacity = interpolate(frame, [0, 30], [0, 0.6], { extrapolateRight: 'clamp' });
        const size = 2 + (i % 3);
        return (
          <div key={i} style={{
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            borderRadius: '50%',
            background: i % 2 === 0 ? '#a855f7' : '#6366f1',
            opacity: particleOpacity,
            boxShadow: `0 0 ${size * 2}px #a855f7`,
          }} />
        );
      })}

      <div style={{
        transform: `scale(${logoScale})`,
        opacity: logoOpacity,
        fontSize: 80,
        filter: `drop-shadow(0 0 ${20 * glowIntensity}px #a855f7)`,
      }}>
        🧠
      </div>

      <div style={{
        transform: `translateY(${textY}px)`,
        opacity: textOpacity,
        fontFamily: "'Clash Display', 'Space Grotesk', sans-serif",
        fontSize: 80,
        fontWeight: 700,
        color: 'white',
        letterSpacing: '-2px',
        textShadow: `0 0 ${30 * glowIntensity}px #a855f7, 0 0 ${60 * glowIntensity}px #7c3aed`,
      }}>
        Brainify
      </div>

      <div style={{
        opacity: taglineOpacity,
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 20,
        color: 'rgba(255,255,255,0.5)',
        letterSpacing: '0.05em',
      }}>
        Learn Smarter. Not Harder.
      </div>
    </AbsoluteFill>
  );
};
