import { useCurrentUser } from "../queries/useQuery/Auth/useCurrentUser";
import { useFollowCaches } from "../queries/useQuery/FollowQueries/useFollowCaches";
import { useFollowers } from "../queries/useQuery/FollowQueries/useFollowers";
import { useFollowingIds } from "../queries/useQuery/FollowQueries/useFollowing";
import { useUser } from "../queries/useQuery/useUser";
import { useUserCourses } from "../queries/useQuery/useUserCourses";
import type { CourseType } from "../Types/CourseType";
import type { UserType } from "../Types/UserType";

type useProfilePageFlowReturn = {
  isOwnPage: boolean;
  isLoadingData: boolean;
  pageUser?: UserType;
  currentUser: UserType;
  userCourses?: CourseType[];
  pageUserFollowers?: number[];
  followers: number[];
  following: number[];
};

export function useProfilePageFlow(userId?: string): useProfilePageFlowReturn {
  const userIdNumber = userId ? parseInt(userId, 10) : 0;

  const { data: pageUser, isLoading } = useUser(userIdNumber);
  const { data: currentUser } = useCurrentUser();
  const { data: pageUserFollowers } = useFollowers(pageUser?.id ?? 0);

  const { data: userCourses } = useUserCourses(userIdNumber);

  useFollowCaches(userIdNumber);

  const followersQuery = useFollowers(userIdNumber);
  const followingQuery = useFollowingIds(userIdNumber);

  const followers = followersQuery.data || [];
  const following = followingQuery.data || [];

  const isOwnPage = pageUser?.id == currentUser.id;

  const isLoadingData =
    !userCourses ||
    !pageUserFollowers ||
    !currentUser ||
    !pageUser ||
    !followers ||
    !following ||
    isLoading;

  return {
    isOwnPage,
    isLoadingData,
    pageUser,
    currentUser,
    userCourses,
    pageUserFollowers,
    followers,
    following,
  };
}
