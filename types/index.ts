export type Level = "junior" | "senior" | "staff";
export type Turn = { role: "user" | "assistant" | "system"; content: string };
export type InterviewRequest = { level: Level; messages: Turn[] };