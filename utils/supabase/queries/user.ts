import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types";

export const userProfileQuery = (
  supabase: SupabaseClient<Database>,
  userId: string,
) => supabase.from("profiles").select("*").eq("id", userId).single();
