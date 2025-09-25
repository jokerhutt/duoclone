import { useFollowMutation } from "../../queries/mutations/useFollowMutation";
import { useFollowers } from "../../queries/useQuery/FollowQueries/useFollowers";
import { useUser } from "../../queries/useQuery/useUser";
import type { UserType } from "../../Types/UserType";
import { FollowButton } from "./FollowButton";
type FollowButtonManagerProps = {
  pageUser: UserType;
  show: boolean;
};
export function FollowButtonManager({
  pageUser,
  show,
}: FollowButtonManagerProps) {
  const { data: currentUser } = useUser(1); // assuming current user ID is 1
  const { data: pageUserFollowers } = useFollowers(pageUser.id);
  const followMutation = useFollowMutation();

  const isFollowing = pageUserFollowers?.includes(1) ?? false;

  const handleFollowToggle = () => {
    if (!currentUser) return;

    followMutation.mutate({
      followerId: currentUser.id,
      followedId: pageUser.id,
      isFollowing: isFollowing,
    });
  };

  if (show) return <FollowButton handleFollow={() => handleFollowToggle()} isFollowing={isFollowing} />;
}
