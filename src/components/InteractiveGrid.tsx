import { useCallback, useRef, useState } from "react";

const InteractiveGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [glow, setGlow] = useState({ x: -1000, y: -1000 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      setGlow({ x, y });
      const nx = (clientX / window.innerWidth - 0.5) * 16;
      const ny = (clientY / window.innerHeight - 0.5) * 16;
      setOffset({ x: nx, y: ny });
    });
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  }, [handleMove]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) handleMove(t.clientX, t.clientY);
  }, [handleMove]);

  const onMouseLeave = useCallback(() => {
    setGlow({ x: -1000, y: -1000 });
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      onMouseLeave={onMouseLeave}
      className="absolute inset-0 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Grid pattern that shifts with cursor */}
      <div
        className="absolute inset-[-40px] opacity-40"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      {/* Radial glow following cursor */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 300px at ${glow.x}px ${glow.y}px, rgba(139,92,246,0.15), transparent 70%)`,
          transition: "background 0.15s ease-out",
        }}
      />
    </div>
  );
};

export default InteractiveGrid;
