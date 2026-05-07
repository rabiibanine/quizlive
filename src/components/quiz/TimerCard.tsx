import  Card  from "@/components/Card";

type TimerCardProps = {
  label?: string;
  time: string;
};

const TimerCard = ({ label = "TIME REMAINING", time }: TimerCardProps) => {
  return (
    <Card
      variant="outline"
      className="rounded-3xl bg-black text-white shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]"
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
        {label}
      </div>
      <div className="mt-6 text-4xl font-semibold">{time}</div>
      <p className="mt-10 text-xs text-white/50">Pause Timer</p>
    </Card>
  );
};

export default TimerCard;
