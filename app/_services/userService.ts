import { createClient } from "@/supabase/utils/server";

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

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile || profileError) {
    throw new Error("Error fetching profile");
  }

  return profile;
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
