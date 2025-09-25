import { useParams } from "react-router";
import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";
import { useFollowCaches } from "../../queries/useQuery/FollowQueries/useFollowCaches";
import { useFollowers } from "../../queries/useQuery/FollowQueries/useFollowers";
import { useFollowingIds } from "../../queries/useQuery/FollowQueries/useFollowing";
import { FriendsListWidget } from "./FriendsWidget/FriendsListWidget";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileStatisticsGroup } from "./ProfileStatsWidget/ProfileStatisticsGroup";
import { UserProfileCard } from "./UserProfileCard";
import { SpinnerPage } from "../Section/SpinnerPage";
import { useUser } from "../../queries/useQuery/useUser";
import { FollowButton } from "./FollowButton";

export function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const userIdNumber = userId ? parseInt(userId, 10) : 0;

  const { data: pageUser, isLoading } = useUser(userIdNumber);

  useFollowCaches(userIdNumber);

  const followersQuery = useFollowers(userIdNumber);
  const followingQuery = useFollowingIds(userIdNumber);

  const followers = followersQuery.data || [];
  const following = followingQuery.data || [];

  console.log("Followers:", followers);
  console.log("Following:", following);

  const isOwnPage = pageUser?.id == 1;

  if (!pageUser || !followers || !following || isLoading)
    return <SpinnerPage />;

  return (
    <div className="w-full h-full flex overflow-y-auto pb-26 flex-col gap-4 items-center">
      <ProfileHeader />
      <UserProfileCard user={pageUser} followers={followers.length} />
      <FollowButton pageUser={pageUser} show={!isOwnPage}/>
      <ProfileStatisticsGroup user={pageUser} />
      <FriendsListWidget followers={followers} following={following} />
    </div>
  );
}
