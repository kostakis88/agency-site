"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Service" },
    { href: "/contact", label: "Contact" }
];

export default function Header() {
    const [open, setOpen] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const stored = (localStorage.getItem("theme") as "light" | "dark") || "light";
        setTheme(stored);
        document.documentElement.classList.toggle("dark", stored === "dark");

    }, []);

    const toggleTheme = () => {
        const next = theme === "light" ? "dark" : "light";
        setTheme(next);
        localStorage.setItem("theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
    };

    return (
        <header className="mt-[75px]">
            <div className="grid grid-cols-3 items-center">
                <Link href="/" className="flex items-center gap-3 group">
                    <Image
                        className="dark:invert"
                        src="/next.svg"
                        alt="Next.js log"
                        width={100}
                        height={20}
                        priority
                    />
                </Link>

                <nav className="hidden justify-center lg:flex">
                    <ul className="flex items-center gap-10 text-sm">
                        {links.map((l) => (
                            <li key={l.href}>
                                <Link href={l.href} className="text-neutral-800 dark:text-neutral-200 hover:underline underline-offset-4">
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="ml-auto flex items-center gap-4">
                    <button aria-label="Toggle theme" onClick={toggleTheme} className="relative inline-flex h-6 w-6 items-center justify-center rounded-full border border-neutral-800 dark:border-neutral-200">
                        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                            <span className={`absolute inset-y-0 right-0 w-1/2 ${theme === "dark" ? "bg-neutral-200" : "bg-neutral-900"}`} />
                        </span>
                    </button>

                    <button
                        className="lg:hidden inline-flex items-center justify-center rounded-md border px-2 py-1 text-sm"
                        onClick={() => setOpen((v) => !v)}
                        aria-expanded={open}
                        aria-controls="mobile-nav"
                        aria-label="Toggle menu"
                    >
                        Menu
                    </button>
                </div>
            </div>


            <nav
                id="mobile-nav"
                className={`lg:hidden transition-[max-height] duration-300 overflow-hidden ${open ? "max-h-96" : "max-h-0"
                    }`}
            >
                <ul className="mt-4 space-y-2 text-sm">
                    {links.map((l) => (
                        <li key={l.href}>
                            <Link
                                href={l.href}
                                className="block rounded-md px-2 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                onClick={() => setOpen(false)}
                            >
                                {l.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}