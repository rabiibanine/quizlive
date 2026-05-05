import { useState } from 'react'
import { Button } from '@/components/primitives'
import { Input } from '@/components/primitives'
import type { Question, Choice } from '@/types/quiz'

interface QuestionFormProps {
  onSave: (question: Question) => void
  onCancel: () => void
}

const initialChoices = (): Choice[] => [
  { id: '1', text: '', isCorrect: false },
  { id: '2', text: '', isCorrect: false },
  { id: '3', text: '', isCorrect: false },
  { id: '4', text: '', isCorrect: false },
]

export const QuestionForm = ({ onSave, onCancel }: QuestionFormProps) => {
  const [questionText, setQuestionText] = useState('')
  const [choices, setChoices] = useState<Choice[]>(initialChoices())
  const [correctChoiceId, setCorrectChoiceId] = useState<string | null>(null)
  const [time, setTime] = useState<number>(60) // seconds, default 1 min
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateChoiceText = (id: string, text: string) => {
    setChoices(prev =>
      prev.map(choice =>
        choice.id === id ? { ...choice, text } : choice
      )
    )
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!questionText.trim())
      newErrors.questionText = 'Question text is required'

    choices.forEach((choice, index) => {
      if (!choice.text.trim())
        newErrors[`choice-${choice.id}`] = `Choice ${index + 1} is required`
    })

    if (!correctChoiceId)
      newErrors.correctChoice = 'Please select a correct answer'

    if (!Number.isFinite(time) || time < 1)
      newErrors.time = 'Time must be at least 1 second'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validate()) return

    const question: Question = {
      id: crypto.randomUUID(),
      text: questionText.trim(),
      choices: choices.map(choice => ({
        ...choice,
        isCorrect: choice.id === correctChoiceId,
      })),
      time,
    }

    onSave(question)
  }

  return (
    <div className="flex flex-col gap-6 p-6 rounded-lg border border-gray-200 bg-white/80">

      {/* Question text */}
      <Input
        label="Question"
        placeholder="e.g. What is the capital of Morocco?"
        value={questionText}
        onChange={e => setQuestionText(e.target.value)}
        error={errors.questionText}
        fullWidth
      />

      {/* Choices */}
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-gray-900">
          Choices
        </span>

        {/* Time Input */}
        <Input
          label="Time allowed (seconds)"
          type="number"
          min={1}
          value={time}
          onChange={e => setTime(Number(e.target.value))}
          error={errors.time}
          fullWidth
        />

        {choices.map((choice, index) => (
          <div key={choice.id} className="flex items-center gap-3">

            {/* Correct answer selector */}
            <input
              type="radio"
              name="correctChoice"
              value={choice.id}
              checked={correctChoiceId === choice.id}
              onChange={() => setCorrectChoiceId(choice.id)}
              className="accent-purple-600 shrink-0"
              aria-label={`Mark choice ${index + 1} as correct`}
            />

            <Input
              placeholder={`Choice ${index + 1}`}
              value={choice.text}
              onChange={e => updateChoiceText(choice.id, e.target.value)}
              error={errors[`choice-${choice.id}`]}
              fullWidth
            />

          </div>
        ))}

        {errors.correctChoice && (
          <span className="text-xs text-brand-danger">
            {errors.correctChoice}
          </span>
        )}

        <span className="text-xs text-gray-500">
          Select the radio button next to the correct answer
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3 justify-end">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Add Question
        </Button>
      </div>

    </div>
  )
}
