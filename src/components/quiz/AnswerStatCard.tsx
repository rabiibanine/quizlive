import Card from "@/components/Card";

interface AnswerStatCardProps {
  label: string;
  count: number;
  currentStudents: number;
  isLeading?: boolean;
  tone?: "light" | "dark";
}

const AnswerStatCard = ({
  label,
  count = 0,
  currentStudents,
  isLeading = false,
  tone = "light",
}: AnswerStatCardProps) => {
  const percent = count === 0 || isNaN(count) ? 0 : Math.round((count / currentStudents) * 100);

  const isDark = tone === "dark";
  const cardVariant = isDark ? "none" : "outline";
  const borderClass = isDark
    ? isLeading
      ? "border-purple-300/70"
      : "border-white/10"
    : isLeading
      ? "border-purple-500 shadow-[0_0_0_1px_rgba(168,85,247,0.15)]"
      : "border-gray-200";
  const labelClass = isDark ? "text-white" : "text-gray-900";
  const countClass = isDark ? "text-white/60" : "text-gray-500";
  const percentClass = isDark ? "text-white" : "text-gray-900";
  const leadingClass = isDark ? "text-purple-200" : "text-purple-600";
  const trackClass = isDark ? "bg-white/10" : "bg-gray-100";
  const barClass = isDark ? "bg-purple-300" : "bg-purple-500";
  const backgroundClass = isDark ? "bg-white/5" : "bg-white";

  return (
    <Card
      variant={cardVariant}
      className={`overflow-hidden rounded-2xl border ${backgroundClass} ${borderClass}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className={`text-sm font-semibold ${labelClass}`}>{label}</p>
          <p className={`mt-1 text-xs ${countClass}`}>{count} students</p>
        </div>
        <div className="text-right">
          {isLeading && (
            <span className={`text-[10px] font-semibold tracking-[0.2em] ${leadingClass}`}>
              LEADING
            </span>
          )}
          <p className={`text-lg font-semibold ${percentClass}`}>{percent}%</p>
        </div>
      </div>
      <div className={`mt-4 h-1.5 w-full rounded-full ${trackClass}`}>
        <div className={`h-full rounded-full ${barClass}`} style={{ width: `${percent}%` }} />
      </div>
    </Card>
  );
};

export default AnswerStatCard;
