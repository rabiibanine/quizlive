import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation, useParams } from "react-router-dom";

import { FiCheck, FiCopy } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";

import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { BsQrCode } from "react-icons/bs";

import AnimatedItem from "../components/AnimatedList";

import { db } from "@/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

import type { Student } from "@/types/quiz";

const studentsData: Student[] = [
  {
    id: 1,
    name: "Marouane Talbi",
    points: 14250,
    rank: 2,
    accuracy: 92,
  },

  {
    id: 2,
    name: "Rayan Morabit",
    points: 15800,
    rank: 1,
    accuracy: 92,
  },

  {
    id: 3,
    name: "Imane Amrani",
    points: 12900,
    rank: 3,
    accuracy: 92,
  },
];

const SharingPage = () => {
  const [students, setStudents] = useState<Student[]>(studentsData);
  const [copied, setcopied] = useState<boolean>(false);
  const { code } = useParams<{ code: string }>();
  const location = useLocation();

  const sessionId = location.state as string;
  const baseUrl: string = window.location.origin;
  const roomCode: string = code ?? "";
  const quizLink: string = roomCode ? `${baseUrl}/quiz/${roomCode}` : "";

  const handleCopy = async (type_copy: string) => {
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

  // This use effect block updates the local student list when a student subscribes to the quiz
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "sessions", sessionId), (snap) => {
      const session = snap.data();
      const students = session?.students as Student[];
      setStudents(students ?? []);
    });
  }, [sessionId]);

  return (
    <div
      className="select-none min-h-screen w-full text-gray-900 selection:bg-purple-200 selection:text-white"
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
      <main className="relative flex items-center justify-center py-10 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-8">
          {/* Header */}
          <div className="animate_fadeInUp text-center mt-6">
            <p className=" text-lg font-semibold tracking-widest text-purple-600 mb-1">
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
              <span className="text-xs tracking-widest text-gray-500 block">ROOM CODE</span>
              <div className="text-[50px] text-center font-black text-black">
                {roomCode.trim() ? roomCode : "Oops!! error"}
              </div>
              <div className="flex justify-center gap-2 text-purple-600 cursor-pointer hover:underline">
                <button
                  onClick={() => {
                    handleCopy("code");
                  }}
                  className="flex items-center gap-2 text-purple-600 hover:underline cursor-pointer"
                >
                  {copied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                  Copy room code
                </button>
                {/* // TEST */}
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col bg-white/80 backdrop-blur-xl rounded-xl border p-10 text-center shadow-[0_0_40px_-10px_rgba(132,85,239,0.3)]">
              <div className="relative w-48 h-48 mx-auto mb-6  flex items-center justify-center">
                {quizLink.trim() ? (
                  <QRCodeCanvas value={quizLink} size={200} className="w-full h-full rounded-lg" />
                ) : (
                  <BsQrCode className="w-48 h-48 text-gray-300" />
                )}
              </div>
              <p className="text-gray-600">Scan to join instantly</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
            <Button
              variant="white"
              className="w-full sm:w-64 py-3"
              onClick={() => {
                handleCopy("link");
              }}
            >
              Share Link Quiz
            </Button>
            <Button variant="black" className="w-full sm:w-64 py-3">
              Start Game
            </Button>
          </div>

          <div className="text-4xl animate_fadeInUp flex justify-center items-center gap-2 mt-6 mb-3 ">
            <IoPersonOutline />
            <h1 className="text-gray-600">{students.length} students connected</h1>
          </div>

          <div className="animate_fadeInDown bg-white/70 backdrop-blur-xl rounded-xl overflow-hidden">
            {students.map((s, index) => (
              <AnimatedItem key={s.rank} index={index} delay={0.05 * index}>
                <div
                  key={s.rank}
                  className="flex items-center justify-between px-6 py-4 border-b hover:bg-violet-50"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 font-bold">{index + 1}</span>
                    <span>{s.name}</span>
                  </div>

                  <div className="text-right">
                    <div className="text-violet-600 font-bold">Joined at</div>
                    <div className="text-xs text-gray-400">18h 30min 56sec</div>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SharingPage;

