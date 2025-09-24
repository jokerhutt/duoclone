import { ProgressBar } from "../../components/atoms/Bar/ProgressBar";

type MonthlyChallengeProgressBarProps = {
  completed: number;
  total: number;
};

export function MonthlyChallengeProgressBar({
  completed,
  total,
}: MonthlyChallengeProgressBarProps) {
  const chestIcon =
    "https://d35aaqx5ub95lt.cloudfront.net/images/58175d43db9f94dc1d83cd35d63ef58d.svg";
 
  const bgcolor = "text-duoBackground bg-duoDarkGreen"

  return (
    <ProgressBar
      completed={completed}
      total={total}
      barColor={bgcolor}
      showGoldOnComplete={true}
      showCountText={true}
      icon={chestIcon}
    />
  )
}
