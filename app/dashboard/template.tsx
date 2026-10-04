"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function DashboardTemplate({ children }: { children: ReactNode }) {
    const reduce = useReducedMotion();
    if (reduce) return children;
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15, ease: "linear" }}>
            {children}
        </motion.div>
    );
}
