import { signOutAction } from "@/app/api/auth";
import Link from "next/link";
import { Button } from "./ui/button";
import userService from "@/utils/supabase/services/userService";

export default async function AuthButton() {
  const user = await userService.getUserProfile();
  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.nickname}!
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
