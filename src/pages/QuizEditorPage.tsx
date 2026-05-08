import Card from "@/components/Card";
import QuestionCardList from "@/components/QuestionCardList";
import QuizEditorToolBar from "@/components/QuizEditorToolBar";
import { launchSession } from "@/services/sessionServices";
import type { Question } from "@/types/quiz";
import { getOrCreateId } from "@/utils/helpers";

import { BookOpenIcon, ClockIcon, ChalkboardTeacherIcon, FlaskIcon } from "@phosphor-icons/react";

import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const quiz = {
  quizInfo: {
    id: crypto.randomUUID(),
    title: "Biology Quiz",
    class: "Biology",
    subject: "Immunology",
  },
  quizQuestions: [
    {
      id: crypto.randomUUID(),
      question: "What is the main function of antibodies?",
      choices: [
        "To attack viruses directly",
        "To signal immune cells",
        "To neutralize foreign pathogens",
        "To create red blood cells",
      ],
      time: 60,
      correctChoice: 3, // (1-based, 1-4)
    },
    {
      id: crypto.randomUUID(),
      question: "Which cell type produces antibodies?",
      choices: ["B cells", "T cells", "Macrophages", "Dendritic cells"],
      time: 60,
      correctChoice: 1,
    },
    {
      id: crypto.randomUUID(),
      question: "Where does hematopoiesis primarily take place in adults?",
      choices: ["Spleen", "Liver", "Bone marrow", "Thymus"],
      time: 45,
      correctChoice: 3,
    },
  ],
};

export default function QuizEditorPage() {
  const pillStyles =
    "min-w-38 flex justify-center items-center gap-1.5 text-sm text-zinc-500 border border-zinc-200 rounded-full px-3 py-1 transition-all hover:border-zinc-400";

  const navigate = useNavigate();
  const location = useLocation();
  const stateQuizInfo = location.state as
    | { id: string; title: string; className: string; subject: string; numberOfStudents: number }
    | undefined;
  const resolvedQuizInfo = {
    id: stateQuizInfo?.id ?? quiz.quizInfo.id,
    title: stateQuizInfo?.title ?? quiz.quizInfo.title,
    class: stateQuizInfo?.className ?? quiz.quizInfo.class,
    subject: stateQuizInfo?.subject ?? quiz.quizInfo.subject,
  };
  const hasRouterState = Boolean(stateQuizInfo);

  const [quizState, setQuizState] = useState({
    ...(hasRouterState
      ? {
          quizInfo: resolvedQuizInfo,
          quizQuestions: [
            {
              id: crypto.randomUUID(),
              question: "",
              choices: ["", "", "", ""],
              time: 30,
              correctChoice: 1,
            },
          ],
        }
      : {
          ...quiz,
          quizInfo: resolvedQuizInfo,
        }),
  });

  const { quizInfo, quizQuestions } = quizState;

  const totalSeconds = useMemo(() => {
    return quizQuestions.reduce((acc, q) => acc + q.time, 0);
  }, [quizQuestions]);

  const totalTime = useMemo(() => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes > 0 ? `${minutes}m ${seconds > 0 ? `${seconds}s` : ""}` : `${seconds}s`;
  }, [totalSeconds]);

  const questionCount = useMemo(() => {
    return quizQuestions.length;
  }, [quizQuestions]);

  const setQuizQuestions = (updatedQuestions: Question[]) => {
    setQuizState((prev) => {
      return {
        ...prev,
        quizQuestions: updatedQuestions,
      };
    });
  };
  const setQuizClass = (newClass: string) => {
    setQuizState((prev) => {
      return {
        ...prev,
        quizInfo: { ...prev.quizInfo, class: newClass },
      };
    });
  };
  const setQuizSubject = (newSubject: string) => {
    setQuizState((prev) => {
      return {
        ...prev,
        quizInfo: { ...prev.quizInfo, subject: newSubject },
      };
    });
  };

  const handleExport = () => {
    const json = JSON.stringify(quizState, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${quizInfo.title}.json`;
    anchor.click();

    URL.revokeObjectURL(url);
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        setQuizState(parsed);
      } catch {
        alert("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  };

  async function handleLaunch(): Promise<void> {
    try {
      const professorId = getOrCreateId("professorId");
      const { sessionId, quizCode } = await launchSession(quizInfo.id, professorId);
      navigate(`/sharing/${quizCode}`, { state: sessionId });
    } catch (error) {
      console.error("Failed to launch session: " + error);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center py-12 px-12 md:px-36">
      <div className="w-full max-w-4xl">
        <Card variant="outline" fullWidth padding="md" className="flex flex-col gap-4">
          {/* Title and description */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-zinc-900">{quizInfo.title}</h1>
            <p className="text-zinc-400 text-sm">
              Enter an optional description or instructions for the students...
            </p>
          </div>

          <hr className="border-zinc-200" />

          {/* Metadata row */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className={pillStyles}>
              <BookOpenIcon size={16} />
              <span>
                Questions: <strong className="text-zinc-700">{questionCount}</strong>
              </span>
            </div>

            <div className={pillStyles}>
              <ClockIcon size={16} />
              <span>
                Time: <strong className="text-zinc-700">{totalTime}</strong>
              </span>
            </div>

            <div className={pillStyles}>
              <ChalkboardTeacherIcon size={16} />
              <span>
                Class: <strong className="text-zinc-700">{quizInfo.class}</strong>
              </span>
            </div>

            <div className={pillStyles}>
              <FlaskIcon size={16} />
              <span>
                Subject: <strong className="text-zinc-700">{quizInfo.subject}</strong>
              </span>
            </div>
          </div>
        </Card>

        {/* Question List */}
        <QuestionCardList
          quizQuestions={quizQuestions}
          setQuizQuestions={setQuizQuestions}
        ></QuestionCardList>

        <QuizEditorToolBar
          onLaunch={handleLaunch}
          onExport={handleExport}
          onImport={handleImport}
        ></QuizEditorToolBar>
      </div>
    </div>
  );
}
