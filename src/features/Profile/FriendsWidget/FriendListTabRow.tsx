import type { friendsTabType } from "../../../Types/friendsTabType";
import { FriendsListTab } from "./FriendsListTab";

type FriendListTabRowProps = {
  activeTab: friendsTabType;
  setActiveTab: React.Dispatch<React.SetStateAction<friendsTabType>>;
};

export function FriendListTabRow({
  activeTab,
  setActiveTab,
}: FriendListTabRowProps) {
  const changeTab = (tab: friendsTabType) => {
    if (activeTab == tab) return;
    setActiveTab(tab);
  };

  return (
    <div className="w-full flex justify-between">
      <FriendsListTab
        onClick={() => changeTab("FOLLOWING")}
        activeTab={activeTab}
        tabType={"FOLLOWING"}
      />
      <FriendsListTab
        onClick={() => changeTab("FOLLOWERS")}
        activeTab={activeTab}
        tabType={"FOLLOWERS"}
      />
    </div>
  );
}
