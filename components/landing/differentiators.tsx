"use client";

import { useEffect, useRef } from "react";

const STATEMENTS = [
    { title: "You only pay for a real answer.", body: " Timeouts and unreachable servers come back as “unknown” — and they're free." },
    { title: "We catch domains that lie.", body: " Some mail servers accept everything to avoid rejecting real mail. We test for that before calling an address valid." },
    { title: "We catch servers that lie too.", body: " Some providers reject every unverified address the same way, on purpose. We detect the pattern instead of reporting a false dead end." },
];

export function Differentiators() {
    const root = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = root.current;
        if (!node) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let cancelled = false;
        let revert: (() => void) | undefined;

        (async () => {
            const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
                import("gsap"),
                import("gsap/ScrollTrigger"),
            ]);
            if (cancelled || !root.current) return;
            gsap.registerPlugin(ScrollTrigger);
            const context = gsap.context(() => {
                gsap.utils.toArray<HTMLElement>(".differentiator").forEach((item) => {
                    gsap.from(item, {
                        opacity: 0,
                        y: 8,
                        duration: 0.45,
                        ease: "power1.out",
                        immediateRender: false,
                        scrollTrigger: {
                            trigger: item,
                            start: "top 88%",
                            once: true,
                        },
                    });
                });
            }, root);
            revert = () => context.revert();
        })();

        return () => {
            cancelled = true;
            revert?.();
        };
    }, []);

    return (
        <div ref={root}>
            {STATEMENTS.map((statement) => (
                <article className="block differentiator" key={statement.title}>
                    <p className="measure">
                        <strong>{statement.title}</strong>
                        {statement.body}
                    </p>
                </article>
            ))}
        </div>
    );
}
