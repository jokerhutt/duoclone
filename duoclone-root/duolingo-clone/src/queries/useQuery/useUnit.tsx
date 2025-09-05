import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { LessonType } from "../../Types/LessonType";
import { qk } from "../types/queryKeys";
import { lessonBatcher } from "../batcher/lessonBatcher";
import { unitBatcher } from "../batcher/unitBatcher";

export function useUnit(id: number) {
  const qc = useQueryClient();
  return useQuery({
    queryKey: qk.unit(id),
    queryFn: () => unitBatcher.fetch(id!),
    initialData: () => qc.getQueryData(qk.unit(id)),
  });
}
