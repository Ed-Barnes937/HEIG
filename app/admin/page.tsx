import { Suspense } from "react";
import equipmentService from "../_services/equipmentService";
import IdeaForm from "./ideaForm";
import { ageRangeOptions, ideaTypeOptions } from "@/supabase/utils/enumOptions";

export default async function Admin() {
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
