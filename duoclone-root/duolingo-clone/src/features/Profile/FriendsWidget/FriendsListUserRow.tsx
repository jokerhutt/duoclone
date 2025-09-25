import { useNavigate } from "react-router";
import { useUser } from "../../../queries/useQuery/useUser";
import type { UserType } from "../../../Types/UserType";
import { FriendsListUserRowSkeleton } from "./FriendsListUserRowSkeleton";

type FriendsListUserRowProps = {
  userId: number;
}

export function FriendsListUserRow({userId}: FriendsListUserRowProps) {

  const {data: user, isLoading} = useUser(userId);
  const navigate = useNavigate();

  if (!user || isLoading) return <FriendsListUserRowSkeleton/>;

  return (
    <div className="w-full hover:cursor-pointer flex py-2" onClick={() => navigate(`/profile/${userId}`)}>
      <div className="w-20">
        <img
          className="w-11 h-11 object-cover rounded-full"
          src={user.pfpSrc}
        />
      </div>
      <div className="w-full flex flex-col">
        <p className="text-xl text-white">{user.firstName}</p>
        <p className="font-light text-duoGrayButtonText">{user.points} XP</p>
      </div>
    </div>
  );
}
