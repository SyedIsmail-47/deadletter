import type { ReactNode } from "react";

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
    return (
        <div className="stack">
            <p>{title}</p>
            <p className="muted measure">{body}</p>
            {action}
        </div>
    );
}
