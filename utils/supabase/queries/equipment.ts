import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../types";

export const getEquipmentQuery = (supabase: SupabaseClient<Database>) =>
  supabase.from("equipment").select("*");
