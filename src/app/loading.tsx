export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0c0e]">
      <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.12em] text-[#777d87]">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#30343a] border-t-[#baff00]" />
        Loading workouts…
      </div>
    </main>
  );
}