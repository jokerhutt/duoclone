import { useQuery } from "@tanstack/react-query";
import { qk } from "../queryKeys";
import type { Exercise } from "../../Types/ExerciseType";
import { GET_EXERCISES_BY_LESSON } from "../../util/paths";
import { fetchLessonsByUnit } from "./useLessonByUnit";

export function useExercises(lessonId: number) {
  return useQuery({
    queryKey: qk.exercises(lessonId),
    queryFn: () => fetchLessonsByUnit(lessonId),
  });
}

export async function getExercises(lessonId: number): Promise<Exercise[]> {
  const res = await fetch(GET_EXERCISES_BY_LESSON(lessonId));
  if (!res.ok) throw new Error("Failed to fetch exercises");
  return (await res.json()) as Exercise[];
}
