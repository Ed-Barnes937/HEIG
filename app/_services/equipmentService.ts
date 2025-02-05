import { createClient } from "@/supabase/utils/server";
import { Database, Tables } from "@/supabase/utils/types";

const getEquipment = async () => {
  "use server";

  const supabase = await createClient();

  const { data, error } = await supabase.from("equipment").select("*");
  if (error)
    throw Error(`Failed to fetch equipment with error: ${error.message}`);
  return data;
};

const getEquipmentForIdea = async (ideaId: Tables<"ideas">["id"]) => {
  "use server";

  const supabase = await createClient();

  const { data, error } = await supabase.from("equipment").select("*");
  if (error)
    throw Error(`Failed to fetch equipment with error: ${error.message}`);

  return data;
};

export default {
  getEquipment,
  getEquipmentForIdea,
};
