type UUID = ReturnType<typeof crypto.randomUUID>;

export interface Question {
  id: UUID;
  text: string;
  choices: string[];
  time: number;
  correctChoice: number;
}

export interface Student {
  id: UUID;
  name: string;
  points: number;
  answers: [];
}

export interface Session {
  code: string;
  quizId: UUID;
  professorId: UUID;
  status: "waiting" | "active" | "ended";
  currentQuestion: number;
  questions: Question[];
  students: Student[];
  createdAt: string;
}

export interface Quiz {
  id: UUID;
  title: string;
  course: string;
  subject: string;
  maxStudents: number;
  questions: Question[];
}
