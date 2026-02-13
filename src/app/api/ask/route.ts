import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    const { data } = await supabase
      .from("documents")
      .select("filename, content");

    const context = data?.map((d: any) => d.content).join("\n") || "";

    // 🔹 First get AI completion
    const completion = await openai.chat.completions.create({
      model: "stepfun/step-3.5-flash:free",
      messages: [
        {
          role: "system",
          content: "Answer using only the provided context.",
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion: ${question}`,
        },
      ],
    });

    const answerText = completion.choices[0].message.content;

 const safeAnswer = (answerText || "").toLowerCase();

const answerWords = safeAnswer
  .split(/\W+/)
  .filter((w: string) => w.length > 3);

const matchedDoc = data?.find((doc: any) => {
  const docText = doc.content.toLowerCase();
  return answerWords.some((word: string) =>
    docText.includes(word)
  );
});



    return NextResponse.json({
      answer: answerText,
      source: matchedDoc?.filename || "Unknown",
      snippet: matchedDoc?.content || "",
    });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
