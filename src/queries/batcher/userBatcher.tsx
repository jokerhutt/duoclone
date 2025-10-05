import { create, windowScheduler } from "@yornaath/batshit";
import type { UserType } from "../../Types/UserType";
import { parseIdsToRequestParam } from "../../util/pathParsers";
import { GET_USERS_FROM_IDS } from "../../constants/paths.ts";

export const userBatcher = create<UserType, number>({
  fetcher: async (ids: number[]) => {
    const res = await fetch(
      GET_USERS_FROM_IDS(parseIdsToRequestParam("userIds", ids))
    );
    if (!res.ok) throw new Error("Failed to fetch users");
    return await res.json();
  },
  resolver: (results, id) => {
    if (!Array.isArray(results)) {
      throw new Error("Expected array of users");
    }

    const hit = results.find((r) => r.id === id);
    if (!hit) throw new Error(`Users not found: ${id}`);
    return hit;
  },
  scheduler: windowScheduler(10),
});
