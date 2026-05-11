import AnimatedItem from "@/components/AnimatedList.tsx";
import  Card  from "@/components/Card.tsx";

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
  tone?: "light" | "dark";
};

const LeaderboardCard = ({
  title = "Live Leaderboard",
  entries,
  showAll = false,
  onToggleView,
  tone = "light",
}: LeaderboardCardProps) => {
  const visibleEntries = showAll ? entries : entries.slice(0, 3);
  const toggleLabel = showAll ? "Hide Full Standings" : "View Full Standings";
  const isDark = tone === "dark";
  const cardVariant = isDark ? "none" : "outline";
  const cardClass = isDark
    ? "rounded-3xl border border-white/10 bg-white/5 text-white backdrop-blur"
    : "rounded-3xl border-white/80 bg-white/80 backdrop-blur-xl";
  const headerClass = isDark
    ? "text-xs font-semibold uppercase tracking-[0.2em] text-white/60"
    : "text-xs font-semibold uppercase tracking-[0.2em] text-gray-500";
  const entryClass = isDark
    ? "rounded-2xl border border-white/10 bg-white/5"
    : "rounded-2xl border border-gray-100 bg-white";
  const entryNameClass = isDark ? "text-white" : "text-gray-900";
  const entryPointsClass = isDark ? "text-white" : "text-gray-900";
  const rankClass = isDark
    ? "bg-purple-200/20 text-purple-200"
    : "bg-purple-50 text-purple-700";
  const toggleClass = isDark
    ? "text-xs font-semibold uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-white/80"
    : "text-xs font-semibold uppercase tracking-[0.25em] text-gray-400 transition-colors hover:text-gray-600";

  return (
    <Card variant={cardVariant} className={cardClass}>
      <div className={headerClass}>
        <span>{title}</span>
      </div>

      <div className="mt-5 space-y-3">
        {visibleEntries.map((entry, index) => (
          <AnimatedItem key={entry.id} index={index} delay={0.05 * index}>
            <div className={`flex items-center justify-between px-4 py-3 shadow-sm ${entryClass}`}>
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${rankClass}`}
                >
                  {entry.rank}
                </span>
                <span className={`font-medium ${entryNameClass}`}>{entry.name}</span>
              </div>
              <span className={`text-sm font-semibold ${entryPointsClass}`}>
                {entry.points.toLocaleString()} pts
              </span>
            </div>
          </AnimatedItem>
        ))}
      </div>

      <button type="button" className={`mt-6 ${toggleClass}`} onClick={onToggleView}>
        {toggleLabel}
      </button>
    </Card>
  );
};

export default LeaderboardCard;
