import { useState } from 'react'
import { Button, Card, Input } from '@/components/primitives'
import { QuestionForm } from '@/components/quiz/QuestionForm/QuestionForm'
import { QuestionListItem } from '@/components/quiz/QuestionListItem/QuestionListItem'
import type { Quiz, Question } from '@/types/quiz'

export const QuizEditorPage = () => {
  const [quizName, setQuizName] = useState('')
  const [questions, setQuestions] = useState<Question[]>([])
  const [isAddingQuestion, setIsAddingQuestion] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!quizName.trim())
      newErrors.quizName = 'Quiz name is required'

    if (questions.length === 0)
      newErrors.questions = 'Add at least one question'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleAddQuestion = (question: Question) => {
    setQuestions(prev => [...prev, question])
    setIsAddingQuestion(false)
  }

  const handleRemoveQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id))
  }

  const handleSave = () => {
    if (!validate()) return

    const quiz: Quiz = {
      id: crypto.randomUUID(),
      name: quizName.trim(),
      questions,
    }

    // load existing quizzes, append new one, save back
    const existing = localStorage.getItem('quizzes')
    const quizzes: Quiz[] = existing ? JSON.parse(existing) : []
    localStorage.setItem('quizzes', JSON.stringify([...quizzes, quiz]))

    // TODO: navigate to quiz list page after saving
    alert(`Quiz "${quiz.name}" saved!`)
  }

  return (
    <div className="min-h-screen bg-surface-base">

      {/* Top bar */}
      <div className="border-b border-surface-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-content-primary text-xl font-semibold">
          Quiz Editor
        </h1>
        <Button variant="primary" onClick={handleSave}>
          Save Quiz
        </Button>
      </div>

      {/* Main content */}
      <div className="max-w-2xl mx-auto px-6 py-8 flex flex-col gap-6">

        {/* Quiz name */}
        <Card>
          <Input
            label="Quiz Name"
            placeholder="e.g. JavaScript Basics"
            value={quizName}
            onChange={e => setQuizName(e.target.value)}
            error={errors.quizName}
            fullWidth
          />
        </Card>

        {/* Question list */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h2 className="text-content-primary font-medium">
              Questions
              <span className="ml-2 text-content-secondary text-sm font-normal">
                ({questions.length})
              </span>
            </h2>
          </div>

          {/* Empty state */}
          {questions.length === 0 && !isAddingQuestion && (
            <Card variant="outline">
              <p className="text-content-secondary text-sm text-center py-4">
                No questions yet. Add one below.
              </p>
            </Card>
          )}

          {/* Question list items */}
          {questions.map((question, index) => (
            <QuestionListItem
              key={question.id}
              question={question}
              index={index}
              onRemove={handleRemoveQuestion}
            />
          ))}

          {/* Error if no questions on save attempt */}
          {errors.questions && (
            <span className="text-xs text-brand-danger">
              {errors.questions}
            </span>
          )}
        </div>

        {/* Question form or add button */}
        {isAddingQuestion ? (
          <QuestionForm
            onSave={handleAddQuestion}
            onCancel={() => setIsAddingQuestion(false)}
          />
        ) : (
          <Button
            variant="secondary"
            onClick={() => setIsAddingQuestion(true)}
            fullWidth
          >
            + Add Question
          </Button>
        )}

      </div>
    </div>
  )
}
