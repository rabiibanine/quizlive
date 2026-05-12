![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

# QuizLive

A real-time live quiz platform for professors and students, built with React, TypeScript, and Firebase.

## Overview

QuizLive allows professors to create and host live quiz sessions that students can join using a short code. Questions are pushed to all connected students simultaneously, answers are collected in real time, and results are displayed on a podium at the end of the session.

The project was originally intended to use WebRTC for peer-to-peer communication but was pivoted to Firebase Firestore for its realtime capabilities and simpler architecture.

## Features

- **Professor side**
  - Create and launch a quiz session with an auto-generated join code
  - Lobby showing students joining in real time
  - Live quiz hosting with per-choice answer statistics
  - Automatic question advancement via a countdown timer
  - Score evaluation at the end of each question
  - Podium page with final rankings, accuracy stats, and CSV export

- **Student side**
  - Join a session via a 6-character code (or direct URL `/join/:code`)
  - Waiting lobby until the professor starts the quiz
  - Live question updates driven by the professor's timer
  - Answer submission with locked state after submitting
  - Auto-navigation when the session ends

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS
- **Backend/Database:** Firebase Firestore
- **Routing:** React Router v6
- **Deployment:** Netlify

## Project Structure

```
src/
├── firebase/
│   └── firebase.ts          # Firebase initialization, exports db
├── services/
│   └── sessionService.ts    # All Firestore operations
├── utils/
│   └── helpers.ts           # getOrCreateId, shared utilities
├── types/
│   └── index.ts             # Shared TypeScript interfaces
├── components/              # Reusable UI components
├── pages/                   # Page-level components
└── data/                    # Static/mock data
```

## Architecture

QuizLive follows a **service layer pattern** — all Firebase calls live in `services/`, and components never import from Firebase directly. This keeps UI logic and database logic cleanly separated.

Realtime updates are handled via Firestore's `onSnapshot` listener, which pushes document changes to all connected clients instantly. Every page that needs live data owns its own subscription, set up in a `useEffect` with proper cleanup on unmount.

```
Component → calls service function → sessionService.ts → Firebase SDK → Firestore
                    ↑
             onSnapshot fires
             setSession() called
             component re-renders
```

## Data Model

```
sessions/{sessionId}
  ├── code: string
  ├── status: "waiting" | "active" | "ended"
  ├── currentQuestion: number
  ├── professorId: string
  ├── createdAt: string
  ├── quiz: Quiz
  │   ├── title: string
  │   ├── subject: string
  │   ├── course: string
  │   └── questions: Question[]
  │       ├── text: string
  │       ├── time: number
  │       ├── correctChoice: number  (0-indexed)
  │       └── choices: Choice[]
  │           ├── text: string
  │           └── count: number
  └── students: Student[]
      ├── uid: string
      ├── name: string
      ├── score: number
      ├── answers: number[]
      └── joinedAt: string
```

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Firestore enabled

### Installation

```bash
git clone https://github.com/rabiibanine/quizlive.git
cd quizlive
npm install
```

### Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_GROK_API_KEY=
```

Fill in the values from your Firebase project settings under **Project Settings → Your apps → Web app**.

### Firebase Setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firestore Database** in test mode
3. Register a web app and copy the config into your `.env`

### Running Locally

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Deployment

The project is deployed on Netlify with automatic deploys from the `main` branch.

A `public/_redirects` file is required for React Router to work correctly on Netlify:

```
/*    /index.html   200
```

Environment variables must be added manually under **Site configuration → Environment variables** in the Netlify dashboard.

## Authentication

QuizLive does not use Firebase Authentication. Instead, persistent anonymous IDs are generated via `crypto.randomUUID()` and stored in `localStorage`. This is intentional — the platform is designed for in-person classroom use where formal authentication is unnecessary.

## Known Limitations

- **No Firestore security rules** — the database is open. Anyone with the project ID can read and write data. Security rules should be added before any production use outside of demos.
- **No duplicate submission protection** — a student can technically submit multiple answers for the same question.
- **No late join handling** — students joining after the quiz has started will see the current question but won't have answers recorded for previous questions.
- **Timer is client-side** — each client runs their own countdown independently. Students with slow connections or who join late may have a slightly different timer.
- **Orphaned sessions** — ended or abandoned sessions remain in Firestore indefinitely. A TTL-based cleanup mechanism (`expiresAt` field + Cloud Function) is recommended for production.
- **Student results page** — students are currently redirected to the home page when the session ends. A dedicated results page showing their personal score and answers is not yet implemented.

## Team

Built as a university project by THE trio, RABII, MARWANE, YOUNESS. Arrivederci.
