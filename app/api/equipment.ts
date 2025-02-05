import equipmentService from "../_services/equipmentService";

const fetchEquipment = async () => {
  "use server";

  try {
    const equipment = await equipmentService.getEquipment();
    return {
      data: equipment,
      error: null,
    };
  } catch (err) {
    console.error("error in fetchEquipmentAction", err);
    return {
      data: null,
      error: err instanceof Error ? err.message : "Failed to fetch equipment",
    };
  }
};

export { fetchEquipment };
