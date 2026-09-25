"use client";

import { useEffect, useState } from "react";
import type { Workout } from "@/lib/fitlog";
import { getSaved, saveWorkout } from "@/lib/storage";

type Props = {
  workout: Workout;
};

export default function SaveWorkoutButton({
  workout,
}: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    function update() {
      setSaved(
        getSaved().some((item) => item.id === workout.id)
      );
    }

    update();

    window.addEventListener("fitlog-storage", update);

    return () => {
      window.removeEventListener("fitlog-storage", update);
    };
  }, [workout.id]);

  function handleClick() {
    const result = saveWorkout(workout);

    if (result === "saved") {
      setSaved(true);

      window.dispatchEvent(
        new CustomEvent("fitlog-toast", {
          detail: "Saved for later",
        })
      );
    } else {
      window.dispatchEvent(
        new CustomEvent("fitlog-toast", {
          detail: "Already saved",
        })
      );
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={saved}
      className={`rounded-[5px] border px-4 py-2 text-[8px] font-semibold ${
        saved
          ? "border-[#baff00] text-[#baff00]"
          : "border-[#353941] text-[#c2c5ca]"
      }`}
    >
      {saved ? "✓ Saved" : "♡ Save for later"}
    </button>
  );
}