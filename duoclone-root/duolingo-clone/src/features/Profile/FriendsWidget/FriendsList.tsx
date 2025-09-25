import type { friendsTabType } from "../../../Types/friendsTabType";
import { FriendsListUserRow } from "./FriendsListUserRow";

type FriendsListProps = {
  activeTab: friendsTabType;
};

export function FriendsList({ activeTab }: FriendsListProps) {
  return (
    <div className="w-full flex my-2 px-4 flex-col">
      <FriendsListUserRow />
      <FriendsListUserRow />
      <FriendsListUserRow />
    </div>
  );
}
