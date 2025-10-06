import { useParams } from "react-router";
import { FriendsListWidget } from "./FriendsWidget/FriendsListWidget";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileStatisticsGroup } from "./ProfileStatsWidget/ProfileStatisticsGroup";
import { UserProfileCard } from "./UserProfileCard";
import { SpinnerPage } from "../../components/layouts/SpinnerPage.tsx";
import { FollowButtonManager } from "./Follows/FollowButtonManager.tsx";
import { LogoutButton } from "../Auth/LogoutButton.tsx";
import { useProfilePageFlow } from "../../hooks/useProfilePageFlow.tsx";

export function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();

  const {
    isOwnPage,
    isLoadingData,
    pageUser,
    currentUser,
    userCourses,
    pageUserFollowers,
    followers,
    following,
  } = useProfilePageFlow(userId);

  if (isLoadingData) return <SpinnerPage />;

  return (
    <div className="w-full h-full flex overflow-y-auto lg:pb-6 pb-26 flex-col gap-4 items-center">
      <ProfileHeader />
      <UserProfileCard
        isOwnPage={isOwnPage}
        user={pageUser!}
        followers={followers.length}
        userCourseInstances={userCourses!}
      />
      <FollowButtonManager
        pageUserFollowers={pageUserFollowers!}
        currentUser={currentUser}
        pageUser={pageUser!}
        show={!isOwnPage}
      />
      <ProfileStatisticsGroup user={pageUser!} />
      <FriendsListWidget
        userId={pageUser!.id}
        concise={true}
        followers={followers}
        following={following}
      />
      <LogoutButton show={isOwnPage} />
    </div>
  );
}
