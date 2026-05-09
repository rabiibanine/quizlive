import { useState } from "react";

import NavBar from "../components/NavBar";
import Button from "../components/Button";
import Input from "../components/Input";
import type { Quiz } from "@/types";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);

  const quizInfo: Quiz = {
    id: crypto.randomUUID(),
    title: "Web Development Quiz",
    course: "GI-S6",
    subject: "React Fundamentals",
    maxStudents: 20,
    questions: [],
  };

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
    const normalizedCode = formValues.roomCode.trim();
    //Arbitrary value for testing😊
    const valid = normalizedCode === "676767";
    setIsCodeValid(valid);
    setIsModalOpen(true);
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
              <p className="text-xs font-semibold tracking-[0.4em] text-purple-600">GET STARTED</p>
              <h1 className="mt-3 text-3xl md:text-4xl font-bold text-black">Join a Session</h1>
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
              <Button variant="black" className="w-full px-8 py-3" onClick={handleSubmit}>
                Join Quiz
              </Button>
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
            {isCodeValid ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold tracking-[0.4em] text-purple-600">
                    QUIZ INFO
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-black">{quizInfo.title}</h2>
                  <p className="text-gray-600 mt-1">Review the details before joining.</p>
                </div>
                <div className="grid gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Class Name</span>
                    <span className="font-semibold text-gray-900">{quizInfo.course}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Subject</span>
                    <span className="font-semibold text-gray-900">{quizInfo.subject}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Students Joined</span>
                    {/* TODO Replace 18 with the session currentStudents property*/}
                    <span className="font-semibold text-gray-900">{18}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <p className="text-xs font-semibold tracking-[0.4em] text-red-500">INVALID CODE</p>
                <h2 className="text-2xl font-bold text-black">Incorrect room code</h2>
                <p className="text-gray-600">
                  Double-check the code with your professor and try again.
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {isCodeValid && (
                <Button variant="black" className="w-full px-8 py-3">
                  Confirm & Join
                </Button>
              )}
              <Button
                variant="white"
                className="w-full px-8 py-3"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinQuiz;
