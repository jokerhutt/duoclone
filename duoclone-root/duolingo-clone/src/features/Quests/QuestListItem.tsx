import { StreakIcon } from "../../components/atoms/Icons/StreakIcon";
import { QUEST_METADATA } from "../../Types/QuestCategory";
import type { QuestType } from "../../Types/QuestType";
import { QuestProgressBar } from "./QuestProgressBar";

type QuestListItemProps = {
    isLast?: boolean;
    quest: QuestType;
};

export function QuestListItem({isLast, quest}: QuestListItemProps) {

  const total = quest.total;
  const completed = quest.progress;

  const showBottomBorder = true ? "border-b-duoGrayBorder border-b" : ""

  const metaData = QUEST_METADATA[quest.code];

  return (
    <div className={`w-full flex items-center py-7 ${showBottomBorder}`}>
      <div className="w-20">
        <img className="h-16" src={metaData.iconUrl}/>
      </div>

      <div className="flex flex-col w-3/4 justify-between gap-3">
        <div className="w-full text-white text-xl">
          <p>{metaData.description}</p>
        </div>
        <QuestProgressBar completed={completed} total={total}/>
      </div>
    </div>
  );
}
