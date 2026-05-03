import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";

function NavBar() {
  return (
    <div className="relative top-10 left-1/2 -translate-x-1/2 flex h-[60px] w-[90%] lg:max-w-screen-lg backdrop-blur-[10px] rounded-full border border-black bg-black text-white justify-between items-center px-6 z-50">
      
      <Logo />

      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-white border-b-2 border-transparent hover:border-[#ffffffa3] hover:text-[#ffffffa3] transition-all duration-300"
        >
          Home
        </Link>

        <Link
          to="/start"
          className="text-white border-b-2 border-transparent hover:border-[#ffffffa3] hover:text-[#ffffffa3] transition-all duration-300"
        >
          Start Quiz
        </Link>

        <Link
          to="/join"
          className="text-white border-b-2 border-transparent hover:border-[#ffffffa3] hover:text-[#ffffffa3] transition-all duration-300"
        >
          Join
        </Link>
      </div>
    </div>
  );
}

export default NavBar;