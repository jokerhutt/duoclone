import { useQuery } from "@tanstack/react-query";
import { qk } from "../../constants/queryKeys.ts";
import type { QuestType } from "../../Types/QuestType";
import { GET_MONTHLY_CHALLENGE_BY_USER_ID } from "../../constants/paths.ts";

export function useMonthlyChallenge() {
  return useQuery({
    queryKey: qk.monthlyChallenges(),
    queryFn: () => fetchMonthlyExerciseForUser(),
    staleTime: 60_000,
  });
}

export async function fetchMonthlyExerciseForUser(): Promise<QuestType> {
  const res = await fetch(GET_MONTHLY_CHALLENGE_BY_USER_ID(), {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch monthly challenge");
  return (await res.json()) as QuestType;
}
