"use server";

import { encodedRedirect } from "@/utils/utils";
import ideaService from "../_services/ideaService";
import { z } from "zod";
import { TablesInsert } from "@/supabase/utils/types";

const ideaSchema = z.custom<TablesInsert<"ideas">>();

export const uploadItem = async (prevData: unknown, formData: FormData) => {
  const idea = Object.fromEntries(formData);
  const parsedIdea = ideaSchema.safeParse(idea);
  const equipmentIds = formData.getAll("equipment_ids");
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
