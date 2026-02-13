"useEffect";
"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [question, setQuestion] = useState("");
const [answer, setAnswer] = useState("");
const [source, setSource] = useState("");
const [docs, setDocs] = useState<any[]>([]);
const [snippet, setSnippet] = useState("");


const handleAsk = async () => {
  const response = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  const data = await response.json();
  setAnswer(data.answer);
setSource(data.source || "");
setSnippet(data.snippet || "");

};

useEffect(() => {
  const fetchDocs = async () => {
    const res = await fetch("/api/docs");
    const data = await res.json();
    setDocs(data);
  };
  fetchDocs();
}, []);



  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log(data);
  alert("Upload complete");
};


  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">
        Private Knowledge Q&A
      </h1>

      <div className="space-y-6">

        <div className="p-6 bg-white shadow rounded">
          <h2 className="font-semibold mb-2">1. Upload Document</h2>
          <input type="file" onChange={handleUpload} />
        </div>
        <div className="p-6 bg-white shadow rounded">
  <h2 className="font-semibold mb-2">Uploaded Documents</h2>

  {docs.length === 0 && <p>No documents yet</p>}

  <ul className="list-disc pl-5">
  {docs.map((doc, index) => (
  <li key={index}>{doc}</li>
))}

  </ul>
</div>


        <div className="p-6 bg-white shadow rounded">
          <h2 className="font-semibold mb-2">2. Ask Question</h2>

          <input
            type="text"
            placeholder="Ask something..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full border p-2 rounded"
          />

          <button
            onClick={handleAsk}
            className="mt-3 px-4 py-2 bg-black text-white rounded"
          >
            Ask
          </button>
          {answer && (
  <div className="mt-4 p-4 bg-green-50 border rounded">
    <p className="font-semibold">Answer:</p>
    <p>{answer}</p>

   {source && (
  <p className="text-sm text-gray-600 mt-2">
    Source: {source}
  </p>
)}

{snippet && (
  <p className="text-xs text-gray-500 mt-1">
    From document: {snippet.slice(0,120)}...
  </p>
)}

  </div>
)}

        </div>

      </div>
    </main>
  );
}
