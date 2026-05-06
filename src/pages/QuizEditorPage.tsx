import Card from "@/components/Card";
import QuestionCardList from "@/components/QuestionCardList";

import { BookOpenIcon, ClockIcon, ChalkboardTeacherIcon, FlaskIcon } from "@phosphor-icons/react";

import { useMemo } from "react";

const quiz = {
  quizInfo: { title: "Biology Quiz", class: "Biology", subject: "Immunology" },
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
      time: 60,
      correctChoice: 3,
    },
  ],
};

export default function QuizEditorPage() {
  const { quizInfo } = quiz;
  const totalSeconds = useMemo(() => {
    return quiz.quizQuestions.reduce((acc, q) => acc + q.time, 0);
  }, [quiz.quizQuestions]);

  const totalTime = useMemo(() => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return minutes > 0 ? `${minutes}m ${seconds > 0 ? `${seconds}s` : ""}` : `${seconds}s`;
  }, [totalSeconds]);

  const questionCount = useMemo(() => {
    return quiz.quizQuestions.length;
  }, [quiz.quizQuestions]);

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center py-12 px-12 md:px-36">
      <div className="w-full max-w-4xl">
        {/* Quiz Information */}
        {/* <Card */}
        {/*   variant="outline" */}
        {/*   fullWidth */}
        {/*   padding="md" */}
        {/*   className="flex self-start justify-center gap-8 flex-col sm:flex-row" */}
        {/* > */}
        {/*   {Object.entries(quiz.quizInfo) */}
        {/*     .filter(([key]) => key !== "questions") */}
        {/*     .map(([key, value]) => { */}
        {/*       return ( */}
        {/*         <div key={key} className="flex items-center flex-col gap-2"> */}
        {/*           <p className="text-zinc-400"> */}
        {/*             <strong>{key.toUpperCase()}</strong> */}
        {/*           </p> */}
        {/*           <Card className="bg-zinc-100 self-stretch min-w-30 transition-all hover:bg-zinc-200"> */}
        {/*             <p className="text-center text-zinc-900">{value}</p> */}
        {/*           </Card> */}
        {/*         </div> */}
        {/*       ); */}
        {/*     })} */}
        {/* </Card> */}
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
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm text-zinc-500 border border-zinc-200 rounded-full px-3 py-1">
              <BookOpenIcon size={16} />
              <span>
                Questions: <strong className="text-zinc-700">{questionCount}</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-zinc-500 border border-zinc-200 rounded-full px-3 py-1">
              <ClockIcon size={16} />
              <span>
                Time: <strong className="text-zinc-700">{totalTime}</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-zinc-500 border border-zinc-200 rounded-full px-3 py-1">
              <ChalkboardTeacherIcon size={16} />
              <span>
                Class: <strong className="text-zinc-700">{quizInfo.class}</strong>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-zinc-500 border border-zinc-200 rounded-full px-3 py-1">
              <FlaskIcon size={16} />
              <span>
                Subject: <strong className="text-zinc-700">{quizInfo.subject}</strong>
              </span>
            </div>
          </div>
        </Card>

        {/* Question List */}
        <QuestionCardList quizQuestions={quiz.quizQuestions}></QuestionCardList>
      </div>
    </div>
  );
}
