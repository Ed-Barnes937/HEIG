"use server";

import { encodedRedirect } from "@/utils/utils";
import ideaService from "../_services/ideaService";
import { z } from "zod";
import { Tables, TablesInsert } from "@/supabase/utils/types";

const ideaSchema = z.custom<TablesInsert<"ideas">>();

export const uploadItem = async (prevData: unknown, formData: FormData) => {
  const ideaText = formData.get("idea");
  const type = formData.get("type");
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

  const { error } = await ideaService.uploadIdea(
    parsedIdea.data,
    parsedEquipmentIds.data,
  );

  if (error) {
    return { errors: [error] };
  }

  encodedRedirect("success", "/admin", "Upload successful");
};
