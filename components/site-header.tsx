"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";

import { Mark } from "@/components/mark";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export type NavLink = {
    href: string;
    label: string;
    variant?: "primary" | "secondary" | "text";
};

export function SiteHeader({ links, extra }: { links: NavLink[]; extra?: ReactNode }) {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <header className="topbar">
            <Link className="brand" href="/">
                <Mark />
                Deadletter
            </Link>
            <div className="nav-side">
                <button
                    type="button"
                    className="btn btn-secondary menu-button"
                    aria-expanded={open}
                    aria-controls="site-nav"
                    onClick={() => setOpen((value) => !value)}
                >
                    {open ? "Close" : "Menu"}
                </button>
                <nav id="site-nav" className={open ? "nav-links open" : "nav-links"}>
                    {links.map((link) => {
                        const current = link.href === pathname;
                        if (link.variant === "primary" || link.variant === "secondary") {
                            return (
                                <Button key={link.href} href={link.href} variant={link.variant}>
                                    {link.label}
                                </Button>
                            );
                        }
                        return (
                            <Link key={link.href} className="nav-text" href={link.href} aria-current={current ? "page" : undefined}>
                                {link.label}
                            </Link>
                        );
                    })}
                    {extra}
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}
