import { Spinner } from "../../components/atoms/Loading/Spinner";
import { useQuests } from "../../queries/useQuery/useQuests";
import { SpinnerPage } from "../Section/SpinnerPage";
import { QuestListItem } from "./QuestListItem";

export function QuestListWidget() {
  const { data: quests, isLoading: isLoading, isError: isError } = useQuests();

  if (!quests || isLoading || isError)
    return (
      <div className="w-full p-4 my-38 flex justify-center items-center">
        <Spinner />
      </div>
    );

  const isLast = (index: number) => index == quests.length - 1;

  return (
    <div className="w-hull w-full flex flex-col gap-2">
      {quests.map((quest, index) => (
        <QuestListItem quest={quest} isLast={isLast(index)} />
      ))}
    </div>
  );
}
