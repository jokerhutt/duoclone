import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FollowMutationResponse } from "../../Types/FollowMutationResponse";
import { qk } from "../types/queryKeys";
import { FOLLOW_USER, UNFOLLOW_USER } from "../../util/paths";

type FollowMutationParams = {
  followedId: number;
  isFollowing: boolean;
};

export function useFollowMutation() {
  const qc = useQueryClient();

  return useMutation<FollowMutationResponse, Error, FollowMutationParams>({
    mutationFn: async ({ followedId, isFollowing }) => {

      const path = isFollowing ? UNFOLLOW_USER : FOLLOW_USER  

      const response = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ followedId }),
        credentials: "include"
      });
      
      if (!response.ok) {
        throw new Error("Failed to follow/unfollow user");
      }
      
      return response.json();
    },
    onSuccess: (data, { }) => {

      const actorId = data.actorUserId;
      const followedId = data.followedUserId;

      qc.setQueryData(qk.follows(actorId), data.followersNewStats);
      qc.setQueryData(qk.followers(actorId), data.followersNewStats.followerIds);
      qc.setQueryData(qk.following(actorId), data.followersNewStats.followingIds);

      qc.setQueryData(qk.follows(followedId), data.followedNewStats);
      qc.setQueryData(qk.followers(followedId), data.followedNewStats.followerIds);
      qc.setQueryData(qk.following(followedId), data.followedNewStats.followingIds);
    },
  });
}