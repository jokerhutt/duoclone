import type { FollowResponse } from "./FollowResponse"

export type FollowMutationResponse = {
    actorId: number;
    followedId: number;
    followersNewStats: FollowResponse;
    followedNewStats: FollowResponse;
}