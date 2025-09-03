import { create, windowScheduler } from "@yornaath/batshit";
import { GET_LESSONS_FROM_IDS, GET_UNITS_FROM_IDS } from "../../util/paths";
import type { LessonType } from "../../Types/LessonType";
import { parseIdsToRequestParam } from "../../util/pathParsers";
import type { UnitType } from "../../Types/UnitType";

export const unitBatcher = create<UnitType, number>({
  fetcher: async (ids: number[]) => {
    const res = await fetch(
      GET_UNITS_FROM_IDS(parseIdsToRequestParam("unitIds", ids))
    );
    if (!res.ok) throw new Error("Failed to fetch units");
    return await res.json();
  },
  resolver: (results, id) => {
    if (!Array.isArray(results)) {
      throw new Error("Expected array of units");
    }

    const hit = results.find((r) => r.id === id);
    if (!hit) throw new Error(`Unit not found: ${id}`);
    return hit;
  },
  scheduler: windowScheduler(10),
});
