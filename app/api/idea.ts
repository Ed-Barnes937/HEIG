"use server";

import ideaService from "@/utils/supabase/services/ideaService";
import { Enums, TablesInsert } from "@/utils/supabase/types";
import { encodedRedirect } from "@/utils/utils";
import { z } from "zod";

const ideaSchema = z.custom<TablesInsert<"ideas">>();

export const uploadItem = async (prevData: unknown, formData: FormData) => {
  const ideaText = formData.get("idea");
  const type = formData.get("type") ?? ("basic" satisfies Enums<"idea_type">);
  const equipmentIds = formData.getAll("equipment_ids");
  const tags = formData.getAll("tags");
  const theme = formData.getAll("theme");

  const idea = {
    idea: ideaText,
    type,
    tags,
    theme,
  };
  const parsedIdea = ideaSchema.safeParse(idea);

  const parsedEquipmentIds = z.array(z.string()).safeParse(equipmentIds);

  if (!parsedIdea.success || !parsedEquipmentIds.success) {
    let errors = [];

    if (!parsedIdea.success)
      errors.push(parsedIdea.error.flatten().fieldErrors);
    if (!parsedEquipmentIds.success)
      errors.push(parsedEquipmentIds.error.flatten().fieldErrors);

    return { errors };
  }

  try {
    const item = await ideaService.uploadIdea(
      parsedIdea.data,
      parsedEquipmentIds.data,
    );

    encodedRedirect("success", "/admin", "Upload successful");
  } catch (err) {
    return { data: null, error: err };
  }
};
