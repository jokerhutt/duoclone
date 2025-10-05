import { useQuery } from "@tanstack/react-query";
import type { QuestType } from "../../Types/QuestType";
import { GET_QUESTS_BY_USER_ID } from "../../constants/paths.ts";
import { qk } from "../../constants/queryKeys.ts";

export function useQuests() {
  return useQuery({
    queryKey: qk.quests(),
    queryFn: () => fetchQuestsForUser(),
    staleTime: 60_000,
  });
}

export async function fetchQuestsForUser(): Promise<QuestType[]> {
  const res = await fetch(GET_QUESTS_BY_USER_ID(), { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch quests");
  return (await res.json()) as QuestType[];
}
