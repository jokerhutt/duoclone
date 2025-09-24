import { ProgressBar } from "../../components/atoms/Bar/ProgressBar";

type QuestProgressBarProps = {
  completed: number;
  total: number;
};

export function QuestProgressBar({ completed, total }: QuestProgressBarProps) {
  const bgcolor = "bg-duoBlue/40 text-duoLightGray";
  const chestIcon =
    completed == total
      ? "https://d35aaqx5ub95lt.cloudfront.net/images/goals/ca23da57929a3144934ee0571a2f44e9.svg"
      : "https://d35aaqx5ub95lt.cloudfront.net/images/goals/df7eda7cc1cc833ba30cd1e82781b68f.svg";
  return (
    <ProgressBar
      completed={completed}
      total={total}
      barColor={bgcolor}
      showGoldOnComplete={true}
      showCountText={true}
      icon={chestIcon}
    />
  );
}
