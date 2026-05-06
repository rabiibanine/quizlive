import type { ReactNode } from "react";

interface ToolBarButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "default" | "primary";
}

export default function ToolBarButton({
  children,
  onClick,
  variant = "default",
}: ToolBarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-md font-medium transition-all
        ${
          variant === "primary"
            ? "bg-zinc-800 text-white hover:bg-zinc-700"
            : "text-zinc-600 hover:bg-zinc-100"
        }`}
    >
      {children}
    </button>
  );
}
