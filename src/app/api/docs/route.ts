import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data } = await supabase
    .from("documents")
    .select("filename");

    
  const uniqueFiles = Array.from(
    new Set(data?.map((d: any) => d.filename))
  );

  return NextResponse.json(uniqueFiles);
}
