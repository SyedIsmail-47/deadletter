"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
    }, []);

    function toggle() {
        const next = theme === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        localStorage.setItem("theme", next);
        setTheme(next);
    }

    return (
        <button type="button" className="btn btn-secondary" onClick={toggle}>
            {theme === "dark" ? "Light mode" : "Dark mode"}
        </button>
    );
}
