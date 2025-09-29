import { useFollowMutation } from "../../queries/mutations/useFollowMutation";
import type { UserType } from "../../Types/UserType";
import { FollowButton } from "./FollowButton";
type FollowButtonManagerProps = {
  pageUser: UserType;
  pageUserFollowers: number[];
  currentUser: UserType;
  show: boolean;
};
export function FollowButtonManager({
  pageUser,
  show,
  currentUser,
  pageUserFollowers
}: FollowButtonManagerProps) {
  const followMutation = useFollowMutation();
  
  const isFollowing = pageUserFollowers?.includes(currentUser.id) ?? false;

  const handleFollowToggle = () => {
    if (!currentUser) return;

    followMutation.mutate({
      followedId: pageUser.id,
      isFollowing: isFollowing,
    });
  };

  if (show) return <FollowButton handleFollow={() => handleFollowToggle()} isFollowing={isFollowing} />;
}
