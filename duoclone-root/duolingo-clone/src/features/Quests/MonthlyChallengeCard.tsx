import { useMonthlyChallenge } from "../../queries/useQuery/useMonthlyChallenge";
import { SpinnerPage } from "../Section/SpinnerPage";
import { MonthlyChallengeProgressBar } from "./MonthlyChallengeProgressBar";

export function MonthlyChallengeCard () {

    const {data: monthlyChallenge, isLoading: isLoading, isError: isError} = useMonthlyChallenge(1);

    const completed = monthlyChallenge?.progress ?? 10;
    const total = monthlyChallenge?.total ?? 20;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonth = monthNames[new Date().getMonth()].toUpperCase();

    return (
        <div className="w-full p-4 flex gap-4 flex-col bg-duoDarkGreen">

            <div className="flex w-full">
                <div className="bg-white py-1 px-2 rounded-lg">
                    <p className="text-duoDarkGreen">{currentMonth}</p>
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 p-4 bg-duoBackground rounded-xl">
                <p className="text-white text-lg">Complete {total} quests</p>
                <MonthlyChallengeProgressBar completed={completed} total={total}/>
            </div>

        </div>
    )

}