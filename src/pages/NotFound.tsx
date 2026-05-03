import { useNavigate } from "react-router-dom";
import Orb from "../components/Orb";

export default function NotFound(){
    const navigate = useNavigate();

    return (
    <div className="w-full h-[700px] z-0 relative">
        <Orb
            hoverIntensity={2}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
        />
    
        <main className="absolute top-0 left-0 flex items-center justify-center flex-col w-full h-full z-1 pointer-events-none text-center">
            <div className="text-center">
                <p className="text-base font-semibold text-indigo-600">404</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Page not found</h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                <button onClick={() => navigate("/")} className="pointer-events-auto cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go back home</button>
                </div>
            </div>
        </main>
    </div>
    )
}