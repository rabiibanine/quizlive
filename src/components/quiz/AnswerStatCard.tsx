import { Card } from "../primitives";

type AnswerStatCardProps = {
  label: string;
  count: number;
  percent: number;
  isLeading?: boolean;
};

const AnswerStatCard = ({
  label,
  count,
  percent,
  isLeading = false,
}: AnswerStatCardProps) => {
  return (
    <Card
      variant="outline"
      className={`overflow-hidden border rounded-2xl ${
        isLeading
          ? "border-purple-500 shadow-[0_0_0_1px_rgba(168,85,247,0.15)]"
          : "border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-gray-900">{label}</p>
          <p className="mt-1 text-xs text-gray-500">{count} students</p>
        </div>
        <div className="text-right">
          {isLeading && (
            <span className="text-[10px] font-semibold tracking-[0.2em] text-purple-600">
              LEADING
            </span>
          )}
          <p className="text-lg font-semibold text-gray-900">{percent}%</p>
        </div>
      </div>
      <div className="mt-4 h-1.5 w-full rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-purple-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </Card>
  );
};

export default AnswerStatCard;
