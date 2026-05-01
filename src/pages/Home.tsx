import { Button, Header, Link, Text } from "@jamsr-ui/react";
import Orb from "../components/Orb";
import { Logo } from "../components/Logo";
import Advantages from "../components/Advantages";

function Home(){
    return (
    <div className="w-full h-[700px] z-0 relative">
      <Header>
        <Logo />
        <div className="flex items-center gap-4">
          <Link href="#">Home</Link>
          <Link href="#">Start Quiz</Link>
          <Link href="#">Join</Link>
        </div>
      </Header>

      <Orb
        hoverIntensity={2}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
      />

      <div className="absolute top-0 left-0 flex items-center justify-center flex-col w-full h-full z-1 pointer-events-none text-center">
        <Button
          size="md"
          startContent={<img src="/background.svg" height={15} width={15} />}
          variant="outlined"
          className="text-foreground text-white"
        >
          New Service
        </Button>
        <Text as="h1" variant="h1" className="text-5xl mt-4 max-w-[18ch] text-black">
          Quiz Generator Live
        </Text>
        <Text as="h1" variant="paragraph" className="text-4xl mt-4 max-w-[18ch] text-black">
          Chose Who You are?
        </Text>
        <div className="flex items-center gap-4 mt-8">
          <Button className="pointer-events-auto">professor</Button>
          <Button variant="light" className="pointer-events-auto">Student</Button>
        </div>
      </div>

      <Advantages/>
    </div>
  );
}

export default Home