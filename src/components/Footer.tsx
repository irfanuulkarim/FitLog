import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="flex items-center justify-between border-t border-[#202329] px-6 py-4">
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

            <p className="text-[7px] text-[#626771]">
                © 2026 FitLog — Workout Library. Train hard, log honest.
            </p>
        </footer>
    );
}