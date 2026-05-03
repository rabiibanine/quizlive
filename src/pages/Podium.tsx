import AnimatedItem from "../components/AnimatedList"
import Button from "../components/Button"
import CsvDownloader from 'react-csv-downloader';

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


export default function Podium() {
  return (
    <div className="min-h-screen bg-background text-on-surface">

      <main className="max-w-6xl mx-auto px-6 pt-12 pb-24">
        {/* Title */}
        <div className="animate_fadeInDown text-center mb-16">
          <span className="px-4 py-2 bg-black text-white rounded-full text-sm font-bold">
            SESSION COMPLETE
          </span>
          <h1 className="text-4xl font-bold mt-4">The Results are In!</h1>
          <p className="text-gray-500 mt-2">
            Great job class! Average accuracy was 84%.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-center mt-12 mb-16">
          <Button variant="black" className=" animate_fadeInDown text-white px-8 py-3 rounded-full">
            <CsvDownloader
              className="cursor-pointer"
              filename="quiz_result"
              extension=".csv"
              separator=","
              datas={sortedData}
              text="Download CSV"
            />
          </Button>
          <Button variant="white" className="animate_fadeInDown px-8 py-3 rounded-full">
            Play Again
          </Button>
        </div>

        {/* Podium */}
        <div className="grid md:grid-cols-3 gap-6 items-end mb-24">
          {podium.map((p) => (
            <div
              key={p.id}
              className={`flex flex-col items-center`}
            >
              <div className="animate_fadeInUp mt-3 font-bold">{p.name}</div>
              <div className="animate_fadeInUp text-sm text-gray-500">
                {p.points.toLocaleString()} PTS
              </div>
              <div
                style={{ '--target-height': p.rank === 1 ? '16rem' : p.rank === 2 ? '12rem' : '8rem' } as React.CSSProperties}
                className={`animate-grow flex items-center justify-center text-[60px] mt-4 w-full text-center text-white py-6 rounded-t-3xl ${
                  p.rank === 1
                    ? "bg-yellow-500 h-64"
                    : p.rank === 2
                    ? "bg-gray-600 h-48"
                    : "bg-orange-600 h-32"
                }`}
              >
                {p.rank}
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="animate_fadeInDown bg-white/70 backdrop-blur-xl rounded-xl overflow-hidden">
          {otherRanking.map((s, index) => (
            <AnimatedItem key={s.rank} index={index} delay={0.05 * index}> 
              <div
                key={s.rank}
                className="flex items-center justify-between px-6 py-4 border-b hover:bg-violet-50"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 font-bold">{s.rank}</span>
                  <span>{s.name}</span>
                </div>

                <div className="text-right">
                  <div className="text-violet-600 font-bold">{s.points}</div>
                  <div className="text-xs text-gray-400">
                    {s.accuracy}% accuracy
                  </div>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </div>
      </main>
      
    </div>
  );
}