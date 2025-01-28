import { RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface RefreshIdeaButtonProps {
  handleReroll: () => void;
  rerolls: number;
  isLoggedIn: boolean;
}

/**
 * Button to refresh ideas. If not logged in will redirect to the sign in page
 * Also displays the number of rerolls left below the button
 */
const RefreshIdeaButton = ({
  handleReroll,
  rerolls,
  isLoggedIn,
}: RefreshIdeaButtonProps) => {
  const getStatusText = () => {
    if (!isLoggedIn) return "Sign up to get more ideas";
    return rerolls > 0
      ? `${rerolls} free re-rolls left`
      : "No free re-rolls left. Upgrade for more!";
  };

  const buttonContent = (
    <>
      <RefreshCcw className="mr-2 h-4 w-4" />
      New Idea
    </>
  );

  return (
    <div className="flex flex-col">
      {isLoggedIn ? (
        <Button
          aria-label={getStatusText()}
          title={getStatusText()}
          size={"lg"}
          variant={"outline"}
          onClick={handleReroll}
        >
          {buttonContent}
        </Button>
      ) : (
        <Button
          asChild
          aria-label={getStatusText()}
          title={getStatusText()}
          size={"lg"}
          variant={"outline"}
        >
          <Link href="/sign-in">{buttonContent}</Link>
        </Button>
      )}
      <p className="text-sm text-gray-500">{getStatusText()}</p>
    </div>
  );
};

export default RefreshIdeaButton;
