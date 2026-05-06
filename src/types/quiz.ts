export interface Question {
  id: string;
  question: string;
  choices: string[];
  time: number;
  correctChoice: number;
}

export interface QuestionCardProps {
  question: Question;
  index: number;
  onDelete: (index: number) => void;
  onUpdate: (index: number, changes: Partial<Question>) => void;
}
