import type { Workout } from "@/lib/fitlog";

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";

export function getPlan(): Workout[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(PLAN_KEY);

  return stored ? JSON.parse(stored) : [];
}

export function getSaved(): Workout[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(SAVED_KEY);

  return stored ? JSON.parse(stored) : [];
}

export function addToPlan(
  workout: Workout
): "added" | "duplicate" | "limit" {
  const plan = getPlan();

  if (plan.some((item) => item.id === workout.id)) {
    return "duplicate";
  }

  if (plan.length >= 5) {
    return "limit";
  }

  localStorage.setItem(
    PLAN_KEY,
    JSON.stringify([...plan, workout])
  );

  window.dispatchEvent(new Event("fitlog-storage"));

  return "added";
}

export function removeFromPlan(id: number) {
  const plan = getPlan();

  localStorage.setItem(
    PLAN_KEY,
    JSON.stringify(
      plan.filter((item) => item.id !== id)
    )
  );

  window.dispatchEvent(new Event("fitlog-storage"));
}

export function saveWorkout(workout: Workout): "saved" | "duplicate" {
  const saved = getSaved();

  if (saved.some((item) => item.id === workout.id)) {
    return "duplicate";
  }

  localStorage.setItem(
    SAVED_KEY,
    JSON.stringify([...saved, workout])
  );

  window.dispatchEvent(new Event("fitlog-storage"));

  return "saved";
}

export function removeSaved(id: number) {
  const saved = getSaved();

  localStorage.setItem(
    SAVED_KEY,
    JSON.stringify(
      saved.filter((item) => item.id !== id)
    )
  );

  window.dispatchEvent(new Event("fitlog-storage"));
}