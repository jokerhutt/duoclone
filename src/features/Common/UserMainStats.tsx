import { useNavigate } from "react-router";
import { GemsIcon } from "../../components/atoms/Icons/GemsIcon";
import { HeartIcon } from "../../components/atoms/Icons/HeartIcon";
import { LanguageFlag } from "../../components/atoms/Icons/LanguageFlag";
import { StreakIcon } from "../../components/atoms/Icons/StreakIcon";
import type { CourseProgressType } from "../../Types/CourseProgressType";
import type { CourseType } from "../../Types/CourseType";
import type { UserType } from "../../Types/UserType";

type UserMainStatsProps = {
    courseObject: CourseType;
    courseProgress: CourseProgressType;
    currentUser: UserType;
}

export function UserMainStats({courseObject, courseProgress, currentUser}: UserMainStatsProps) {

  const navigate = useNavigate();  

  return (
    <div className="flex w-full justify-between">
      <div className="flex gap-3 items-center">
        <div className="hover:cursor-pointer" onClick={() => navigate("/courses")}>
          <LanguageFlag height="h-8" icon={courseObject?.imgSrc} />
        </div>
        <p className="text-xl text-white">{courseProgress.completedLessons}</p>
      </div>
      <div  className="flex gap-2 items-center">
        <StreakIcon />
        <p className="text-xl text-duoOrange">{currentUser.streakLength}</p>
      </div>
      <div className="flex gap-1 items-center">
        <GemsIcon />
        <p className="text-xl text-duoBlue">{currentUser.points}</p>
      </div>

      <div className="flex gap-1 items-center">
        <HeartIcon />
        <p className="text-2xl text-duoRed">∞</p>
      </div>
    </div>
  );
}
