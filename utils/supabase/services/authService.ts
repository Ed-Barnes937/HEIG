import { createClient } from "../server";

interface SignUpProps {
  email: string;
  password: string;
  origin: string | null;
  nickname?: string;
}
const signUp = async ({ email, password, origin, nickname }: SignUpProps) => {
  "use server";
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        nickname,
      },
    },
  });

  return { data, error };
};

interface SignInProps {
  email: string;
  password: string;
}
const signIn = async ({ email, password }: SignInProps) => {
  "use server";
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

const signOut = async () => {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
};

interface ForgotPasswordProps {
  email: string;
  redirect: string;
}
const forgotPassword = async ({ email, redirect }: ForgotPasswordProps) => {
  "use server";
  const supabase = await createClient();

  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: redirect,
  });
  return { data, error };
};

interface ResetPasswordProps {
  password: string;
}
const resetPassword = async ({ password }: ResetPasswordProps) => {
  "use server";
  const supabase = await createClient();
  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });
  return { data, error };
};

export default {
  signUp,
  signIn,
  signOut,
  forgotPassword,
  resetPassword,
};
