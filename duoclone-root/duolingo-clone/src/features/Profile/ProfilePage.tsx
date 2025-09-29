import { useParams } from "react-router";
import { useFollowCaches } from "../../queries/useQuery/FollowQueries/useFollowCaches";
import { useFollowers } from "../../queries/useQuery/FollowQueries/useFollowers";
import { useFollowingIds } from "../../queries/useQuery/FollowQueries/useFollowing";
import { FriendsListWidget } from "./FriendsWidget/FriendsListWidget";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileStatisticsGroup } from "./ProfileStatsWidget/ProfileStatisticsGroup";
import { UserProfileCard } from "./UserProfileCard";
import { SpinnerPage } from "../Section/SpinnerPage";
import { useUser } from "../../queries/useQuery/useUser";
import { motion, AnimatePresence } from "framer-motion";
import { FollowButtonManager } from "./FollowButtonManager";
import { fadeInStagger } from "../../animations/FadeInAnimation";
import { useCurrentUser } from "../../queries/useQuery/Auth/useCurrentUser";
import { LogoutButton } from "./LogoutButton";

export function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const userIdNumber = userId ? parseInt(userId, 10) : 0;

  const { data: pageUser, isLoading } = useUser(userIdNumber);
  const {data: currentUser} = useCurrentUser();
  const { data: pageUserFollowers } = useFollowers(pageUser?.id ?? 0);

  useFollowCaches(userIdNumber);

  const followersQuery = useFollowers(userIdNumber);
  const followingQuery = useFollowingIds(userIdNumber);

  const followers = followersQuery.data || [];
  const following = followingQuery.data || [];

  console.log("Followers:", followers);
  console.log("Following:", following);

  const isOwnPage = pageUser?.id == currentUser.id;

  if (
    !pageUserFollowers ||
    !currentUser ||
    !pageUser ||
    !followers ||
    !following ||
    isLoading
  )
    return <SpinnerPage />;

  //TODO add a more languages button? at least a page for a users languages
  return (
    <AnimatePresence>
      <motion.div {...fadeInStagger(1)} className="w-full h-full flex overflow-y-auto pb-26 flex-col gap-4 items-center">
        <ProfileHeader />
        <UserProfileCard user={pageUser} followers={followers.length} />
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
        <LogoutButton show={isOwnPage}/>
      </motion.div>
    </AnimatePresence>
  );
}
