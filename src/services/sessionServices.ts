import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export async function launchSession(quizCode: string, quizId: string, professorId: string) {
  try {
    const ref = await addDoc(collection(db, "sessions"), {
      quizCode,
      quizId,
      professorId,
      status: "waiting",
      currentQuestion: 0,
      createdAt: serverTimestamp(),
    });
    return { sessionId: ref.id, quizCode };
  } catch (error) {
    console.error("An error occured");
  } finally {
    console.log("Action successful");
  }
}
