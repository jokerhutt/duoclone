import { GemsIcon } from "../UI/Icons/GemsIcon";
import { HeartIcon } from "../UI/Icons/HeartIcon";
import { LanguageFlag } from "../UI/Icons/LanguageFlag";
import { StreakIcon } from "../UI/Icons/StreakIcon";

export function LearnHeader () {

    return(
                <nav className='w-full absolute bg-duoBackground flex justify-between z-10 items-center h-14 px-2'>
                  <LanguageFlag/>
                  <StreakIcon/>
                  <GemsIcon/>
                  <HeartIcon/>
                </nav>

    )

}