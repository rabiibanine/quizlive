export interface Question {
  question: string;
  choices: string[];
  correctChoice: number;
}

export interface QuestionCardProps {
  question: Question;
  index: number;
  onDelete: (index: number) => void;
}
