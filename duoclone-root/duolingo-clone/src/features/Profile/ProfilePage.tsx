import { ProfileHeader } from "./ProfileHeader";

export function ProfilePage() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <ProfileHeader />
      <div className="mt-30 flex px-6 justify-center">
        <img 
          className="w-full h-80 object-cover rounded-3xl" 
          src="/pfp/av3.png" 
        />
      </div>
    </div>
  );
}
