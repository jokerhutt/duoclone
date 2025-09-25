import { useState } from "react";
import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";
import { FriendsListTab } from "./FriendsListTab";
import type { friendsTabType } from "../../Types/friendsTabType";

export function FriendsListWidget() {

  const [activeTab, setActiveTab] = useState<friendsTabType>("FOLLOWING");      

  return (
    <div className="w-full px-4">
      <ContentWidget title="Friends">
        <div className="w-full flex flex-col">
          <div className="w-full flex justify-between">
            <FriendsListTab activeTab={activeTab} tabType={"FOLLOWING"}/>
            <FriendsListTab activeTab={activeTab} tabType={"FOLLOWERS"}/>
          </div>
        </div>
      </ContentWidget>
    </div>
  );
}
