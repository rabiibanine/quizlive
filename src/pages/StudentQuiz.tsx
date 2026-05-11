import { useEffect, useState } from "react";

import Button from "@/components/Button";
import StepProgress from "@/components/StepProgress";
import TimerCard from "@/components/quiz/TimerCard";
import quizMock from "@/data/quizMock.json";

import type { Quiz, Session } from "@/types";
import { doc, onSnapshot } from "firebase/firestore";
import { useLocation } from "react-router-dom";
import { db } from "@/firebase/firebase";

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const optionLabels = ["A", "B", "C", "D"];

const StudentQuiz = () => {
  // Logic kept exactly from Code 2
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

  // Styling kept exactly from Code 1, adapting only to Code 2's state variables and waiting status
  return (
    <div
      className="min-h-screen w-full bg-slate-950 text-white flex flex-col"
      style={{
        background: "linear-gradient(180deg, #0b1222 0%, #0f172a 55%, #0b1222 100%)",
      }}
    >

      <main className="mx-auto flex flex-1 min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row lg:gap-12">
        <aside className="w-full lg:max-w-[280px]">
          {session?.status !== "waiting" && (
            <>
              <TimerCard time={formatTime(secondsLeft)} />
              <div className="mt-12">
                <StepProgress
                  label="Question"
                  currentStep={activeIndex}
                  totalSteps={quiz.questions.length}
                  labelClassName="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/60"
                  percentClassName="hidden"
                  trackClassName="bg-white/10"
                  barClassName="bg-purple-300"
                />
              </div>
            </>
          )}
        </aside>

        <section className="flex-1">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-purple-200">
            <span className="rounded-full bg-purple-200 px-3 py-1 text-purple-900">
              Live Now
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
              {quiz.course}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
              {quiz.subject}
            </span>
          </div>

          <h1 className="mt-6 text-2xl font-semibold text-white md:text-3xl">
            Your Quiz: {quiz.title}
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Choose the correct answer and submit before time runs out.
          </p>

          {session?.status === "waiting" ? (
            <div className="mt-10">
              <p className="text-lg font-semibold text-white/80">Waiting for Quiz to start...</p>
            </div>
          ) : (
            <>
              <h2 className="mt-10 text-lg font-semibold text-white/80">
                Question {activeIndex + 1} of {quiz.questions.length}: {activeQuestion.text}
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {activeQuestion.choices.map((choice, index) => {
                  const isSelected = selectedChoiceIndex === index;
                  return (
                    <button
                      key={choice[index]}
                      type="button"
                      className={`group relative flex min-h-[140px] w-full items-center gap-4 rounded-3xl border bg-white/5 px-6 py-6 text-left transition-all duration-200 ${
                        isSelected
                          ? "border-purple-300/80 bg-purple-300/10 shadow-[0_18px_40px_-24px_rgba(147,102,255,0.6)]"
                          : "border-white/10 hover:border-purple-200/70 hover:bg-white/10"
                      } ${isSubmitted && !isSelected ? "opacity-60" : ""}`}
                      onClick={() => handleChoiceSelect(index)}
                      disabled={isSubmitted}
                      aria-pressed={isSelected}
                    >
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                          isSelected
                            ? "bg-purple-200 text-purple-900"
                            : "border border-white/20 text-white/70"
                        }`}
                      >
                        {optionLabels[index] ?? ""}
                      </span>
                      <span className="text-base font-medium text-white">
                        {choice[index]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-white/60">
                  {isSubmitted
                    ? "Answer submitted. Waiting for the next question."
                    : "Select one answer and submit it."}
                </p>
                <Button
                  variant={canSubmit ? "lavender" : "ghost"}
                  className="rounded-2xl px-8 py-3 text-sm font-semibold text-purple-900 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/10 disabled:text-white/40"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                >
                  {isSubmitted ? "Submitted" : "Submit Answer"}
                </Button>
              </div>
            </>
          )}
        </section>
      </main>

    </div>
  );
};

export default StudentQuiz;