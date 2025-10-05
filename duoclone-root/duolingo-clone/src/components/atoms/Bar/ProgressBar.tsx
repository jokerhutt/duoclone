type ProgressBarProps = {
  completed: number;
  total: number;
  barColor?: string;
  bgColor?: string;
  textColor?: string;
  showCountText?: boolean;
  showGoldOnComplete?: boolean;
  icon?: string;
};

export function ProgressBar({
  completed,
  total,
  barColor = "bg-duoGreen",
  textColor = "text-duoLightGray",
  showCountText,
  showGoldOnComplete,
  icon,
}: ProgressBarProps) {
  const progressPercentage = (completed / total) * 100;

  const barColorToShow =
    showGoldOnComplete && completed == total ? "bg-duoGold" : barColor;
  const textColorToShow =
    showGoldOnComplete && completed == total ? "text-duoBackground" : textColor;

  return (
    <div className="w-full relative">
      <div
        className={`w-full rounded-full flex items-center justify-center bg-duoGrayLocked h-5 overflow-hidden`}
      >
        <div
          className={`absolute ${barColorToShow} left-0 top-0 h-full transition-all duration-300 rounded-full`}
          style={{ width: `${progressPercentage}%` }}
        />
        {showCountText && (
          <p className={`relative ${textColorToShow} z-8 mr-5`}>
            {completed} / {total}
          </p>
        )}
      </div>
      {icon && <img className="absolute -right-2 -bottom-1 h-7" src={icon} />}
    </div>
  );
}
