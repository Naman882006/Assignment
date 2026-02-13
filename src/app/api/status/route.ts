import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    backend: "ok",
    database: "ok",
    llm: "ok"
  });
}
