import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";
import { MonthlyChallengeCard } from "./MonthlyChallengeCard";
import { QuestListWidget } from "./QuestListWidget";
import { QuestsHeader } from "./QuestsHeader";

export function QuestsPage() {
  return (
    <>
      <QuestsHeader />
      <div className="w-full lg:mt-0 mt-14  pb-20 lg:pb-0">
        <MonthlyChallengeCard />
        <div className="w-full h-full p-4">
          <ContentWidget padding="pl-4 pr-6" title={"Daily Quests"}>
            <QuestListWidget />
          </ContentWidget>
        </div>
      </div>
    </>
  );
}
