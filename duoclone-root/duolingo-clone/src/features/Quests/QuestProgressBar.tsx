type QuestProgressBarProps = {
  completed: number;
  total: number;
};

export function QuestProgressBar({ completed, total }: QuestProgressBarProps) {
  const progressPercentage = (completed / total) * 100;

  const bgcolor = completed == total ? "bg-duoGold text-duoBackground" : "bg-duoBlue/40 text-duoLightGray"
  const textcolor = completed == total ? "text-duoBackground" : "text-duoLightGray"
  const chestIcon = completed == total ? "https://d35aaqx5ub95lt.cloudfront.net/images/goals/ca23da57929a3144934ee0571a2f44e9.svg" : "https://d35aaqx5ub95lt.cloudfront.net/images/goals/df7eda7cc1cc833ba30cd1e82781b68f.svg" 

  return (
    <div className="w-full relative">
      <div className={`w-full rounded-full flex items-center justify-center bg-duoGrayLocked h-5 overflow-hidden`}>
        <div 
          className={`absolute ${bgcolor} left-0 top-0 h-full transition-all duration-300 rounded-full`}
          style={{ width: `${progressPercentage}%` }}
        />
        
        <p className={`relative ${textcolor} z-10 mr-5`}>
          {completed} / {total}
        </p>
      </div>

      <img
        className="absolute -right-2 -bottom-1 h-7"
        src={chestIcon}
      />
    </div>
  );
}
