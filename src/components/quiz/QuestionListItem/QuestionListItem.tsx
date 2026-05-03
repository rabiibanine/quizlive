import type { Question } from '../../../types/quiz';
import { Button } from '../../primitives/Button';

interface QuestionListItemProps {
  question: Question
  index: number
  onRemove: (id: string) => void
}

export const QuestionListItem = ({
  question,
  index,
  onRemove,
}: QuestionListItemProps) => {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg border border-surface-border bg-surface-raised">

      {/* Question number */}
      <span className="text-content-secondary text-sm font-medium w-6 shrink-0">
        {index + 1}
      </span>

      {/* Question content */}
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="text-content-primary text-sm font-medium truncate">
          {question.text}
        </p>
      </div>

      {/* Remove button */}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(question.id)}
        aria-label={`Remove question ${index + 1}`}
      >
        ✕
      </Button>

    </div>
  )
}
