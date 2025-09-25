import { act, useState } from "react";
import { ContentWidget } from "../../../components/atoms/Widget/ContentWidget";
import { FriendsListTab } from "./FriendsListTab";
import type { friendsTabType } from "../../../Types/friendsTabType";
import { FriendListTabRow } from "./FriendListTabRow";
import { FriendsListUserRow } from "./FriendsListUserRow";
import { HollowedArrow } from "../../../components/atoms/HollowedArrow/HollowedArrow";
import { FriendsList } from "./FriendsList";

export function FriendsListWidget() {
  const [activeTab, setActiveTab] = useState<friendsTabType>("FOLLOWING");

  return (
    <div className="w-full px-4 flex flex-col">
      <ContentWidget title="Friends" padding="">
        <div className="w-full flex flex-col">
          <FriendListTabRow activeTab={activeTab} />
          <FriendsList activeTab={activeTab}/>
          <div className="px-4 py-2 w-full flex items-center justify-between border-t border-t-duoGrayBorder">
            <p className="text-lg text-white">View 4 more</p>
            <HollowedArrow />
          </div>
        </div>
      </ContentWidget>
    </div>
  );
}
