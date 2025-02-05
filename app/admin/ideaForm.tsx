"use client";
import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";
import { uploadItem } from "../api/idea";
import { Textarea } from "@/components/ui/textarea";
import { FormMessage } from "@/components/form-message";
import { Input } from "@/components/ui/input";
import { MultiSelect, Option } from "@/components/ui/multi-select";

const IdeaForm = ({ equipmentList }: { equipmentList: Option[] }) => {
  const [state, formAction] = useActionState(uploadItem, undefined);

  return (
    <form
      action={formAction}
      className="flex flex-col min-w-64 max-w-64 mx-auto"
    >
      <h1 className="text-2xl font-medium">New idea!</h1>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="idea">Idea</Label>
        <Textarea name="idea" placeholder="Your brilliant idea..." required />

        <Label htmlFor="age_range">age_range</Label>
        <Input name="age_range" type="number" disabled />
        <Label htmlFor="equipment_required">equipment_required</Label>
        <MultiSelect
          values={equipmentList}
          name="equipment_ids"
          isLoading={false}
        />
        <Label htmlFor="tags">tags</Label>
        <Input name="tags" placeholder="tags" disabled />
        <Label htmlFor="theme">theme</Label>
        <Input name="theme" placeholder="theme" disabled />
        <Label htmlFor="type">type</Label>
        <Input name="type" placeholder="type" disabled />

        <SubmitButton pendingText="Uploading...">Upload</SubmitButton>
        {state?.errors &&
          Object.values(state.errors).map((error) => (
            <FormMessage message={{ error: error[0] }} />
          ))}
      </div>
    </form>
  );
};

export default IdeaForm;
