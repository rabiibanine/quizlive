export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  choices: Choice[]; // always 4
}

export interface Quiz {
  id: string;
  name: string;
  questions: Question[];
}
