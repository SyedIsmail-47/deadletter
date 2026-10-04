"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { Badge, type Verdict } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ROWS: Array<{ id: string; email: string; status: Verdict; reason: string; checked: string }> = [
    { id: "1", email: "ada@example.com", status: "valid", reason: "Mailbox accepted", checked: "2026-10-04 04:12:08" },
    { id: "2", email: "info@example.com", status: "risky", reason: "Shared inbox", checked: "2026-10-04 04:12:09" },
    { id: "3", email: "gone@no-such-domain.invalid", status: "invalid", reason: "No MX records for this domain", checked: "2026-10-04 04:12:09" },
    { id: "4", email: "user@mailinator.com", status: "disposable", reason: "Disposable email domain", checked: "2026-10-04 04:12:10" },
    { id: "5", email: "maybe@slow-mx.test", status: "unknown", reason: "SMTP connection timed out", checked: "2026-10-04 04:12:18" },
];

const fade = { duration: 0.18, ease: "linear" as const };

export function LiveCheck() {
    const reduce = useReducedMotion();
    const [run, setRun] = useState(0);
    const [phase, setPhase] = useState<"queued" | "processing" | "done">("queued");
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (reduce) {
            setPhase("done");
            setCount(ROWS.length);
            return;
        }

        setPhase("queued");
        setCount(0);
        const timers = [
            window.setTimeout(() => setPhase("processing"), 450),
            ...ROWS.map((_, index) => window.setTimeout(() => {
                const resolved = index + 1;
                setCount(resolved);
                if (resolved === ROWS.length) setPhase("done");
            }, 450 + (index + 1) * 700)),
        ];
        return () => timers.forEach((timer) => window.clearTimeout(timer));
    }, [reduce, run]);

    const visible = ROWS.slice(0, count);
    const confirmed = visible.filter((row) => row.status === "valid").length;
    const unknown = visible.filter((row) => row.status === "unknown").length;
    const removed = visible.filter((row) => row.status === "invalid" || row.status === "risky" || row.status === "disposable").length;
    const message = phase === "queued"
        ? "Queued. Checking starts when a worker is free."
        : phase === "processing"
            ? `Checking ${count.toLocaleString("en-US")} of ${ROWS.length.toLocaleString("en-US")} addresses…`
            : `Done. ${confirmed.toLocaleString("en-US")} confirmed, ${unknown.toLocaleString("en-US")} unknown, ${removed.toLocaleString("en-US")} removed.`;

    return (
        <div className="stack live-check" id="breakdown">
            <AnimatePresence mode="wait">
                <motion.p
                    key={`${phase}-${message}`}
                    className="live"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={fade}
                >
                    {message}
                </motion.p>
            </AnimatePresence>
            <div className="table-wrap">
                <table className="data">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Reason</th>
                            <th>Checked</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence initial={false}>
                            {visible.map((row) => (
                                <motion.tr
                                    key={row.id}
                                    initial={reduce ? false : { opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.2, ease: "linear" }}
                                >
                                    <td className="mono" data-label="Email">{row.email}</td>
                                    <td data-label="Status"><Badge status={row.status} /></td>
                                    <td data-label="Reason">{row.reason}</td>
                                    <td className="mono" data-label="Checked">{row.checked}</td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>
            {phase === "done" ? (
                <div className="row">
                    <Button variant="secondary" href="#breakdown">View breakdown</Button>
                    <Button onClick={() => setRun((value) => value + 1)}>Run the check again</Button>
                </div>
            ) : null}
        </div>
    );
}
