import { useState } from "react";

import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { Input } from "../components/primitives";

type StepKey = "roomCode" | "studentName";

type Field = {
  key: StepKey;
  label: string;
  placeholder: string;
  helperText: string;
  type: "text";
};

const fields: Field[] = [
  {
    key: "roomCode",
    label: "Room Code",
    placeholder: "e.g. 676767",
    helperText: "Ask your professor for the code.",
    type: "text",
  },
  {
    key: "studentName",
    label: "Your Name",
    placeholder: "e.g. Fakir Marwane",
    helperText: "Use the name on the class roster.",
    type: "text",
  },
];

const JoinQuiz = () => {
  const [formValues, setFormValues] = useState<Record<StepKey, string>>({
    roomCode: "",
    studentName: "",
  });
  const [errors, setErrors] = useState<Partial<Record<StepKey, string>>>({});

  const validateForm = () => {
    const nextErrors: Partial<Record<StepKey, string>> = {};
    fields.forEach((field) => {
      const value = formValues[field.key].trim();
      if (!value) {
        nextErrors[field.key] = "This field is required.";
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (key: StepKey, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    alert("You are ready to join the quiz.");
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

      <main className="relative flex items-center justify-center py-16">
        <div className="w-full max-w-2xl mx-auto px-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-[32px] border p-10 shadow-[0_0_40px_-10px_rgba(132,85,239,0.25)]">
            <div className="text-center">
              <p className="text-xs font-semibold tracking-[0.4em] text-purple-600">
                GET STARTED
              </p>
              <h1 className="mt-3 text-3xl md:text-4xl font-bold text-black">
                Join a Session
              </h1>
              <p className="text-gray-600 mt-2">
                Enter your details to start the live quiz competition.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              {fields.map((field) => (
                <Input
                  key={field.key}
                  label={field.label}
                  placeholder={field.placeholder}
                  helperText={field.helperText}
                  type={field.type}
                  fullWidth
                  inputSize="lg"
                  value={formValues[field.key]}
                  onChange={(event) => handleChange(field.key, event.target.value)}
                  error={errors[field.key]}
                />
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Button
                variant="black"
                className="w-full px-8 py-3"
                onClick={handleSubmit}
              >
                Join Quiz
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JoinQuiz;

