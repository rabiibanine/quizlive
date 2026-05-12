export const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Animated text */}
      <div className="flex space-x-1 text-white/80 text-lg font-medium">
        {"Generating".split("").map((char, i) => (
          <span
            key={i}
            className="animate-bounce"
            style={{
              animationDelay: `${i * 100}ms`,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Simple pulse loader bar */}
      <div className="relative w-48 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="absolute inset-0 w-1/3 bg-white/70 animate-pulse" />
      </div>
    </div>
  );
};