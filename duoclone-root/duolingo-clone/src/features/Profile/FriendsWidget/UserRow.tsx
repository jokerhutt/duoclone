import { useNavigate } from "react-router";
import { useUser } from "../../../queries/useQuery/useUser";
import type { UserType } from "../../../Types/UserType";
import { FriendsListUserRowSkeleton } from "./FriendsListUserRowSkeleton";

type UserRow = {
  userId: number;
  userInstance?: UserType;
  specialBg?: boolean;
};

export function UserRow({ userId, specialBg, userInstance }: UserRow) {
  const { data: user } = useUser(userId);
  const navigate = useNavigate();
  const realUser = userInstance ?? user;
  const style = specialBg ? "bg-duoBlue/20" : "";

  if (!realUser) return <FriendsListUserRowSkeleton />;

  return (
    <div
      className={`w-full hover:cursor-pointer px-4 flex py-2 ${style}`}
      onClick={() => navigate(`/profile/${userId}`)}
    >
      <div className="w-20">
        <img
          className="w-11 h-11 object-cover rounded-full"
          src={realUser.pfpSrc}
        />
      </div>
      <div className={`w-full flex flex-col`}>
        <p className="text-xl text-white">{realUser.firstName}</p>
        <p className="font-light text-duoGrayButtonText">{realUser.points} XP</p>
      </div>
    </div>
  );
}
