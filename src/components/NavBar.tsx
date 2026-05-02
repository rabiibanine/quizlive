import { Logo } from "../components/Logo";

function NavBar(){
    return (
      <div
        className="
          relative top-10 left-1/2 -translate-x-1/2
          flex h-[60px] w-[90%] lg:max-w-screen-lg
          backdrop-blur-[10px]
          rounded-full border border-black
          bg-black text-white
          justify-between items-center px-6
          z-50
        "
      >
        <Logo />
        <div className="flex items-center gap-4">
          <a className="text-white border-b-2 border-transparent hover:border-[#ffffffa3] hover:text-[#ffffffa3] transition-all duration-300" href="#">Home</a>
          <a className="text-white border-b-2 border-transparent hover:border-[#ffffffa3] hover:text-[#ffffffa3] transition-all duration-300" href="#">Start Quiz</a>
          <a className="text-white border-b-2 border-transparent hover:border-[#ffffffa3] hover:text-[#ffffffa3] transition-all duration-300" href="#">Join</a>
        </div>
      </div>
  );
}

export default NavBar