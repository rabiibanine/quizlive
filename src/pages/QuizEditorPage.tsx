import Card from "@/components/Card";
import QuestionCardList from "@/components/QuestionCardList";
import type { Question } from "@/types/quiz";

import { BookOpenIcon, ClockIcon, ChalkboardTeacherIcon, FlaskIcon } from "@phosphor-icons/react";

import { useMemo, useState } from "react";

const quiz = {
  quizInfo: { title: "Biology Quiz", class: "Biology", subject: "Immunology" },
  quizQuestions: [
    {
      id: crypto.randomUUID(),
      question: "What is the main function of antibodies?",
      choices: [
        "To attack viruses directly",
        "To signal immune cells",
        "To neutralize foreign pathogens",
        "To create red blood cells",
      ],
      time: 60,
      correctChoice: 3, // (1-based, 1-4)
    },
    {
      id: crypto.randomUUID(),
      question: "Which cell type produces antibodies?",
      choices: ["B cells", "T cells", "Macrophages", "Dendritic cells"],
      time: 60,
      correctChoice: 1,
    },
    {
      id: crypto.randomUUID(),
      question: "Where does hematopoiesis primarily take place in adults?",
      choices: ["Spleen", "Liver", "Bone marrow", "Thymus"],
      time: 45,
      correctChoice: 3,
    },
  ],
};

export default function QuizEditorPage() {
  const pillStyles =
    "min-w-38 flex justify-center items-center gap-1.5 text-sm text-zinc-500 border border-zinc-200 rounded-full px-3 py-1 transition-all hover:border-zinc-400";
  const [quizState, setQuizState] = useState(quiz);
  const { quizInfo, quizQuestions } = quizState;

  const totalSeconds = useMemo(() => {
    return quizQuestions.reduce((acc, q) => acc + q.time, 0);
  }, [quizQuestions]);

  const totalTime = useMemo(() => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes > 0 ? `${minutes}m ${seconds > 0 ? `${seconds}s` : ""}` : `${seconds}s`;
  }, [totalSeconds]);

  const questionCount = useMemo(() => {
    return quizQuestions.length;
  }, [quizQuestions]);

  const setQuizQuestions = (updatedQuestions: Question[]) => {
    setQuizState((prev) => {
      return {
        ...prev,
        quizQuestions: updatedQuestions,
      };
    });
  };
  const setQuizClass = (newClass: string) => {
    setQuizState((prev) => {
      return {
        ...prev,
        quizInfo: { ...prev.quizInfo, class: newClass },
      };
    });
  };
  const setQuizSubject = (newSubject: string) => {
    setQuizState((prev) => {
      return {
        ...prev,
        quizInfo: { ...prev.quizInfo, subject: newSubject },
      };
    });
  };

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center py-12 px-12 md:px-36">
      <div className="w-full max-w-4xl">
        <Card variant="outline" fullWidth padding="md" className="flex flex-col gap-4">
          {/* Title and description */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-zinc-900">{quizInfo.title}</h1>
            <p className="text-zinc-400 text-sm">
              Enter an optional description or instructions for the students...
            </p>
          </div>

          <hr className="border-zinc-200" />

          {/* Metadata row */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className={pillStyles}>
              <BookOpenIcon size={16} />
              <span>
                Questions: <strong className="text-zinc-700">{questionCount}</strong>
              </span>
            </div>

            <div className={pillStyles}>
              <ClockIcon size={16} />
              <span>
                Time: <strong className="text-zinc-700">{totalTime}</strong>
              </span>
            </div>

            <div className={pillStyles}>
              <ChalkboardTeacherIcon size={16} />
              <span>
                Class: <strong className="text-zinc-700">{quizInfo.class}</strong>
              </span>
            </div>

            <div className={pillStyles}>
              <FlaskIcon size={16} />
              <span>
                Subject: <strong className="text-zinc-700">{quizInfo.subject}</strong>
              </span>
            </div>
          </div>
        </Card>

        {/* Question List */}
        <QuestionCardList
          quizQuestions={quizQuestions}
          setQuizQuestions={setQuizQuestions}
        ></QuestionCardList>
      </div>
    </div>
  );
}
