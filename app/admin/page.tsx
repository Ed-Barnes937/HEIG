import { IdeaTable } from "@/components/admin/IdeaTable/IdeaTable";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ideaService from "@/utils/supabase/services/ideaService";

export default async function Admin() {
  const ideas = await ideaService.getAllIdeas();

  return (
    <div className="w-full">
      <Suspense>
        <IdeaTable ideas={ideas} />
      </Suspense>
      <div className="flex justify-end">
        <Button asChild>
          <Link href={"admin/new"}>New Idea!</Link>
        </Button>
      </div>
    </div>
  );
}
