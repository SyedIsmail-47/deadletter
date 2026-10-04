"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
    children: ReactNode;
    variant?: "primary" | "secondary";
    href?: string;
    type?: "button" | "submit";
    disabled?: boolean;
    onClick?: () => void;
};

export function Button({ children, variant = "primary", href, type = "button", disabled, onClick }: ButtonProps) {
    const reduce = useReducedMotion();
    const className = variant === "primary" ? "btn btn-primary" : "btn btn-secondary";
    const feedback = disabled || reduce
        ? {}
        : {
            whileHover: { opacity: 0.86 },
            whileTap: { scale: 0.98 },
            transition: { duration: 0.12, ease: "linear" as const },
        };

    if (href) {
        return (
            <motion.span className="btn-motion" {...feedback}>
                <Link className={className} href={href} onClick={onClick}>
                    {children}
                </Link>
            </motion.span>
        );
    }

    return (
        <motion.button className={className} type={type} disabled={disabled} onClick={onClick} {...feedback}>
            {children}
        </motion.button>
    );
}
