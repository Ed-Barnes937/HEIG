import { Tables } from "./types";

export type CompleteIdea = Tables<"ideas"> & {
  equipment: Tables<"equipment">[];
};
