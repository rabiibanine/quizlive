type UUID = ReturnType<typeof crypto.randomUUID>;

export interface Choice {
  text: string;
  count: number;
}

export interface Question {
  id: UUID;
  text: string;
  choices: Choice[];
  time: number;
  correctChoice: number;
}

export interface Student {
  id: UUID;
  name: string;
  score: number;
  answers: number[];
  joinedAt: string;
}

export interface Quiz {
  id: UUID;
  title: string;
  course: string;
  subject: string;
  questions: Question[];
}

export interface Session {
  quizCode: string;
  quizId: UUID;
  professorId: UUID;
  status: "waiting" | "active" | "ended";
  currentQuestion: number;
  currentStudents: number;
  currentAnswers: number;
  maxStudents: number;
  quiz: Quiz;
  students: Student[];
  createdAt: string;
}
