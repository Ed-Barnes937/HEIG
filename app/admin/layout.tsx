import { H1 } from "@/components/ui/H1";
import { Button } from "@/components/ui/button";
import userService from "@/utils/supabase/services/userService";
import Link from "next/link";

const adminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const isAdmin = await userService.isAdmin();

  if (!isAdmin) {
    return (
      <div className="flex flex-col space-y-4 px-4 py-16 bg-background/95 text-center container mx-auto rounded-lg">
        <H1>Not authorised</H1>
        <p>You are not authorised to access this page</p>
        <div>
          <Button asChild>
            <Link href="/">Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background/95 container mx-auto p-8 rounded-lg">
      {children}
    </div>
  );
};

export default adminLayout;
