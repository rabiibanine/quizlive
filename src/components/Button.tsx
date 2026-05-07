import React from "react";

type ButtonVariant = "none" | "delete" | "black" | "white" | "ghost";

const baseStyles =
  "cursor-pointer px-6 py-2 rounded-full border transition-all duration-300 pointer-events-auto";

const variants: Record<ButtonVariant, string> = {
  none: "",
  delete:
    "bg-white text-black border-black hover:bg-red-50 hover:border-red-200 hover:text-red-400",
  black: "bg-black text-white border-black hover:bg-white hover:text-black",
  white: "bg-white text-black border-black hover:bg-black hover:text-white",
  ghost: "cursor-not-allowed bg-black text-white border-black pointer-events-none",
};

function Button({
  variant = "ghost",
  className = "",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
