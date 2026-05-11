import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useLocation, useParams } from "react-router-dom";

import { FiCheck, FiCopy } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";

import Button from "../components/Button";
import { BsQrCode } from "react-icons/bs";

import AnimatedItem from "../components/AnimatedList";

import { db } from "@/firebase/firebase";
import { doc, onSnapshot } from "firebase/firestore";

import type { Student } from "@/types/index";
import { startSession } from "@/services/sessionServices";

const SharingPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [copied, setcopied] = useState<boolean>(false);
  const { code } = useParams<{ code: string }>();
  const location = useLocation();

  const sessionId = location.state as string;
  const baseUrl: string = window.location.origin;
  const roomCode: string = code ?? "";
  const quizLink: string = roomCode ? `${baseUrl}/quiz/${roomCode}` : "";

  const waitingSlots = students.length >= 3 ? 1 : Math.max(0, 4 - students.length);
  const placeholderSlots = Array.from({ length: waitingSlots });
  const totalStudentsLabel = `${students.length} ${students.length === 1 ? "student" : "students"} connected`;
  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");

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
            <p className="text-lg font-semibold tracking-widest text-purple-200 mb-1">QUIZ READY</p>
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

          <div className="mt-10 border-t border-white/10 pt-8">
            <div className="font-ui text-base animate_fadeInUp flex justify-center items-center gap-2 text-white/80">
              <IoPersonOutline className="text-lg" />
              <h1 className="tracking-wide">{totalStudentsLabel}</h1>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {students.map((student, index) => (
                <AnimatedItem key={student.id} index={index} delay={0.05 * index}>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-5 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.8)]">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full border border-white/10 bg-white/10 flex items-center justify-center text-sm font-semibold text-white/80">
                        {getInitials(student.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold text-white">
                          {student.name}
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-xs text-purple-200">
                          <span className="h-2 w-2 rounded-full bg-purple-300" />
                          Ready
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedItem>
              ))}
              {placeholderSlots.map((_, index) => (
                <AnimatedItem
                  key={`placeholder-${index}`}
                  index={students.length + index}
                  delay={0.05 * (students.length + index)}
                >
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-7 text-center text-sm text-white/40">
                    Waiting...
                  </div>
                </AnimatedItem>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SharingPage;
