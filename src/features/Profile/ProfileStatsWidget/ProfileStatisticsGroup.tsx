import type { UserType } from "../../../Types/UserType";
import { ProfileStatsWidget } from "./ProfileStatsWidget";

type ProfileStatisticsGroupProps = {
  user: UserType;
};

export function ProfileStatisticsGroup({ user }: ProfileStatisticsGroupProps) {
  const xpIcon = "/icon-images/fittedXpImg.svg";
  const streakIcon = "/icon-images/fittedStreakImg.svg";

  return (
    <div className="flex w-full flex-col gap-3 px-4">
      <p className="text-white text-2xl">Statistics</p>
      <div className="w-full flex gap-4 justify-between">
        <ProfileStatsWidget
          iconPath={streakIcon}
          statDescription="Day Streak"
          count={user.streakLength}
        />
        <ProfileStatsWidget
          iconPath={xpIcon}
          statDescription="Total XP"
          count={user.points}
        />
      </div>
    </div>
  );
}
