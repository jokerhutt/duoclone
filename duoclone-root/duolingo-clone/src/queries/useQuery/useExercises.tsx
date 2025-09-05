import { useQuery } from "@tanstack/react-query";
import { qk } from "../types/queryKeys";
import type { Exercise } from "../../Types/ExerciseType";
import { GET_EXERCISES_BY_LESSON } from "../../util/paths";

export function useExercises(lessonId: number, userId: number) {
  return useQuery({
    queryKey: qk.exercises(lessonId),
    queryFn: () => fetchExercisesByLesson(lessonId, userId),
  });
}

export async function fetchExercisesByLesson(
  lessonId: number,
  userId: number
): Promise<Exercise[]> {
  const res = await fetch(GET_EXERCISES_BY_LESSON(lessonId, userId));
  if (!res.ok) throw new Error("Failed to fetch exercises");
  return (await res.json()) as Exercise[];
}
