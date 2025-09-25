import { ContentWidget } from "../../components/atoms/Widget/ContentWidget";

type ProfileStatsWidgetProps = {
    iconPath: string;
    statDescription: string;
    count: number;
}

export function ProfileStatsWidget({iconPath, statDescription, count}: ProfileStatsWidgetProps) {



  return (
    <ContentWidget padding="p-2">
      <div className="w-full flex gap-2">
        <div className="w-10 flex justify-center">
          <img className="h-6" src={iconPath} />
        </div>
        <div className="w-full flex flex-col">
          <p className="text-white text-lg">{count}</p>
          <p className="text-duoGrayButtonText">{statDescription}</p>
        </div>
      </div>
    </ContentWidget>
  );
}
