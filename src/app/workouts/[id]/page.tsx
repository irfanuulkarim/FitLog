import Image from "next/image";
import Link from "next/link";
import { getWorkouts } from "@/lib/fitlog";
import AddToPlanButton from "@/components/AddToPlanButton";
import SaveWorkoutButton from "@/components/SaveWorkoutButton";

type WorkoutPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function WorkoutPage({
    params,
}: WorkoutPageProps) {
    const { id } = await params;

    const workouts = await getWorkouts();

    const workout = workouts.find(
        (item) => item.id === Number(id)
    );

    if (!workout) {
        return (
            <main className="min-h-screen bg-[#0b0c0e] px-8 py-16 text-white">
                <div className="mx-auto max-w-273">
                    <h1 className="text-2xl font-black uppercase">
                        Workout not found
                    </h1>

                    <Link
                        href="/"
                        className="mt-6 inline-block text-[11px] font-bold uppercase text-[#baff00]"
                    >
                        ← Back to workouts
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0b0c0e]">
            <div className="mx-auto max-w-273 px-8 py-5">
                <section className="border border-[#202329] bg-[#101216]">
                    <div className="grid grid-cols-[1fr_1fr] gap-6 p-6">

                        <div className="relative aspect-square overflow-hidden rounded-[7px]">
                            <Image
                                src={workout.image}
                                alt={workout.name}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>

                        <div className="flex flex-col">
                            <h1 className="text-[30px] font-black uppercase leading-[0.95] tracking-[-0.02em] text-white">
                                {workout.name}
                            </h1>

                            <p className="mt-2 max-w-112.5 text-[9px] leading-[1.45] text-[#9da3ad]">
                                {workout.description}
                            </p>

                            <div className="mt-3 flex gap-1">
                                {workout.muscleGroups.map((group) => (
                                    <span
                                        key={group}
                                        className="rounded-full bg-[#baff00] px-2 py-0.75 text-[7px] font-black uppercase leading-none text-black"
                                    >
                                        {group}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-3 overflow-hidden rounded-[7px] border border-[#24272d] bg-[#161920]">
                                <StatRow
                                    label="Equipment"
                                    value={workout.equipment}
                                />

                                <StatRow
                                    label="Difficulty"
                                    value={workout.difficulty}
                                />

                                <StatRow
                                    label="Sets"
                                    value={String(workout.sets)}
                                />

                                <StatRow
                                    label="Reps"
                                    value={workout.reps}
                                />

                                <StatRow
                                    label="Duration"
                                    value={`${workout.duration} min`}
                                />

                                <StatRow
                                    label="Calories"
                                    value={`${workout.caloriesBurned} kcal`}
                                />

                                <StatRow
                                    label="Rating"
                                    value={String(workout.rating)}
                                    last
                                />
                            </div>

                            <div className="mt-4">
                                <h2 className="text-[9px] font-black uppercase text-white">
                                    Instructions
                                </h2>

                                <ol className="mt-2 space-y-2">
                                    {workout.instructions.map(
                                        (instruction, index) => (
                                            <li
                                                key={instruction}
                                                className="flex gap-2 text-[8px] leading-[1.35] text-[#9da3ad]"
                                            >
                                                <span className="shrink-0 text-[#777d87]">
                                                    {index + 1}.
                                                </span>

                                                <span>{instruction}</span>
                                            </li>
                                        )
                                    )}
                                </ol>
                            </div>

                            <div className="mt-4 flex gap-2">
                                <AddToPlanButton workout={workout} />

                                <SaveWorkoutButton workout={workout} />
                            </div>
                        </div>
                    </div>

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
                </section>
            </div>
        </main>
    );
}

function StatRow({
    label,
    value,
    last = false,
}: {
    label: string;
    value: string;
    last?: boolean;
}) {
    return (
        <div
            className={`flex items-center justify-between px-3 py-2 ${!last ? "border-b border-[#24272d]" : ""
                }`}
        >
            <span className="text-[6px] font-medium uppercase tracking-widest text-[#777d87]">
                {label}
            </span>

            <span className="text-[7px] text-[#d0d2d6]">
                {value}
            </span>
        </div>
    );
}