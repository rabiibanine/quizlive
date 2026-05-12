import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { doc, onSnapshot } from "firebase/firestore";

import Card from "@/components/Card";
import { AnswerStatCard, LeaderboardCard } from "@/components/quiz";
import StepProgress from "@/components/StepProgress";
import TimerCard from "@/components/quiz/TimerCard";

import type { Session } from "@/types/index";
import { db } from "@/firebase/firebase";
import { advanceQuestion, endSession } from "@/services/sessionServices";

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const HostQuiz = () => {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (!state) navigate("/");
  }, [state]);

  if (!state) return null;

  const { sessionId } = state;

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "sessions", sessionId), (snap) => {
      if (!snap.exists()) return;
      setSession(snap.data() as Session);
    });
    return unsub;
  }, [sessionId]);

  const activeQuestion = session?.quiz.questions[session.currentQuestion];

  const hasAdvanced = useRef(false);

  useEffect(() => {
    hasAdvanced.current = false;
    if (!activeQuestion) return;
    setSecondsLeft(activeQuestion.time);
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1 && !hasAdvanced.current) {
          hasAdvanced.current = true;
          const isLastQuestion = session.currentQuestion >= session.quiz.questions.length - 1;
          if (isLastQuestion) {
            endSession(sessionId);
            navigate("/podium", { state: { sessionId } });
          } else {
            advanceQuestion(sessionId);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [session?.currentQuestion]);

  if (!session || !activeQuestion) return <p>Loading...</p>;

  return (
    <div
      className="min-h-screen w-full bg-slate-950 text-white"
      style={{
        background: "linear-gradient(180deg, #0b1222 0%, #0f172a 55%, #0b1222 100%)",
      }}
    >
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-16 lg:gap-12">
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-purple-200">
          <span className="rounded-full bg-purple-200 px-3 py-1 text-purple-900">Live Now</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
            {session.quiz.course}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
            {session.quiz.subject}
          </span>
        </div>

        <div>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Active Quiz: {session.quiz.title}
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Track incoming answers and monitor your class in real time.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_0.6fr]">
          <Card
            variant="none"
            padding="lg"
            className="rounded-3xl border border-white/10 bg-white/5 shadow-[0_25px_60px_-40px_rgba(15,23,42,0.7)] backdrop-blur"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <StepProgress
                label="Question"
                currentStep={session.currentQuestion}
                totalSteps={session.quiz.questions.length}
                className="flex-1"
                labelClassName="text-xs font-semibold uppercase tracking-[0.3em] text-white/60"
                percentClassName="hidden"
                trackClassName="bg-white/10"
                barClassName="bg-purple-300"
              />
              <span className="text-xs font-semibold text-white/60">
                {session.students.length} students connected
              </span>
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-white md:text-3xl">
              Question {session.currentQuestion + 1} of {session.quiz.questions.length}:{" "}
              {activeQuestion.text}
            </h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {activeQuestion.choices.map((choice, index) => (
                // TODO Fix this
                <AnswerStatCard
                  key={index}
                  label={choice.text}
                  currentStudents={session.currentStudents}
                  tone="dark"
                  count={choice.count}
                />
              ))}
            </div>
          </Card>

          <TimerCard time={formatTime(secondsLeft)} />

          <div className="lg:col-span-2">
            <LeaderboardCard
              students={session.students}
              showAll={showFullLeaderboard}
              onToggleView={() => setShowFullLeaderboard((prev) => !prev)}
              tone="dark"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HostQuiz;
