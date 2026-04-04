import { useState, useEffect } from "react";

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <div
      className="fixed w-16 h-16 rounded-full pointer-events-none z-50"
      style={{
        left: position.x - 32,
        top: position.y - 32,
        background: "radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
        filter: "blur(16px)",
        transform: "translate3d(0, 0, 0)",
        willChange: "transform",
      }}
    />
  );
};

export default CursorGlow;
