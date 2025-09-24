import { QuestListItem } from "./QuestListItem";

type QuestListWidgetProps = {};

export function QuestListWidget({}: QuestListWidgetProps) {
  const mocks = [1, 2, 3, 4];

  const isLast = (index: number) => index == (mocks.length - 1);

  return (
  <div className="w-hull flex flex-col gap-2">
    {mocks.map((mock, index) => (
        <QuestListItem isLast={isLast(index)}/>
    ))}
  </div>)
}
