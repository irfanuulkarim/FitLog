"use client";

import { useEffect, useState } from "react";
import type { Workout } from "@/lib/fitlog";
import { addToPlan, getPlan } from "@/lib/storage";

type Props = {
  workout: Workout;
};

export default function AddToPlanButton({
  workout,
}: Props) {
  const [added, setAdded] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    function update() {
      const plan = getPlan();

      setAdded(
        plan.some((item) => item.id === workout.id)
      );

      setLimitReached(
        plan.length >= 5 &&
          !plan.some((item) => item.id === workout.id)
      );
    }

    update();

    window.addEventListener("fitlog-storage", update);

    return () => {
      window.removeEventListener("fitlog-storage", update);
    };
  }, [workout.id]);

  function handleClick() {
    const result = addToPlan(workout);

    if (result === "added") {
      setAdded(true);

      window.dispatchEvent(
        new CustomEvent("fitlog-toast", {
          detail: "Added to today's plan",
        })
      );
    }

    if (result === "duplicate") {
      window.dispatchEvent(
        new CustomEvent("fitlog-toast", {
          detail: "Already in today's plan",
        })
      );
    }

    if (result === "limit") {
      window.dispatchEvent(
        new CustomEvent("fitlog-toast", {
          detail: "Today's plan is limited to 5 lifts",
        })
      );
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={added || limitReached}
      className={`rounded-[5px] px-4 py-2 text-[8px] font-black ${
        added
          ? "bg-[#30342a] text-[#baff00]"
          : limitReached
            ? "cursor-not-allowed bg-[#292b2f] text-[#666a72]"
            : "bg-[#baff00] text-black"
      }`}
    >
      {added
        ? "✓ Added to today's plan"
        : limitReached
          ? "Plan is full"
          : "⊞ Add to today's plan"}
    </button>
  );
}