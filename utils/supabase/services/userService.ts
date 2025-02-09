import { userProfileQuery } from "../queries/user";
import { createClient } from "../server";

const getUserProfile = async () => {
  "use server";
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (!user || userError) {
    return null;
  }

  const profileQuery = await userProfileQuery(supabase, user.id);

  if (!profileQuery.data || profileQuery.error) {
    throw new Error("Error fetching profile");
  }

  return profileQuery.data;
};

const isLoggedIn = async () => {
  "use server";
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user !== null;
};

const isAdmin = async () => {
  "use server";
  const profile = await getUserProfile();

  return profile?.subscription_tier === "admin";
};

export default {
  getUserProfile,
  isLoggedIn,
  isAdmin,
};
