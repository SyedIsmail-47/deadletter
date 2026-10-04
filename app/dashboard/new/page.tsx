import { Button } from "@/components/ui/button";

export default function NewListPage() {
    return (
        <section className="block lead narrow">
            <h1>Verify a list</h1>
            <div className="drop">
                <p>Drop a CSV, or paste emails one per line.</p>
                <p className="muted">
                    We&apos;ll check each one and sort the results into valid, invalid, risky, disposable, and unknown.
                </p>
            </div>
            <Button href="/dashboard/jobs/live">Watch a check</Button>
        </section>
    );
}