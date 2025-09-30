import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";
import { MonthlyChallengeCard } from "./MonthlyChallengeCard";
import { QuestListWidget } from "./QuestListWidget";
import { QuestsHeader } from "./QuestsHeader";

export function QuestsPage() {

  return (
    <>
      <QuestsHeader />
      <div className="w-full h-full mt-14">
        <MonthlyChallengeCard />
        <div className="w-full h-full p-4">
          <ContentWidget title={"Daily Quests"}>
            <QuestListWidget/>
          </ContentWidget>
        </div>
      </div>
    </>
  );
}
