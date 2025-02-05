import { Enums } from "./types";

type OptionArrayFromUnion<T extends string> = {
  [K in T]: { value: K; label: string };
}[T][];

export const ideaTypeOptions: OptionArrayFromUnion<Enums<"idea_type">> = [
  { value: "basic", label: "Basic" },
  { value: "collaboration", label: "Collab" },
  { value: "sponsored", label: "Sponsored" },
];

export const ageRangeOptions: OptionArrayFromUnion<Enums<"idea_age_range">> = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "college", label: "College" },
];
