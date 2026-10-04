import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { currentProfile } from "@/lib/account";
import { signOut } from "@/lib/auth/actions";

const links = [
    { href: "/dashboard", label: "Jobs" },
    { href: "/dashboard/new", label: "Verify a list" },
    { href: "/dashboard/billing", label: "Billing" },
];

export default async function DashboardLayout({ children }: { children: ReactNode }) {
    const profile = await currentProfile();
    if (!profile) redirect("/login");

    return (
        <div className="sheet">
            <SiteHeader
                links={links}
                extra={
                    <form action={signOut}>
                        <Button type="submit" variant="secondary">
                            Log out
                        </Button>
                    </form>
                }
            />
            <p className="muted">{profile.email}</p>
            {children}
        </div>
    );
}
