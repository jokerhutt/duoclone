import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";
import { ProfileStatsWidget } from "./ProfileStatsWidget";

export function ProfileStatisticsGroup() {
  const xpIcon = "/icon-images/fittedXpImg.svg";
  const streakIcon = "/icon-images/fittedStreakImg.svg";

  return (
    <div className="flex w-full flex-col gap-2 px-4">
      <p className="text-white text-2xl">Statistics</p>
      <div className="w-full flex gap-4 justify-between">
        <ProfileStatsWidget iconPath={streakIcon} statDescription="Day Streak" count={3}/>
        <ProfileStatsWidget iconPath={xpIcon} statDescription="Total XP" count={3}/>
      </div>
    </div>
  );
}
