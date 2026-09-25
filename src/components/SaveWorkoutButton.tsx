"use client";

import { useEffect, useState } from "react";
import type { Workout } from "@/lib/fitlog";
import { getSaved, saveWorkout } from "@/lib/storage";

type Props = {
  workout: Workout;
};

export default function SaveWorkoutButton({ workout }: Props) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    function update() {
      setSaved(getSaved().some((item) => item.id === workout.id));
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
      className={`rounded-md border px-5 py-3 text-[10px] font-bold uppercase tracking-wide transition ${
        saved
          ? "border-[#baff00] bg-[#171c13] text-[#baff00]"
          : "border-[#353a43] bg-transparent text-[#c1c5cc] hover:border-[#606671] hover:text-white"
      }`}
    >
      {saved ? "✓ Saved" : "♡ Save for later"}
    </button>
  );
}