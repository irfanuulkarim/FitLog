"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Workout } from "@/lib/fitlog";
import {
    getPlan,
    getSaved,
    removeFromPlan,
    removeSaved,
} from "@/lib/storage";

type Tab = "plan" | "saved";
type SortBy = "duration" | "calories" | "rating";

export default function MyPlanPage() {
    const [tab, setTab] = useState<Tab>("plan");
    const [plan, setPlan] = useState<Workout[]>([]);
    const [saved, setSaved] = useState<Workout[]>([]);
    const [sortBy, setSortBy] = useState<SortBy>("duration");
    const [completed, setCompleted] = useState<number[]>([]);

    useEffect(() => {
        function load() {
            setPlan(getPlan());
            setSaved(getSaved());
        }

        load();

        window.addEventListener("fitlog-storage", load);

        return () => {
            window.removeEventListener("fitlog-storage", load);
        };
    }, []);

    const workouts = tab === "plan" ? plan : saved;

    const sortedWorkouts = useMemo(() => {
        return [...workouts].sort((a, b) => {
            if (sortBy === "duration") {
                return a.duration - b.duration;
            }

            if (sortBy === "calories") {
                return a.caloriesBurned - b.caloriesBurned;
            }

            return b.rating - a.rating;
        });
    }, [workouts, sortBy]);

    const totalMinutes = workouts.reduce(
        (total, workout) => total + workout.duration,
        0
    );

    const totalCalories = workouts.reduce(
        (total, workout) => total + workout.caloriesBurned,
        0
    );

    function markAsDone(id: number) {
        if (!completed.includes(id)) {
            setCompleted((current) => [...current, id]);
        }

        window.dispatchEvent(
            new CustomEvent("fitlog-toast", {
                detail: "Workout marked as done",
            })
        );
    }

    function handleRemove(workout: Workout) {
        if (tab === "plan") {
            removeFromPlan(workout.id);
        } else {
            removeSaved(workout.id);
        }

        window.dispatchEvent(new Event("fitlog-storage"));

        window.dispatchEvent(
            new CustomEvent("fitlog-toast", {
                detail:
                    tab === "plan"
                        ? "Removed from today's plan"
                        : "Removed from saved",
            })
        );
    }

    return (
        <main className="bg-[#0b0c0e] px-4 py-7 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-273">
                <section>
                    <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#baff00]">
                        My Plan
                    </p>

                    <h1 className="mt-2 text-[34px] font-black uppercase leading-none tracking-[-0.03em] text-white sm:text-[32px]">
                        My Plan
                    </h1>

                    <p className="mt-2 text-[12px] text-[#777d87]">
                        Cap of five lifts for today. Finish them, then load more.
                    </p>
                </section>

                <section className="mt-6 grid grid-cols-3 overflow-hidden rounded-[5px] border border-[#24272d] bg-[#15171c]">
                    <Metric
                        label="Exercises"
                        value={workouts.length}
                        highlight
                    />

                    <Metric
                        label="Minutes"
                        value={totalMinutes}
                    />

                    <Metric
                        label="Calories"
                        value={totalCalories}
                    />
                </section>

                <section className="mt-5 flex items-center justify-between border-b border-[#24272d]">
                    <div className="flex items-center">
                        <button
                            onClick={() => setTab("plan")}
                            className={`border-b-2 px-3 py-2.5 text-[10px] font-bold uppercase ${tab === "plan"
                                ? "border-[#baff00] text-white"
                                : "border-transparent text-[#777d87]"
                                }`}
                        >
                            Today&apos;s Plan
                        </button>

                        <button
                            onClick={() => setTab("saved")}
                            className={`border-b-2 px-3 py-2.5 text-[10px] font-bold uppercase ${tab === "saved"
                                ? "border-[#baff00] text-white"
                                : "border-transparent text-[#777d87]"
                                }`}
                        >
                            Saved
                        </button>
                    </div>

                    <label className="flex items-center gap-2 text-[10px] uppercase text-[#777d87]">
                        <span>Sort By</span>

                        <select
                            value={sortBy}
                            onChange={(event) =>
                                setSortBy(event.target.value as SortBy)
                            }
                            className="rounded-[3px] border border-[#292d33] bg-[#111318] px-2 py-1 text-[10px] text-[#aeb2b9] outline-none"
                        >
                            <option value="duration">Duration</option>
                            <option value="calories">Calories</option>
                            <option value="rating">Rating</option>
                        </select>
                    </label>
                </section>

                <section className="mt-3">
                    {sortedWorkouts.length === 0 ? (
                        <EmptyState tab={tab} />
                    ) : (
                        <div className="space-y-1.5">
                            {sortedWorkouts.map((workout) => (
                                <PlanCard
                                    key={workout.id}
                                    workout={workout}
                                    tab={tab}
                                    completed={completed.includes(workout.id)}
                                    onDone={() => markAsDone(workout.id)}
                                    onRemove={() => handleRemove(workout)}
                                />
                            ))}
                        </div>
                    )}
                </section>

            </div>
        </main>
    );
}

function Metric({
    label,
    value,
    highlight = false,
}: {
    label: string;
    value: number;
    highlight?: boolean;
}) {
    return (
        <div className="border-r border-[#24272d] px-4 py-3 last:border-r-0 sm:px-5">
            <p className="text-[9px] font-bold uppercase tracking-[0.08em] text-[#777d87]">
                {label}
            </p>

            <p
                className={`mt-1 text-[22px] font-black leading-none ${highlight ? "text-[#baff00]" : "text-white"
                    }`}
            >
                {value}
            </p>
        </div>
    );
}

function EmptyState({ tab }: { tab: Tab }) {
    return (
        <div className="flex min-h-37.5 flex-col items-center justify-center rounded-sm border border-[#202329] bg-[#0d0f12] px-5 text-center">
            <p className="text-[9px] font-black uppercase text-white">
                Nothing here yet
            </p>

            <p className="mt-1 max-w-65 text-[9px] leading-relaxed text-[#666c76]">
                {tab === "plan"
                    ? "Browse the library and add a lift to get today moving."
                    : "Save workouts for later and they will appear here."}
            </p>

            <Link
                href="/"
                className="mt-3 rounded-sm bg-[#baff00] px-4 py-2 text-[9px] font-black uppercase text-black"
            >
                Go to workouts
            </Link>
        </div>
    );
}

function PlanCard({
    workout,
    tab,
    completed,
    onDone,
    onRemove,
}: {
    workout: Workout;
    tab: Tab;
    completed: boolean;
    onDone: () => void;
    onRemove: () => void;
}) {
    return (
        <div className="flex min-h-12 items-center gap-2 rounded-sm border border-[#202329] bg-[#15171c] px-2 py-1.5">
            <div className="relative h-14 w-15 shrink-0 overflow-hidden rounded-[3px]">
                <Image
                    src={workout.image}
                    alt={workout.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="min-w-0 flex-1">
                <h2 className="truncate text-[15px] font-black uppercase leading-none text-white">
                    {workout.name}
                </h2>

                <p className="mt-1 truncate text-[12px] text-[#777d87]">
                    {workout.equipment}
                </p>

                <div className="mt-1 flex items-center gap-2 text-[10px] text-[#626873]">
                    <span>◷ {workout.duration}m</span>
                    <span>◉ {workout.caloriesBurned} kcal</span>
                    <span>★ {workout.rating}</span>
                </div>
            </div>


            <div className="flex shrink-0 items-center gap-1">
                <Link
                    href={`/workouts/${workout.id}`}
                    className="rounded-[3px] border border-[#30343a] px-2 py-1.5 text-[12px] font-bold text-[#aeb2b9] hover:text-white"
                >
                    View Details
                </Link>

                {tab === "plan" && (
                    <button
                        onClick={onDone}
                        disabled={completed}
                        className={`rounded-[3px] px-2 py-1.5 text-[11px] font-black ${completed
                            ? "bg-[#30342a] text-[#baff00]"
                            : "bg-[#baff00] text-black"
                            }`}
                    >
                        {completed ? "✓ Done" : "✓ Mark as Done"}
                    </button>
                )}

                <button
                    onClick={onRemove}
                    aria-label={`Remove ${workout.name}`}
                    className="flex h-5 w-5 items-center justify-center rounded-[3px] border border-[#30343a] text-[10px] text-[#777d87] hover:text-white"
                >
                    ×
                </button>
            </div>
        </div>
    );
}