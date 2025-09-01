import { GemsIcon } from "../atoms/Icons/GemsIcon";
import { HeartIcon } from "../atoms/Icons/HeartIcon";
import { LanguageFlag } from "../atoms/Icons/LanguageFlag";
import { StreakIcon } from "../atoms/Icons/StreakIcon";

export function LearnHeader() {
  return (
    <nav className="w-full absolute bg-duoBackground flex justify-between z-10 items-center h-14 px-2">
      <LanguageFlag />
      <StreakIcon />
      <GemsIcon />
      <HeartIcon />
    </nav>
  );
}
