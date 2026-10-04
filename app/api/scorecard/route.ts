import { NextResponse } from "next/server";
import { client, MODEL, parseJson } from "@/lib/anthropic";
import { SCORECARD_PROMPT } from "@/prompts/scorecard";
import type { Scorecard, Turn } from "@/types";

export async function POST(req: Request) {
  try {
    const { level, topic, turns } = (await req.json()) as { level: string; topic: string; turns: Turn[] };
    const transcript = turns
      .map((t) => `${t.role === "interviewer" ? "INTERVIEWER" : "CANDIDATE"}: ${t.content}`)
      .join("\n\n");

    const res = await client().messages.create({
      model: MODEL,
      max_tokens: 2000,
      system: SCORECARD_PROMPT,
      messages: [
        {
          role: "user",
          content: `Level: ${level}\nTopic: ${topic}\nArchitecture diagram: (none provided)\n\nTRANSCRIPT:\n${transcript}`,
        },
      ],
    });
    const text = res.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    return NextResponse.json(parseJson<Scorecard>(text));
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? "Scorecard failed" }, { status: 500 });
  }
}
