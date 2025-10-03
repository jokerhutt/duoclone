import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFollowResponse } from "./useFollowCaches";
import { qk } from "../../../constants/queryKeys.ts";

export function useFollowingIds(userId: number) {
  const qc = useQueryClient();
  return useQuery<number[]>({
    queryKey: qk.following(userId),
    queryFn: async () => {
      const base = await qc.ensureQueryData({
        queryKey: ["follows", userId],
        queryFn: () => fetchFollowResponse(userId),
      });
      return base.followingIds;
    },
    staleTime: 60_000,
  });
}
