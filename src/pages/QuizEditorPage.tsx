import Card from "@/components/Card";
import Button from "@/components/Button";
import { useState } from "react";

const initialQuizInformationMock = {
  title: "Biology Quiz",
  class: "Biology",
  subject: "Immunology",
  questions: [
    {
      question: "What is the main function of antibodies?",
      choices: [
        "To attack viruses directly",
        "To signal immune cells",
        "To neutralize foreign pathogens",
        "To create red blood cells",
      ],
      correctChoice: 3, // (1-based, 1-4)
    },
    {
      question: "Which cell type produces antibodies?",
      choices: ["B cells", "T cells", "Macrophages", "Dendritic cells"],
      correctChoice: 1,
    },
    {
      question: "Where does hematopoiesis primarily take place in adults?",
      choices: ["Spleen", "Liver", "Bone marrow", "Thymus"],
      correctChoice: 3,
    },
  ],
};

export default function QuizEditorPage() {
  // App state for quiz information & selections
  const [quizInfo, setQuizInfo] = useState(initialQuizInformationMock);
  const [selectedChoices, setSelectedChoices] = useState<{ [questionIdx: number]: number | null }>(
    {}
  );

  function handleChoiceToggle(qIdx: number, cIdx: number) {
    setSelectedChoices((prev) => ({
      ...prev,
      [qIdx]: cIdx === prev[qIdx] ? null : cIdx,
    }));
  }

  // Delete question at a given index
  function handleDeleteQuestion(qIdx: number) {
    setQuizInfo((prev) => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== qIdx),
    }));
    // Optionally, also cleanup selectedChoices for del index
    setSelectedChoices((prev) => {
      const updated = { ...prev };
      delete updated[qIdx];
      return updated;
    });
  }

  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center py-12 px-12 md:px-36">
      <div className="w-full max-w-2xl">
        {/* Quiz Information */}
        <Card
          variant="outline"
          fullWidth
          padding="md"
          className="flex self-start justify-center gap-8 flex-col sm:flex-row"
        >
          {Object.entries(quizInfo)
            .filter(([key]) => key !== "questions")
            .map(([key, value]) => {
              return (
                <div key={key} className="flex items-center flex-col gap-2">
                  <p className="text-zinc-400">
                    <strong>{key.toUpperCase()}</strong>
                  </p>
                  <Card className="bg-zinc-100 self-stretch min-w-30">
                    <p className="text-center text-zinc-900">{value}</p>
                  </Card>
                </div>
              );
            })}
        </Card>
        <h1 className="mt-8 mb-4 text-xl font-semibold text-zinc-700">Questions</h1>
        <div className="flex flex-col gap-6">
          {quizInfo.questions.map((q, qIdx) => (
            <Card key={qIdx} variant="outline" padding="lg" className="w-full flex flex-col">
              <div className="mb-2 flex flex-row items-center gap-2">
                <span className="font-mono font-bold text-zinc-600 text-lg">
                  {(qIdx + 1).toString().padStart(2, "0")}
                </span>
                <span className="ml-2 text-zinc-900">{q.question}</span>
                <Button variant="delete" className="" onClick={() => handleDeleteQuestion(qIdx)}>
                  Delete
                </Button>
              </div>
              <hr className="my-2 border-zinc-200" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {q.choices.map((choice, cIdx) => {
                  const isSelected = selectedChoices[qIdx] === cIdx;
                  return (
                    <Card
                      key={cIdx}
                      variant="none"
                      rounded={isSelected ? "2xl" : "lg"}
                      className={
                        `transition-all duration-200 cursor-pointer text-center select-none ` +
                        (isSelected
                          ? "bg-zinc-700 text-white shadow-lg"
                          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200")
                      }
                      padding="md"
                      onClick={() => handleChoiceToggle(qIdx, cIdx)}
                    >
                      {choice}
                    </Card>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
