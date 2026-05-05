import type { HTMLAttributes } from "react";

type CardVariant = "none" | "outline";
type CardPadding = "none" | "sm" | "md" | "lg";
type CardRounded = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
type CardShadow = "none" | "light" | "heavy";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  fullWidth?: boolean;
  rounded?: CardRounded;
  shadow?: CardShadow;
}

const variantClasses: Record<CardVariant, string> = {
  none: "",
  outline: "bg-white border border-gray-200",
};

const paddingClasses: Record<CardPadding, string> = {
  none: "",
  sm: "p-3",
  md: "p-5",
  lg: "p-8",
};

const roundedClasses: Record<CardRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

const shadowClasses: Record<CardShadow, string> = {
  none: '',
  light: 'shadow-[0_2px_10px_0_rgba(0,0,0,0.08)]',
  heavy: 'shadow-[0_6px_36px_-6px_rgba(0,0,0,0.39)]',
};

function Card({
  variant = "none",
  padding = "md",
  fullWidth = false,
  rounded = "lg",
  shadow = "none",
  children,
  className = "",
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        roundedClasses[rounded],
        variantClasses[variant],
        paddingClasses[padding],
        shadowClasses[shadow],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
