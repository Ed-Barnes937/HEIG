import { IdeaCard } from "@/components/IdeaCard";
import { H1 } from "@/components/ui/H1";
import { Lightbulb } from "lucide-react";
import userService from "./_services/userService";
import ideaService from "./_services/ideaService";

export default async function Home() {
  const isLoggedIn = await userService.isLoggedIn();
  const profile = await userService.getUserProfile();
  const idea = await ideaService.getDailyIdea();

  const tokenCount = profile?.tokens || 0;
  const freeRerollCount = profile?.free_roles || 0;

  return (
    <div className="h-full container mx-auto px-4 py-8">
      <div className="flex flex-col items-center text-center space-y-6">
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
        Ï
      </div>
    </div>
  );
}
