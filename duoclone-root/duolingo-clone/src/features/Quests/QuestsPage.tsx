import { StreakIcon } from "../../components/atoms/Icons/StreakIcon";
import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";
import { MainFooter } from "../Common/MainFooter";
import { QuestListItem } from "./QuestListItem";
import { QuestListWidget } from "./QuestListWidget";

export function QuestsPage() {


  return (
    <div className="w-full p-4">
      <ContentWidget title={"Daily Quests"}>
        <QuestListWidget/>
      </ContentWidget>
    </div>
  );
}
