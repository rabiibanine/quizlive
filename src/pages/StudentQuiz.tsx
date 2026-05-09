import { useEffect, useState } from "react";

import NavBar from "@/components/NavBar";
import Button from "@/components/Button";
import Card from "@/components/Card";
import StepProgress from "@/components/StepProgress";
import quizMock from "@/data/quizMock.json";

import type { Quiz, Session } from "@/types";
import { doc, onSnapshot } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { db } from "@/firebase/firebase";

// type QuizChoice = {
//   id: number;
//   text: string;
//   isCorrect: boolean;
//   selectedCount: number;
// };

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const optionLabels = ["A", "B", "C", "D"];

const StudentQuiz = () => {
  const quiz = quizMock as Quiz;
  const { sessionId, student } = useLocation().state;

  const [activeIndex, setActiveIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(quiz.questions[0]?.time ?? 0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  const activeQuestion = quiz.questions[activeIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        setActiveIndex((index) => {
          const nextIndex = Math.min(index + 1, quiz.questions.length - 1);
          setSecondsLeft(quiz.questions[nextIndex]?.time ?? 0);
          return nextIndex;
        });

        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz.questions]);

  useEffect(() => {
    setSelectedChoiceIndex(null);
    setIsSubmitted(false);
  }, [activeIndex]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "sessions", sessionId), (snap) => {
      if (!snap.exists()) return;
      setSession(snap.data() as Session);
    });
    return unsub;
  }, [sessionId]);

  const handleChoiceSelect = (choiceId: number) => {
    if (isSubmitted) return;
    setSelectedChoiceIndex(choiceId);
  };

  const handleSubmit = () => {
    if (selectedChoiceIndex === null) return;
    setIsSubmitted(true);
  };

  const canSubmit = selectedChoiceIndex !== null && !isSubmitted;

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
            <span className="rounded-full bg-purple-100 px-3 py-1 text-purple-700">Live Now</span>
            <span className="rounded-full bg-white/80 px-3 py-1 text-gray-700">{quiz.course}</span>
            <span className="rounded-full bg-white/80 px-3 py-1 text-gray-700">{quiz.subject}</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold text-black md:text-4xl">
            Your Quiz: {quiz.title}
          </h1>
          <p className="mt-2 text-gray-600">
            Choose the correct answer and submit before time runs out.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_0.6fr]">
            <Card
              variant="outline"
              padding="lg"
              className="rounded-3xl border-white/70 bg-white/80 backdrop-blur-xl shadow-[0_25px_60px_-40px_rgba(15,23,42,0.45)]"
            >
              {" "}
              {session?.status === "waiting" ? (
                <p> Waiting for Quiz to start...</p>
              ) : (
                <>
                  <StepProgress
                    label="Question"
                    currentStep={activeIndex}
                    totalSteps={quiz.questions.length}
                    className="flex-1"
                    labelClassName="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600"
                    percentClassName="hidden"
                  />

                  <h2 className="mt-6 text-2xl font-semibold text-black md:text-3xl">
                    Question {activeIndex + 1} of {quiz.questions.length}: {activeQuestion.text}
                  </h2>

                  <div className="mt-8 grid gap-5 md:grid-cols-2">
                    {activeQuestion.choices.map((choice, index) => {
                      const isSelected = selectedChoiceIndex === index;
                      return (
                        <button
                          key={choice[index]}
                          type="button"
                          className={`group relative flex min-h-[120px] w-full items-start gap-5 rounded-2xl border bg-white/90 px-6 py-6 text-left transition-all duration-200 md:min-h-[132px] ${
                            isSelected
                              ? "border-purple-500 bg-purple-50/80 shadow-[0_18px_45px_-30px_rgba(88,28,135,0.6)] ring-1 ring-purple-200"
                              : "border-gray-200/80 shadow-[0_12px_30px_-28px_rgba(15,23,42,0.35)] hover:border-purple-300 hover:shadow-[0_18px_35px_-30px_rgba(88,28,135,0.4)]"
                          } ${isSubmitted && !isSelected ? "opacity-70" : ""}`}
                          onClick={() => handleChoiceSelect(index)}
                          disabled={isSubmitted}
                          aria-pressed={isSelected}
                        >
                          <span
                            className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold ${
                              isSelected
                                ? "bg-purple-600 text-white"
                                : "bg-white text-gray-700 ring-1 ring-gray-200/70 group-hover:bg-purple-50 group-hover:text-purple-700"
                            }`}
                          >
                            {optionLabels[index] ?? ""}
                          </span>
                          <span className="text-base font-semibold leading-snug text-gray-900">
                            {choice[index]}
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
                </>
              )}
            </Card>

            <div className="hidden rounded-3xl bg-black p-8 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] lg:block">
              {session?.status === "waiting" ? (
                <></>
              ) : (
                <>
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/60">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20">
                      <span className="h-3 w-3 rounded-full border border-white/40" />
                    </span>
                    Time Remaining
                  </div>
                  <div className="mt-10 text-5xl font-semibold tracking-tight">
                    {formatTime(secondsLeft)}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentQuiz;
