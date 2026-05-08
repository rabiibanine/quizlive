export interface Question {
  id: ReturnType<typeof crypto.randomUUID>;
  question: string;
  choices: string[];
  time: number;
  correctChoice: number;
}

export interface Student {
  id: string;
  name: string;
  points: number;
  answers: [];
}

export interface Session {
  code: string;
  quizId: string;
  professorId: string;
  status: "waiting" | "active" | "ended";
  currentQuestion: number;
  questions: Question[];
  students: Student[];
  createdAt: string;
}
