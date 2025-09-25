import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";
import { ProfileStatsWidget } from "./ProfileStatsWidget";


export function ProfileStatisticsGroup() {
  return (
    <div className="flex w-full flex-col gap-2 px-4">
      <p className="text-white text-2xl">Statistics</p>
      <div className="w-full flex gap-4 justify-between">
        <ProfileStatsWidget />
        <ProfileStatsWidget />
      </div>
    </div>
  );
}
