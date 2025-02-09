import type { SupabaseClient, QueryData } from "@supabase/supabase-js";
import { Database } from "../types";

export const ideaQuery = (supabase: SupabaseClient<Database>) =>
  supabase.from("ideas").select("*");

export const ideaWithEquipmentQuery = (supabase: SupabaseClient<Database>) =>
  supabase.from("ideas").select("*, equipment(*)");

export type IdeaWithEquipment = QueryData<
  ReturnType<typeof ideaWithEquipmentQuery>
>;
