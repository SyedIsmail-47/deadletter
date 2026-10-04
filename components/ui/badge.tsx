export const VERDICTS = ["valid", "invalid", "risky", "disposable", "unknown"] as const;

export type Verdict = (typeof VERDICTS)[number];

const EXPLANATION: Record<Verdict, string> = {
    valid: "This address accepted mail and isn't part of a catch-all domain.",
    invalid: "This address was rejected or the domain can't receive mail.",
    risky: "The domain accepts everything, or this is a shared inbox like info@ — deliverable isn't guaranteed.",
    disposable: "A temporary email service. These addresses are rarely worth sending to.",
    unknown: "We couldn't get a confirmed answer — the server didn't respond, or it rejects every check the same way. This isn't a failed check, it's an honest one. We don't charge for it.",
};

export function Badge({ status }: { status: Verdict }) {
    const label = status.charAt(0).toUpperCase() + status.slice(1);
    return (
        <span className="badge" data-status={status} title={EXPLANATION[status]}>
            {label}
        </span>
    );
}
