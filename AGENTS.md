# Project: QuizApp (working title)

## What This Is
A real-time quiz platform for professors and students. Professors host and manage quizzes; students join and participate. The backend will most likely use Firebase/Supabase, as of right now we're not sure and this could change, make sure to not implement anything that completely depends on these backends.

## Tech Stack
- **Framework:** React 18 + TypeScript
- **Routing:** React Router v6
- **Styling:** Tailwind CSS (standard utility classes — no custom token system)
- **State:** Local `useState` per page — no global store
- **Backend** Supabase/Firebase
- **Build tool:** Vite (inferred)

## Folder Structure
```
src/
├── App.tsx
├── App.css
├── main.tsx
├── index.css
├── components/               ← Shared components, team-owned
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── NavBar.tsx
│   ├── Logo.tsx
│   ├── Advantages.tsx
│   ├── AnimatedList.tsx
│   └── Orb.tsx
├── pages/
│   ├── Home.tsx              ← Reference page for style conventions
│   ├── JoinQuiz.tsx
│   ├── NotFound.tsx
│   ├── Podium.tsx
│   ├── QuizForm.tsx          ← Collects quiz metadata (title, class, subject)
│   └── SharingPage.tsx
└── types/                    ← Shared TypeScript types
```

## Ownership Model
Mixed ownership. Team owns `src/components/` and most of `src/pages/`. Individual contributors own their feature pages. **Always check BRANCH.md before editing any file.**

## Style Conventions
- Standard Tailwind utility classes only — no custom token system
- Before writing any new UI, scan `src/pages/Home.tsx` to understand the patterns the team is using (colors, spacing, typography, component usage)
- Match existing style patterns — do not introduce new visual conventions without flagging them

## Routing & Data Passing
- Navigation uses React Router v6
- Data is passed between pages via `location.state` (React Router state)
- Example: `QuizForm.tsx` collects quiz metadata and navigates to the editor passing `{ title, subject, className }` via `location.state`

## Session Startup Checklist
At the start of every session, read these files in order before doing anything:
1. `AGENTS.md` ← you are here
2. `BEHAVIOR.md`
3. `BRANCH.md`

If `BRANCH.md` is missing or its **Current Task** section is empty, ask the user what to work on before proceeding.
