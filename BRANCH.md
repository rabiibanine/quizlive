# Current Branch: `feature/quiz-editor`

## Goal
Build the Quiz Editor page — the professor-facing UI for adding and managing questions for a quiz that has already been created. The quiz metadata (title, subject, class) was collected on a previous page (`QuizForm.tsx`) and arrives here via React Router `location.state`. This page's job is to display that metadata and let the professor manage the question list.

---

## Permitted Files
> AI may read and edit these freely.

- `src/pages/QuizEditorPage.tsx` ← main file for this feature (create if it doesn't exist)
- `src/types/quiz.ts` ← add/modify types as needed for this feature

---

## Permitted to Create
> AI may create new files only inside these directories.

- `src/pages/` — the editor page itself
- `src/components/` — only if a new component is genuinely reusable and the team would benefit from it; flag before creating

---

## Off-Limits
> Do not touch without explicit user confirmation.

- `src/components/Button.tsx`
- `src/components/Card.tsx`
- `src/components/Input.tsx`
- `src/components/NavBar.tsx`
- `src/components/Logo.tsx`
- `src/components/Advantages.tsx`
- `src/components/AnimatedList.tsx`
- `src/components/Orb.tsx`
- `src/pages/Home.tsx`
- `src/pages/JoinQuiz.tsx`
- `src/pages/NotFound.tsx`
- `src/pages/Podium.tsx`
- `src/pages/QuizForm.tsx`
- `src/pages/SharingPage.tsx`
- `src/App.tsx` ← unless routing changes are explicitly requested
- `src/main.tsx`

---

## Data Contract
The editor receives the following from `location.state` (passed by `QuizForm.tsx`):

```ts
{
  title: string      // Quiz title
  subject: string    // e.g. "Mathematics"
  className: string  // e.g. "3A"
}
```

Always read this with a fallback in case the user navigates directly to the page.

---

## Feature Scope

### Quiz Metadata Display (read-only)
- Show title, subject, and class at the top of the page
- This is display only — the professor cannot edit these here

### Question List
- **Add** new questions
- **Remove** questions
- **Reorder** questions (drag to reorder or up/down controls)
- **Edit** existing questions inline or via a form

### Question Structure
Each question is multiple choice with exactly 4 choices and one correct answer (single-select).

```ts
Choice   { id: string; text: string; isCorrect: boolean }
Question { id: string; text: string; choices: Choice[] }
```

### Import
- A button labeled "Import" that accepts a JSON or CSV file
- Parses the file and appends valid questions to the list
- For now: show a clear error if the file format is invalid, no silent failures
- Exact file schema TBD — flag to user before implementing the parser

### Save
- Saves the full quiz (metadata + questions) to `localStorage`
- Key: `'quizzes'` — array of `Quiz` objects, append to existing

---

## Current Task
<!-- Update this whenever you switch tasks -->
Build the initial `QuizEditorPage.tsx` from scratch — metadata display header, empty question list with add button, import button placeholder, and save button.

---

## Notes
- No backend yet — do not introduce any network logic
- Read `src/pages/Home.tsx` before writing any UI to match team style
- The professor is always the host; their browser owns all quiz state
