import { useEffect, useRef, useCallback, useState } from "react";

const InteractiveGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [isTouch]);

  useEffect(() => {
    if (isTouch) return;
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      sizeRef.current = { w: rect.width, h: rect.height, dpr };
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [isTouch]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h, dpr } = sizeRef.current;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const cellSize = 50;
    const mouse = mouseRef.current;
    const canvasRect = canvas.getBoundingClientRect();
    const mx = mouse.x - canvasRect.left;
    const my = mouse.y - canvasRect.top;
    const glowRadius = 280;
    const maxLift = 10;

    const cols = Math.ceil(w / cellSize) + 1;
    const rows = Math.ceil(h / cellSize) + 1;

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

        const lift = proximity * maxLift;
        const angle = Math.atan2(dy, dx);
        const offsetX = -Math.cos(angle) * lift * 0.3;
        const offsetY = -Math.sin(angle) * lift;

        const drawX = x + offsetX;
        const drawY = y + offsetY;

        const fillAlpha = 0.09 + proximity * 0.04;
        const r = Math.round(139 * proximity);
        const g = Math.round(92 * proximity);
        const b = Math.round(246 * proximity);
        ctx.fillStyle = proximity > 0.01
          ? `rgba(${r}, ${g}, ${b}, ${fillAlpha})`
          : `rgba(255, 255, 255, ${fillAlpha})`;
        ctx.fillRect(drawX + 1, drawY + 1, cellSize - 2, cellSize - 2);

        const borderAlpha = 0.09 + proximity * 0.18;
        ctx.strokeStyle = proximity > 0.01
          ? `rgba(139, 92, 246, ${borderAlpha})`
          : `rgba(255, 255, 255, ${borderAlpha})`;
        ctx.lineWidth = proximity > 0.3 ? 1.2 : 0.8;
        ctx.strokeRect(drawX, drawY, cellSize, cellSize);
      }
    }

    if (mx > -500 && my > -500) {
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, glowRadius);
      gradient.addColorStop(0, "rgba(139, 92, 246, 0.07)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    }

    animRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw, isTouch]);

  if (isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default InteractiveGrid;
