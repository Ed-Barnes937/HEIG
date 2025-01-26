import { createClient } from "@/supabase/utils/server";

export default async function Ideas() {
  const supabase = await createClient();
  const { data: ideas } = await supabase.from("Ideas").select();

  return <pre>{JSON.stringify(ideas, null, 2)}</pre>;
}
