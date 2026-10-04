import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { requestPasswordReset } from "@/lib/auth/actions";

export default async function ForgotPasswordPage({ searchParams }: { searchParams: Promise<{ error?: string; notice?: string }> }) {
    const params = await searchParams;

    return (
        <AuthShell title="Reset your password" lede="We'll email you a link to choose a new one.">
            <form className="stack narrow" action={requestPasswordReset}>
                {params.error ? <p>{params.error}</p> : null}
                {params.notice ? <p className="muted">{params.notice}</p> : null}
                <label className="stack">
                    <span>Email</span>
                    <Input name="email" type="email" autoComplete="email" required />
                </label>
                <div className="row">
                    <Button type="submit">Send reset link</Button>
                    <Button variant="secondary" href="/login">
                        Log in
                    </Button>
                </div>
            </form>
        </AuthShell>
    );
}
