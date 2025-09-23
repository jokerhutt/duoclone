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
import { UnitReviewButton } from "./UnitReviewButton";
import { chooseLessonImage } from "../../util/lessonUtils";

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


  if (!lesson) return null;

  const iconOpacity =
    isPassed || lesson?.orderIndex == 1 ? "" : "brightness-50";

  const isCurrentLesson = lesson.id == userCourseProgress?.currentLessonId;

  const lessonImage: string = chooseLessonImage(lesson, isPassed, isCurrentLesson);

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
    <div className="relative">
      {lesson.lessonType == "Review" && lesson?.isPassed ? (
        <UnitReviewButton
          style={style.reviewTrophy}
          circleRef={circleRef}
          handleButtonClick={() => handleButtonClick}
          unitOrderIndex={unitOrderIndex}
        />
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
          offset={getOffset(courseIndex, idx)}
          open={isCurrentLesson && open ? false : true}
          lessonStatus={isCurrentLesson ? "CURRENT" : "JUMP"}
          unitColor={unitColor}
        />
      )}
    </div>
  );
}
