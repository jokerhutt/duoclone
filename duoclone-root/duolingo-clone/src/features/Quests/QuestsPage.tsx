import { StreakIcon } from "../../components/atoms/Icons/StreakIcon";
import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";
import { MainFooter } from "../Common/MainFooter";
import { QuestListItem } from "./QuestListItem";
import { QuestListWidget } from "./QuestListWidget";
import { QuestsHeader } from "./QuestsHeader";

export function QuestsPage() {
  return (
    <>
      <QuestsHeader/>
      <div className="w-full p-4 my-14">
        <ContentWidget title={"Daily Quests"}>
          <QuestListWidget />
        </ContentWidget>
      </div>
    </>
  );
}
