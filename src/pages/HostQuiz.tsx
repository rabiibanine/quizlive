import { useEffect, useMemo, useState } from "react";

import NavBar from "@/components/NavBar";
import  Card from "@/components/Card";
import { AnswerStatCard, LeaderboardCard } from "@/components/quiz";
import StepProgress from "@/components/StepProgress";
import quizMock from "@/data/quizMock.json";

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

const HostQuiz = () => {
  const quiz = quizMock as QuizSession;
  const [activeIndex, setActiveIndex] = useState(0);
  const [showFullLeaderboard, setShowFullLeaderboard] = useState(false);
  const activeQuestion = quiz.questions[activeIndex];
  const leaderboardEntries = [
    { id: 1, rank: 1, name: "James D.", points: 1150 },
    { id: 2, rank: 2, name: "Sarah R.", points: 1080 },
    { id: 3, rank: 3, name: "Mark T.", points: 1020 },
    { id: 4, rank: 4, name: "Anna L.", points: 985 },
    { id: 5, rank: 5, name: "Kevin C.", points: 950 },
    { id: 6, rank: 6, name: "Julia W.", points: 920 },
    { id: 7, rank: 7, name: "Paul H.", points: 890 },
    { id: 8, rank: 8, name: "Nora B.", points: 860 },
  ];

  const [secondsLeft, setSecondsLeft] = useState(
    quiz.questions[0]?.timeSeconds ?? 0
  );

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
    return activeQuestion.choices.reduce(
      (total, choice) => total + choice.selectedCount,
      0
    );
  }, [activeQuestion]);

  const leadingCount = useMemo(() => {
    return Math.max(...activeQuestion.choices.map((choice) => choice.selectedCount));
  }, [activeQuestion]);

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
            Active Quiz: {quiz.quizTitle}
          </h1>
          <p className="mt-2 text-gray-600">
            Track incoming answers and monitor your class in real time.
          </p>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.6fr_0.6fr]">
            <Card
              variant="outline"
              className="rounded-3xl border-white/80 bg-white/80 backdrop-blur-xl"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <StepProgress
                  label="question"
                  currentStep={activeIndex}
                  totalSteps={quiz.questions.length}
                  className="flex-1"
                  labelClassName="text-xs font-semibold uppercase tracking-[0.3em] text-purple-600"
                  percentClassName="hidden"
                />
                <span className="text-xs font-semibold text-gray-500 absolute right-0 mx-5">
                  {quiz.studentsJoined} students connected
                </span>
              </div>

              <h2 className="mt-6 text-2xl font-semibold text-black">
                Question {activeIndex + 1} of {quiz.questions.length}: {activeQuestion.text}
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
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
                    />
                  );
                })}
              </div>
            </Card>

            <div className="rounded-3xl bg-black p-8 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
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

            <div className="lg:col-span-2">
              <LeaderboardCard
                entries={leaderboardEntries}
                showAll={showFullLeaderboard}
                onToggleView={() => setShowFullLeaderboard((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HostQuiz;
