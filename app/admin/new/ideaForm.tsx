"use client";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { Textarea } from "@/components/ui/textarea";
import { FormMessage } from "@/components/form-message";
import MultiSelect, { Option } from "@/components/ui/multi-select";
import { Enums } from "@/utils/supabase/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadItem } from "@/app/api/idea";

interface IdeaForm {
  equipmentOptions: Option[];
  tagOptions: Option[];
  themeOptions: Option[];
  typeOptions: Option<Enums<"idea_type">>[];
  ageOptions: Option<Enums<"idea_age_range">>[];
}

const IdeaForm = ({
  equipmentOptions,
  tagOptions,
  themeOptions,
  typeOptions,
  ageOptions,
}: IdeaForm) => {
  const [state, formAction] = useActionState(uploadItem, undefined);

  return (
    <form action={formAction} className="flex flex-col mx-auto">
      <h1 className="text-2xl font-medium">New idea!</h1>
      <div className="flex flex-col gap-3 [&>input]:mb-3 mt-8">
        <Label htmlFor="idea">Idea</Label>
        <Textarea
          name="idea"
          placeholder="Your brilliant idea..."
          required
          rows={10}
        />

        <Label htmlFor="age_range">age_range</Label>
        <Select disabled defaultValue={ageOptions[0].value}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select age range" />
          </SelectTrigger>
          <SelectContent>
            {ageOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disable}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label htmlFor="equipment_required">equipment_required</Label>
        <MultiSelect
          options={equipmentOptions}
          name="equipment_ids"
          placeholder="Select Equipment"
        />
        <Label htmlFor="tags">tags</Label>
        <MultiSelect
          options={tagOptions}
          name="tags"
          placeholder="Select Tags"
          disabled
        />
        <Label htmlFor="theme">theme</Label>
        <MultiSelect
          options={themeOptions}
          name="theme"
          placeholder="Select Theme"
          disabled
        />
        <Label htmlFor="type">type</Label>
        <Select disabled defaultValue={typeOptions[0].value}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select idea type" />
          </SelectTrigger>
          <SelectContent>
            {typeOptions.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                disabled={option.disable}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <SubmitButton pendingText="Uploading...">Upload</SubmitButton>
        {state?.errors &&
          state.errors.map((error) => (
            <FormMessage message={{ error: "failed to upload idea" }} />
          ))}
      </div>
    </form>
  );
};

export default IdeaForm;
