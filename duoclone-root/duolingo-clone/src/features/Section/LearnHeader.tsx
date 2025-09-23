import { GemsIcon } from "../../components/atoms/Icons/GemsIcon";
import { HeartIcon } from "../../components/atoms/Icons/HeartIcon";
import { LanguageFlag } from "../../components/atoms/Icons/LanguageFlag";
import { StreakIcon } from "../../components/atoms/Icons/StreakIcon";
import { Header } from "../../components/molecules/Header/Header";
import { useCurrentUser } from "../../queries/useQuery/useCurrentUser";
import type { CourseProgressType } from "../../Types/CourseProgressType";
import { SpinnerPage } from "./SpinnerPage";

type LearnHeaderProps = {
  courseProgress: CourseProgressType;
};

export function LearnHeader({ courseProgress }: LearnHeaderProps) {
  const { data: currentUser } = useCurrentUser(1);

  return (
    <Header padding="px-4">
      <div className="flex gap-3 items-center">
        <LanguageFlag />
        <p className="text-xl text-white">{courseProgress.completedLessons}</p>
      </div>
      <div className="flex gap-2 items-center">
        <StreakIcon />
        <p className="text-xl text-duoOrange">{currentUser?.streakLength}</p>
      </div>
      <div className="flex gap-1 items-center">
        <GemsIcon />
        <p className="text-xl text-duoBlue">{currentUser?.points}</p>
      </div>

      <div className="flex gap-1 items-center">
        <HeartIcon />
        <p className="text-2xl text-duoRed">∞</p>
      </div>
    </Header>
  );
}
