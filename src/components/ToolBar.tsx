import type { ReactNode } from "react";

interface ToolBarProps {
  children: ReactNode;
}

export default function ToolBar({ children }: ToolBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-6 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-3 py-2 shadow-lg">
        {children}
      </div>
    </div>
  );
}
