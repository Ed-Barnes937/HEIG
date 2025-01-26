import { Badge } from "@/components/ui/badge";
import { H1 } from "@/components/ui/H1";
import { H2 } from "@/components/ui/H2";
import { H3 } from "@/components/ui/H3";
import { createClient } from "@/supabase/utils/server";

export default async function Ideas() {
  const supabase = await createClient();
  const { data: ideas } = await supabase.from("Ideas").select();

  if (!ideas) {
    return <div>No ideas</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 items-center border border-white p-3 rounded-md">
      <H3>Tags:</H3>
      <div className="flex gap-2">
        {ideas[0].tags?.map((tag) => <Badge key={tag}>{tag}</Badge>)}
      </div>
      <H1>Idea:</H1>
      <div>{ideas[0].idea}</div>
    </div>
  );
}
