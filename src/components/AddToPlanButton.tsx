"use client";

import { useEffect, useState } from "react";
import type { Workout } from "@/lib/fitlog";
import { addToPlan, getPlan } from "@/lib/storage";

type Props = {
  workout: Workout;
};

export default function AddToPlanButton({ workout }: Props) {
  const [added, setAdded] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  useEffect(() => {
    function update() {
      const plan = getPlan();

      setAdded(plan.some((item) => item.id === workout.id));

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
      className={`rounded-md px-5 py-3 text-[10px] font-black uppercase tracking-wide transition ${
        added
          ? "border border-[#baff00] bg-[#1b2114] text-[#baff00]"
          : limitReached
            ? "cursor-not-allowed bg-[#292c31] text-[#666b74]"
            : "bg-[#baff00] text-black hover:bg-[#c5ff26]"
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