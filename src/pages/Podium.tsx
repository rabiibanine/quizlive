import AnimatedItem from "../components/AnimatedList"
import Button from "../components/Button"
import CsvDownloader from 'react-csv-downloader';
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

type StudentType = {
  id:number,
  name: string;
  points: number;
  rank: number;
  accuracy: number;
};

const students_data: StudentType[] = [
  {
    id: 2,
    name: "Marouane Talbi",
    points: 14250,
    rank: 2,
    accuracy: 92,
  },

  {
    id: 1,
    name: "Rayan Morabit",
    points: 15800,
    rank: 1,
    accuracy: 92,
  },

  {
    id: 3,
    name: "Imane Amrani",
    points: 12900,
    rank: 3,
    accuracy: 92,
  },
  {
    id:2,
    rank: 4,
    name: "Zineb Fettou",
    points: 11400,
    accuracy: 92,
  },
  {
    id:5,
    rank: 5,
    name: "Salma El Gamraoui",
    points: 10250,
    accuracy: 88,
  },
  {
    id:6,
    rank: 6,
    name: "Nora Bouftou",
    points: 9800,
    accuracy: 85,
  },
  {
    id:7,
    rank: 7,
    name: "Hanane Chibi",
    points: 9800,
    accuracy: 85,
  },
  {
    id:8,
    rank: 8,
    name: "Ilyass Eddaira",
    points: 9800,
    accuracy: 85,
  },
  {
    id:9,
    rank: 9,
    name: "Imrane Maalmi",
    points: 9800,
    accuracy: 85,
  },
];

const sortedData: StudentType[] = students_data.sort((a, b) => b.points - a.points);
const podium: StudentType[] = [
  sortedData.find(s => s.rank === 2)!,
  sortedData.find(s => s.rank === 1)!,
  sortedData.find(s => s.rank === 3)!,
];
const otherRanking : StudentType[] = sortedData.filter(s => s.rank > 3);

const averageAccuracy = Math.round(
  students_data.reduce((sum, student) => sum + student.accuracy, 0) / students_data.length
);

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default function Podium() {
  return (
    <div
      className="min-h-screen text-white flex flex-col"
      style={{
        background: "linear-gradient(180deg, #0b1222 0%, #0f172a 55%, #0b1222 100%)",
      }}
    >
      <NavBar />

      <main className="mx-auto w-full max-w-5xl px-6 pt-10 pb-24 mt-10 flex-1">
        {/* Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">
              Session Results
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Advanced Macroeconomics Quiz</h1>
          </div>

          <div className="flex gap-3">
            <Button
              variant="white"
              className="flex items-center gap-2 border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10"
            >
              + Start New Quiz
            </Button>
            <Button
              variant="lavender"
              className="flex items-center gap-2"
            >
              <CsvDownloader
                className="cursor-pointer"
                filename="quiz_result"
                extension=".csv"
                separator=","
                datas={sortedData}
                text="Download CSV"
              />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
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
            <div className="mt-2 text-3xl font-semibold text-white">{students_data.length}</div>
            <div className="mt-4 flex items-center gap-2">
              {students_data.slice(0, 5).map((student) => (
                <div
                  key={student.id}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/10 text-[10px] font-semibold text-white/70"
                >
                  {getInitials(student.name)}
                </div>
              ))}
              {students_data.length > 5 ? (
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/10 text-[10px] font-semibold text-white/70">
                  +{students_data.length - 5}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Podium */}
        <div
          className="mt-10 flex items-end justify-center gap-6"
          style={{ minHeight: "24rem" }}
        >
          {podium.map((p) => {
            const isWinner = p.rank === 1;
            const revealDelay = p.rank === 3 ? 0 : p.rank === 2 ? 0.8 : 1.6;
            const barStyle: React.CSSProperties & { ['--target-height']: string } = {
              '--target-height': p.rank === 1 ? '16rem' : p.rank === 2 ? '12rem' : '10rem',
              animationDelay: `${revealDelay + 0.35}s`,
              animationTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
              ...(p.rank === 1
                ? { animationDuration: "1.4s" }
                : p.rank === 2
                  ? { animationDuration: "1.1s" }
                  : { animationDuration: "0.95s" }),
            };
            return (
              <div
                key={p.id}
                className="animate_fadeInUp flex flex-col items-center"
                style={{ animationDelay: `${revealDelay}s` }}
              >
                <div
                  className={`flex items-center justify-center rounded-full border border-purple-300/40 bg-purple-400/10 text-white/80 ${
                    isWinner ? "h-14 w-14 text-lg" : "h-12 w-12 text-base"
                  }`}
                  style={{
                    animationDelay: `${0.05 + revealDelay}s`,
                    animationTimingFunction: "cubic-bezier(0.2, 0.8, 0.2, 1)",
                  }}
                >
                  {getInitials(p.name)}
                </div>
                <div className="mt-3 text-sm font-semibold text-white/90">{p.name}</div>
                <div className="text-xs text-white/50">{p.points.toLocaleString()} pts</div>
                <div
                  className={`animate-grow origin-bottom mt-4 w-40 rounded-t-3xl border border-white/10 bg-gradient-to-b from-purple-400/20 to-slate-900/90 text-center text-2xl font-semibold text-white/70 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.8)] ${
                    p.rank === 1 ? "h-64" : p.rank === 2 ? "h-48" : "h-40"
                  }`}
                  style={barStyle}
                >
                  <div className="pt-6">{p.rank}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leaderboard */}
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
            {otherRanking.map((s, index) => (
              <AnimatedItem key={s.rank} index={index} delay={0.05 * index}>
                <div className="grid grid-cols-[0.6fr_2fr_1fr_1fr] gap-2 px-6 py-4 text-sm text-white/80 hover:bg-white/5">
                  <span className="font-semibold text-white/60">#{s.rank}</span>
                  <span className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-xs font-semibold text-white/70">
                      {getInitials(s.name)}
                    </span>
                    {s.name}
                  </span>
                  <span>{s.points} pts</span>
                  <span className="flex items-center gap-3">
                    <span className="h-2 w-16 rounded-full bg-white/10">
                      <span className="block h-full rounded-full bg-purple-300/80" style={{ width: `${s.accuracy}%` }} />
                    </span>
                    {s.accuracy}%
                  </span>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}