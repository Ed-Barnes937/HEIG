import { IdeaCard } from "@/components/IdeaCard";
import { createClient } from "@/supabase/utils/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: ideas } = await supabase.from("Ideas").select("*");

  if (!ideas) {
    return <div>No ideas</div>;
  }

  const ideaData = ideas[0];

  return <IdeaCard idea={ideaData?.idea || ""} user={user} />;
}
