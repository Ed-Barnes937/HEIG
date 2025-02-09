import { getEquipmentQuery } from "../queries/equipment";
import { createClient } from "../server";

const getEquipment = async () => {
  "use server";

  const supabase = await createClient();

  const equipmentQuery = await getEquipmentQuery(supabase);
  if (equipmentQuery.error) throw equipmentQuery.error;
  return equipmentQuery.data;
};

export default {
  getEquipment,
};
