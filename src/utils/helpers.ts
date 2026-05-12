import type { Session } from "@/types";

type IdStorageKey = "professorId" | "studentId";

type UUID = ReturnType<typeof crypto.randomUUID>;

export const getOrCreateId = (key: IdStorageKey): UUID => {
  const existing = localStorage.getItem(key);
  if (existing) return existing as UUID;
  const id = crypto.randomUUID();
  localStorage.setItem(key, id);
  return id;
};

export const getCurrentQuestionAnswers = (session: Session) => {
  if (!session.students || session.students.length === 0) return 0;

  // Count students who have an answer recorded at the current question's index
  return session.students.filter(
    (student) => student.answers && student.answers[session.currentQuestion] !== undefined
  ).length;
};
