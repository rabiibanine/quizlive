export type Choice = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export type Question = {
  id: string;
  text: string;
  choices: Choice[]; // always 4
};

export type QuizMetadata = {
  title: string;
  subject: string;
  className: string;
};

export type Quiz = QuizMetadata & {
  questions: Question[];
};
