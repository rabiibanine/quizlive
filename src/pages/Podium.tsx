import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

import type { Session, Student } from "@/types";
import AnimatedItem from "../components/AnimatedList";
import Button from "../components/Button";
import CsvDownloader from "react-csv-downloader";
import { db } from "@/firebase/firebase";
import { DownloadSimpleIcon, PlusIcon } from "@phosphor-icons/react";

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const getAccuracy = (student: Student, questions: Session["quiz"]["questions"]) => {
  const totalQuestions = questions.length;
  if (totalQuestions === 0) return 0;

  const correctCount = questions.reduce((count, question, index) => {
    const answer = student.answers[index];
    return count + (answer === question.correctChoice ? 1 : 0);
  }, 0);

  return Math.round((correctCount / totalQuestions) * 100);
};

const toCSV = (students: Student[], questions: Session["quiz"]["questions"]) =>
  students.map((student, index) => ({
    rank: index + 1,
    name: student.name,
    score: student.score,
    accuracy: `${getAccuracy(student, questions)}%`,
    joined_at: new Date(student.joinedAt).toLocaleTimeString(),
  }));

type PodiumBarStyle = React.CSSProperties & {
  "--target-height"?: string;
};

export default function Podium() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { sessionId: string } | null;

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (!state) navigate("/");
  }, [state]);

  useEffect(() => {
    if (!state?.sessionId) return;
    const fetchSession = async () => {
      const snap = await getDoc(doc(db, "sessions", state.sessionId));
      if (!snap.exists()) return;
      setSession(snap.data() as Session);
    };
    fetchSession();
  }, [state?.sessionId]);

  if (!state) return null;
  if (!session) return <p>Loading...</p>;

  const sortedStudents: Student[] = [...session.students].sort((a, b) => b.score - a.score);

  const datas = toCSV(sortedStudents, session.quiz.questions);

  const averageAccuracy = Math.round(
    sortedStudents.reduce((sum, s) => sum + getAccuracy(s, session.quiz.questions), 0) /
      sortedStudents.length
  );

  const podiumOrderByRank =
    sortedStudents.length >= 3
      ? [2, 1, 3]
      : sortedStudents.length === 2
      ? [2, 1]
      : [1];

  const podiumEntries = podiumOrderByRank
    .map((rank) => ({
      rank,
      student: sortedStudents[rank - 1],
    }))
    .filter((entry) => Boolean(entry.student)) as Array<{ rank: number; student: Student }>;

  const otherRankings = sortedStudents.splice(3);

  function handleNewQuiz(): void {
    navigate("/quiz-form");
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: "linear-gradient(180deg, #0b1222 0%, #0f172a 55%, #0b1222 100%)",
      }}
    >
      <main className="mx-auto max-w-6xl px-6 pt-10 pb-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              Session Results
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white">{session.quiz.title}</h1>
          </div>

          <div className="flex gap-3">
            <Button
              variant="white"
              className="flex items-center gap-2 border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10"
              onClick={handleNewQuiz}
            >
              <PlusIcon></PlusIcon>
              Start New Quiz
            </Button>
            <Button variant="lavender" className="flex items-center gap-2">
              <DownloadSimpleIcon></DownloadSimpleIcon>
              <CsvDownloader
                className="cursor-pointer"
                filename="quiz_result"
                extension=".csv"
                separator=","
                datas={datas}
                text="Download CSV"
              />
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              Average Accuracy
            </p>
            <div className="mt-2 text-3xl font-semibold text-white">{averageAccuracy}%</div>
            <div className="mt-4 h-2 w-full rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-purple-300/80"
                style={{ width: `${averageAccuracy}%` }}
              />
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              Participants
            </p>
            <div className="mt-2 text-3xl font-semibold text-white">{sortedStudents.length}</div>
            <div className="mt-4 flex items-center gap-2">
              {sortedStudents.slice(0, 5).map((student) => (
                <div
                  key={student.id}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/10 text-[10px] font-semibold text-white/70"
                >
                  {getInitials(student.name)}
                </div>
              ))}
              {sortedStudents.length > 5 && (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/10 text-[10px] font-semibold text-white/70">
                  +{sortedStudents.length - 5}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-end justify-center gap-6">
          {podiumEntries.map(({ student, rank }, index) => {
            const isWinner = rank === 1;
            const targetHeight = rank === 1 ? "18rem" : rank === 2 ? "15rem" : "10rem";
            const animationOrderByRank: Record<number, number> = { 3: 0, 2: 1, 1: 2 };
            const orderIndex = animationOrderByRank[rank] ?? index;
            const podiumBarStyle: PodiumBarStyle = {
              animationDelay: `${0.15 + orderIndex * 0.12}s`,
              animationTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
              ...(rank === 1
                ? { animationDuration: "0.9s" }
                : { animationDuration: "0.75s" }),
              minHeight: targetHeight,
              "--target-height": targetHeight,
            };
            return (
              <div
                key={student.id}
                className="animate_fadeInUp flex flex-col items-center"
                style={{ animationDelay: `${orderIndex * 1}s` }}
              >
                <div
                  className={`flex items-center justify-center rounded-full border border-purple-300/40 bg-purple-400/10 text-white/80 ${
                    isWinner ? "h-14 w-14 text-lg" : "h-12 w-12 text-base"
                  }`}
                >
                  {getInitials(student.name)}
                </div>
                <div className="mt-3 text-sm font-semibold text-white/90">{student.name}</div>
                <div className="text-xs text-white/50">{student.score.toLocaleString()} pts</div>
                <div
                  className={`animate-grow origin-bottom mt-4 w-40 rounded-t-3xl border border-white/10 bg-gradient-to-b from-purple-400/20 to-slate-900/90 text-center text-2xl font-semibold text-white/70 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.8)] ${
                    rank === 1 ? "h-72" : rank === 2 ? "h-60" : "h-40"
                  }`}
                  style={podiumBarStyle}
                >
                  <div className="pt-6">{rank}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <h2 className="text-sm font-semibold text-white/80">Detailed Ranking</h2>
          </div>
          <div className="grid grid-cols-[0.6fr_2fr_1fr_1fr] gap-2 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
            <span>Rank</span>
            <span>Name</span>
            <span>Score</span>
            <span>Accuracy</span>
          </div>
          <div className="divide-y divide-white/10">
            {otherRankings.map((student, index) => {
              const rank = index + 4;
              const accuracy = getAccuracy(student, session.quiz.questions);
              return (
                <AnimatedItem key={student.id} index={index} delay={0.05 * index}>
                  <div className="grid grid-cols-[0.6fr_2fr_1fr_1fr] gap-2 px-6 py-4 text-sm text-white/80 hover:bg-white/5 items-center">
                    <span className="font-semibold text-white/60">#{rank}</span>
                    <span className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-semibold text-white/70">
                        {getInitials(student.name)}
                      </span>
                      {student.name}
                    </span>
                    <span>{student.score} pts</span>
                    <span className="flex items-center gap-3">
                      <span className="h-2 w-16 rounded-full bg-white/10">
                        <span
                          className="block h-full rounded-full bg-purple-300/80"
                          style={{ width: `${accuracy}%` }}
                        />
                      </span>
                      {accuracy}%
                    </span>
                  </div>
                </AnimatedItem>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
