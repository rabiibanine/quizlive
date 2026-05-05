import AnimatedItem from "../AnimatedList";
import { Card } from "../primitives";

type LeaderboardEntry = {
  id: number;
  rank: number;
  name: string;
  points: number;
};

type LeaderboardCardProps = {
  title?: string;
  badgeText?: string;
  entries: LeaderboardEntry[];
  showAll?: boolean;
  onToggleView?: () => void;
};

const LeaderboardCard = ({
  title = "Live Leaderboard",
  badgeText = "REAL-TIME",
  entries,
  showAll = false,
  onToggleView,
}: LeaderboardCardProps) => {
  const visibleEntries = showAll ? entries : entries.slice(0, 3);
  const toggleLabel = showAll ? "Hide Full Standings" : "View Full Standings";

  return (
    <Card
      variant="outline"
      className="rounded-3xl border-white/80 bg-white/80 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
        <span>{title}</span>
        <span className="text-purple-600">{badgeText}</span>
      </div>

      <div className="mt-5 space-y-3">
        {visibleEntries.map((entry, index) => (
          <AnimatedItem key={entry.id} index={index} delay={0.05 * index}>
            <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-sm font-semibold text-purple-700">
                  {entry.rank}
                </span>
                <span className="font-medium text-gray-900">{entry.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {entry.points.toLocaleString()} pts
              </span>
            </div>
          </AnimatedItem>
        ))}
      </div>

      <button
        type="button"
        className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 transition-colors hover:text-gray-600"
        onClick={onToggleView}
      >
        {toggleLabel}
      </button>
    </Card>
  );
};

export default LeaderboardCard;

