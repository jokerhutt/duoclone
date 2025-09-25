import { HollowedArrow } from "../../../components/atoms/HollowedArrow/HollowedArrow";

type ViewMoreFriendsTabProps = {
  show: boolean;
  count: number;
};

export function ViewMoreFriendsTab({show, count}: ViewMoreFriendsTabProps) {

  const remaining = count - 3;  

  if (show) return (
    <div className="px-4 py-2 w-full flex items-center justify-between border-t border-t-duoGrayBorder">
      <p className="text-lg text-white">View {remaining} more</p>
      <HollowedArrow />
    </div>
  );
}
