import QuestionCard from "@/components/QuestionCard";

import type { Question } from "@/types/index";

import { PlusCircleIcon } from "@phosphor-icons/react";

import { AnimatePresence, motion } from "motion/react";

interface QuestionCardListProps {
  quizQuestions: Question[];
  setQuizQuestions: (questions: Question[]) => void;
}

export default function QuestionCardList({
  quizQuestions,
  setQuizQuestions,
}: QuestionCardListProps) {
  function handleAddQuestion() {
    const newQuestion: Question = {
      id: crypto.randomUUID(),
      text: "",
      choices: ["", "", "", ""],
      time: 60,
      correctChoice: 1,
    };

    setQuizQuestions([newQuestion, ...quizQuestions]);
  }

  function handleDeleteQuestion(qIndex: number) {
    setQuizQuestions(quizQuestions.filter((_, i) => i !== qIndex));
  }

  function handleUpdateQuestion(qIndex: number, changes: Partial<Question>) {
    const updated = quizQuestions.map((q, i) => (i === qIndex ? { ...q, ...changes } : q));
    setQuizQuestions(updated);
  }

  return (
    <>
      <div className="mt-8 mb-4 px-2 flex justify-between items-center w-full">
        <h1 className="text-xl font-semibold text-zinc-700">Questions</h1>
        <PlusCircleIcon
          className="scale-125 text-zinc-700 cursor-pointer transition-all hover:scale-150 active:scale-125"
          onClick={handleAddQuestion}
        ></PlusCircleIcon>
      </div>
      <div className="flex flex-col gap-6">
        <AnimatePresence mode="popLayout">
          {quizQuestions.map((q, qIndex) => (
            <motion.div
              key={q.id}
              layout
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <QuestionCard
                question={q}
                index={qIndex}
                onDelete={handleDeleteQuestion}
                onUpdate={handleUpdateQuestion}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
