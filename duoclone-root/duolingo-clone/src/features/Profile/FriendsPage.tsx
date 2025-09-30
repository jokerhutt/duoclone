import { useParams } from "react-router";
import { useFollowers } from "../../queries/useQuery/FollowQueries/useFollowers";
import { useFollowingIds } from "../../queries/useQuery/FollowQueries/useFollowing";
import { useFollowCaches } from "../../queries/useQuery/FollowQueries/useFollowCaches";
import { FriendsListWidget } from "./FriendsWidget/FriendsListWidget";
import { useCourseProgress } from "../../queries/useQuery/useCourseProgress";

export function FriendsPage() {
  const { userId } = useParams<{ userId: string }>();
  const userIdNumber = userId ? parseInt(userId, 10) : 0;

  useFollowCaches(userIdNumber);

  const followersQuery = useFollowers(userIdNumber);
  const followingQuery = useFollowingIds(userIdNumber);

  const followers = followersQuery.data || [];
  const following = followingQuery.data || [];

  return (
    <div className="w-full h-full">
      <div className="h-full w-full lg:pt-6 lg:pb-0 pt-20 pb-20">
        <FriendsListWidget
          userId={userIdNumber}
          followers={followers}
          following={following}
        />
      </div>
    </div>
  );
}
