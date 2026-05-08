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
    <Card variant="outline" padding="lg" className="w-full flex flex-col">
      {/* Header */}
      <div className="items-center gap-2 flex flex-col sm:flex-row">
        {/* Number & Question */}
        <div className="flex items-center w-full order-last mt-4 sm:order-first sm:mt-0">
          <span className="font-mono font-bold text-zinc-600 text-lg">
            {(index + 1).toString().padStart(2, "0")}
          </span>
          <input
            className={
              "ml-2 w-full bg-transparent border-b " +
              (isEditing
                ? "border-zinc-300 transition-all focus:outline-none focus:border-zinc-600"
                : "border-transparent")
            }
            placeholder="Enter your question here"
            value={question.question}
            disabled={!isEditing}
            onChange={(e) => {
              if (isEditing) onUpdate(index, { question: e.target.value });
            }}
          />
        </div>

        <div className="flex items-center gap-2 bg-zinc-100 rounded-lg mx-1 px-3 py-2 transition-all hover:bg-zinc-200">
          <ClockIcon className="text-zinc-400 shrink-0" />
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
              `bg-transparent w-12 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ` +
              (isEditing ? `text-zinc-700` : `text-zinc-500`)
            }
          />
          <span className="text-zinc-400 text-sm">sec</span>
        </div>

        {/* Buttons */}
        <div className="ml-auto flex gap-2">
          <div className="flex gap-2 h-full">
            {isEditing ? (
              <button
                className="p-2 rounded-full text-zinc-600 border border-zinc-400 transition-all hover:cursor-pointer hover:text-zinc-50 hover:bg-green-300 hover:border-transparent"
                onClick={() => {
                  setIsEditing(false);
                }}
              >
                <CheckIcon />
              </button>
            ) : (
              <button
                className="p-2 rounded-full text-zinc-600 border border-zinc-400 transition-all hover:cursor-pointer hover:text-zinc-50 hover:bg-zinc-600 hover:border-transparent"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <PencilSimpleIcon />
              </button>
            )}
            <button
              className="p-2 rounded-full text-zinc-600 border border-zinc-400 transition-all hover:cursor-pointer hover:text-red-400 hover:bg-red-100 hover:border-red-300"
              onClick={() => onDelete(index)}
            >
              <XIcon />
            </button>
          </div>

          <div className="w-px rounded-full self-center h-8 bg-zinc-400 mx-2" />

          <button
            className="p-2 rounded-full text-zinc-600 border border-zinc-400 transition-all hover:cursor-pointer hover:text-zinc-50 hover:bg-zinc-600 hover:border-transparent"
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
            <hr className="my-2 border-zinc-200" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              {question.choices.map((choice, cIndex) => {
                const isCorrectChoice = question.correctChoice === cIndex + 1;
                return (
                  <Card
                    key={cIndex}
                    variant="none"
                    rounded={isCorrectChoice ? "2xl" : "lg"}
                    className={
                      `transition-all duration-200 text-center select-none flex ` +
                      (isCorrectChoice
                        ? "bg-zinc-800 text-white shadow-lg hover:bg-zinc-600 "
                        : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 ") +
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
                        "w-full bg-transparent border-b transition-all focus:outline-none " +
                        (isEditing
                          ? isCorrectChoice
                            ? "border-zinc-500 hover:border-zinc-200 focus:border-zinc-200"
                            : "border-zinc-300 hover:border-zinc-400 focus:border-zinc-400"
                          : "border-transparent")
                      }
                      onClick={(e) => {
                        if (isEditing) e.stopPropagation();
                      }}
                      value={choice}
                      disabled={!isEditing}
                      onChange={(e) => {
                        onUpdate(index, {
                          choices: question.choices.map((choice, index) =>
                            index === cIndex ? e.target.value : choice
                          ),
                        });
                      }}
                    ></input>

                    <CheckCircleIcon
                      className={`min-w-6 h-6 + ${isCorrectChoice ? "text-zinc-50 " : "text-transparent "} + ${isEditing ? "ml-2" : "ml-auto"}`}
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
