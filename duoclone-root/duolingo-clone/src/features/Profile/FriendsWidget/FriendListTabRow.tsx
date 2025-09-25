import type { friendsTabType } from "../../../Types/friendsTabType";
import { FriendsListTab } from "./FriendsListTab";

type FriendListTabRowProps = {
  activeTab: friendsTabType;
};

export function FriendListTabRow({ activeTab }: FriendListTabRowProps) {
  return (
    <div className="w-full flex justify-between">
      <FriendsListTab activeTab={activeTab} tabType={"FOLLOWING"} />
      <FriendsListTab activeTab={activeTab} tabType={"FOLLOWERS"} />
    </div>
  );
}
