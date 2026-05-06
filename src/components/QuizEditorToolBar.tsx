// src/components/quiz/QuizEditorToolBar/QuizEditorToolBar.tsx
import { useRef } from "react";
import ToolBar from "@/components/ToolBar";
import ToolBarButton from "@/components/ToolBarButton";
import { RocketLaunchIcon, ExportIcon, DownloadSimpleIcon } from "@phosphor-icons/react";

interface QuizEditorToolBarProps {
  onLaunch: () => void;
  onExport: () => void;
  onImport: (file: File) => void;
}

export default function QuizEditorToolBar({
  onLaunch,
  onExport,
  onImport,
}: QuizEditorToolBarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImport(file);
  };

  return (
    <ToolBar>
      {/* Import */}
      <input
        type="file"
        accept=".json"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <ToolBarButton onClick={() => fileInputRef.current?.click()}>
        <DownloadSimpleIcon size={20} />
        Import
      </ToolBarButton>

      {/* Divider */}
      <div className="w-px h-5 bg-zinc-200 mx-1" />

      {/* Export */}
      <ToolBarButton onClick={onExport}>
        <ExportIcon size={20} />
        Export
      </ToolBarButton>

      {/* Divider */}
      <div className="w-px h-5 bg-zinc-200 mx-1" />

      {/* Launch */}
      <ToolBarButton variant="primary" onClick={onLaunch}>
        <RocketLaunchIcon size={20} />
        Launch
      </ToolBarButton>
    </ToolBar>
  );
}
