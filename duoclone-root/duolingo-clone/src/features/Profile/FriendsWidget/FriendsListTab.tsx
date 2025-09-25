import type { friendsTabType } from "../../../Types/friendsTabType";

type FriendsListTabProps = {
  tabType: friendsTabType;
  activeTab: friendsTabType;
};

export function FriendsListTab({ tabType, activeTab }: FriendsListTabProps) {
  const isActive = activeTab == tabType;
  const bottomBorderColor = isActive
    ? "border-b-duoBlue"
    : "border-b-duoGrayBorder";

  return (
    <div
      className={`w-full flex border-b py-2 ${bottomBorderColor} items-center justify-center`}
    >
      <p className="text-duoBlue">{tabType}</p>
    </div>
  );
}
