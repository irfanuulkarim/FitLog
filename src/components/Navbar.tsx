"use client";

import { getPlan, getSaved } from "@/lib/storage";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const pathname = usePathname();

    const [planCount, setPlanCount] = useState(0);
    const [savedCount, setSavedCount] = useState(0);

    const isWorkoutActive = pathname === "/";
    const isPlanActive = pathname === "/my-plan";

    useEffect(() => {
        function updateCounts() {
            setPlanCount(getPlan().length);
            setSavedCount(getSaved().length);
        }

        updateCounts();

        window.addEventListener("fitlog-storage", updateCounts);

        return () => {
            window.removeEventListener("fitlog-storage", updateCounts);
        };
    }, []);

    return (
        <header className="sticky top-0 z-40 border-b border-zinc-800 bg-[#0b0b0b]">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/images/logo.png"
                        alt="FitLog"
                        width={84}
                        height={28}
                        priority
                        className="h-7 w-auto"
                    />
                    <span className="text-[18px] font-extrabold tracking-wide text-white">
                        FITLOG
                    </span>
                </Link>

                <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
                    <Link
                        href="/"
                        className={`px-5 py-2 text-sm font-bold tracking-wide transition ${isWorkoutActive
                            ? "bg-[#ccff00] text-black"
                            : "text-zinc-400 hover:text-white"
                            }`}
                    >
                        WORKOUT
                    </Link>

                    <Link
                        href="/my-plan"
                        className={`px-5 py-2 text-sm font-bold tracking-wide transition ${isPlanActive
                            ? "bg-[#ccff00] text-black"
                            : "text-zinc-400 hover:text-white"
                            }`}
                    >
                        MY PLAN
                    </Link>
                </nav>

                <Link
                    href="/my-plan"
                    className="flex items-center gap-2 sm:gap-3"
                    aria-label="Open my plan"
                >
                    <span className="rounded-full bg-[#ccff00] px-3 py-1.5 text-xs font-black text-black sm:px-4">
                        PLAN <span className="ml-1">{planCount}</span>
                    </span>

                    <span className="rounded-full border border-zinc-600 px-3 py-1.5 text-xs font-black text-white sm:px-4">
                        SAVED <span className="ml-1">{savedCount}</span>
                    </span>
                </Link>
            </div>

            <nav className="flex border-t border-zinc-800 md:hidden">
                <Link
                    href="/"
                    className={`flex-1 py-3 text-center text-xs font-bold tracking-wider ${isWorkoutActive
                        ? "bg-[#ccff00] text-black"
                        : "text-zinc-400"
                        }`}
                >
                    WORKOUT
                </Link>

                <Link
                    href="/my-plan"
                    className={`flex-1 py-3 text-center text-xs font-bold tracking-wider ${isPlanActive
                        ? "bg-[#ccff00] text-black"
                        : "text-zinc-400"
                        }`}
                >
                    MY PLAN
                </Link>
            </nav>
        </header>
    );
}