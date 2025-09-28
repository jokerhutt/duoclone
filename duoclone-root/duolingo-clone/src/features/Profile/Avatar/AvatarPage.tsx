import { useState } from "react";
import { useCurrentUser } from "../../../queries/useQuery/Auth/useCurrentUser";
import { useAvatars } from "../../../queries/useQuery/useAvatars";
import { AvatarHeader } from "./AvatarHeader";
import { UserWideImage } from "../UserWideImage";

export function AvatarPage() {
  const { data: currentUser } = useCurrentUser();
  const { data: avatars } = useAvatars();

  function chunkArray<T>(arr: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  }

  const avatarPairs = avatars ? chunkArray(avatars, 2) : [];

  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.pfpSrc);

  const showSelectedBorder = (avatarUrl: string) => avatarUrl == selectedAvatar ? "border-6 border-duoBlue" : "";

  if (avatars && currentUser)
    return (
      <div className="w-full h-full">
        <AvatarHeader />

        <div className="mt-20 relative flex px-4 justify-center">
          <UserWideImage imgSrc={selectedAvatar} />
        </div>

        <div className="w-full pt-10 flex gap-8 flex-col items-center px-4">
          {avatarPairs.map((pair, idx) => (
            <div
              key={idx}
              className="w-full flex justify-between items-center gap-6"
            >
              {pair.map((avatarUrl, i) => (
                <img
                  onClick={() => setSelectedAvatar(avatarUrl)}  
                  key={i}
                  className={`min-h-17 max-h-17 h-17 w-full rounded-xl object-cover ${showSelectedBorder(avatarUrl)}`}
                  src={avatarUrl}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
}
