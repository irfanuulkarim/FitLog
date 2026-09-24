import Image from "next/image";

type WorkoutCardProps = {
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
};

export default function WorkoutCard({
  name,
  image,
  muscleGroups,
  equipment,
  difficulty,
  duration,
  caloriesBurned,
}: WorkoutCardProps) {
  return (
    <article className="overflow-hidden rounded-[7px] border border-[#24272d] bg-[#15171c]">
      <div className="relative aspect-[1.9/1] w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-3">
        <div className="mb-2 flex flex-wrap gap-1">
          {muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-[#baff00] px-2 py-0.5 text-[7px] font-black uppercase leading-none text-black"
            >
              {group}
            </span>
          ))}
        </div>

        <h3 className="text-[11px] font-black uppercase leading-tight text-white">
          {name}
        </h3>

        <p className="mt-1 text-[8px] text-[#777d87]">
          {equipment}
        </p>

        <div className="mt-3 flex items-center gap-3 border-t border-[#24272d] pt-2 text-[7px] text-[#777d87]">
          <span>{duration} min</span>
          <span>{caloriesBurned} kcal</span>
          <span>{difficulty}</span>
        </div>
      </div>
    </article>
  );
}