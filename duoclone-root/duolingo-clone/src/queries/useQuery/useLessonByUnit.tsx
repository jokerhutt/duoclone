import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../types/queryKeys";
import type { UnitType } from "../../Types/UnitType";
import { GET_LESSONS_BY_UNIT, GET_UNITS_BY_SECTION } from "../../util/paths";
import type { LessonType } from "../../Types/LessonType";

export async function fetchLessonsByUnit(
  unitId: number,
  userId: number
): Promise<LessonType[]> {
  const res = await fetch(GET_LESSONS_BY_UNIT(unitId, userId));
  if (!res.ok) throw new Error("Failed to fetch units");
  return (await res.json()) as LessonType[];
}

export function useLessonsByUnit(id: number, userId: number) {
  const qc = useQueryClient();
  return useQuery({
    queryKey: qk.lessonsByUnit(id, userId),
    queryFn: () => fetchLessonsByUnit(id, userId),
    initialData: () => qc.getQueryData(qk.lessonsByUnit(id, userId)),
  });
}
