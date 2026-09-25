import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#202329] bg-[#090a0c]">
      <div className="mx-auto flex min-h-18 max-w-360 items-center justify-between px-6 sm:px-8">
        <Link
          href="/"
          aria-label="FitLog home"
          className="flex items-center"
        >
          <Image
            src="/images/logo.png"
            alt="FitLog"
            width={84}
            height={28}
            className="h-7 w-auto"
          />
          <span className="text-[18px] font-extrabold tracking-wide text-white">
                FITLOG
            </span>
        </Link>

        <p className="text-right text-[7px] text-[#555b65] sm:text-[10px]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}