import { GemsIcon } from "../Icons/GemsIcon";
import { HeartIcon } from "../Icons/HeartIcon";
import { LanguageFlag } from "../Icons/LanguageFlag";
import { StreakIcon } from "../Icons/StreakIcon";


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