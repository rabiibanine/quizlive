import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";

function NavBar() {
  return (
    <div className="relative top-10 left-1/2 -translate-x-1/2 flex h-[60px] w-[90%] lg:max-w-screen-lg backdrop-blur-[10px] rounded-full border border-white/10 bg-white/5 text-white justify-between items-center px-6 z-50 shadow-[0_12px_30px_-18px_rgba(147,102,255,0.6)]">

      <Logo />

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-white/80 border-b-2 border-transparent hover:border-white/60 hover:text-white transition-all duration-300"
        >
          Home
        </Link>

        <Link
          to="/quiz-form"
          className="text-white/80 border-b-2 border-transparent hover:border-white/60 hover:text-white transition-all duration-300"
        >
          Start Quiz
        </Link>

        <Link
          to="/join"
          className="text-white/80 border-b-2 border-transparent hover:border-white/60 hover:text-white transition-all duration-300"
        >
          Join
        </Link>
      </div>
    </div>
  );
}

export default NavBar;