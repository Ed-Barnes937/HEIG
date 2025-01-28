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
import type { User } from "@supabase/supabase-js";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/supabase/utils/client";

interface IdeaCardProps {
  idea: string;
  error?: string;
  handleReroll?: () => void;
  user: User | null;
}

export const IdeaCard = ({
  idea,
  error,
  handleReroll = () => {},
  user,
}: IdeaCardProps) => {
  const isLoggedIn = !!user;

  const supabase = createClient();
  const [freeRoles, setFreeRoles] = useState<number>(0);

  const getFreeRoles = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select("free_roles")
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.error(error);
        throw error;
      }

      if (data) {
        setFreeRoles(data.free_roles || 0);
      } else {
        return 0;
      }
    } catch (error) {
      alert("Error loading free roles");
    }
  }, [user, supabase]);

  useEffect(() => {
    getFreeRoles();
  }, [user, getFreeRoles]);

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex justify-between gap-10">
          <div className="flex flex-col gap-2">
            <CardTitle>Today's Idea</CardTitle>
            {isLoggedIn &&
              (freeRoles > 0 ? (
                <p className="text-sm text-gray-500">
                  {freeRoles} free re-rolls left
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
              title={"Get New Idea"}
              size={"icon"}
            >
              <Dices />
            </Button>
          )}
          {!isLoggedIn && (
            <Button
              asChild
              size={"icon"}
              aria-label={"Sign up to generate more ideas"}
              title={"Sign up to generate more ideas"}
            >
              <Link href={"/sign-in"}>
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
