import { useState } from "react";

import Card from "@/components/Card";

import { XIcon, PencilSimpleIcon, CaretDownIcon } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";

interface Choice {
  text: string;
  isCorrect: boolean;
}

interface Question {
  question: string;
  choices: string[];
  correctChoice: number;
}

interface QuestionCardProps {
  question: Question;
  index: number;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
}

export default function QuestionCard({ question, index, onDelete, onEdit }: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  const handleChoiceToggle = (cIdx: number) => {
    setSelectedChoice((prev) => (cIdx === prev ? null : cIdx));
  };

  return (
    <Card variant="outline" padding="lg" className="w-full flex flex-col">
      {/* Header */}
      <div className="mb-2 flex flex-row items-center gap-2">
        <span className="font-mono font-bold text-zinc-600 text-lg">
          {(index + 1).toString().padStart(2, "0")}
        </span>
        <span className="ml-2 text-zinc-900">{question.question}</span>

        <div className="ml-auto flex gap-2">
          <div className="flex gap-2 h-full">
            <button
              className="p-2 rounded-full text-zinc-600 border border-zinc-400 transition-all hover:cursor-pointer hover:text-zinc-50 hover:bg-zinc-400 hover:border-transparent"
              onClick={() => onEdit(index)}
            >
              <PencilSimpleIcon />
            </button>
            <button
              className="p-2 rounded-full text-zinc-600 border border-zinc-400 transition-all hover:cursor-pointer hover:text-red-400 hover:bg-red-100 hover:border-red-300"
              onClick={() => onDelete(index)}
            >
              <XIcon />
            </button>
          </div>

          <div className="w-px rounded-full self-center h-8 bg-zinc-400 mx-2" />

          <button
            className="p-2 rounded-full text-zinc-600 border border-zinc-400 transition-all hover:cursor-pointer hover:text-zinc-50 hover:bg-zinc-400 hover:border-transparent"
            onClick={() => setIsExpanded((prev) => !prev)}
          >
            <CaretDownIcon
              className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : "rotate-0"}`}
            />
          </button>
        </div>
      </div>

      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <hr className="my-2 border-zinc-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {question.choices.map((choice, cIdx) => {
                const isSelected = selectedChoice === cIdx;
                return (
                  <Card
                    key={cIdx}
                    variant="none"
                    rounded={isSelected ? "2xl" : "lg"}
                    className={
                      `transition-all duration-200 cursor-pointer text-center select-none ` +
                      (isSelected
                        ? "bg-zinc-700 text-white shadow-lg"
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200")
                    }
                    padding="md"
                    onClick={() => handleChoiceToggle(cIdx)}
                  >
                    {choice}
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
