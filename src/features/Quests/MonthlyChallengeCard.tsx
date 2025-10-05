import { useMonthlyChallenge } from "../../queries/useQuery/useMonthlyChallenge";
import { getCurrentMonth } from "../../util/dateUtiils";
import { MonthlyChallengeProgressBar } from "./MonthlyChallengeProgressBar";

export function MonthlyChallengeCard() {
  const { data: monthlyChallenge } = useMonthlyChallenge();

  const completed = monthlyChallenge?.progress ?? 0;
  const total = monthlyChallenge?.total ?? 30;

  const currentMonth = getCurrentMonth();

  return (
    <div className="w-full p-4 flex gap-4 flex-col bg-duoDarkGreen">
      <div className="flex w-full">
        <div className="bg-white py-1 px-2 rounded-lg">
          <p className="text-duoDarkGreen">{currentMonth}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 p-4 bg-duoBackground rounded-xl">
        <p className="text-white text-lg">Complete {total} quests</p>
        <MonthlyChallengeProgressBar completed={completed} total={total} />
      </div>
    </div>
  );
}
