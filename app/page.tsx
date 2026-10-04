"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LEVELS = [
  { id: "junior", title: "Junior", desc: "API, DB, Cache basics" },
  { id: "senior", title: "Senior", desc: "Scalability, Failures" },
  { id: "staff", title: "Staff", desc: "Cost, 10x Scale, Org tradeoffs" },
] as const;

export default function Home() {
  const router = useRouter();
  const [level, setLevel] = useState<string>("senior");

  return (
    <main className="min-h-screen bg-[#faf9f5]">
      <header className="flex items-center justify-between px-8 py-6">
        <span className="text-3xl font-black">🏗️ ArchCoach</span>
        <span className="rounded-full bg-black px-5 py-3 text-sm font-black text-white">48H HACKATHON</span>
      </header>

      <section className="mx-auto max-w-5xl px-8 pt-16 text-center">
        <h1 className="text-6xl font-black leading-tight md:text-7xl">
          Master System Design<br />Like a Staff Engineer
        </h1>
        <p className="mt-8 text-xl text-gray-600">
          AI Interviewer + Live Diagram Critic + Scorecard. Junior / Senior / Staff.
        </p>

        <button
          onClick={() => router.push(`/interview?level=${level}`)}
          className="mt-12 rounded-xl border-2 border-gray-600 bg-black px-10 py-5 text-xl font-bold text-white hover:bg-gray-800"
        >
          Start Mock Interview →
        </button>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLevel(l.id)}
              className={`rounded-2xl bg-white p-10 text-left transition ${
                level === l.id ? "border-2 border-black" : "border border-gray-200"
              }`}
            >
              <p className="text-xl font-bold">{l.title}</p>
              <p className="mt-4">{l.desc}</p>
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
