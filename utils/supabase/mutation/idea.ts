import type { SupabaseClient } from "@supabase/supabase-js";
import { Database, TablesInsert } from "../types";

export const uploadIdeaMutation = (
  supabase: SupabaseClient<Database>,
  newIdea: TablesInsert<"ideas">,
) => supabase.from("ideas").insert([newIdea]).select().single();

export const uploadIdeaEquipmentMapMutation = (
  supabase: SupabaseClient<Database>,
  equipmentMap: Record<"idea_id" | "equipment_id", string>[],
) => supabase.from("idea_equipment").insert(equipmentMap);
