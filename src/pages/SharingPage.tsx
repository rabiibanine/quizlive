import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation, useParams } from "react-router-dom";

import { FiCheck, FiCopy } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { BsQrCode } from "react-icons/bs";

import AnimatedItem from "../components/AnimatedList";

import { db } from "@/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

import type { Student } from "@/types/index";
import { startSession } from "@/services/sessionServices";

const studentsData: Student[] = [
  {
    id: crypto.randomUUID(),
    name: "Marouane Talbi",
    points: 14250,
    answers: [],
  },

  {
    id: crypto.randomUUID(),
    name: "Rayan Morabit",
    points: 15800,
    answers: [],
  },

  {
    id: crypto.randomUUID(),
    name: "Imane Amrani",
    points: 12900,
    answers: [],
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
    return unsub;
  }, [sessionId]);

  async function handleStart(): Promise<void> {
    try {
      await startSession(sessionId);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="min-h-screen w-full bg-slate-950 text-white select-none flex flex-col"
      style={{
        background: "linear-gradient(180deg, #0b1222 0%, #0f172a 55%, #0b1222 100%)",
      }}
    >


      {/* Main content */}
      <main className="relative flex flex-1 items-center justify-center py-10 overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-8">
          {/* Header */}
          <div className="animate_fadeInUp text-center mt-6">
            <p className="text-lg font-semibold tracking-widest text-purple-200 mb-1">
              QUIZ READY
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              You have created your quiz
            </h1>
            <p className="text-white/60 max-w-xl mx-auto mb-4">
              Invite your students to join using the room code or QR code.
            </p>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Room Code */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-10 text-center shadow-[0_18px_40px_-24px_rgba(147,102,255,0.5)] flex flex-col justify-space justify-between">
              <span className="text-xs tracking-widest text-white/60 block">ROOM CODE</span>
              <div className="text-[50px] text-center font-black text-white">
                {roomCode.trim() ? roomCode : "Oops!! error"}
              </div>
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => {
                    handleCopy("code");
                  }}
                  className="flex items-center gap-2 text-purple-200 hover:text-white hover:underline"
                >
                  {copied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                  Copy room code
                </button>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex flex-col bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-10 text-center shadow-[0_18px_40px_-24px_rgba(147,102,255,0.5)]">
              <div className="relative w-48 h-48 mx-auto mb-6 flex items-center justify-center rounded-2xl bg-white/10 border border-white/10">
                {quizLink.trim() ? (
                  <div className="rounded-lg bg-white p-2">
                    <QRCodeCanvas value={quizLink} size={160} className="rounded" />
                  </div>
                ) : (
                  <BsQrCode className="w-48 h-48 text-white/20" />
                )}
              </div>
              <p className="text-white/60">Scan to join instantly</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
            <Button
              variant="white"
              className="w-full sm:w-64 rounded-2xl border-white/10 bg-white/10 py-3 text-sm font-semibold text-white hover:border-white/20 hover:bg-white/20"
              onClick={() => {
                handleCopy("link");
              }}
            >
              Share Link Quiz
            </Button>
            <Button
              variant="lavender"
              className="w-full sm:w-64 rounded-2xl px-8 py-3 text-sm font-semibold"
              onClick={handleStart}
            >
              Start Game
            </Button>
          </div>

          <div className="text-3xl animate_fadeInUp flex justify-center items-center gap-2 mt-6 mb-3 text-white/80">
            <IoPersonOutline />
            <h1>{students.length} students connected</h1>
          </div>

          <div className="animate_fadeInDown bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            {students.map((s, index) => (
              <AnimatedItem key={s.id} index={index} delay={0.05 * index}>
                <div
                  key={s.id}
                  className="flex items-center justify-between px-6 py-4 border-b border-white/10 hover:bg-white/5"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 font-bold text-white/80">{index + 1}</span>
                    <span className="text-white">{s.name}</span>
                  </div>

                  <div className="text-right">
                    <div className="text-purple-200 font-semibold">Joined at</div>
                    <div className="text-xs text-white/40">18h 30min 56sec</div>
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
