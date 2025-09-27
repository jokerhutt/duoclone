import { useState } from "react";
import { GemsIcon } from "../../components/atoms/Icons/GemsIcon";
import { HeartIcon } from "../../components/atoms/Icons/HeartIcon";
import { LanguageFlag } from "../../components/atoms/Icons/LanguageFlag";
import { StreakIcon } from "../../components/atoms/Icons/StreakIcon";
import { Header } from "../../components/molecules/Header/Header";
import { useCurrentUser } from "../../queries/useQuery/useCurrentUser";
import type { CourseProgressType } from "../../Types/CourseProgressType";
import { SpinnerPage } from "./SpinnerPage";
import { useNavigate } from "react-router";
import { useCourse } from "../../queries/useQuery/useCourse";
import type { CourseType } from "../../Types/CourseType";
import { useUser } from "../../queries/useQuery/useUser";

type LearnHeaderProps = {
  courseProgress: CourseProgressType;
};

export function LearnHeader({ courseProgress }: LearnHeaderProps) {

  const { data: currentUser } = useUser(1);
  const { data: course, isLoading} = useCourse(courseProgress.courseId);
  const courseObject = course as CourseType;

  const navigate = useNavigate();

  if (course) return (
    <div className="flex flex-col w-full relative">
      <Header padding="px-4">
        <div className="flex gap-3 items-center">
          <div onClick={() => navigate("/courses")}>
            <LanguageFlag height="h-8" icon={courseObject.imgSrc}/>
          </div>
          <p className="text-xl text-white">
            {courseProgress.completedLessons}
          </p>
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
    </div>
  );
}
