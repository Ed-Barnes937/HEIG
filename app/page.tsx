import { IdeaCard } from "@/components/IdeaCard";
import { H1 } from "@/components/ui/H1";
import { createClient } from "@/supabase/utils/server";
import { Lightbulb } from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: ideas } = await supabase.from("ideas").select("*");
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id || "")
    .single();

  if (!ideas) {
    return <div>No ideas</div>;
  }

  const ideaData = ideas[0];

  const tokenCount = profile?.tokens || 0;
  const freeRerollCount = profile?.free_roles || 0;

  return (
    <div className="h-full container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="flex items-center space-x-4">
          <Lightbulb className="w-10 h-10" />
          <H1>Today's Learning Adventure</H1>
        </div>
        <IdeaCard
          idea={ideaData}
          isLoggedIn={!!user}
          rerolls={tokenCount + freeRerollCount}
        />
      </div>
    </div>
  );
}
