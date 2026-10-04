import { createClient } from "@/lib/supabase/server";

export async function currentProfile() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getClaims();
    const userId = data?.claims.sub;
    if (error || !userId) return null;

    const profile = await supabase.from("profiles").select("id, email, created_at").eq("id", userId).maybeSingle();
    if (profile.error) {
        throw new Error(profile.error.message);
    }
    if (!profile.data) {
        throw new Error("This account has no profile row.");
    }
    return profile.data;
}
