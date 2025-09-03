import { create, windowScheduler } from "@yornaath/batshit";
import { GET_LESSONS_FROM_IDS, GET_SECTIONS_FROM_IDS } from "../../util/paths";
import type { LessonType } from "../../Types/LessonType";
import { parseIdsToRequestParam } from "../../util/pathParsers";
import type { SectionType } from "../../Types/SectionType";

export const sectionBatcher = create<SectionType, number>({
  fetcher: async (ids: number[]) => {
    const res = await fetch(
      GET_SECTIONS_FROM_IDS(parseIdsToRequestParam("sectionIds", ids))
    );
    if (!res.ok) throw new Error("Failed to fetch sections");
    return await res.json();
  },
  resolver: (results, id) => {
    if (!Array.isArray(results)) {
      throw new Error("Expected array of sections");
    }

    const hit = results.find((r) => r.id === id);
    if (!hit) throw new Error(`Section not found: ${id}`);
    return hit;
  },
  scheduler: windowScheduler(10),
});
