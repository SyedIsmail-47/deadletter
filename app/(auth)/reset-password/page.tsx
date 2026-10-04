import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updatePassword } from "@/lib/auth/actions";

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
    const params = await searchParams;

    return (
        <AuthShell title="Choose a new password" lede="Open the reset link from your email, then set the password you'll use to log in.">
            <form className="stack narrow" action={updatePassword}>
                {params.error ? <p>{params.error}</p> : null}
                <label className="stack">
                    <span>New password</span>
                    <Input name="password" type="password" autoComplete="new-password" required minLength={6} />
                </label>
                <Button type="submit">Save password</Button>
            </form>
        </AuthShell>
    );
}
