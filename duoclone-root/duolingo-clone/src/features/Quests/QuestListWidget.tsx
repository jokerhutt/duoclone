import { Spinner } from "../../components/atoms/Loading/Spinner";
import { useQuests } from "../../queries/useQuery/useQuests";
import { SpinnerPage } from "../Section/SpinnerPage";
import { QuestListItem } from "./QuestListItem";

type QuestListWidgetProps = {
  userId: number;
};

export function QuestListWidget({userId}: QuestListWidgetProps) {

  const {data: quests, isLoading: isLoading, isError: isError} = useQuests(userId);  

  if (!quests || isLoading || isError) return <SpinnerPage/>

  const isLast = (index: number) => index == (quests.length - 1);

  return (
  <div className="w-hull flex flex-col gap-2">
    {quests.map((quest, index) => (
        <QuestListItem quest={quest} isLast={isLast(index)}/>
    ))}
  </div>)
}
