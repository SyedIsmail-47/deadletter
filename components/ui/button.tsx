import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
    variant?: "primary" | "secondary";
    href?: string;
    type?: "button" | "submit";
    disabled?: boolean;
};

export function Button({ children, variant = "primary", href, type = "button", disabled }: ButtonProps) {
    const className = variant === "primary" ? "btn btn-primary" : "btn btn-secondary";
    if (href) {
        return (
            <Link className={className} href={href}>
                {children}
            </Link>
        );
    }
    return (
        <button className={className} type={type} disabled={disabled}>
            {children}
        </button>
    );
}
