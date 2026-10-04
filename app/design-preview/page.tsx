import { Badge, VERDICTS } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Table } from "@/components/ui/table";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Swatches } from "./swatches";

const SAMPLE = [
    { id: "1", email: "ada@example.com", status: "valid" as const, reason: "Mailbox accepted", checked: "2026-10-04 04:12:08" },
    { id: "2", email: "info@example.com", status: "risky" as const, reason: "Shared inbox", checked: "2026-10-04 04:12:09" },
    { id: "3", email: "gone@no-such-domain.invalid", status: "invalid" as const, reason: "No MX records for this domain", checked: "2026-10-04 04:12:09" },
    { id: "4", email: "user@mailinator.com", status: "disposable" as const, reason: "Disposable email domain", checked: "2026-10-04 04:12:10" },
    { id: "5", email: "maybe@slow-mx.test", status: "unknown" as const, reason: "SMTP connection timed out", checked: "2026-10-04 04:12:18" },
];

export default async function DesignPreviewPage({
    searchParams,
}: {
    searchParams: Promise<{ sort?: string }>;
}) {
    const { sort } = await searchParams;
    const rows = sort === "status"
        ? [...SAMPLE].sort((a, b) => a.status.localeCompare(b.status))
        : SAMPLE;

    return (
        <main className="sheet">
            <header className="topbar">
                <a className="brand" href="/design-preview">
                    <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
                        <rect x="3.5" y="8" width="25" height="16" fill="none" stroke="currentColor" strokeWidth="1.75" />
                        <path d="M4 8.5 L16 17 L28 8.5" fill="none" stroke="currentColor" strokeWidth="1.75" />
                        <path d="M7 25 L25 7" fill="none" stroke="currentColor" strokeWidth="1.75" />
                    </svg>
                    Deadletter
                </a>
                <ThemeToggle />
            </header>

            <div className="block lead">
                <h1>Design preview</h1>
                <p className="muted measure">Email verification that tells you the truth.</p>
            </div>

            <section className="block">
                <h2>Type</h2>
                <p className="measure">We tell you what&apos;s actually deliverable.</p>
                <p className="measure">Geist Sans carries the interface. JetBrains Mono is only for data.</p>
                <p className="mono">ada@example.com · 2026-10-04 04:12:08</p>
            </section>

            <section className="block">
                <h2>Color</h2>
                <Swatches />
            </section>

            <section className="block">
                <h2>Buttons</h2>
                <div className="row">
                    <Button>Verify a list</Button>
                    <Button variant="secondary">See how it works</Button>
                    <Button disabled>Verify a list</Button>
                </div>
            </section>

            <section className="block">
                <h2>Verdicts</h2>
                <div className="row">
                    {VERDICTS.map((status) => (
                        <Badge key={status} status={status} />
                    ))}
                </div>
            </section>

            <section className="block">
                <h2>Results table</h2>
                <Table
                    columns={[
                        { id: "email", header: "Email", mono: true },
                        { id: "status", header: "Status", sortable: true, href: sort === "status" ? "/design-preview" : "/design-preview?sort=status" },
                        { id: "reason", header: "Reason" },
                        { id: "checked", header: "Checked", mono: true },
                    ]}
                    rows={rows.map((row) => ({
                        id: row.id,
                        email: row.email,
                        status: <Badge status={row.status} />,
                        reason: row.reason,
                        checked: row.checked,
                    }))}
                />
            </section>

            <section className="block">
                <h2>Empty state</h2>
                <EmptyState
                    title="Nothing verified yet."
                    body="Upload a list to get your first results in minutes."
                    action={<Button>Verify a list</Button>}
                />
            </section>
        </main>
    );
}
