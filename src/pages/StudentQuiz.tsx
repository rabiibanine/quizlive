import { useEffect, useState } from "react";
import QuizWaitingLoader from "../components/QuizWaitingLoader"

import Button from "@/components/Button";
import StepProgress from "@/components/StepProgress";
import TimerCard from "@/components/quiz/TimerCard";

import type { Session } from "@/types";
import { doc, onSnapshot } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "@/firebase/firebase";

import { submitAnswer } from "@/services/sessionServices";
import { getOrCreateId } from "@/utils/helpers";

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const StudentQuiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { sessionId: string } | null;

  const [session, setSession] = useState<Session | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [selectedChoiceIndex, setSelectedChoiceIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!state) navigate("/home");
  }, [state]);

  useEffect(() => {
    if (!state?.sessionId) return;
    const unsub = onSnapshot(doc(db, "sessions", state.sessionId), (snap) => {
      if (!snap.exists()) return;
      setSession(snap.data() as Session);
    });
    return unsub;
  }, [state?.sessionId]);

  useEffect(() => {
    if (!session) return;
    if (session.status === "ended") navigate("/");
  }, [session?.status]);

  // reset answer state when question changes
  useEffect(() => {
    if (!session) return;
    setSelectedChoiceIndex(null);
    setIsSubmitted(false);
    setSecondsLeft(session.quiz.questions[session.currentQuestion]?.time ?? 0);
  }, [session?.currentQuestion]);

  // timer counts down locally, driven by session.currentQuestion
  useEffect(() => {
    if (!session || session.status !== "active") return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [session?.currentQuestion, session?.status]);

  if (!state) return null;
  if (!session) return <p>Loading...</p>;

  const activeQuestion = session.quiz.questions[session.currentQuestion];

  const handleChoiceSelect = (index: number) => {
    if (isSubmitted) return;
    setSelectedChoiceIndex(index);
  };

  const handleSubmit = async () => {
    if (selectedChoiceIndex === null) return;

    const studentId = getOrCreateId("studentId");

    try {
      setIsSubmitted(true);
      await submitAnswer(state.sessionId, session.currentQuestion, selectedChoiceIndex, studentId);
    } catch (e) {
      console.error("Failed to submit answer: " + e);
    }
  };

  const canSubmit = selectedChoiceIndex !== null && !isSubmitted;

  return (
    <div
      className="min-h-screen w-full bg-slate-950 text-white flex flex-col"
      style={{
        background: "linear-gradient(180deg, #0b1222 0%, #0f172a 55%, #0b1222 100%)",
      }}
    >
      <main className="mx-auto flex flex-1 min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row lg:gap-12">
        <aside className="w-full lg:max-w-[280px]">
          {session.status === "active" && (
            <>
              <div className="hidden lg:block">
                <TimerCard time={formatTime(secondsLeft)} />
              </div>
              <p className="mt-2 text-sm font-semibold text-white/70 lg:hidden">
                Time left: {formatTime(secondsLeft)}
              </p>
              <div className="mt-12">
                <StepProgress
                  label="Question"
                  currentStep={session.currentQuestion}
                  totalSteps={session.quiz.questions.length}
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
            <span className="rounded-full bg-purple-200 px-3 py-1 text-purple-900">Live Now</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
              {session.quiz.course}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
              {session.quiz.subject}
            </span>
          </div>

          <h1 className="mt-6 text-2xl font-semibold text-white md:text-3xl">
            Your Quiz: {session.quiz.title}
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Choose the correct answer and submit before time runs out.
          </p>

          {session.status === "waiting" ? (
            <QuizWaitingLoader />
          ) : (
            <>
              <h2 className="mt-10 text-lg font-semibold text-white/80">
                <span className="hidden sm:inline">
                  Question {session.currentQuestion + 1} of {session.quiz.questions.length}:{" "}
                </span>
                <span className="sm:hidden">Question: </span>
                {activeQuestion.text}
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-6">
                {activeQuestion.choices.map((choice, index) => {
                  const isSelected = selectedChoiceIndex === index;
                  return (
                    <button
                      key={index}
                      type="button"
                      className={`group relative flex min-h-[110px] w-full items-start gap-2 rounded-2xl border bg-white/5 px-4 py-4 text-left transition-all duration-200 sm:min-h-[140px] sm:items-center sm:gap-4 sm:rounded-3xl sm:px-6 sm:py-6 ${
                        isSelected
                          ? "border-purple-300/80 bg-purple-300/10 shadow-[0_18px_40px_-24px_rgba(147,102,255,0.6)]"
                          : "border-white/10 hover:border-purple-200/70 hover:bg-white/10"
                      } ${isSubmitted && !isSelected ? "opacity-60" : ""}`}
                      onClick={() => handleChoiceSelect(index)}
                      disabled={isSubmitted}
                      aria-pressed={isSelected}
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold transition-colors sm:h-12 sm:w-12 sm:text-sm ${
                          isSelected
                            ? "bg-purple-200 text-purple-900"
                            : "border border-white/20 text-white/70"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1 break-words whitespace-normal text-[13px] font-medium leading-snug text-white sm:text-base">
                        {choice.text}
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
