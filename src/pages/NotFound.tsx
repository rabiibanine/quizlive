import { useNavigate } from "react-router-dom";
import Orb from "../components/Orb";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Button from "../components/Button";

export default function NotFound(){
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

                <Orb
                    hoverIntensity={2}
                    rotateOnHover={true}
                    hue={320}
                    forceHoverState={false}
                />

                <main className="absolute top-0 left-0 flex items-center justify-center flex-col w-full h-full z-1 pointer-events-none text-center">
                    <div className="text-center">
                        <p className="text-base font-semibold text-indigo-400">404</p>
                        <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-balance text-white">Page not found</h1>
                        <p className="mt-6 text-lg font-medium text-pretty text-white/70 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Button
                                variant="lavender"
                                className="pointer-events-auto"
                                onClick={() => navigate("/")}
                            >
                                Go back home
                            </Button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
        <Footer />
    </div>
    )
}