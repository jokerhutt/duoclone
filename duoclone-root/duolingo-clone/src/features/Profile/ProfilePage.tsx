import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileStatisticsGroup } from "./ProfileStatisticsGroup";
import { UserProfileCard } from "./UserProfileCard";

export function ProfilePage() {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      <ProfileHeader />
      <UserProfileCard />
      <ProfileStatisticsGroup/>
    </div>
  );
}
