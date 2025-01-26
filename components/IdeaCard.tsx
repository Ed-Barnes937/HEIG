"use client";
import { AlertCircle, Dices } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

interface IdeaCardProps {
  idea: string;
  rerollsLeft?: number;
  error?: string;
  isLoggedIn?: boolean;
  handleReroll?: () => void;
}

export const IdeaCard = ({
  idea,
  error,
  rerollsLeft = 0,
  handleReroll = () => {},
  isLoggedIn = false,
}: IdeaCardProps) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex justify-between gap-10">
          <div className="flex flex-col gap-2">
            <CardTitle>Today's Idea</CardTitle>
            {isLoggedIn &&
              (rerollsLeft > 0 ? (
                <p className="text-sm text-gray-500">
                  {rerollsLeft} free re-rolls left
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  No free re-rolls left. Upgrade for more!
                </p>
              ))}
            {!isLoggedIn && (
              <p className="text-sm text-gray-500">Sign up to get more ideas</p>
            )}
          </div>
          {isLoggedIn && (
            <Button
              onClick={() => handleReroll()}
              aria-label={"Get New Idea"}
              size={"icon"}
            >
              <Dices />
            </Button>
          )}
          {!isLoggedIn && (
            <Button asChild size={"icon"}>
              <Link
                href={"/signup"}
                aria-label={"Sign up to generate more ideas"}
              >
                <Dices />
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          <p className="text-lg mb-4">{idea}</p>
        )}
      </CardContent>
    </Card>
  );
};
