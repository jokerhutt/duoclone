import { StreakIcon } from "../../components/atoms/Icons/StreakIcon";
import { MainFooter } from "../Common/MainFooter";

export function QuestsPage () {

    return (
        <>
            <div className="w-full p-4 flex flex-col gap-4">
                <h2 className="text-2xl text-white">Daily Quests</h2>
                <div className=" rounded-2xl p-4 border-2 h-full w-full border-duoGrayBorder">
                    <div className="w-hull flex flex-col">
                        <div className="w-full flex items-center">

                            <div className="w-20">
                                <StreakIcon height="h-12"/>
                            </div>

                            <div className="flex flex-col w-full justify-between gap-3">
                                <div className="w-full text-white text-xl">
                                    <p>Extend your streak</p>
                                </div>
                                <div className="w-4/5 rounded-full bg-duoGrayLocked h-4">

                                </div>
                            </div>
                            

                        </div>
                    </div>
                </div>
            </div>
        </>
    )


}