import { useState } from "react";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Input from "@/components/Input";
import StepProgress from "@/components/StepProgress";
import { useNavigate } from "react-router-dom";

type StepKey = "quizTitle" | "className" | "subject" | "maxStudents";

type Step = {
  key: StepKey;
  label: string;
  placeholder: string;
  helperText: string;
  type: "text" | "number";
  min?: number;
  max?: number;
};

type QuizInfo = {
  id: string;
  title: string;
  className: string;
  subject: string;
  numberOfStudents: number;
};

const steps: Step[] = [
  {
    key: "quizTitle",
    label: "Quiz Title",
    placeholder: "e.g. Chapter 5 Quiz",
    helperText: "Shown to students and in imports.",
    type: "text",
  },
  {
    key: "className",
    label: "Class Name",
    placeholder: "e.g. GI-S6",
    helperText: "Use the class label students already know.",
    type: "text",
  },
  {
    key: "subject",
    label: "Subject",
    placeholder: "React",
    helperText: "Helps students confirm the right quiz.",
    type: "text",
  },
  {
    key: "maxStudents",
    label: "Max Students",
    placeholder: "e.g. 40",
    helperText: "Set a cap for your room.",
    type: "number",
    min: 1,
    max: 500,
  },
];

const instructionCards = [
  {
    title: "Write a clear quiz title",
    body: "Make it easy to identify at a glance.",
  },
  {
    title: "Match the class roster",
    body: "Use the class label students already recognize.",
  },
  {
    title: "Confirm capacity",
    body: "Set a reasonable max to avoid unexpected join issues.",
  },
];

const QuizForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState<Record<StepKey, string>>({
    quizTitle: "",
    className: "",
    subject: "",
    maxStudents: "",
  });
  const [errors, setErrors] = useState<Partial<Record<StepKey, string>>>({});

  const activeStep = steps[currentStep];

  const validateStep = (step: Step) => {
    const value = formValues[step.key].trim();
    if (!value) {
      return "This field is required.";
    }

    if (step.type === "number") {
      const numeric = Number(value);
      if (Number.isNaN(numeric)) {
        return "Enter a valid number.";
      }
      if (step.min !== undefined && numeric < step.min) {
        return `Minimum allowed is ${step.min}.`;
      }
      if (step.max !== undefined && numeric > step.max) {
        return `Maximum allowed is ${step.max}.`;
      }
    }

    return "";
  };

  const handleChange = (key: StepKey, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleNext = () => {
    const message = validateStep(activeStep);
    if (message) {
      setErrors((prev) => ({ ...prev, [activeStep.key]: message }));
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    const nextErrors: Partial<Record<StepKey, string>> = {};
    steps.forEach((step) => {
      const validationMessage = validateStep(step);
      if (validationMessage) {
        nextErrors[step.key] = validationMessage;
      }
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstErrorIndex = steps.findIndex((step) => nextErrors[step.key]);
      if (firstErrorIndex >= 0) {
        setCurrentStep(firstErrorIndex);
      }
      return;
    }

    const quizInfo: QuizInfo = {
      id: crypto.randomUUID(),
      title: formValues.quizTitle.trim(),
      className: formValues.className.trim(),
      subject: formValues.subject.trim(),
      numberOfStudents: Number(formValues.maxStudents),
    };

    navigate("/quiz-editor", { state: quizInfo });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div
      className="min-h-screen w-full bg-slate-950 text-white"
      style={{
        background: "linear-gradient(180deg, #0b1222 0%, #0f172a 55%, #0b1222 100%)",
      }}
    >

      <main className="relative flex-1 overflow-hidden py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div className="hidden flex-col gap-4 lg:flex">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-purple-200">
                  Start Session
                </p>
                <h1 className="text-3xl font-semibold text-white md:text-4xl">
                  Configure your quiz details
                </h1>
                <p className="mt-3 text-sm text-white/60">
                  Set up the quiz before students join. You can adjust these settings any time
                  before you go live.
                </p>
              </div>

              {instructionCards.map((card) => (
                <Card
                  key={card.title}
                  variant="none"
                  className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur"
                >
                  <h3 className="text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{card.body}</p>
                </Card>
              ))}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_18px_40px_-24px_rgba(147,102,255,0.5)] backdrop-blur">
              <div className="mb-6 lg:hidden">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.35em] text-purple-200">
                  Start Session
                </p>
                <h1 className="text-2xl font-semibold text-white">
                  Configure your quiz details
                </h1>
                <p className="mt-2 text-sm text-white/60">
                  Set up the quiz before students join.
                </p>
              </div>

              <StepProgress
                currentStep={currentStep}
                totalSteps={steps.length}
                className="mt-2"
                labelClassName="text-xs font-semibold uppercase tracking-[0.3em] text-white/60"
                percentClassName="text-xs font-semibold uppercase tracking-[0.3em] text-white/60"
                trackClassName="bg-white/10"
                barClassName="bg-purple-300"
              />

              <div className="mt-8">
                <Input
                  label={activeStep.label}
                  placeholder={activeStep.placeholder}
                  helperText={activeStep.helperText}
                  type={activeStep.type}
                  min={activeStep.min}
                  max={activeStep.max}
                  fullWidth
                  inputSize="lg"
                  value={formValues[activeStep.key]}
                  onChange={(event) => handleChange(activeStep.key, event.target.value)}
                  error={errors[activeStep.key]}
                  labelClassName="text-white/80"
                  className="rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:ring-purple-200"
                />
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="white"
                  className="w-full rounded-2xl border-white/10 bg-white/10 px-8 py-3 text-sm font-semibold text-white hover:border-white/20 hover:bg-white/20 disabled:cursor-not-allowed disabled:border-white/5 disabled:bg-white/5 disabled:text-white/40 sm:w-auto"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  Back
                </Button>
                <Button
                  variant="lavender"
                  className="w-full rounded-2xl px-8 py-3 text-sm font-semibold sm:flex-1"
                  onClick={handleNext}
                >
                  {currentStep === steps.length - 1 ? "Create Session" : "Next"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default QuizForm;
