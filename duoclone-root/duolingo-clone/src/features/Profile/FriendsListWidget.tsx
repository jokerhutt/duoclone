import { useState } from "react";
import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";
import { FriendsListTab } from "./FriendsListTab";
import type { friendsTabType } from "../../Types/friendsTabType";
import { FriendListTabRow } from "./FriendListTabRow";

export function FriendsListWidget() {

  const [activeTab, setActiveTab] = useState<friendsTabType>("FOLLOWING");      

  return (
    <div className="w-full px-4 flex flex-col">
      <ContentWidget title="Friends">
        <div className="w-full flex flex-col">
            <FriendListTabRow activeTab={activeTab}/>

            <div >

            </div>

        </div>
      </ContentWidget>
    </div>
  );
}
