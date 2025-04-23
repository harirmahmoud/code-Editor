// src/CodeRunner.jsx
import React, { useState } from "react";
import axios from "axios";

const API_URL = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true";

const headers = {
  "content-type": "application/json",
  "X-RapidAPI-Key": "936f1902d0msh22916dd7eb84120p1a31acjsnd17784613993", // ← Replace with your key
  "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com"
};

export default function CodeRunner() {
  const [code, setCode] = useState("print('Hello, world!')");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const runCode = async () => {
    setLoading(true);
    setOutput("");


      const response = await axios.post(
        API_URL,
        {
          source_code: code,
          language_id: 71 // Python 3
        },
        { headers }
      ).then(res=>{console.log(res)
        setOutput(
        res.data.stdout ||
        "No output"
      );
      }).catch(err=>{console.log(err)
setOutput("Execution failed: " + err.message);

      });

      
    
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: "auto" }}>
      <h2>Judge0 Code Runner</h2>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{ width: "100%", height: 200, fontFamily: "monospace", fontSize: 16 }}
      />
      <br />
      <button onClick={runCode} disabled={loading} style={{ marginTop: 10 }}>
        {loading ? "Running..." : "Run Code"}
      </button>
      <pre style={{ marginTop: 20, background: "#f1f1f1", padding: 10 ,color:"black"}}>
        {output || "Output will appear here..."}
      </pre>
    </div>
  );
}
