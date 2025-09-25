import { ProfileHeader } from "./ProfileHeader";
import { UserProfileCard } from "./UserProfileCard";

export function ProfilePage() {
  return (
    <div className="w-full h-full flex flex-col gap-4 items-center">
      <ProfileHeader />
      <UserProfileCard />
    </div>
  );
}
