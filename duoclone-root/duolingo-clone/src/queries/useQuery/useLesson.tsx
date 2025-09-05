import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { LessonType } from "../../Types/LessonType";
import { qk } from "../types/queryKeys";
import { lessonBatcher } from "../batcher/lessonBatcher";

export function useLesson(id: number) {
  const qc = useQueryClient();

  return useQuery({
    queryKey: qk.lesson(id),
    queryFn: () => lessonBatcher.fetch(id!),
    initialData: () => qc.getQueryData(qk.lesson(id)),
  });
}
