import { createClient } from "@/supabase/utils/server";

async function getDailyIdea() {
    "use server";
    const supabase = await createClient();
    const { data: ideas } = await supabase.from("ideas").select("*");

    if (!ideas) {
        return [];
    }
    return ideas[0];
}

async function rerollIdea(userId: string) {
    "use server";
    const supabase = await createClient();
    const { data: ideas } = await supabase.from("ideas").select("*");

    if (!ideas) {
        return [];
    }
    return ideas[1];
}

export default {
    getDailyIdea,
    rerollIdea,
};
