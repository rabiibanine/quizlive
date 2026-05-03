export const Logo = () => {
  return (
    <a href="/" className="flex items-center gap-2 hover:opacity-90 transition-all duration-300">
      <img src="/logo.jpg" alt="logo" className="size-8 rounded-full" />
      <span className="text-lg font-normal text-white">
        QGL
      </span>
    </a>
  );
};