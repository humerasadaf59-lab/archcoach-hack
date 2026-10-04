"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function InterviewContent() {
  const searchParams = useSearchParams();
  const level = searchParams.get("level") || "senior";
  const [messages, setMessages] = useState([{role:"assistant", content:`Welcome! You selected ${level} level. Let's design a URL shortener. How would you start?`}]);
  const [input, setInput] = useState("");

  const send = async () => {
    if(!input) return;
    const newMsgs = [...messages, {role:"user", content:input}];
    setMessages(newMsgs as any);
    setInput("");
    setMessages([...newMsgs, {role:"assistant", content:"Great approach! How would you handle database scaling for 1M URLs? What about caching?"}] as any);
  };

  return (
    <div style={{padding:20, maxWidth:800, margin:"0 auto", fontFamily:"sans-serif"}}>
      <h1>Mock Interview - {level.toUpperCase()}</h1>
      <p>AI Interviewer for System Design</p>
      <div style={{border:"1px solid #ddd", height:400, overflowY:"auto", padding:10, margin:"20px 0", background:"#f9f9f9"}}>
        {messages.map((m,i)=>(
          <div key={i} style={{margin:10, padding:10, borderRadius:8, background: m.role==="user"?"#000":"#fff", color: m.role==="user"?"#fff":"#000", textAlign: m.role==="user"?"right":"left", marginLeft: m.role==="user"?"50px":"0", marginRight: m.role==="user"?"0":"50px"}}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>
      <div style={{display:"flex", gap:10}}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Type your answer..." style={{flex:1, padding:12, border:"1px solid #ccc", borderRadius:6}} />
        <button onClick={send} style={{padding:"12px 24px", background:"black", color:"white", borderRadius:6, border:"none", cursor:"pointer"}}>Send</button>
      </div>
      <br/><br/>
      <a href="/" style={{color:"blue"}}>← Back to Home</a>
    </div>
  );
}

export default function InterviewPage() {
  return (
    <Suspense fallback={<div style={{padding:20}}>Loading interview...</div>}>
      <InterviewContent />
    </Suspense>
  );
}