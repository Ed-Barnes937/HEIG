import {
  uploadIdeaEquipmentMapMutation,
  uploadIdeaMutation,
} from "../mutation/idea";
import { IdeaWithEquipment, ideaWithEquipmentQuery } from "../queries/idea";
import { createClient } from "../server";
import { Tables, TablesInsert } from "../types";

async function getAllIdeas() {
  "use server";
  const supabase = await createClient();
  const ideaQuery = await ideaWithEquipmentQuery(supabase);

  if (ideaQuery.error) throw ideaQuery.error;
  const ideas: IdeaWithEquipment = ideaQuery.data;
  return ideas;
}

async function getDailyIdea() {
  "use server";
  const supabase = await createClient();
  const ideaQuery = await ideaWithEquipmentQuery(supabase);

  if (ideaQuery.error) throw ideaQuery.error;
  const ideas: IdeaWithEquipment = ideaQuery.data;

  if (!ideas) {
    return null;
  }

  return ideas[0];
}

async function rerollIdea() {
  "use server";
  const supabase = await createClient();
  const ideaQuery = await ideaWithEquipmentQuery(supabase);

  if (ideaQuery.error) throw ideaQuery.error;
  const ideas: IdeaWithEquipment = ideaQuery.data;

  if (!ideas) {
    return null;
  }

  return ideas[1];
}

const uploadIdea = async (
  newIdea: TablesInsert<"ideas">,
  equipmentList: Tables<"equipment">["id"][],
) => {
  "use server";

  const supabase = await createClient();
  const ideaMutation = await uploadIdeaMutation(supabase, newIdea);

  if (ideaMutation.error) throw ideaMutation.error;

  const idea = ideaMutation.data;
  if (equipmentList.length > 0) {
    const junctionRows = equipmentList.map((id) => ({
      idea_id: idea.id,
      equipment_id: id,
    }));

    const equipmentMutation = await uploadIdeaEquipmentMapMutation(
      supabase,
      junctionRows,
    );

    if (equipmentMutation.error) throw equipmentMutation.error;
  }

  return idea;
};

export default {
  getAllIdeas,
  getDailyIdea,
  rerollIdea,
  uploadIdea,
};
