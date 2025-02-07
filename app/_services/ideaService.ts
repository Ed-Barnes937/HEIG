import { createClient } from "@/supabase/utils/server";
import { Tables, TablesInsert } from "@/supabase/utils/types";

async function getAllIdeas() {
  "use server";
  const supabase = await createClient();
  const { data: ideas } = await supabase
    .from("ideas")
    .select("*, equipment(*)");

  if (!ideas) {
    return [];
  }

  return ideas;
}

async function getDailyIdea() {
  "use server";
  const supabase = await createClient();
  const { data: ideas } = await supabase
    .from("ideas")
    .select("*, equipment(*)");

  if (!ideas) {
    return null;
  }

  return ideas[0];
}

async function rerollIdea(userId: string) {
  "use server";
  const supabase = await createClient();
  const { data: ideas } = await supabase.from("ideas").select("*");

  if (!ideas) {
    return [];
  }
  return ideas[1];
}

const uploadIdea = async (
  newIdea: TablesInsert<"ideas">,
  equipmentList: Tables<"equipment">["id"][],
) => {
  "use server";

  const supabase = await createClient();
  const { data: idea, error: uploadIdeaError } = await supabase
    .from("ideas")
    .insert([newIdea])
    .select()
    .single();

  if (uploadIdeaError)
    return {
      error: `Failed to upload new idea with error ${uploadIdeaError.message}`,
    };

  if (equipmentList.length > 0) {
    const junctionRows = equipmentList.map((id) => ({
      idea_id: idea.id,
      equipment_id: id,
    }));

    const { error: equipmentError } = await supabase
      .from("idea_equipment")
      .insert(junctionRows);

    if (equipmentError)
      return {
        error: `Failed to link idea to equipment with error: ${equipmentError.message}`,
      };
  }

  return { data: idea, error: null };
};

export default {
  getAllIdeas,
  getDailyIdea,
  rerollIdea,
  uploadIdea,
};
