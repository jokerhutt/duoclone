import { useNavigate } from "react-router";
import { HollowedArrow } from "../../../components/atoms/HollowedArrow/HollowedArrow";

type ViewMoreFriendsTabProps = {
  show: boolean;
  count: number;
  userId: number;
};

export function ViewMoreFriendsTab({show, count, userId}: ViewMoreFriendsTabProps) {

  const remaining = count - 3; 
  const navigate = useNavigate(); 

  if (show) return (
    <div onClick={() => navigate(`/profile/${userId}/friends`)} className="px-4 hover:cursor-pointer py-2 w-full flex items-center justify-between border-t border-t-duoGrayBorder">
      <p className="text-lg text-white">View {remaining} more</p>
      <HollowedArrow />
    </div>
  );
}
