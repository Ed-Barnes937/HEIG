import { Suspense } from "react";
import IdeaForm from "./ideaForm";
import equipmentService from "@/app/_services/equipmentService";
import { ageRangeOptions, ideaTypeOptions } from "@/supabase/utils/enumOptions";

export default async function newIdea() {
  const equipment = await equipmentService.getEquipment();

  const equipmentOptions = equipment.map((thing) => ({
    value: thing.id,
    label: thing.name,
  }));

  return (
    <Suspense>
      <IdeaForm
        equipmentOptions={equipmentOptions}
        tagOptions={[]}
        themeOptions={[]}
        typeOptions={ideaTypeOptions}
        ageOptions={ageRangeOptions}
      />
    </Suspense>
  );
}
