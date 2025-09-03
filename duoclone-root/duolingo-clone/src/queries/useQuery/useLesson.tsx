import { useQuery } from "@tanstack/react-query"
import type { LessonType } from "../../Types/LessonType"
import { qk } from "../queryKeys"
import { lessonBatcher } from "../batcher/lessonBatcher"

export function useLesson(id: number) {
  return useQuery({
    queryKey: qk.lesson(id),
    queryFn: () => lessonBatcher.fetch(id!),
  })
}