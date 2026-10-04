import { Differentiators } from "@/components/landing/differentiators";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

const links = [
    { href: "/login", label: "Log in" },
    { href: "#how", label: "See how it works", variant: "secondary" as const },
    { href: "/signup", label: "Verify your first list — free", variant: "primary" as const },
];

export default function HomePage() {
    return (
        <main className="sheet">
            <SiteHeader links={links} />
            <section className="block lead">
                <p className="muted measure">Email verification that tells you the truth.</p>
                <h1>We tell you what&apos;s actually deliverable.</h1>
                <p className="measure">
                    Deadletter checks every address with a real SMTP connection — no guessing from syntax alone.
                    If we can&apos;t confirm it, we say so, and you don&apos;t pay for it.
                </p>
                <div className="row">
                    <Button href="/signup">Verify your first list — free</Button>
                    <Button variant="secondary" href="#how">See how it works</Button>
                </div>
            </section>
            <section className="block" id="how">
                <p className="measure">
                    Bad addresses cost you more than a bounce. They cost you sender reputation.
                    One cleaned list protects every campaign after it.
                </p>
            </section>
            <Differentiators />
        </main>
    );
}
