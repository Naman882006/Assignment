import { supabase } from "./supabase";

export async function matchDocuments(embedding: number[]) {
  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: embedding,
    match_count: 3,
  });

  if (error) throw error;

  return data;
}
