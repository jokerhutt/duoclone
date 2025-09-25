import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";

type ProfileStatsWidgetProps = {
    iconPath: string;
    statDescription: string;
    count: number;
}

export function ProfileStatsWidget() {
  return (
    <ContentWidget padding="p-2">
      <div className="w-full flex gap-2">
        <div className="w-10 flex justify-center">
          <img className="h-6" src="/icon-images/fittedStreakImg.svg" />
        </div>
        <div className="w-full flex flex-col">
          <p className="text-white text-lg">1234</p>
          <p className="text-duoGrayButtonText">Day Streak</p>
        </div>
      </div>
    </ContentWidget>
  );
}
