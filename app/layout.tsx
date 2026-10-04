import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";

import "./globals.css";

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
    display: "block",
    adjustFontFallback: false,
});

const jetbrains = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    display: "block",
    adjustFontFallback: false,
});

export const metadata: Metadata = {
    title: "Deadletter — Bulk Email Verification & SMTP Checking",
    description: "Verify email lists before you send. Real SMTP checks, honest results, and you only pay for addresses we can actually confirm.",
};

const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t;}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={`${geist.variable} ${jetbrains.variable}`} suppressHydrationWarning>
            <body>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
                {children}
            </body>
        </html>
    );
}
