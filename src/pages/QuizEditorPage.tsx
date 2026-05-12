import Card from "@/components/Card";
import QuestionCardList from "@/components/QuestionCardList";
import QuizEditorToolBar from "@/components/QuizEditorToolBar";
import { Loader } from "@/components/Loader";

import { launchSession } from "@/services/sessionServices";

import type { Question, Quiz } from "@/types/index";

import { getOrCreateId } from "@/utils/helpers";
import { extractTextFromFile } from "@/utils/fileTextExtractors";
import { generateQuizJsonFromText } from "@/utils/aiQuizGenerator";

import {
  BookOpenIcon,
  ClockIcon,
  ChalkboardTeacherIcon,
  FlaskIcon,
  UploadSimpleIcon,
  SparkleIcon,
} from "@phosphor-icons/react";

import { useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const quiz: Quiz = {
  id: crypto.randomUUID(),
  title: "Biology Quiz",
  course: "Biology",
  subject: "Immunology",
  questions: [
    {
      id: crypto.randomUUID(),
      text: "What is the main function of antibodies?",
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
      text: "Which cell type produces antibodies?",
      choices: ["B cells", "T cells", "Macrophages", "Dendritic cells"],
      time: 60,
      correctChoice: 1,
    },
    {
      id: crypto.randomUUID(),
      text: "Where does hematopoiesis primarily take place in adults?",
      choices: ["Spleen", "Liver", "Bone marrow", "Thymus"],
      time: 45,
      correctChoice: 3,
    },
  ],
};

export default function QuizEditorPage() {
  const pillStyles =
    "min-w-38 flex justify-center items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 border border-white/10 rounded-full px-3 py-1 bg-white/5";

  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const stateQuizInfo = location.state as
    | { id: string; title: string; className: string; subject: string; numberOfStudents: number }
    | undefined;
  const resolvedQuizInfo = {
    id: stateQuizInfo?.id ?? quiz.id,
    title: stateQuizInfo?.title ?? quiz.title,
    course: stateQuizInfo?.className ?? quiz.course,
    subject: stateQuizInfo?.subject ?? quiz.subject,
  };
  const hasRouterState = Boolean(stateQuizInfo);

  const [quizState, setQuizState] = useState({
    ...(hasRouterState
      ? {
          ...resolvedQuizInfo,
          questions: [
            {
              id: crypto.randomUUID(),
              text: "",
              choices: ["", "", "", ""],
              time: 30,
              correctChoice: 1,
            },
          ],
        }
      : {
          ...quiz,
          ...resolvedQuizInfo,
        }),
  });

  const { id, title, subject, course, questions } = quizState;

  const totalSeconds = useMemo(() => {
    return questions.reduce((acc, q) => acc + q.time, 0);
  }, [questions]);

  const totalTime = useMemo(() => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes > 0 ? `${minutes}m ${seconds > 0 ? `${seconds}s` : ""}` : `${seconds}s`;
  }, [totalSeconds]);

  const questionCount = useMemo(() => {
    return questions.length;
  }, [questions]);

  const setQuizQuestions = (updatedQuestions: Question[]) => {
    setQuizState((prev) => {
      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };

  const normalizeGeneratedQuiz = (generated: Quiz, fallbackId: string): Quiz => {
    const questions = (generated.questions ?? []).map((question) => {
      const choices = Array.isArray(question.choices) ? [...question.choices] : [];
      while (choices.length < 4) choices.push("");

      return {
        id: crypto.randomUUID(),
        text: question.text ?? "",
        choices: choices.slice(0, 4),
        time: typeof question.time === "number" ? question.time : 30,
        correctChoice:
          typeof question.correctChoice === "number" ? question.correctChoice : 1,
      };
    });

    return {
      id: fallbackId,
      title: generated.title ?? "Generated Quiz",
      course: generated.course ?? "General",
      subject: generated.subject ?? "General",
      questions,
    };
  };

  const handleExport = () => {
    const json = JSON.stringify(quizState, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${title}.json`;
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
      const { sessionId, quizCode } = await launchSession(id, professorId, quiz);
      navigate(`/sharing/${quizCode}`, { state: sessionId });
    } catch (error) {
      console.error("Failed to launch session: " + error);
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsGenerating(true);

    try {
      const text = await extractTextFromFile(file);
      console.log("Extracted text:", text);
      const generatedQuiz = await generateQuizJsonFromText(text);
      const normalizedQuiz = normalizeGeneratedQuiz(generatedQuiz, id);
      setQuizState(normalizedQuiz);
      console.log("Generated quiz JSON:", generatedQuiz);
    } catch (error) {
      console.error("Failed to process uploaded file:", error);
      alert(
        "Failed to process the file. Please upload a PDF, DOCX, or PPTX file and check your Groq API key.",
      );
    } finally {
      setIsGenerating(false);
      event.target.value = "";
    }
  };

  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div
      className="min-h-screen w-full bg-slate-950 text-white flex justify-center py-12 px-6 md:px-36"
      style={{
        background: "linear-gradient(180deg, #0b1222 0%, #0f172a 55%, #0b1222 100%)",
      }}
    >
      <div className="w-full max-w-4xl">
        <Card
          variant="none"
          fullWidth
          padding="md"
          className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur"
        >
          {/* Title and description */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-white">{title}</h1>
            <p className="text-sm text-white/60">
              Enter an optional description or instructions for the students...
            </p>
          </div>

          <hr className="border-white/10" />

          {/* Metadata row */}
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className={pillStyles}>
              <BookOpenIcon size={16} />
              <span>
                Questions: <strong className="text-white">{questionCount}</strong>
              </span>
            </div>

            <div className={pillStyles}>
              <ClockIcon size={16} />
              <span>
                Time: <strong className="text-white">{totalTime}</strong>
              </span>
            </div>

            <div className={pillStyles}>
              <ChalkboardTeacherIcon size={16} />
              <span>
                Class: <strong className="text-white">{course}</strong>
              </span>
            </div>

            <div className={pillStyles}>
              <FlaskIcon size={16} />
              <span>
                Subject: <strong className="text-white">{subject}</strong>
              </span>
            </div>
          </div>
        </Card>

        <Card
          variant="none"
          fullWidth
          padding="md"
          className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-purple-400/30 bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-purple-500/10"
        >
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-purple-200">
              <SparkleIcon size={18} />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-semibold text-white">Generate with AI</h2>
              <p className="text-sm text-white/60">
                Import course material (PDF, PPT, or DOCX) to automatically generate quiz questions.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-purple-300/40 bg-purple-500/20 px-4 py-2 text-sm font-semibold text-purple-100 transition hover:bg-purple-500/30"
            onClick={handleUploadClick}
          >
            <UploadSimpleIcon size={18} />
            Upload File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.pptx"
            className="hidden"
            onChange={handleUploadChange}
          />
        </Card>

        {isGenerating ? (
          <div className="flex items-center justify-center py-20">
            <Loader />
          </div>
        ) : (
          <QuestionCardList
            quizQuestions={questions}
            setQuizQuestions={setQuizQuestions}
          />
        )}


        <QuizEditorToolBar
          onLaunch={handleLaunch}
          onExport={handleExport}
          onImport={handleImport}
        ></QuizEditorToolBar>
      </div>
    </div>
  );
}