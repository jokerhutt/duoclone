import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../types/queryKeys";
import { GET_LESSONS_BY_UNIT } from "../../util/paths";
import type { LessonType } from "../../Types/LessonType";

export async function fetchLessonsByUnit(
  unitId: number
): Promise<LessonType[]> {
  const res = await fetch(GET_LESSONS_BY_UNIT(unitId), {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch units");
  return (await res.json()) as LessonType[];
}

export function useLessonsByUnit(id: number) {
  const qc = useQueryClient();
  return useQuery({
    queryKey: qk.lessonsByUnit(id),
    queryFn: () => fetchLessonsByUnit(id),
    initialData: () => qc.getQueryData(qk.lessonsByUnit(id)),
  });
}
