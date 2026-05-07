type StepProgressProps = {
  label?: string;
  currentStep: number;
  totalSteps: number;
  className?: string;
  labelClassName?: string;
  percentClassName?: string;
  trackClassName?: string;
  barClassName?: string;
};

const StepProgress = ({
  label = "Step",
  currentStep,
  totalSteps,
  className = "",
  labelClassName = "text-sm text-gray-500",
  percentClassName = "text-sm text-gray-500",
  trackClassName = "bg-gray-200",
  barClassName = "bg-purple-500",
}: StepProgressProps) => {
  const safeTotal = Math.max(totalSteps, 1);
  const progress = Math.round(((currentStep + 1) / safeTotal) * 100);
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <span className={labelClassName}>
          {label} {currentStep + 1} of {totalSteps}
        </span>
        <span className={percentClassName}>{progress}%</span>
      </div>
      <div className={`mt-3 h-2 w-full rounded-full ${trackClassName}`}>
        <div
          className={`h-full rounded-full ${barClassName}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default StepProgress;
