import { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { Card } from "../components/primitives";
import StepProgress from "../components/StepProgress";
import quizMock from "../data/quizMock.json";

type QuizChoice = {
  id: number;
  text: string;
  isCorrect: boolean;
  selectedCount: number;
};

type QuizQuestion = {
  id: number;
  text: string;
  timeSeconds: number;
  choices: QuizChoice[];
};

type QuizSession = {
  quizTitle: string;
  className: string;
  subject: string;
  studentsJoined: number;
  questions: QuizQuestion[];
};

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const optionLabels = ["A", "B", "C", "D"];

const StudentQuiz = () => {
  const quiz = quizMock as QuizSession;
  const [activeIndex, setActiveIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(
    quiz.questions[0]?.timeSeconds ?? 0
  );
  const [selectedChoiceId, setSelectedChoiceId] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const activeQuestion = quiz.questions[activeIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        setActiveIndex((index) => {
          const nextIndex = Math.min(index + 1, quiz.questions.length - 1);
          setSecondsLeft(quiz.questions[nextIndex]?.timeSeconds ?? 0);
          return nextIndex;
        });

        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz.questions]);

  useEffect(() => {
    setSelectedChoiceId(null);
    setIsSubmitted(false);
  }, [activeIndex]);

  const handleChoiceSelect = (choiceId: number) => {
    if (isSubmitted) return;
    setSelectedChoiceId(choiceId);
  };

  const handleSubmit = () => {
    if (selectedChoiceId === null) return;
    setIsSubmitted(true);
  };

  const canSubmit = selectedChoiceId !== null && !isSubmitted;

  return (
    <div
      className="min-h-screen w-full text-gray-900 selection:bg-purple-200 selection:text-white"
      style={{
        background: `
          radial-gradient(circle at 10% 20%, rgba(132, 85, 239, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(0, 144, 169, 0.15) 0%, transparent 40%)
        `,
      }}
    >
      <NavBar />

      <main className="relative py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
            <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-700">
              Live Now
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1 text-gray-700">
              {quiz.className}
            </span>
            <span className="rounded-full bg-white/80 px-3 py-1 text-gray-700">
              {quiz.subject}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold text-black md:text-4xl">
            Your Quiz: {quiz.quizTitle}
          </h1>
          <p className="mt-2 text-gray-600">
            Choose the correct answer and submit before time runs out.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_0.6fr]">
            <Card
              variant="outline"
              className="rounded-3xl border-white/80 bg-white/80 backdrop-blur-xl"
            >
              <StepProgress
                label="question"
                currentStep={activeIndex}
                totalSteps={quiz.questions.length}
                className="flex-1"
                labelClassName="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600"
                percentClassName="hidden"
              />

              <h2 className="mt-6 text-2xl font-semibold text-black">
                Question {activeIndex + 1} of {quiz.questions.length}: {activeQuestion.text}
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {activeQuestion.choices.map((choice, index) => {
                  const isSelected = selectedChoiceId === choice.id;
                  return (
                    <button
                      key={choice.id}
                      type="button"
                      className={`group relative flex min-h-[112px] w-full items-start gap-5 rounded-2xl border-2 px-6 py-6 text-left transition-all md:min-h-[128px] ${
                        isSelected
                          ? "border-purple-500 bg-purple-50 shadow-[0_18px_40px_-24px_rgba(88,28,135,0.7)]"
                          : "border-gray-200 bg-white shadow-[0_16px_35px_-24px_rgba(15,23,42,0.45)] hover:border-purple-300"
                      } ${isSubmitted && !isSelected ? "opacity-70" : ""}`}
                      onClick={() => handleChoiceSelect(choice.id)}
                      disabled={isSubmitted}
                      aria-pressed={isSelected}
                    >
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-base font-semibold ${
                          isSelected
                            ? "bg-purple-600 text-white"
                            : "bg-gray-100 text-gray-700 group-hover:bg-purple-100 group-hover:text-purple-700"
                        }`}
                      >
                        {optionLabels[index] ?? ""}
                      </span>
                      <span className="text-base font-semibold text-gray-900">
                        {choice.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-600">
                  {isSubmitted
                    ? "Answer submitted. Waiting for the next question."
                    : "Select one answer and submit it."}
                </p>
                <Button
                  variant={canSubmit ? "black" : "ghost"}
                  className="px-8 py-3"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                >
                  {isSubmitted ? "Submitted" : "Submit Answer"}
                </Button>
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 lg:hidden">
                Time Remaining: {formatTime(secondsLeft)}
              </p>
            </Card>

            <div className="hidden rounded-3xl bg-black p-8 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] lg:block">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/60">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20">
                  <span className="h-3 w-3 rounded-full border border-white/40" />
                </span>
                Time Remaining
              </div>
              <div className="mt-10 text-5xl font-semibold tracking-tight">
                {formatTime(secondsLeft)}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentQuiz;

