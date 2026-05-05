# AI Behavior Rules

These rules apply in every session, for every task, without exception.

---

## 1. File Permission Policy

### Reading
You may read any file in the project freely for context. Reading does not grant edit permission.

### Editing
- You may only edit files explicitly listed under **"Permitted Files"** in `BRANCH.md`
- If a task requires editing a file not on that list, **stop and warn the user** before proceeding:
  > ⚠️ `[filename]` is not in the permitted list for this branch. Do you want me to proceed anyway?
- Wait for explicit confirmation before touching it

### Creating
- You may only create new files inside directories listed under **"Permitted to Create"** in `BRANCH.md`
- If no such directory is listed, ask before creating anything

### Deleting / Renaming
- Never delete or rename files without explicit user instruction, regardless of branch permissions

---

## 2. Scope Discipline

- Do not refactor, clean up, or improve code outside the current branch scope, even if you notice issues
- Do not touch team-owned files (`src/components/`, any page not listed in `BRANCH.md`) unless explicitly told to
- If a fix in a permitted file requires a change in an unpermitted file, flag it to the user instead of making the change silently

---

## 3. Before You Edit — Always Announce

Before editing any file, state:
- Which files you plan to touch
- Why each one needs to change

Example:
> I'll be modifying `QuizEditorPage.tsx` to add reorder logic, and `src/types/quiz.ts` to add an `order` field to the `Question` type.

---

## 4. Style Rules

- Use standard Tailwind utility classes only
- Before writing any new UI, read `src/pages/Home.tsx` to match the team's existing style patterns
- Never introduce raw CSS, inline styles, or new CSS classes without flagging it first

---

## 5. State & Architecture

- State management is `useState` per page — do not introduce Zustand, Context, or any global store without explicit instruction
- Data persistence is `localStorage` for now — do not add fetch calls, APIs, or WebRTC hooks until the user explicitly starts that phase (Will likely move to Supabase or Firebase when ready)
- Page-to-page data is passed via React Router `location.state` — do not use URL params or localStorage for this unless instructed

---

## 6. When in Doubt

Ask. A quick clarifying question is always better than an assumption that touches the wrong file.
