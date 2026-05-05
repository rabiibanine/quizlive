import { useLocation } from "react-router-dom";
import { useState } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import type { QuizMetadata, Question } from "../types/quiz";

function useQuizMetadata(): QuizMetadata | null {
  const location = useLocation();
  let state: any = location.state;
  if (state && typeof state === "object" && state.title && state.subject && state.className) {
    return { title: state.title, subject: state.subject, className: state.className };
  }
  return null;
}

function QuizEditorPage() {
  const metadata = useQuizMetadata();
  const [questions] = useState<Question[]>([
    {
      id: "q1",
      text: "What is the calculated velocity of an object falling in a vacuum after 5 seconds, ignoring relativistic effects?",
      choices: [
        { id: "c1", text: "49.05 m/s", isCorrect: true },
        { id: "c2", text: "9.81 m/s", isCorrect: false },
      ],
    },
  ]);

  return (
    <div className="min-h-screen bg-[#f7f5f5] pb-40 flex flex-col items-center relative">
      {/* Top Header */}
      <div className="w-full max-w-5xl pt-10 pl-2">
        <span className="text-lg font-semibold tracking-tight text-black/80">Quiz Editor</span>
      </div>

      {/* Metadata Card */}
      <div className="w-full max-w-5xl rounded-2xl bg-white shadow-md px-8 py-6 mt-5 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="uppercase text-xs font-semibold text-black/50 tracking-wide mb-2">
              Quiz Title
            </div>
            <div className="rounded-lg bg-[#f6f4f4] px-4 py-2 text-base font-medium text-black/80 truncate border border-transparent">
              {metadata?.title || <span className="italic text-gray-400">(missing title)</span>}
            </div>
          </div>
          <div>
            <div className="uppercase text-xs font-semibold text-black/50 tracking-wide mb-2">
              Class
            </div>
            <div className="rounded-lg bg-[#f6f4f4] px-4 py-2 text-base font-medium text-black/80 truncate border border-transparent">
              {metadata?.className || <span className="italic text-gray-400">(missing class)</span>}
            </div>
          </div>
          <div>
            <div className="uppercase text-xs font-semibold text-black/50 tracking-wide mb-2">
              Subject
            </div>
            <div className="rounded-lg bg-[#f6f4f4] px-4 py-2 text-base font-medium text-black/80 truncate border border-transparent">
              {metadata?.subject || <span className="italic text-gray-400">(missing subject)</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Question Cards */}
      {questions.map((q, i) => (
        <div key={q.id} className="w-full max-w-5xl rounded-2xl bg-white shadow-md px-8 py-6 mt-8">
          <div className="flex items-center gap-4">
            <span className="w-8 h-8 flex items-center justify-center bg-black text-white font-bold rounded-full shrink-0">
              {i + 1}
            </span>
            <div className="bg-[#f6f4f4] rounded-lg px-6 py-5 text-base font-medium text-black/90">
              {q.text}
            </div>
          </div>
          <div>
            <div className="uppercase text-xs tracking-wide text-black/60 mb-3">Answer Options</div>
            <div className="space-y-3">
              {q.choices.map((c) => (
                <div key={c.id} className="flex items-center gap-3">
                  <input
                    type="radio"
                    className="accent-purple-500 scale-125"
                    checked={c.isCorrect}
                    readOnly
                  />
                  <input
                    type="text"
                    readOnly
                    value={c.text}
                    className="flex-1 rounded px-3 py-2 border border-gray-200 bg-white text-black/80 text-base"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Add Question Button */}
      <div className="flex flex-col items-center mt-12">
        <button
          type="button"
          className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-3xl text-gray-400 bg-white shadow-sm transition hover:border-purple-400"
        >
          +
        </button>
        <span className="mt-2 text-gray-400 text-base">Add Question</span>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-7 left-0 w-full flex justify-center z-20">
        <div className="flex gap-4 items-center bg-black rounded-full p-2 shadow-lg">
          <button
            type="button"
            className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            <img src="/icons/upload.svg" alt="import" className="w-4 h-4" />
            Import Quiz
          </button>
          <button
            type="button"
            className="flex items-center gap-2 bg-white text-black rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            <img src="/icons/launch.svg" alt="launch" className="w-4 h-4" />
            Launch Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizEditorPage;

