import { useState } from "react";

import Card from "@/components/Card";

import type { Question } from "@/types/index";

import {
  XIcon,
  PencilSimpleIcon,
  CaretDownIcon,
  CheckIcon,
  CheckCircleIcon,
  ClockIcon,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";

interface QuestionCardProps {
  question: Question;
  index: number;
  onDelete: (index: number) => void;
  onUpdate: (index: number, changes: Partial<Question>) => void;
}

export default function QuestionCard({ question, index, onDelete, onUpdate }: QuestionCardProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card
      variant="none"
      padding="lg"
      className="w-full flex flex-col rounded-3xl border border-white/10 bg-white/5 backdrop-blur"
    >
      {/* Header */}
      <div className="items-center gap-2 flex flex-col sm:flex-row">
        {/* Number & Question */}
        <div className="flex items-center w-full order-last mt-4 sm:order-first sm:mt-0">
          <span className="font-mono font-bold text-white/60 text-lg">
            {(index + 1).toString().padStart(2, "0")}
          </span>
          <input
            className={
              "ml-2 w-full bg-transparent border-b text-white placeholder:text-white/40 " +
              (isEditing
                ? "border-white/30 transition-all focus:outline-none focus:border-purple-200"
                : "border-transparent")
            }
            placeholder="Enter your question here"
            value={question.text}
            disabled={!isEditing}
            onChange={(e) => {
              if (isEditing) onUpdate(index, { text: e.target.value });
            }}
          />
        </div>

        <div className="flex items-center gap-2 bg-white/10 rounded-lg mx-1 px-3 py-2 transition-all hover:bg-white/15">
          <ClockIcon className="text-white/50 shrink-0" />
          <input
            type="number"
            value={question.time}
            disabled={!isEditing}
            min={1}
            max={999}
            onChange={(e) => {
              if (e.target.value.length > 3) return;
              if (isEditing) onUpdate(index, { time: Number(e.target.value) });
            }}
            className={
              `bg-transparent w-12 focus:outline-none text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ` +
              (isEditing ? `text-white` : `text-white/60`)
            }
          />
          <span className="text-white/50 text-sm">sec</span>
        </div>

        {/* Buttons */}
        <div className="ml-auto flex gap-2">
          <div className="flex gap-2 h-full">
            {isEditing ? (
              <button
                className="p-2 rounded-full text-white/70 border border-white/20 transition-all hover:cursor-pointer hover:text-white hover:bg-emerald-500/30 hover:border-emerald-400/60"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                <CheckIcon />
              </button>
            ) : (
              <button
                className="p-2 rounded-full text-white/70 border border-white/20 transition-all hover:cursor-pointer hover:text-white hover:bg-white/10 hover:border-white/40"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <PencilSimpleIcon />
              </button>
            )}
            <button
              className="p-2 rounded-full text-white/70 border border-white/20 transition-all hover:cursor-pointer hover:text-red-300 hover:bg-red-500/20 hover:border-red-400/40"
              onClick={() => onDelete(index)}
            >
              <XIcon />
            </button>
          </div>

          <div className="w-px rounded-full self-center h-8 bg-white/20 mx-2" />

          <button
            className="p-2 rounded-full text-white/70 border border-white/20 transition-all hover:cursor-pointer hover:text-white hover:bg-white/10 hover:border-white/40"
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
            className="overflow-hidden mt-2"
          >
            <hr className="my-2 border-white/10" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {question.choices.map((choice, cIndex) => {
                const isCorrectChoice = question.correctChoice === cIndex + 1;
                return (
                  <Card
                    key={cIndex}
                    variant="none"
                    rounded={isCorrectChoice ? "2xl" : "lg"}
                    className={
                      `transition-all duration-200 text-center select-none flex border border-white/10 ` +
                      (isCorrectChoice
                        ? "bg-purple-300/15 text-white border-purple-300/60 shadow-[0_18px_40px_-24px_rgba(147,102,255,0.6)] "
                        : "bg-white/5 text-white/70 hover:bg-white/10 ") +
                      (isEditing ? "cursor-pointer " : " ")
                    }
                    padding="md"
                    onClick={() => {
                      if (isEditing) onUpdate(index, { correctChoice: cIndex + 1 });
                    }}
                  >
                    <input
                      placeholder={`Choice #${cIndex + 1}`}
                      className={
                        "w-full bg-transparent border-b transition-all focus:outline-none placeholder:text-white/40 " +
                        (isEditing
                          ? isCorrectChoice
                            ? "border-purple-200 hover:border-purple-200 focus:border-purple-200"
                            : "border-white/20 hover:border-white/40 focus:border-purple-200"
                          : "border-transparent")
                      }
                      onClick={(e) => {
                        if (isEditing) e.stopPropagation();
                      }}
                      value={choice.text}
                      disabled={!isEditing}
                      onChange={(e) => {
                        onUpdate(index, {
                          choices: question.choices.map((choice, index) =>
                            index === cIndex ? { ...choice, text: e.target.value } : choice
                          ),
                        });
                      }}
                    ></input>

                    <CheckCircleIcon
                      className={`min-w-6 h-6 + ${
                        isCorrectChoice ? "text-purple-200 " : "text-transparent "
                      } + ${isEditing ? "ml-2" : "ml-auto"}`}
                    ></CheckCircleIcon>
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

