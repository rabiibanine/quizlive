import Orb from "../components/Orb";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Card from "../components/Card";
import FeaturesSection from "../components/FeaturesSection";
import HowItWorksSection from "../components/HowItWorksSection";
import { useNavigate } from "react-router-dom";
import { SparkleIcon, UploadSimpleIcon } from "@phosphor-icons/react";

function Home() {
  const navigate = useNavigate();
  return (
    <div
      className="w-full min-h-screen flex flex-col bg-slate-950 text-white"
      style={{
        background: "linear-gradient(180deg, #0b1222 0%, #0f172a 55%, #0b1222 100%)",
      }}
    >
      <div className="flex-1">
        <div className="w-full h-[700px] z-0 relative">
          <NavBar />

          <Orb hoverIntensity={2} rotateOnHover={true} hue={260} forceHoverState={false} />

          <div className="absolute top-0 left-0 flex items-center justify-center flex-col w-full h-full z-1 pointer-events-none text-center">
            <Button
              variant="none"
              className="flex items-center gap-2 mt-10 mb-4 md:mb-0 md:mt-0 border border-white/10 bg-white/5 text-white/80"
            >
              <img src="/background.svg" height={15} width={15} />
              New Service
            </Button>
            <h1 className="text-3xl md:text-5xl md:mt-6 max-w-[18ch] text-white font-semibold">
              Quiz Generator Live
            </h1>
            <p className="text-3xl md:text-4xl md:mt-4 max-w-[18ch] text-white/70">
              Choose Who You are?
            </p>
            <div className="flex items-center gap-4 md:mt-2 mt-2">
              <div className="flex items-center gap-4 md:mt-8 mt-2">
                <Button variant="lavender" className="md:w-40 w-32" onClick={() => navigate("/quiz-form")}>
                  Professor
                </Button>

                <Button
                  variant="white"
                  className="md:w-40 w-32 border-white/10 bg-white/10 text-white hover:border-white/20 hover:bg-white/20"
                  onClick={() => navigate("/join")}
                >
                  Student
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center px-6 md:px-12">
          <div className="w-full max-w-4xl">
            <Card
              variant="none"
              fullWidth
              padding="md"
              className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-purple-400/30 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10"
            >
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-purple-200">
                  <SparkleIcon size={18} />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-lg font-semibold text-white">Generate with AI</h2>
                  <p className="text-sm text-white/60">
                    Import course material (PDF, Text, or URL) to automatically generate quiz questions.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-purple-300/40 bg-purple-500/20 px-4 py-2 text-sm font-semibold text-purple-100 transition hover:bg-purple-500/30"
              >
                <UploadSimpleIcon size={18} />
                Upload File
              </button>
            </Card>
          </div>
        </div>

        <FeaturesSection />
        <HowItWorksSection />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
