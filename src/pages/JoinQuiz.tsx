import { useState } from "react";

import Button from "../components/Button";
import Input from "../components/Input";
import { findSessionByCode, joinSession } from "@/services/sessionServices";
import { getOrCreateId } from "@/utils/helpers";
import type { Student } from "@/types";
import { useNavigate } from "react-router-dom";

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

  const [modalInfo, setModalInfo] = useState({
    title: "",
    course: "",
    subject: "",
    currentStudents: 0,
  });

  const navigate = useNavigate();

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

  const handleSubmit = async () => {
    // OLD CODE
    // if (!validateForm()) return;
    // const normalizedCode = formValues.roomCode.trim();
    //Arbitrary value for testing😊
    // const valid = normalizedCode === "676767";
    // setIsCodeValid(valid);
    // setIsModalOpen(true);

    if (!validateForm()) return;

    const enteredCode = formValues.roomCode.trim();
    try {
      const data = await findSessionByCode(enteredCode);
      if (!data) return;
      const { title, course, subject } = data.quiz;
      const { currentStudents } = data;
      setModalInfo({ title, course, subject, currentStudents });
      setIsCodeValid(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error while fetching session.");
    }
  };

  async function handleJoin(): Promise<void> {
    const enteredCode = formValues.roomCode.trim();
    const enteredName = formValues.studentName.trim();
    try {
      const session = await findSessionByCode(enteredCode);

      if (!session) {
        // show error
        return;
      }

      const student: Student = {
        id: getOrCreateId("studentId"),
        name: enteredName,
        points: 0,
        answers: [],
      };

      await joinSession(session.id, student);
      // TODO Make sure the student page changes
      navigate(`/quiz/${enteredCode}`, { state: { sessionId: session.id, student } });
    } catch (error) {
      console.error("Failed to join session:", error);
      // show error to student
    }
  }

  return (
    <div
      className="min-h-screen w-full bg-slate-950 text-white"
      style={{
        background: "linear-gradient(180deg, #0b1222 0%, #0f172a 55%, #0b1222 100%)",
      }}
    >
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-2xl">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-[0_18px_40px_-24px_rgba(147,102,255,0.5)] backdrop-blur">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-purple-200">
                Get Started
              </p>
              <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                Join a Session
              </h1>
              <p className="mt-2 text-sm text-white/60">
                Enter your details to start the live quiz competition.
              </p>
            </div>

            <div className="mt-10 space-y-6">
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
                  labelClassName="text-white/80"
                  className="rounded-2xl border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:ring-purple-200"
                />
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                variant="lavender"
                className="w-full rounded-2xl px-8 py-3 text-sm font-semibold"
                onClick={handleSubmit}
              >
                Join Quiz
              </Button>
            </div>
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/95 p-8 text-white shadow-2xl backdrop-blur">
            {isCodeValid ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-purple-200">
                    Quiz Info
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-black">{modalInfo.title}</h2>
                  <p className="text-gray-600 mt-1">Review the details before joining.</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {quizInfo.title}
                  </h2>
                  <p className="mt-1 text-sm text-white/60">
                    Review the details before joining.
                  </p>
                </div>
                <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Class Name</span>
                    <span className="font-semibold text-gray-900">{modalInfo.course}</span>
                    <span className="text-white/60">Class Name</span>
                    <span className="font-semibold text-white">{quizInfo.course}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Subject</span>
                    <span className="font-semibold text-gray-900">{modalInfo.subject}</span>
                    <span className="text-white/60">Subject</span>
                    <span className="font-semibold text-white">{quizInfo.subject}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Students Joined</span>
                    {/* TODO Replace 18 with the session currentStudents property*/}
                    <span className="font-semibold text-gray-900">{modalInfo.currentStudents}</span>
                    <span className="font-semibold text-white">{18}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-red-400">
                  Invalid Code
                </p>
                <h2 className="text-2xl font-semibold text-white">Incorrect room code</h2>
                <p className="text-sm text-white/60">
                  Double-check the code with your professor and try again.
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {isCodeValid && (
                <Button
                  variant="lavender"
                  className="w-full rounded-2xl px-8 py-3 text-sm font-semibold"
                >
                  Confirm & Join
                </Button>
              )}
              <Button
                variant="white"
                className="w-full rounded-2xl border-white/10 bg-white/10 px-8 py-3 text-sm font-semibold text-white hover:border-white/20 hover:bg-white/20"
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
