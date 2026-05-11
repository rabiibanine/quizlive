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
      className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded-full text-md font-medium transition-all active:scale-95 
        ${
          variant === "primary"
            ? "bg-purple-200 text-purple-900 border-purple-200 hover:bg-purple-100 hover:border-purple-100"
            : "text-zinc-100 hover:bg-zinc-100 hover:text-zinc-700 active:bg-zinc-200"
        }`}
    >
      {children}
    </button>
  );
}
