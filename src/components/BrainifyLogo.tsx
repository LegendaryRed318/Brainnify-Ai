import logo from "@/assets/logo-brain-transparent.png";
import { forwardRef } from "react";

interface BrainifyLogoProps {
  size?: number;
  showText?: boolean;
  textSize?: string;
  className?: string;
}

export const BrainifyLogo = forwardRef<HTMLSpanElement, BrainifyLogoProps>(function BrainifyLogo(
  {
    size = 32,
    showText = false,
    textSize = "text-xl",
    className = "",
  },
  ref,
) {
  return (
    <span ref={ref} className={`inline-flex items-center gap-3 ${className}`}>
      <span className="inline-flex drop-shadow-[0_0_12px_rgba(139,92,246,0.4)]">
        <img
          src={logo}
          alt="Brainify AI"
          width={size}
          height={size}
          style={{
            width: size,
            height: size,
            objectFit: "contain",
            display: "block",
          }}
        />
      </span>
      {showText && (
        <span className={`font-clash font-semibold text-foreground ${textSize}`}>
          Brainify AI
        </span>
      )}
    </span>
  );
});

export default BrainifyLogo;
