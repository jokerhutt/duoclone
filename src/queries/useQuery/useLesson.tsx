import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../constants/queryKeys.ts";
import { lessonBatcher } from "../batcher/batchers.ts";

export function useLesson(id: number) {
  const qc = useQueryClient();

  return useQuery({
    queryKey: qk.lesson(id),
    queryFn: () => lessonBatcher.fetch(id!),
    staleTime: 60_000,
    initialData: () => qc.getQueryData(qk.lesson(id)),
  });
}
