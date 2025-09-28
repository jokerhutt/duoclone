import { StreakIcon } from "../../components/atoms/Icons/StreakIcon";
import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";
import { useCurrentUser } from "../../queries/useQuery/Auth/useCurrentUser";
import { MainFooter } from "../Common/MainFooter";
import { SpinnerPage } from "../Section/SpinnerPage";
import { MonthlyChallengeCard } from "./MonthlyChallengeCard";
import { QuestListItem } from "./QuestListItem";
import { QuestListWidget } from "./QuestListWidget";
import { QuestsHeader } from "./QuestsHeader";

export function QuestsPage() {

  const {data: currentUser} = useCurrentUser();

  if (!currentUser) return <SpinnerPage/>

  return (
    <>
      <QuestsHeader />
      <div className="w-full my-14">
        <MonthlyChallengeCard userId={currentUser.id}/>
        <div className="w-full p-4">
          <ContentWidget title={"Daily Quests"}>
            <QuestListWidget userId={currentUser.id}/>
          </ContentWidget>
        </div>
      </div>
    </>
  );
}
