import { NextResponse } from "next/server";
import { client, MODEL, parseJson } from "@/lib/anthropic";
import { JUNIOR_INTERVIEWER_PROMPT } from "@/prompts/junior";
import { SENIOR_INTERVIEWER_PROMPT } from "@/prompts/senior";
import { STAFF_INTERVIEWER_PROMPT } from "@/prompts/staff";
import type { Level, Turn } from "@/types";

const PROMPTS: Record<Level, string> = {
  junior: JUNIOR_INTERVIEWER_PROMPT,
  senior: SENIOR_INTERVIEWER_PROMPT,
  staff: STAFF_INTERVIEWER_PROMPT,
};

export async function POST(req: Request) {
  try {
    const { level, topic, turns } = (await req.json()) as { level: Level; topic: string; turns: Turn[] };
    const system = `${PROMPTS[level] ?? PROMPTS.senior}\n\nThe interview topic is: ${topic}.`;

    // Anthropic requires the first message to be from the user
    const messages = [
      { role: "user" as const, content: "Begin the interview." },
      ...turns.map((t) => ({
        role: t.role === "interviewer" ? ("assistant" as const) : ("user" as const),
        content: t.content,
      })),
    ];
    if (messages[messages.length - 1].role === "assistant") {
      messages.push({ role: "user", content: "Continue." });
    }

    const res = await client().messages.create({ model: MODEL, max_tokens: 600, system, messages });
    const text = res.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    try {
      return NextResponse.json(parseJson(text));
    } catch {
      return NextResponse.json({ response: text, shouldContinue: true });
    }
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Interview failed" }, { status: 500 });
  }
}
