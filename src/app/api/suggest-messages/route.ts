import { groq } from "@/lib/ai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

export async function POST() {
  const { text } = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    prompt: `Generate exactly 6 anonymous feedback .
    and keep in my anonymous sender is sending the message

Rules:
- Exactly 6 .
- One sentence each.
- Friendly and respectful.
- Encourage honest and constructive feedback.
- Do not number them.
- Do not use bullet points.
- Do not use markdown.
- Each feedback must be on a separate line.
- Every feedback should be unique.
`,

  });

  const suggestions = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return NextResponse.json({ suggestions });
}