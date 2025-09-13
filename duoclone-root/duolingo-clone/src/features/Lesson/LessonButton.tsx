import { useNavigate } from "react-router";
import { CircleButton } from "../../components/atoms/Button/CircleButton";
import { getOffset } from "./types/pathOffets";
import { useLesson } from "../../queries/useQuery/useLesson";
import { useCourseProgress } from "../../queries/useQuery/useCourseProgress";
import { useRef, useState } from "react";
import LessonPopover from "../../components/molecules/Dropdown/LessonPopover";
import { CircleRing } from "../../components/atoms/Button/CircleRing";
import type { ColorType } from "../../Types/ColorType";
import { LessonTopPopover } from "../../components/molecules/Dropdown/LessonTopPopover";
import { colorMap } from "../../util/colorMap";

type LessonButtonProps = {
  idx: number;
  id: number;
  unitOrderIndex: number;
  unitColor?: ColorType;
  courseIndex: number;
};

export function LessonButton({
  idx,
  id,
  courseIndex,
  unitColor,
  unitOrderIndex,
}: LessonButtonProps) {
  const navigate = useNavigate();

  const { data: lesson, isLoading: lessonLoading } = useLesson(id);
  const { data: userCourseProgress, isLoading: userCourseProgressLoading } =
    useCourseProgress(1, 1);

  const circleRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  if (lessonLoading || userCourseProgressLoading) {
    return (
      <div className="flex justify-center items-center py-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  const isPassed =
    lesson?.isPassed || userCourseProgress?.currentLessonId == lesson?.id;

  const chooseLessonImage = () => {
    if (!lesson || !lesson.lessonType || !lesson.orderIndex || !lesson.id)
      return "";

    if (lesson.orderIndex == 1 && !isPassed) {
      return "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/5e4203031e39fc43d94371565fd0d369.svg";
    }

    if (lesson.lessonType == "Lesson") {
      return "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/bfa591f6854b4de08e1656b3e8ca084f.svg";
    }

    if (lesson.lessonType == "Review" && !lesson.isPassed) {
      return "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/f4b1c683214cf55f5ddea4535b983745.svg";
    } else if (lesson.lessonType == "Review") {
      return "https://d35aaqx5ub95lt.cloudfront.net/images/path/trophies/49d034cef4f32ed000c8a343425e0497.svg";
    }

    return "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/7aa61c3f60bd961a60a46fb36e76c72f.svg";
  };

  const lessonImage: string = chooseLessonImage();

  if (!lesson) return null;

  const iconOpacity =
    isPassed || lesson?.orderIndex == 1 ? "" : "brightness-50";

  const isCurrentLesson = lesson.id == userCourseProgress?.currentLessonId;

  const unitColorToShow =
    isPassed || isCurrentLesson || lesson?.orderIndex == 1
      ? unitColor
      : "LOCKED";

  const style = unitColor ? colorMap[unitColor] : colorMap["LOCKED"];

  const handleButtonClick = () => {
    if (isPassed || isCurrentLesson || lesson.orderIndex != 1) {
      setOpen(true);
      console.log("open");
    } else {
      navigate(`lessons/${id}/0`);
    }
  };

  return (
    <>
      {lesson.lessonType == "Review" && isPassed ? (
        <button
          ref={circleRef ?? undefined}
          className="relative hover:cursor-pointer"
          onClick={handleButtonClick}
        >
          <p className="absolute inset-0 flex items-center mb-2 justify-center text-2xl text-duoSubText font-bold">
            {unitOrderIndex}
          </p>
          <img className="h-20" src={style.reviewTrophy} />
        </button>
      ) : (
        <CircleRing
          unitColor={unitColorToShow}
          offset={getOffset(courseIndex, idx)}
          show={isCurrentLesson}
        >
          <CircleButton
            icon={lessonImage}
            unitColor={unitColorToShow}
            buttonRef={circleRef}
            iconOpacity={iconOpacity}
            extraStyle={`${open ? "translate-y-[5px] shadow-none" : ""}`}
            onClick={handleButtonClick}
            offset={getOffset(courseIndex, idx)}
          />
        </CircleRing>
      )}

      {(lesson.orderIndex != 1 || isPassed || isCurrentLesson) && (
        <LessonPopover
          lessonStatus={
            lesson.lessonType == "Review" && isPassed
              ? "REVIEW"
              : isCurrentLesson
              ? "CURRENT"
              : isPassed
              ? "PASSED"
              : "LOCKED"
          }
          lessonIndex={idx}
          lesson={lesson}
          triggerRef={circleRef}
          unitColor={unitColorToShow}
          open={open}
          onOpenChange={setOpen}
        />
      )}
      {!lesson.isPassed && (lesson.orderIndex == 1 || isCurrentLesson) && (
        <LessonTopPopover
          open={isCurrentLesson && open ? false : true}
          lessonStatus={isCurrentLesson ? "CURRENT" : "JUMP"}
          onOpenChange={() => null}
          triggerRef={circleRef}
          unitColor={unitColor}
        />
      )}
    </>
  );
}
