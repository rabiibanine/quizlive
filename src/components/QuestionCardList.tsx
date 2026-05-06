import QuestionCard from "@/components/QuestionCard";
import type { Question } from "@/types/quiz";
import { PlusCircleIcon } from "@phosphor-icons/react";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface QuestionCardListProps {
  quizQuestions: Question[];
}

export default function QuestionCardList({ quizQuestions }: QuestionCardListProps) {
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState(quizQuestions);

  function handleAddQuestion() {
    const newQuestion: Question = {
      question: "",
      choices: ["", "", "", ""],
      correctChoice: 1,
    };
    setCurrentQuizQuestions((prevQuestions) => [newQuestion, ...prevQuestions]);
  }

  function handleDeleteQuestion(qIndex: number) {
    setCurrentQuizQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== qIndex));
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
          {currentQuizQuestions.map((q, qIndex) => (
            <motion.div
              key={q.question}
              layout
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <QuestionCard question={q} index={qIndex} onDelete={handleDeleteQuestion} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
