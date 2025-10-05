import { useParams } from "react-router";
import { useFollowCaches } from "../../queries/useQuery/FollowQueries/useFollowCaches";
import { useFollowers } from "../../queries/useQuery/FollowQueries/useFollowers";
import { useFollowingIds } from "../../queries/useQuery/FollowQueries/useFollowing";
import { FriendsListWidget } from "./FriendsWidget/FriendsListWidget";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileStatisticsGroup } from "./ProfileStatsWidget/ProfileStatisticsGroup";
import { UserProfileCard } from "./UserProfileCard";
import { SpinnerPage } from "../../components/layouts/SpinnerPage.tsx";
import { useUser } from "../../queries/useQuery/useUser";
import { FollowButtonManager } from "./Follows/FollowButtonManager.tsx";
import { useCurrentUser } from "../../queries/useQuery/Auth/useCurrentUser";
import { LogoutButton } from "../Auth/LogoutButton.tsx";
import { useUserCourses } from "../../queries/useQuery/useUserCourses";

export function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
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

  console.log("Followers:", followers);
  console.log("Following:", following);

  const isOwnPage = pageUser?.id == currentUser.id;

  if (
    !userCourses ||
    !pageUserFollowers ||
    !currentUser ||
    !pageUser ||
    !followers ||
    !following ||
    isLoading
  )
    return <SpinnerPage />;

  return (
    <div className="w-full h-full flex overflow-y-auto lg:pb-6 pb-26 flex-col gap-4 items-center">
      <ProfileHeader />
      <UserProfileCard
        isOwnPage={isOwnPage}
        user={pageUser}
        followers={followers.length}
        userCourseInstances={userCourses}
      />
      <FollowButtonManager
        pageUserFollowers={pageUserFollowers}
        currentUser={currentUser}
        pageUser={pageUser}
        show={!isOwnPage}
      />
      <ProfileStatisticsGroup user={pageUser} />
      <FriendsListWidget
        userId={pageUser.id}
        concise={true}
        followers={followers}
        following={following}
      />
      <LogoutButton show={isOwnPage} />
    </div>
  );
}
