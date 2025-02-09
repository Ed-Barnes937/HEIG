import { Suspense } from "react";
import IdeaForm from "./ideaForm";
import { ageRangeOptions, ideaTypeOptions } from "@/utils/supabase/enumOptions";
import equipmentService from "@/utils/supabase/services/equipmentService";

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
