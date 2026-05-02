import Orb from "../components/Orb";
import Advantages from "../components/Advantages";
import NavBar from "../components/NavBar";
import Button from "../components/Button";

function Home(){
    return (
    <div className="w-full h-[700px] z-0 relative">
      <NavBar/>

      <Orb
        hoverIntensity={2}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
      />

      <div className="absolute top-0 left-0 flex items-center justify-center flex-col w-full h-full z-1 pointer-events-none text-center">
        <Button
          variant="ghost"
          className="flex items-center gap-2 mt-10 mb-4 md:mb-0 md:mt-0"
        >
          <img src="/background.svg" height={15} width={15} />
          New Service
        </Button>
        <h1 className="text-3xl md:text-5xl md:mt-6 max-w-[18ch] text-black font-semibold">
          Quiz Generator Live
        </h1>
        <p  className="text-3xl md:text-4xl md:mt-4 max-w-[18ch] text-black">
          Chose Who You are?
        </p>
        <div className="flex items-center gap-4 md:mt-2 mt-2">
          <div className="flex items-center gap-4 md:mt-8 mt-2">
            <Button variant="black" className="md:w-40 w-32">
              professor
            </Button>

            <Button variant="white" className="md:w-40 w-32">
              Student
            </Button>
          </div>
        </div>
      </div>

      <Advantages/>
    </div>
  );
}

export default Home