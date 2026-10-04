"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

function failure(message: string) {
    const text = message.toLowerCase();
    if (text.includes("invalid login credentials")) return "That email and password don't match.";
    if (text.includes("already registered")) return "An account with that email already exists.";
    if (text.includes("password")) return "Use at least 6 characters for the password.";
    if (text.includes("valid email") || text.includes("unable to validate email")) return "Enter a valid email address.";
    return "Check the email and password, then try again.";
}

async function siteOrigin() {
    const headerList = await headers();
    const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
    const proto = headerList.get("x-forwarded-proto") ?? "http";
    return `${proto}://${host}`;
}

function safeNext(value: string | null) {
    if (value && value.startsWith("/") && !value.startsWith("//")) return value;
    return "/dashboard";
}

export async function signUp(formData: FormData) {
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const supabase = await createClient();
    const origin = await siteOrigin();
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
        },
    });

    if (error) redirect(`/signup?error=${encodeURIComponent(failure(error.message))}`);
    if (data.session) redirect("/dashboard");
    redirect("/signup?notice=Check your inbox and confirm the email, then log in.");
}

export async function logIn(formData: FormData) {
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const next = safeNext(String(formData.get("next") ?? ""));
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) redirect(`/login?error=${encodeURIComponent(failure(error.message))}&next=${encodeURIComponent(next)}`);
    redirect(next);
}

export async function requestPasswordReset(formData: FormData) {
    const email = String(formData.get("email") ?? "").trim();
    const supabase = await createClient();
    const origin = await siteOrigin();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?next=/reset-password`,
    });
    if (error) redirect(`/forgot-password?error=${encodeURIComponent(failure(error.message))}`);
    redirect("/forgot-password?notice=Check your inbox for a reset link.");
}

export async function updatePassword(formData: FormData) {
    const password = String(formData.get("password") ?? "");
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) redirect(`/reset-password?error=${encodeURIComponent(failure(error.message))}`);
    redirect("/dashboard");
}

export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/");
}
