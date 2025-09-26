import { Spinner } from "../../components/atoms/Loading/Spinner";
import { useQuests } from "../../queries/useQuery/useQuests";
import { SpinnerPage } from "../Section/SpinnerPage";
import { QuestListItem } from "./QuestListItem";

type QuestListWidgetProps = {};

export function QuestListWidget({}: QuestListWidgetProps) {

  const {data: quests, isLoading: isLoading, isError: isError} = useQuests(1);  

  if (!quests || isLoading || isError) return;

  const isLast = (index: number) => index == (quests.length - 1);

  return (
  <div className="w-hull flex flex-col gap-2">
    {quests.map((quest, index) => (
        <QuestListItem quest={quest} isLast={isLast(index)}/>
    ))}
  </div>)
}
