import QuestionCard from "@/components/QuestionCard";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export default function QuestionCardList({ quizQuestions }) {
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState(quizQuestions);
  function handleDeleteQuestion(qIndex: number) {
    setCurrentQuizQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== qIndex));
  }

  return (
    <>
      <h1 className="mt-8 mx-2 mb-4 text-xl font-semibold text-zinc-700">Questions</h1>
      <div className="flex flex-col gap-6">
        <AnimatePresence mode="popLayout">
          {currentQuizQuestions.map((q, qIndex) => (
            <motion.div
              key={q.question}
              layout
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <QuestionCard
                question={q}
                index={qIndex}
                onDelete={handleDeleteQuestion}
                onEdit={() => {}}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
