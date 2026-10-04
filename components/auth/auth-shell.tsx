import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";

const links = [
    { href: "/login", label: "Log in" },
    { href: "/signup", label: "Sign up", variant: "primary" as const },
];

export function AuthShell({ title, lede, children }: { title: string; lede: string; children: ReactNode }) {
    return (
        <main className="sheet">
            <SiteHeader links={links} />
            <section className="block lead">
                <h1>{title}</h1>
                <p className="measure">{lede}</p>
                {children}
            </section>
        </main>
    );
}
