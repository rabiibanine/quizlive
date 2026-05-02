import Orb from "../components/Orb";
import { Logo } from "../components/Logo";
import Advantages from "../components/Advantages";

function Home(){
    return (
    <div className="w-full h-[700px] z-0 relative">
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

      <Orb
        hoverIntensity={2}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
      />

      <div className="absolute top-0 left-0 flex items-center justify-center flex-col w-full h-full z-1 pointer-events-none text-center">
        <button
          className="
            flex items-center gap-2 mt-10 mb-4 md:mb-0 md:mt-0
            px-4 py-2
            rounded-full
            bg-black text-white
            border border-black
            transition-all duration-300
            hover:bg-white hover:text-black
          "
        >
          <img src="/background.svg" height={15} width={15} />
          New Service
        </button>
        <h1 className="text-3xl md:text-5xl md:mt-6 max-w-[18ch] text-black font-semibold">
          Quiz Generator Live
        </h1>
        <p  className="text-3xl md:text-4xl md:mt-4 max-w-[18ch] text-black">
          Chose Who You are?
        </p>
        <div className="flex items-center gap-4 md:mt-2 mt-2">
          <div className="flex items-center gap-4 md:mt-8 mt-2">
            <button className="cursor-pointer md:w-40 w-32 pointer-events-auto bg-black text-white px-6 py-3 rounded-full border border-black transition-all duration-300 hover:bg-white hover:text-black">
              professor
            </button>

            <button className="cursor-pointer md:w-40 w-32 pointer-events-auto bg-white text-black px-6 py-3 rounded-full border border-black transition-all duration-300 hover:bg-black hover:text-white">
              Student
            </button>
          </div>
        </div>
      </div>

      <Advantages/>
    </div>
  );
}

export default Home