export type Level = "junior" | "senior" | "staff";
export type Turn = { role: "interviewer" | "candidate"; content: string };

export type Scorecard = {
  scores: Record<
    "requirementsGathering" | "apiAndDataModel" | "scalability" | "tradeoffReasoning" | "communication",
    { score: number; evidence: string }
  >;
  topFixes: string[];
  referenceArchitecture: { components: string[]; flow: string[]; keyTradeoffs: string[] };
  summary: string;
};
