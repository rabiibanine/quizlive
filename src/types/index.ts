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
  maxStudents: number;
  quiz: Quiz;
  students: Student[];
  createdAt: string;
}
