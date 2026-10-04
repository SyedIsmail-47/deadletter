import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { logIn } from "@/lib/auth/actions";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string; notice?: string; next?: string }>;
}) {
    const params = await searchParams;
    const next = params.next && params.next.startsWith("/") && !params.next.startsWith("//") ? params.next : "/dashboard";

    return (
        <AuthShell title="Log in" lede="Use the email and password for your Deadletter account.">
            <form className="stack narrow" action={logIn}>
                <input type="hidden" name="next" value={next} />
                {params.error ? <p>{params.error}</p> : null}
                {params.notice ? <p className="muted">{params.notice}</p> : null}
                <label className="stack">
                    <span>Email</span>
                    <Input name="email" type="email" autoComplete="email" required />
                </label>
                <label className="stack">
                    <span>Password</span>
                    <Input name="password" type="password" autoComplete="current-password" required minLength={6} />
                </label>
                <div className="row">
                    <Button type="submit">Log in</Button>
                    <Button variant="secondary" href="/forgot-password">
                        Reset password
                    </Button>
                </div>
            </form>
        </AuthShell>
    );
}
