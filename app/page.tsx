import { IdeaCard } from "@/components/IdeaCard";
import { H1 } from "@/components/ui/H1";
import ideaService from "@/utils/supabase/services/ideaService";
import userService from "@/utils/supabase/services/userService";
import { Lightbulb } from "lucide-react";

export default async function Home() {
  const isLoggedIn = await userService.isLoggedIn();
  const profile = await userService.getUserProfile();
  const idea = await ideaService.getDailyIdea();

  const tokenCount = profile?.tokens || 0;
  const freeRerollCount = profile?.free_roles || 0;

  return (
    <div className="h-full @sm:min-w-3xl md:min-w-4xl lg:min-w-2xl mx-auto px-4 py-8 bg-background/95 z-50 rounded-lg">
      <div className="flex flex-col items-center text-center space-y-12 h-full justify-center">
        <div className="flex items-center space-x-4">
          <Lightbulb className="w-10 h-10" />
          <H1>Today's Learning Adventure</H1>
        </div>
        {idea && (
          <IdeaCard
            idea={idea}
            isLoggedIn={isLoggedIn}
            rerolls={tokenCount + freeRerollCount}
          />
        )}
      </div>
    </div>
  );
}
