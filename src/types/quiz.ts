export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  text: string;
  choices: Choice[]; // always 4
  time: number; // per-question time in seconds (default 60)
}

export interface Quiz {
  id: string;
  name: string;
  questions: Question[];
  totalTime: number; // sum of all question times in seconds
}
