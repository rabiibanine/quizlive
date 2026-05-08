import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import type { Question } from "@/types/index";

export async function launchSession(
  quizId: string,
  professorId: string,
  quizQuestions: Question[]
) {
  const quizCode = Math.random().toString(36).slice(2, 8).toUpperCase();
  const ref = await addDoc(collection(db, "sessions"), {
    quizCode,
    quizId,
    professorId,
    status: "waiting",
    questions: quizQuestions,
    currentQuestion: 0,
    students: [],
    createdAt: serverTimestamp(),
  });
  return { sessionId: ref.id, quizCode };
}
