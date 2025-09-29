import type { FollowResponse } from "./FollowResponse"

export type FollowMutationResponse = {
    actorUserId: number;
    followedUserId: number;
    followersNewStats: FollowResponse;
    followedNewStats: FollowResponse;
}