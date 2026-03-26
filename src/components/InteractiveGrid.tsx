import { useEffect, useRef, useCallback } from "react";

const InteractiveGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) mouseRef.current = { x: t.clientX, y: t.clientY };
    };
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const gridSize = 50;
    const mouse = mouseRef.current;
    const canvasRect = canvas.getBoundingClientRect();
    const mx = mouse.x - canvasRect.left;
    const my = mouse.y - canvasRect.top;
    const glowRadius = 250;

    // Draw grid lines
    for (let x = 0; x <= rect.width; x += gridSize) {
      const dist = Math.abs(x - mx);
      const proximity = Math.max(0, 1 - dist / glowRadius);
      const alpha = 0.06 + proximity * 0.12;
      const r = Math.round(139 * proximity);
      const g = Math.round(92 * proximity);
      const b = Math.round(246 * proximity);
      ctx.strokeStyle = proximity > 0.01
        ? `rgba(${139}, ${92}, ${246}, ${alpha})`
        : `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, rect.height);
      ctx.stroke();
    }

    for (let y = 0; y <= rect.height; y += gridSize) {
      const dist = Math.abs(y - my);
      const proximity = Math.max(0, 1 - dist / glowRadius);
      const alpha = 0.06 + proximity * 0.12;
      ctx.strokeStyle = proximity > 0.01
        ? `rgba(139, 92, 246, ${alpha})`
        : `rgba(255, 255, 255, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(rect.width, y);
      ctx.stroke();
    }

    // Radial glow at cursor
    if (mx > -500 && my > -500) {
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, glowRadius);
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.12)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default InteractiveGrid;
