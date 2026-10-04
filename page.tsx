"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function InterviewPage() {
  const searchParams = useSearchParams();
  const level = searchParams.get("level") || "senior";
  const [messages, setMessages] = useState([{role:"assistant", content:`Hello! You selected ${level} level. Let's start! Design a URL shortener.`}]);
  const [input, setInput] = useState("");
  
  const send = async () => {
    if(!input) return;
    const newMsgs = [...messages, {role:"user", content:input}];
    setMessages(newMsgs as any);
    setInput("");
    try {
      const res = await fetch("/api/interview", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ level, messages: newMsgs })
      });
      const data = await res.json();
      setMessages([...newMsgs, {role:"assistant", content: data.reply || "Good! Tell me more about scalability."}] as any);
    } catch(e){
      setMessages([...newMsgs, {role:"assistant", content:"Nice! How would you handle scaling to 1M users?"}] as any);
    }
  };

  return (
    <div style={{padding:20, maxWidth:800, margin:"0 auto"}}>
      <h1>Interview - {level.toUpperCase()}</h1>
      <div style={{border:"1px solid #ddd", height:400, overflowY:"auto", padding:10, margin:"20px 0"}}>
        {messages.map((m,i)=>(
          <div key={i} style={{margin:10, textAlign: m.role==="user"?"right":"left"}}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
      </div>
      <div style={{display:"flex", gap:10}}>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type your answer..." style={{flex:1, padding:10}} />
        <button onClick={send} style={{padding:"10px 20px", background:"black", color:"white"}}>Send</button>
      </div>
      <br/>
      <a href="/">← Back to Home</a>
    </div>
  );
}