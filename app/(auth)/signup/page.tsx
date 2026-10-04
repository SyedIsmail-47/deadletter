import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUp } from "@/lib/auth/actions";

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ error?: string; notice?: string }> }) {
    const params = await searchParams;

    return (
        <AuthShell title="Create an account" lede="You'll use this to see your lists and results.">
            <form className="stack narrow" action={signUp}>
                {params.error ? <p>{params.error}</p> : null}
                {params.notice ? <p className="muted">{params.notice}</p> : null}
                <label className="stack">
                    <span>Email</span>
                    <Input name="email" type="email" autoComplete="email" required />
                </label>
                <label className="stack">
                    <span>Password</span>
                    <Input name="password" type="password" autoComplete="new-password" required minLength={6} />
                </label>
                <div className="row">
                    <Button type="submit">Create account</Button>
                    <Button variant="secondary" href="/login">
                        Log in
                    </Button>
                </div>
            </form>
        </AuthShell>
    );
}
