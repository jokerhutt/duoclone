import { MonthlyChallengeProgressBar } from "./MonthlyChallengeProgressBar";

export function MonthlyChallengeCard () {


    return (
        <div className="w-full p-4 flex gap-4 flex-col bg-duoDarkGreen">

            <div className="flex w-full">
                <div className="bg-white py-1 px-2 rounded-lg">
                    <p className="text-duoDarkGreen">SEPTEMBER</p>
                </div>
            </div>
            <div className="w-full flex flex-col gap-2 p-4 bg-duoBackground rounded-xl">
                <p className="text-white text-lg">Complete 20 quests</p>
                <MonthlyChallengeProgressBar completed={5} total={20}/>
            </div>

        </div>
    )

}