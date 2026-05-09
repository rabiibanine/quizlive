import Card from "@/components/Card";

type TimerCardProps = {
  label?: string;
  time: string;
};

const TimerCard = ({ label = "TIME REMAINING", time }: TimerCardProps) => {
  return (
    <Card
      variant="none"
      className="rounded-[32px] border border-white/10 bg-slate-950/80 text-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.7)]"
    >
      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/60">
        <svg
          className="h-4 w-4 text-white/60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
        {label}
      </div>
      <div className="mt-8 text-5xl font-semibold tracking-tight text-purple-200">{time}</div>
    </Card>
  );
};

export default TimerCard;
