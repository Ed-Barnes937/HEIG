import { Suspense } from "react";
import equipmentService from "../_services/equipmentService";
import IdeaForm from "./ideaForm";

export default async function Admin() {
  const equipment = await equipmentService.getEquipment();

  const equipmentOptions = equipment.map((thing) => ({
    value: thing.id,
    label: thing.name,
  }));

  return (
    <Suspense>
      <IdeaForm equipmentList={equipmentOptions} />
    </Suspense>
  );
}
