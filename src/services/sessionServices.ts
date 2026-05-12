import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  type DocumentData,
  doc,
  updateDoc,
  arrayUnion,
  increment,
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import type { Quiz, Session, Student } from "@/types/index";

type UUID = ReturnType<typeof crypto.randomUUID>;

interface SessionDocument extends DocumentData {
  id: string;
  code: string;
  status: "waiting" | "active" | "ended";
  quiz: Quiz;
  students: Student[];
  professorId: UUID;
  currentQuestion: number;
  createdAt: string;
}

export async function launchSession(quizId: string, professorId: string, quiz: Quiz) {
  const quizCode = Math.random().toString(36).slice(2, 8).toUpperCase();
  const ref = await addDoc(collection(db, "sessions"), {
    quizCode,
    quizId,
    professorId,
    status: "waiting",
    quiz: quiz,
    currentStudents: 0,
    currentQuestion: 0,
    students: [],
    maxStudents: 20,
    createdAt: new Date().toISOString(),
  } as Session);
  return { sessionId: ref.id, quizCode };
}

export async function findSessionByCode(code: string): Promise<SessionDocument | null> {
  const q = query(collection(db, "sessions"), where("quizCode", "==", code));

  const snap = await getDocs(q);

  if (snap.empty) return null;

  const doc = snap.docs[0];
  return { id: doc.id, ...doc.data() } as SessionDocument;
}

export async function joinSession(sessionId: string, student: Student): Promise<void> {
  const sessionRef = doc(db, "sessions", sessionId);
  await updateDoc(sessionRef, {
    students: arrayUnion(student),
    currentStudents: increment(1),
  });
}

export async function startSession(sessionId: string): Promise<void> {
  const sessionRef = doc(db, "sessions", sessionId);
  await updateDoc(sessionRef, {
    status: "active",
  });
}

export async function endSession(sessionId: string): Promise<void> {
  await updateDoc(doc(db, "sessions", sessionId), {
    status: "ended",
  });
}

export async function submitAnswer(
  sessionId: string,
  questionIndex: number,
  choiceIndex: number,
  studentId: UUID
) {
  const snap = await getDoc(doc(db, "sessions", sessionId));
  if (!snap.exists()) return;

  const session = snap.data() as Session;
  const updatedStudents = session.students.map((s) =>
    s.id === studentId ? { ...s, answers: [...s.answers, choiceIndex] } : s
  );

  const updatedQuestions = [...session.quiz.questions];
  updatedQuestions[questionIndex].choices[choiceIndex].count += 1;

  await updateDoc(doc(db, "sessions", sessionId), {
    students: updatedStudents,
    "quiz.questions": updatedQuestions,
  });
}

export async function evaluateAndAdvance(sessionId: string, questionIndex: number) {
  const snap = await getDoc(doc(db, "sessions", sessionId));
  if (!snap.exists()) return;

  const session = snap.data() as Session;
  const correctChoice = session.quiz.questions[questionIndex].correctChoice;

  const updatedStudents = session.students.map((student) => {
    const answer = student.answers[questionIndex];
    const isCorrect = answer + 1 === correctChoice;
    return isCorrect ? { ...student, score: student.score + 100 } : student;
  });

  await updateDoc(doc(db, "sessions", sessionId), {
    students: updatedStudents,
    currentQuestion: increment(1),
  });
}
