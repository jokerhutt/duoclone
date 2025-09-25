import type { FollowResponse } from "./FollowResponse"

export type FollowMutationResponse = {
    followersNewStats: FollowResponse;
    followedNewStats: FollowResponse;
}