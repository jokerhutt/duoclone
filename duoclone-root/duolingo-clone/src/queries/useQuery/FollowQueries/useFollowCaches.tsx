import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { FollowResponse } from "../../../Types/FollowResponse";
import { qk } from "../../types/queryKeys";
import { useEffect } from "react";
import { GET_FOLLOW_COUNTS_BY_USER_ID } from "../../../util/paths";

export function useFollowCaches(userId: number) {
  const qc = useQueryClient();

  const query = useQuery<FollowResponse>({
    queryKey: qk.follows(userId),
    queryFn: () => fetchFollowResponse(userId),
    staleTime: 60_000,
  });

  useEffect(() => {
    if (query.data) {
      qc.setQueryData(qk.followers(userId), query.data.followerIds);
      qc.setQueryData(qk.following(userId), query.data.followingIds);
    }
  }, [query.data, qc, userId]);

  return query;
}

export const fetchFollowResponse = async (
  userId: number
): Promise<FollowResponse> => {
  const r = await fetch(GET_FOLLOW_COUNTS_BY_USER_ID(userId));
  if (!r.ok) throw new Error("failed");
  return r.json();
};
