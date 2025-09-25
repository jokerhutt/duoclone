import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";
import { FriendsListWidget } from "./FriendsListWidget";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileStatisticsGroup } from "./ProfileStatisticsGroup";
import { UserProfileCard } from "./UserProfileCard";

export function ProfilePage() {
  return (
    <div className="w-full h-full flex overflow-y-auto pb-26 flex-col gap-4 items-center">
      <ProfileHeader />
      <UserProfileCard />
      <ProfileStatisticsGroup/>
      <FriendsListWidget/>


    </div>
  );
}
