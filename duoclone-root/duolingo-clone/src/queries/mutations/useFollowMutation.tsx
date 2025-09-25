import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FollowMutationResponse } from "../../Types/FollowMutationResponse";
import { qk } from "../types/queryKeys";
import { FOLLOW_USER, UNFOLLOW_USER } from "../../util/paths";

type FollowMutationParams = {
  followerId: number;
  followedId: number;
  isFollowing: boolean;
};

export function useFollowMutation() {
  const qc = useQueryClient();

  return useMutation<FollowMutationResponse, Error, FollowMutationParams>({
    mutationFn: async ({ followerId, followedId, isFollowing }) => {

      const path = isFollowing ? UNFOLLOW_USER : FOLLOW_USER  

      const response = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followerId, followedId }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to follow/unfollow user");
      }
      
      return response.json();
    },
    onSuccess: (data, { followerId, followedId }) => {
      qc.setQueryData(qk.follows(followerId), data.followersNewStats);
      qc.setQueryData(qk.followers(followerId), data.followersNewStats.followerIds);
      qc.setQueryData(qk.following(followerId), data.followersNewStats.followingIds);

      qc.setQueryData(qk.follows(followedId), data.followedNewStats);
      qc.setQueryData(qk.followers(followedId), data.followedNewStats.followerIds);
      qc.setQueryData(qk.following(followedId), data.followedNewStats.followingIds);
    },
  });
}