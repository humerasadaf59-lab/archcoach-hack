export const MODEL = "free-demo-model";

let count = 0;
const QUESTIONS = [
  "Design a URL shortener handling 100M URLs/day. How would you design DB and hashing?",
  "Great! How would you handle cache invalidation and high availability for your shortener?",
  "Nice! How would you shard your database to handle 1B URLs?",
  "Good! How would you prevent abuse and rate limiting?",
  "Final! How would you monitor latency and handle failover? Explain your metrics."
];

export function client() {
  return {
    messages: {
      create: async (opts: any) => {
        const q = QUESTIONS[count % QUESTIONS.length];
        count++;
        const mockText = JSON.stringify({
          question: q,
          feedback: "Good answer, let's continue!",
          title: "Senior Interview: URL Shortener"
        });
        return {
          content: [{ type: "text", text: mockText }]
        };
      }
    }
  } as any;
}

export function parseJson<T>(text: string): T {
  const cleaned = text.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  return JSON.parse(cleaned.slice(start, end + 1)) as T;
}