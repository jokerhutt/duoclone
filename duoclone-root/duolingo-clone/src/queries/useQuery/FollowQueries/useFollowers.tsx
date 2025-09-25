import { useQuery, useQueryClient } from "@tanstack/react-query";
import { qk } from "../../types/queryKeys";
import { fetchFollowResponse } from "./useFollowCaches";

export function useFollowers(userId: number) {
  const qc = useQueryClient();
  return useQuery<number[]>({
    queryKey: qk.followers(userId),
    queryFn: async () => {
      const base = await qc.ensureQueryData({
        queryKey: ["follows", userId],
        queryFn: () => fetchFollowResponse(userId),
      });
      return base.followerIds;
    },
  });
}
