import type { HTMLAttributes } from "react";

type CardVariant = "base" | "raised" | "outline";
type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  fullWidth?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  base: "bg-white/80 shadow-[0_0_40px_-10px_rgba(132,85,239,0.3)]",
  raised: "bg-white/80 shadow-raised",
  outline: "bg-white border border-gray-200",
};

const paddingClasses: Record<CardPadding, string> = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-8",
};

function Card({
  variant = "base",
  padding = "md",
  fullWidth = false,
  children,
  className = "",
  ...rest
}: CardProps) {
  return (
    <div
      className={`
        rounded-lg
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
