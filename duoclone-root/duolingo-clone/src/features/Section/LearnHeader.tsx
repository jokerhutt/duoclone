import { GemsIcon } from "../../components/atoms/Icons/GemsIcon";
import { HeartIcon } from "../../components/atoms/Icons/HeartIcon";
import { LanguageFlag } from "../../components/atoms/Icons/LanguageFlag";
import { StreakIcon } from "../../components/atoms/Icons/StreakIcon";
import { Header } from "../../components/molecules/Header/Header";
import type { CourseProgressType } from "../../Types/CourseProgressType";

type LearnHeaderProps = {
  courseProgress: CourseProgressType;
};

export function LearnHeader({ courseProgress }: LearnHeaderProps) {
  return (
    <Header>
      <div className="flex gap-2 items-center">
        <LanguageFlag />
        <p className="text-xl text-white">{courseProgress.completedLessons}</p>
      </div>
      <div className="flex items-center">
        <StreakIcon />
        <p className="text-xl text-duoOrange">2</p>
      </div>
      <div className="flex gap-1 items-center">
        <GemsIcon />
        <p className="text-xl text-duoBlue">100</p>
      </div>

      <div className="flex gap-2 items-center">
        <HeartIcon /> 
        <p className="text-xl text-duoRed">5</p>
      </div>
    </Header>
  );
}
