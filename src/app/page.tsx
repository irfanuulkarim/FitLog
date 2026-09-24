import Image from "next/image";
import { getWorkouts } from "@/lib/fitlog";
import WorkoutCard from "@/components/WorkoutCard";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="bg-[#0b0c0e] px-8 py-10">
      <section className="mx-auto flex min-h-98.75 max-w-273 items-center overflow-hidden rounded-[14px] border border-[#24272d] bg-[#15171c]">
        <div className="z-10 w-1/2 pl-12">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#baff00]">
            Workout Library
          </p>

          <h1 className="max-w-142.5 text-[56px] font-black uppercase leading-[0.92] tracking-[-0.03em] text-white">
            Train with intent. Log every set.
          </h1>

          <p className="mt-5 max-w-127.5 text-[15px] leading-[1.45] text-[#9da3ad]">
            FitLog is a dark, no-nonsense gym companion; pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="mt-6 inline-block rounded-[5px] bg-[#baff00] px-5 py-3 text-[11px] font-extrabold uppercase tracking-wide text-black"
          >
            Browse Workouts
          </a>
        </div>
        <div className="relative h-full min-h-98.75 flex-1">
          <Image
            src="/images/banner.png"
            alt="Person performing a seated rowing exercise"
            fill
            priority
            className="object-contain object-center"
          />
        </div>
      </section>

      <section id="library" className="mx-auto mt-14 max-w-273">
        <div className="mb-6">
          <h2 className="text-[20px] font-black uppercase text-white">
            The Library
          </h2>

          <p className="mt-1 text-[12px] text-[#777d87]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              id={workout.id}
              name={workout.name}
              image={workout.image}
              muscleGroups={workout.muscleGroups}
              equipment={workout.equipment}
              difficulty={workout.difficulty}
              duration={workout.duration}
              caloriesBurned={workout.caloriesBurned}
            />
          ))}
        </div>
      </section>
    </main>
  );
}