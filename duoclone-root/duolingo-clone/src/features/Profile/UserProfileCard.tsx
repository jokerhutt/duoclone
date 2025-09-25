import { useUser } from "../../queries/useQuery/useUser";
import type { UserType } from "../../Types/UserType";
import { format } from "date-fns";

type UserProfileCardProps = {
    user: UserType;
    followers: number;
}

export function UserProfileCard({user, followers}: UserProfileCardProps) {

    const ts = user.createdAt;
    const joinDate = format(new Date(ts), "MMMM yyyy");


  return (
    <>
      <div className="mt-20 flex px-4 justify-center">
        <img
          className="w-full h-50 object-cover rounded-xl"
          src={user.pfpSrc}
        />
      </div>
      <div className="w-full flex px-4 justify-between">
        <div className="w-full flex flex-col">
          <div className="w-full flex gap-1 flex-col">
            <p className="text-white text-2xl">{user.firstName} {user.lastName}</p>
            <p className="text-duoGrayButtonText font-light text-xl">
              {user.username}
            </p>
            <p className="text-duoLightGray text-lg font-light">
              Joined {joinDate}
            </p>
            <p className="text-duoBlue">{followers} Followers</p>
          </div>
        </div>

        <div className="w-full flex flex-col justify-end items-end">
          <div className="flex py-3 w-full gap-2 justify-end items-center">
            <img className="h-7" src="/flags/frenchSvg.svg" />
            <img className="h-7" src="/flags/germanSvg.svg" />
            <img className="h-7" src="/flags/spanishSvg.svg" />
          </div>
        </div>
      </div>
    </>
  );
}
