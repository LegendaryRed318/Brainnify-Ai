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

    const cellSize = 50;
    const mouse = mouseRef.current;
    const canvasRect = canvas.getBoundingClientRect();
    const mx = mouse.x - canvasRect.left;
    const my = mouse.y - canvasRect.top;
    const glowRadius = 280;
    const maxLift = 14;

    const cols = Math.ceil(rect.width / cellSize) + 1;
    const rows = Math.ceil(rect.height / cellSize) + 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * cellSize;
        const y = row * cellSize;
        const centerX = x + cellSize / 2;
        const centerY = y + cellSize / 2;

        const dx = centerX - mx;
        const dy = centerY - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / glowRadius);

        // Lift effect — cells move toward cursor
        const lift = proximity * maxLift;
        const angle = Math.atan2(dy, dx);
        const offsetX = -Math.cos(angle) * lift * 0.3;
        const offsetY = -Math.sin(angle) * lift;

        const drawX = x + offsetX;
        const drawY = y + offsetY;

        // Cell fill
        const fillAlpha = 0.02 + proximity * 0.08;
        const r = Math.round(139 * proximity);
        const g = Math.round(92 * proximity);
        const b = Math.round(246 * proximity);
        ctx.fillStyle = proximity > 0.01
          ? `rgba(${r}, ${g}, ${b}, ${fillAlpha})`
          : `rgba(255, 255, 255, ${fillAlpha})`;
        ctx.fillRect(drawX + 1, drawY + 1, cellSize - 2, cellSize - 2);

        // Cell border
        const borderAlpha = 0.09 + proximity * 0.18;
        ctx.strokeStyle = proximity > 0.01
          ? `rgba(139, 92, 246, ${borderAlpha})`
          : `rgba(255, 255, 255, ${borderAlpha})`;
        ctx.lineWidth = proximity > 0.3 ? 1.2 : 0.8;
        ctx.strokeRect(drawX, drawY, cellSize, cellSize);
      }
    }

    // Radial glow at cursor
    if (mx > -500 && my > -500) {
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, glowRadius);
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.1)");
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
