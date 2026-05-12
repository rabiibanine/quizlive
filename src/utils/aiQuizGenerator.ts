import Groq from "groq-sdk";

import type { Quiz } from "@/types/index";

const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined;

const groq = new Groq({
  apiKey: apiKey ?? "",
  dangerouslyAllowBrowser: true,
});

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function estimateQuestionCount(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const estimate = Math.round(words / 120);
  return clamp(estimate, 10, 25);
}

function safeParseJson(content: string) {
  try {
    return JSON.parse(content);
  } catch {
    const first = content.indexOf("{");
    const last = content.lastIndexOf("}");
    if (first === -1 || last === -1 || last <= first) return null;
    try {
      return JSON.parse(content.slice(first, last + 1));
    } catch {
      return null;
    }
  }
}

export async function generateQuizJsonFromText(text: string): Promise<Quiz> {
  if (!apiKey) {
    throw new Error("Missing VITE_GROQ_API_KEY in .env");
  }

  const questionCount = estimateQuestionCount(text);
  const snippet = text.slice(0, 12000);

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You output only valid JSON with no markdown, no prose, and no code fences.",
      },
      {
        role: "user",
        content: [
          "Generate a quiz JSON from the text below.",
          "Rules:",
          `- Produce exactly ${questionCount} questions (between 10 and 25).`,
          "- Each question has 4 multiple-choice options.",
          "- correctChoice is 1-based (1-4).",
          "- time is seconds per question (30-90).",
          "- If title/course/subject are unclear, infer simple ones.",
          "- Output JSON only with this shape:",
          "{\n  \"title\": string,\n  \"course\": string,\n  \"subject\": string,\n  \"questions\": [\n    {\n      \"text\": string,\n      \"choices\": [string, string, string, string],\n      \"time\": number,\n      \"correctChoice\": number\n    }\n  ]\n}",
          "Text:",
          snippet,
        ].join("\n"),
      },
    ],
  });

  const content = completion.choices[0]?.message?.content ?? "";
  const parsed = safeParseJson(content);

  if (!parsed || typeof parsed !== "object") {
    throw new Error("Groq did not return valid JSON.");
  }

  if (Array.isArray((parsed as Quiz).questions)) {
    (parsed as Quiz).questions = (parsed as Quiz).questions.slice(0, 25);
  }

  return parsed as Quiz;
}
