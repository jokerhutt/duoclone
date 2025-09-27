import { act, useState } from "react";
import { ContentWidget } from "../../../components/atoms/Widget/ContentWidget";
import { FriendsListTab } from "./FriendsListTab";
import type { friendsTabType } from "../../../Types/friendsTabType";
import { FriendListTabRow } from "./FriendListTabRow";
import { UserRow } from "./UserRow";
import { HollowedArrow } from "../../../components/atoms/HollowedArrow/HollowedArrow";
import { FriendsList } from "./FriendsList";
import { ViewMoreFriendsTab } from "./ViewMoreFriendsTab";

type FriendsListWidgetProps = {
  followers: number[];
  following: number[];
  concise?: boolean;
};

export function FriendsListWidget({
  followers,
  following,
  concise,
}: FriendsListWidgetProps) {
  const [activeTab, setActiveTab] = useState<friendsTabType>("FOLLOWING");

  const listToDisplay = activeTab == "FOLLOWING" ? following : followers;
  const displayedList = concise ? listToDisplay.slice(0, 3) : listToDisplay;
  const showMore = listToDisplay.length > 3;

  return (
    <div className="w-full px-4 flex flex-col">
      <ContentWidget title="Friends" padding="">
        <div className="w-full flex flex-col">
          <FriendListTabRow setActiveTab={setActiveTab} activeTab={activeTab} />
          <FriendsList activeTab={activeTab} toDisplay={displayedList} />
          <ViewMoreFriendsTab
            show={!!concise && showMore}
            count={listToDisplay.length}
          />
        </div>
      </ContentWidget>
    </div>
  );
}
