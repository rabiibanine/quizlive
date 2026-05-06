import Card from "@/components/Card";
import QuestionCardList from "@/components/QuestionCardList";

const quiz = {
  quizInfo: { title: "Biology Quiz", class: "Biology", subject: "Immunology" },
  quizQuestions: [
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
  return (
    <div className="min-h-screen bg-zinc-100 flex justify-center py-12 px-12 md:px-36">
      <div className="w-full max-w-4xl">
        {/* Quiz Information */}
        <Card
          variant="outline"
          fullWidth
          padding="md"
          className="flex self-start justify-center gap-8 flex-col sm:flex-row"
        >
          {Object.entries(quiz.quizInfo)
            .filter(([key]) => key !== "questions")
            .map(([key, value]) => {
              return (
                <div key={key} className="flex items-center flex-col gap-2">
                  <p className="text-zinc-400">
                    <strong>{key.toUpperCase()}</strong>
                  </p>
                  <Card className="bg-zinc-100 self-stretch min-w-30 transition-all hover:bg-zinc-200">
                    <p className="text-center text-zinc-900">{value}</p>
                  </Card>
                </div>
              );
            })}
        </Card>

        <QuestionCardList quizQuestions={quiz.quizQuestions}></QuestionCardList>
      </div>
    </div>
  );
}
