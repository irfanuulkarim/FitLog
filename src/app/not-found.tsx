import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0c0e] px-6">
      <div className="text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#baff00]">
          FitLog
        </p>

        <h1 className="mt-3 text-5xl font-black uppercase text-white">
          404
        </h1>

        <p className="mt-3 text-sm text-[#777d87]">
          This workout or page doesn&apos;t exist.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-[5px] bg-[#baff00] px-5 py-3 text-[10px] font-black uppercase text-black"
        >
          Go to workouts
        </Link>
      </div>
    </main>
  );
}