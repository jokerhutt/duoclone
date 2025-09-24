import { useQuery } from "@tanstack/react-query";
import { qk } from "../types/queryKeys";
import type { QuestType } from "../../Types/QuestType";
import { GET_MONTHLY_CHALLENGE_BY_USER_ID } from "../../util/paths";

export function useMonthlyChallenge(userId: number) {
  return useQuery({
    queryKey: qk.monthlyChallenges(userId),
    queryFn: () => fetchMonthlyExerciseForUser(userId),
  });
}

export async function fetchMonthlyExerciseForUser(
  userId: number
): Promise<QuestType> {
  const res = await fetch(GET_MONTHLY_CHALLENGE_BY_USER_ID(userId));
  if (!res.ok) throw new Error("Failed to fetch monthly challenge");
  return (await res.json()) as QuestType;
}
