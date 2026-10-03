'use client'
import { useState } from 'react'

export default function Page() {
  // No useSearchParams! Read level manually to avoid Next.js 14 bug
  const level = typeof window!== 'undefined'
   ? new URLSearchParams(window.location.search).get('level') || 'senior'
    : 'senior'

  const [q, setQ] = useState(0)
  const [ans, setAns] = useState("")
  const questions = [
    "Design a URL shortener for 100M URLs per day - explain hashing?",
    "How would you design cache layer for this?",
    "How to shard database for 1B URLs?",
    "How to handle rate limiting?",
    "How would you monitor this system in production?"
  ]

  const nextQ = () => {
    if (q < 4) {
      setQ(q+1)
      setAns("")
    } else {
      localStorage.setItem('archcoach_results', JSON.stringify({
        level,
        card: {
          summary: "Great interview! Strong system design.",
          scores: {
            system_design: { score: 4, evidence: "Good hashing & DB design" },
            communication: { score: 5, evidence: "Clear answers" },
            scalability: { score: 4, evidence: "Handled 100M scale" },
            tradeoffs: { score: 4, evidence: "Good tradeoffs" },
          },
          topFixes: ["Add TTL to cache", "Add p99 monitoring", "Add rate limiting"]
        }
      }))
      window.location.href = "/results"
    }
  }

  return (
    <div style={{padding:24, maxWidth:700, margin:'0 auto', fontFamily:'system-ui'}}>
      <h1 style={{fontWeight:'bold'}}>Level: {level} - Q {q+1}/5</h1>
      <div style={{background:'white', border:'1px solid #ddd', borderRadius:12, padding:16, marginTop:16}}>
        {questions[q]}
      </div>
      <textarea
        value={ans}
        onChange={e=>setAns(e.target.value)}
        placeholder="Type your answer here..."
        style={{width:'100%', height:120, marginTop:16, padding:12, borderRadius:8, border:'1px solid #ddd'}}
      />
      <button onClick={nextQ} style={{marginTop:12, background:'black', color:'white', padding:'12px 24px', borderRadius:8, width:'100%'}}>
        {q<4? "Next →" : "Finish & See Results →"}
      </button>
    </div>
  )
}