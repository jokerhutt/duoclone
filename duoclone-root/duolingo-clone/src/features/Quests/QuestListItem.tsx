import { StreakIcon } from "../../components/atoms/Icons/StreakIcon";

type QuestListItemProps = {
    isLast?: boolean;
};

export function QuestListItem({isLast}: QuestListItemProps) {

  const showBottomBorder = true ? "border-b-duoGrayBorder border-b" : ""

  return (
    <div className={`w-full flex items-center py-8 ${showBottomBorder}`}>
      <div className="w-20">
        <StreakIcon height="h-12" />
      </div>

      <div className="flex flex-col w-full justify-between gap-3">
        <div className="w-full text-white text-xl">
          <p>Extend your streak</p>
        </div>
        <div className="w-4/5 relative rounded-full bg-duoGrayLocked h-4">
          <img
            className="absolute right-0 center bottom-0"
            src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/df7eda7cc1cc833ba30cd1e82781b68f.svg"
          />
        </div>
      </div>
    </div>
  );
}
