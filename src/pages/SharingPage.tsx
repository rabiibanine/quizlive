import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useParams } from "react-router-dom";

import {FiCheck, FiCopy} from "react-icons/fi"

import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { BsQrCode } from "react-icons/bs";


const SharingPage = () => {
    const baseUrl:string = window.location.origin;
    const { code } = useParams<{ code: string }>();
    const roomCode:string = code ?? "";
    const quizLink:string = roomCode ? `${baseUrl}/quiz/${roomCode}` : "";

    const [copied, setcopied] = useState<boolean>(false)

    const handleCopy = async (type_copy:string) => {
      try {
        const shared = type_copy === "code" ? roomCode : quizLink;
        if (!shared) return;
        await navigator.clipboard.writeText(shared);
        setcopied(true);
        setTimeout(() => setcopied(false), 2000);
      } catch (err) {
        alert(`Copy failed: ${err}`);
      }
    };

  return (
    <div
      className="min-h-screen w-full text-gray-900 selection:bg-purple-200 selection:text-white"
      style={{
        background: `
          radial-gradient(circle at 10% 20%, rgba(132, 85, 239, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(0, 144, 169, 0.15) 0%, transparent 40%)
        `,
      }}
    >
      {/* Navbar (inside same background) */}
      <NavBar />

      {/* Main content */}
      <main className="relative flex items-center justify-center py-12 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-8">

          {/* Header */}
          <div className="text-center mt-6">
            <p className="text-lg font-semibold tracking-widest text-purple-600 mb-1">
              QUIZ READY
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-2">
              You have created your quiz
            </h1>
            <p className="text-gray-600 max-w-xl mx-auto mb-4">
              Invite your students to join using the room code or QR code.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8">

            {/* Room Code */}
            <div className="bg-white/80 backdrop-blur-xl rounded-xl border p-10 text-center shadow-[0_0_40px_-10px_rgba(132,85,239,0.3)] flex flex-col justify-space justify-between">
              <span className="text-xs tracking-widest text-gray-500 block">
                ROOM CODE
              </span>
              <div className="text-[50px] text-center font-black text-black">
                {roomCode.trim() ? roomCode : "Oops!! error"}
              </div>
              <div className="flex justify-center gap-2 text-purple-600 cursor-pointer hover:underline">
                <button
                  onClick={()=>{handleCopy("code")}}
                  className="flex items-center gap-2 text-purple-600 hover:underline cursor-pointer"
                >
                  {copied ? (
                    <FiCheck className="w-4 h-4" />
                  ) : (
                    <FiCopy className="w-4 h-4" />
                  )}
                  Copy room code
                </button>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col bg-white/80 backdrop-blur-xl rounded-xl border p-10 text-center shadow-[0_0_40px_-10px_rgba(132,85,239,0.3)]">
                <div className="relative w-48 h-48 mx-auto mb-6  flex items-center justify-center">
                    {
                        quizLink.trim() ? (
                            <QRCodeCanvas
                                value={quizLink}
                                size={200}
                                className="w-full h-full rounded-lg"
                            />
                        ):(
                            <BsQrCode className="w-48 h-48 text-gray-300"/>
                        )
                    }
                    
                </div>
                <p className="text-gray-600">Scan to join instantly</p>
            </div>

          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
            <Button variant="white" className="w-full sm:w-64 py-3" onClick={()=>{handleCopy("link")}}>Share Link Quiz</Button>
            <Button variant="black" className="w-full sm:w-64 py-3">Start Game</Button>
            
          </div>

        </div>
      </main>
    </div>
  );
};

export default SharingPage;