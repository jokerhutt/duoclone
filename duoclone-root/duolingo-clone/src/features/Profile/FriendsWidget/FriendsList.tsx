import type { friendsTabType } from "../../../Types/friendsTabType";
import { UserRow } from "./UserRow";
import { FriendsListUserRowSkeleton } from "./FriendsListUserRowSkeleton";

type FriendsListProps = {
  activeTab: friendsTabType;
  toDisplay: number[];
};

export function FriendsList({ activeTab, toDisplay }: FriendsListProps) {
  return (
    <div className="w-full flex my-2 px-4 flex-col">
      {toDisplay.map((userId) => (
        <UserRow userId={userId} />
      ))}
    </div>
  );
}
