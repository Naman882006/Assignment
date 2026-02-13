import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const text = await file.text();

    // simple chunking
    const chunks = text.match(/.{1,500}/g) || [];

    for (const chunk of chunks) {
      await supabase.from("documents").insert({
        filename: file.name,
        content: chunk,
        embedding: null,
      });
    }

    return NextResponse.json({
      success: true,
      message: "File stored (without embeddings)",
    });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Upload failed", details: err.message },
      { status: 500 }
    );
  }
}
