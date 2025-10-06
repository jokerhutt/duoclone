import { create, windowScheduler } from "@yornaath/batshit";
import { GET_LESSONS_FROM_IDS } from "../../constants/paths.ts";
import type { LessonType } from "../../Types/LessonType";
import { parseIdsToRequestParam } from "../../util/pathParsers";

export const lessonBatcher = create<LessonType, number>({
  fetcher: async (ids: number[]) => {
    const res = await fetch(
      GET_LESSONS_FROM_IDS(parseIdsToRequestParam("lessonIds", ids)),
      { credentials: "include" }
    );
    if (!res.ok) throw new Error("Failed to fetch lessons");
    return await res.json();
  },
  resolver: (results, id) => {
    if (!Array.isArray(results)) {
      throw new Error("Expected array of lessons");
    }

    const hit = results.find((r) => r.id === id);
    if (!hit) throw new Error(`Lesson not found: ${id}`);
    return hit;
  },
  scheduler: windowScheduler(10),
});
