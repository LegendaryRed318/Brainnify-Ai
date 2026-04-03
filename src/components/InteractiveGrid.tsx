import { useEffect, useRef, useCallback } from "react";

const CELL = 60;
const GLOW_RADIUS = 250;
const MAX_LIFT = 8;

// Check once at module level - no state needed
const isTouchDevice =
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

const InteractiveGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const lastFrameRef = useRef(0);

  // Don't render anything on touch devices
  if (isTouchDevice) return null;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2x
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      sizeRef.current = { w: rect.width, h: rect.height, dpr };
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, []);

  const draw = useCallback((timestamp: number) => {
    // Throttle to ~30fps for performance (every ~33ms)
    if (timestamp - lastFrameRef.current < 33) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }
    lastFrameRef.current = timestamp;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const { w, h, dpr } = sizeRef.current;
    if (w === 0 || h === 0) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const { x: mx, y: my } = mouseRef.current;
    const rect = canvas.getBoundingClientRect();
    const lx = mx - rect.left;
    const ly = my - rect.top;

    const hasActiveMouse = lx > -1000 && ly > -1000;

    const cols = Math.ceil(w / CELL) + 1;
    const rows = Math.ceil(h / CELL) + 1;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const baseX = col * CELL;
        const baseY = row * CELL;

        let proximity = 0;
        let offsetY = 0;

        if (hasActiveMouse) {
          const cx = baseX + CELL / 2;
          const cy = baseY + CELL / 2;
          const dist = Math.sqrt((cx - lx) ** 2 + (cy - ly) ** 2);
          proximity = Math.max(0, 1 - dist / GLOW_RADIUS);
          offsetY = -(proximity * MAX_LIFT);
        }

        const drawX = baseX;
        const drawY = baseY + offsetY;

        // Cell fill - very subtle, only near cursor
        if (proximity > 0.05) {
          ctx.fillStyle = `rgba(139, 92, 246, ${proximity * 0.05})`;
          ctx.fillRect(drawX + 1, drawY + 1, CELL - 2, CELL - 2);
        }

        // Cell border
        const borderAlpha = 0.07 + proximity * 0.12;
        ctx.strokeStyle =
          proximity > 0.05
            ? `rgba(139, 92, 246, ${borderAlpha})`
            : `rgba(255, 255, 255, ${borderAlpha})`;
        ctx.lineWidth = 0.8;
        ctx.strokeRect(drawX, drawY, CELL, CELL);
      }
    }

    // Soft radial glow at cursor - very subtle
    if (hasActiveMouse) {
      const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, GLOW_RADIUS);
      grad.addColorStop(0, "rgba(139, 92, 246, 0.06)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
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