import type { friendsTabType } from "../../../Types/friendsTabType";

type FriendsListTabProps = {
  tabType: friendsTabType;
  activeTab: friendsTabType;
  onClick: () => void;
};

export function FriendsListTab({
  tabType,
  activeTab,
  onClick,
}: FriendsListTabProps) {
  const isActive = activeTab == tabType;
  const bottomBorderColor = isActive
    ? "border-b-duoBlue"
    : "border-b-duoGrayBorder";

  return (
    <div
      onClick={onClick}
      className={`w-full hover:cursor-pointer flex border-b py-2 ${bottomBorderColor} items-center justify-center`}
    >
      <p className="text-duoBlue">{tabType}</p>
    </div>
  );
}
