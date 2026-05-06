import { useState } from "react";

import Card from "@/components/Card";
import QuestionCard from "@/components/QuestionCard";

import { AnimatePresence, motion } from "motion/react";

const initialQuizInformationMock = {
  title: "Biology Quiz",
  class: "Biology",
  subject: "Immunology",
  questions: [
    {
      question: "What is the main function of antibodies?",
      choices: [
        "To attack viruses directly",
        "To signal immune cells",
        "To neutralize foreign pathogens",
        "To create red blood cells",
      ],
      correctChoice: 3, // (1-based, 1-4)
    },
    {
      question: "Which cell type produces antibodies?",
      choices: ["B cells", "T cells", "Macrophages", "Dendritic cells"],
      correctChoice: 1,
    },
    {
      question: "Where does hematopoiesis primarily take place in adults?",
      choices: ["Spleen", "Liver", "Bone marrow", "Thymus"],
      correctChoice: 3,
    },
  ],
};

export default function QuizEditorPage() {
  // App state for quiz information & selections
  const [quizInfo, setQuizInfo] = useState(initialQuizInformationMock);
  // Delete question at a given index
  function handleDeleteQuestion(qIndex: number) {
    setQuizInfo((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== qIndex),
    }));
  }

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center py-12 px-12 md:px-36">
      <div className="w-full max-w-4xl">
        {/* Quiz Information */}
        <Card
          variant="outline"
          fullWidth
          padding="md"
          className="flex self-start justify-center gap-8 flex-col sm:flex-row"
        >
          {Object.entries(quizInfo)
            .filter(([key]) => key !== "questions")
            .map(([key, value]) => {
              return (
                <div key={key} className="flex items-center flex-col gap-2">
                  <p className="text-zinc-400">
                    <strong>{key.toUpperCase()}</strong>
                  </p>
                  <Card className="bg-zinc-100 self-stretch min-w-30 transition-all hover:bg-zinc-200">
                    <p className="text-center text-zinc-900">{value}</p>
                  </Card>
                </div>
              );
            })}
        </Card>
        <h1 className="mt-8 mb-4 text-xl font-semibold text-zinc-700">Questions</h1>
        <div className="flex flex-col gap-6">
          <AnimatePresence mode="popLayout">
            {quizInfo.questions.map((q, qIndex) => (
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
      </div>
    </div>
  );
}
