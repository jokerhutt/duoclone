import { HollowedArrow } from "../../../components/atoms/HollowedArrow/HollowedArrow";

type ViewMoreFriendsTabProps = {
  show: boolean;
};

export function ViewMoreFriendsTab({show}: ViewMoreFriendsTabProps) {
  return (
    <div className="px-4 py-2 w-full flex items-center justify-between border-t border-t-duoGrayBorder">
      <p className="text-lg text-white">View 4 more</p>
      <HollowedArrow />
    </div>
  );
}
