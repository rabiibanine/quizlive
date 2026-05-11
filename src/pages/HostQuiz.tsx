import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

import { doc, onSnapshot } from "firebase/firestore";

import Card from "@/components/Card";
import { AnswerStatCard, LeaderboardCard } from "@/components/quiz";
import StepProgress from "@/components/StepProgress";
import TimerCard from "@/components/quiz/TimerCard";

import type { Session } from "@/types/index";
import { db } from "@/firebase/firebase";

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const HostQuiz = () => {
  const { sessionId } = useLocation().state;
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "sessions", sessionId), (snap) => {
      if (!snap.exists()) return;
      setSession(snap.data() as Session);
    });
    return unsub;
  }, [sessionId]);

  // TODO implement correct no session handling
  if (!session) return <p>Loading...</p>;

  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false);
  const activeQuestion = quiz.questions[activeIndex];

  const [secondsLeft, setSecondsLeft] = useState(quiz.questions[0]?.timeSeconds ?? 0);

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

  const totalResponses = useMemo(() => {
    return activeQuestion.choices.reduce((total, choice) => total + choice.selectedCount, 0);
  }, [activeQuestion]);

  const leadingCount = useMemo(() => {
    return Math.max(...activeQuestion.choices.map((choice) => choice.selectedCount));
  }, [activeQuestion]);

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
            {quiz.className}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
            {quiz.subject}
          </span>
        </div>

        <div>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Active Quiz: {quiz.quizTitle}
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
                currentStep={activeIndex}
                totalSteps={quiz.questions.length}
                className="flex-1"
                labelClassName="text-xs font-semibold uppercase tracking-[0.3em] text-white/60"
                percentClassName="hidden"
                trackClassName="bg-white/10"
                barClassName="bg-purple-300"
              />
              <span className="text-xs font-semibold text-white/60">
                {quiz.studentsJoined} students connected
              </span>
            </div>

            <h2 className="mt-6 text-2xl font-semibold text-white md:text-3xl">
              Question {activeIndex + 1} of {quiz.questions.length}: {activeQuestion.text}
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {activeQuestion.choices.map((choice) => {
                const percent = totalResponses
                  ? Math.round((choice.selectedCount / totalResponses) * 100)
                  : 0;
                return (
                  <AnswerStatCard
                    key={choice.id}
                    label={choice.text}
                    count={choice.selectedCount}
                    percent={percent}
                    isLeading={choice.selectedCount === leadingCount}
                    tone="dark"
                  />
                );
              })}
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
