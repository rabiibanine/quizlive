import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export async function launchSession(quizId: string, professorId: string) {
  const quizCode = Math.random().toString(36).slice(2, 8).toUpperCase();
  const ref = await addDoc(collection(db, "sessions"), {
    quizCode,
    quizId,
    professorId,
    status: "waiting",
    currentQuestion: 0,
    createdAt: serverTimestamp(),
  });
  return { sessionId: ref.id, quizCode };
}
