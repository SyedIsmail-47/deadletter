import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

export default function DashboardPage() {
    return (
        <section className="block lead">
            <h1>Jobs</h1>
            <EmptyState
                title="Nothing verified yet."
                body="Upload a list to get your first results in minutes."
                action={<Button href="/dashboard/new">Verify a list</Button>}
            />
        </section>
    );
}
