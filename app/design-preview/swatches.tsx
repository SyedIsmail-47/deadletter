"use client";

import { useEffect, useState } from "react";

const TOKENS = [
    "surface",
    "surface-raised",
    "ink",
    "ink-muted",
    "border",
    "accent",
    "valid",
    "invalid",
    "risky",
    "disposable",
    "unknown",
] as const;

export function Swatches() {
    const [hex, setHex] = useState<Record<string, string>>({});

    useEffect(() => {
        const read = () => {
            const styles = getComputedStyle(document.documentElement);
            const next: Record<string, string> = {};
            for (const token of TOKENS) {
                next[token] = styles.getPropertyValue(`--${token}`).trim();
            }
            setHex(next);
        };
        read();
        const observer = new MutationObserver(read);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    return (
        <div className="swatches">
            {TOKENS.map((token) => (
                <div className="swatch" key={token}>
                    <span className="chip" style={{ background: `var(--${token})` }} />
                    <span>{token}</span>
                    <span className="mono">{hex[token]}</span>
                </div>
            ))}
        </div>
    );
}
