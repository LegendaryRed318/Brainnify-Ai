import logo from "@/assets/logo-brain.png";

interface BrainifyLogoProps {
  size?: number;
  showText?: boolean;
  textSize?: string;
  className?: string;
}

export const BrainifyLogo = ({
  size = 32,
  showText = false,
  textSize = "text-xl",
  className = "",
}: BrainifyLogoProps) => {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <div className="drop-shadow-[0_0_12px_rgba(139,92,246,0.4)]">
        <img
          src={logo}
          alt="Brainify AI"
          width={size}
          height={size}
          className="object-contain"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>
      {showText && (
        <span className={`font-heading font-semibold text-foreground ${textSize}`}>
          Brainify AI
        </span>
      )}
    </span>
  );
};

export default BrainifyLogo;
