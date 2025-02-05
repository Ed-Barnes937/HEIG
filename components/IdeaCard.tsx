"use client";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import type { Tables } from "@/supabase/utils/types";
import RefreshIdeaButton from "./RefreshIdeaButton";

interface IdeaCardProps {
  idea: Tables<"ideas">;
  error?: string;
  handleReroll?: () => void;
  rerolls: number;
  isLoggedIn: boolean;
}

export const IdeaCard = ({
  idea,
  error,
  handleReroll = () => {},
  rerolls = 0,
  isLoggedIn = false,
}: IdeaCardProps) => (
  <Card className="w-full max-w-2xl">
    <CardHeader>
      {idea.tags && (
        <div className="flex flex-wrap space-x-2 justify-start">
          {idea.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </CardHeader>
    <CardContent>
      {error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        <p className="text-lg mb-4">{idea.idea}</p>
      )}
      {/* {idea.equipment_required && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">
            You'll need:
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {idea.equipment_required.map((item) => (
              <span
                key={item}
                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )} */}
    </CardContent>
    <CardFooter className="justify-end">
      <RefreshIdeaButton
        handleReroll={handleReroll}
        rerolls={rerolls}
        isLoggedIn={isLoggedIn}
      />
    </CardFooter>
  </Card>
);
