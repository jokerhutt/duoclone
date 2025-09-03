import { useQuery } from "@tanstack/react-query"
import type { LessonType } from "../../Types/LessonType"
import { qk } from "../queryKeys"
import { lessonBatcher } from "../batcher/lessonBatcher"
import { unitBatcher } from "../batcher/unitBatcher"

export function useUnit(id: number) {
  return useQuery({
    queryKey: qk.unit(id),
    queryFn: () => unitBatcher.fetch(id!),
  })
}