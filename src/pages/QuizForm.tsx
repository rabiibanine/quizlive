import { useMemo, useState } from "react";

import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { Card, Input } from "../components/primitives";

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
  const [currentStep, setCurrentStep] = useState(0);
  const [formValues, setFormValues] = useState<Record<StepKey, string>>({
    quizTitle: "",
    className: "",
    subject: "",
    maxStudents: "",
  });
  const [errors, setErrors] = useState<Partial<Record<StepKey, string>>>({});

  const activeStep = steps[currentStep];

  const progress = useMemo(() => {
    return Math.round(((currentStep + 1) / steps.length) * 100);
  }, [currentStep]);

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

    alert("Quiz session configured.");
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div
      className="min-h-screen w-full text-gray-900 selection:bg-purple-200 selection:text-white"
      style={{
        background: `
          radial-gradient(circle at 10% 20%, rgba(132, 85, 239, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(0, 144, 169, 0.15) 0%, transparent 40%)
        `,
      }}
    >
      <NavBar />

      <main className="relative py-16 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-start">
            <div className="hidden lg:flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold tracking-widest text-purple-600 mb-2">
                  START SESSION
                </p>
                <h1 className="text-3xl md:text-4xl font-bold text-black">
                  Configure your quiz details
                </h1>
                <p className="text-gray-600 mt-3">
                  Set up the quiz before students join. You can adjust these settings any
                  time before you go live.
                </p>
              </div>

              {instructionCards.map((card) => (
                <Card
                  key={card.title}
                  variant="outline"
                  className="bg-white/70 backdrop-blur-xl"
                >
                  <h3 className="text-lg font-semibold text-black">{card.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{card.body}</p>
                </Card>
              ))}
            </div>

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl border p-8 shadow-[0_0_40px_-10px_rgba(132,85,239,0.3)]">
              <div className="mb-6 lg:hidden">
                <p className="text-sm font-semibold tracking-widest text-purple-600 mb-2">
                  START SESSION
                </p>
                <h1 className="text-2xl font-bold text-black">
                  Configure your quiz details
                </h1>
                <p className="text-gray-600 mt-2">
                  Set up the quiz before students join.
                </p>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  Step {currentStep + 1} of {steps.length}
                </span>
                <span>{progress}%</span>
              </div>
              <div className="mt-3 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-purple-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

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
                />
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="white"
                  className="w-full sm:w-auto px-8 py-3"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                >
                  Back
                </Button>
                <Button
                  variant="black"
                  className="w-full sm:flex-1 px-8 py-3"
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

