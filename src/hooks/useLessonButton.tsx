import { useNavigate } from "react-router";
import { useCurrentUser } from "../queries/useQuery/Auth/useCurrentUser";
import { useLesson } from "../queries/useQuery/useLesson";
import { useCourseProgress } from "../queries/useQuery/useCourseProgress";
import { useCallback, useRef, useState } from "react";
import type { ColorType } from "../Types/ColorType";
import {
  getLessonStatus,
  getPopoverStatus,
  getShouldShowTopPopover,
  getLessonButtonStyleState,
} from "../util/lessonButtonUtils";
import type { LessonType } from "../Types/LessonType";

type Args = {
  id: number;
  unitOrderIndex: number;
  unitColor?: ColorType;
  currentLessonButtonRef: any;
};

export type LessonButtonState = {
  isCurrent?: boolean;
  isPassedOrCurrent?: boolean;
  isReview?: boolean;
  lessonStatus: "REVIEW" | "CURRENT" | "PASSED" | "LOCKED";
  popoverStatus: "CURRENT" | "JUMP";
  shouldShowBottomPopover?: boolean;
  shouldShowTopPopover?: boolean;
  shouldOpenTopPopover: boolean;
};

export type ButtonStyleState = {
  lessonImage: string;
  unitColorToShow: ColorType | undefined;
  iconOpacity: string;
  style: any;
};

type useLessonButtonReturn = {
  lesson?: LessonType;
  isLoading: boolean;
  open: boolean;
  buttonState: LessonButtonState;
  styleState: ButtonStyleState;
  containerRef: any | null;
  circleRef: any | null;
  handleButtonClick: () => void;
  handleChangeOpen: (open: boolean) => void;
};

export function useLessonButton({
  id,
  unitColor,
  unitOrderIndex,
  currentLessonButtonRef,
}: Args): useLessonButtonReturn {
  const navigate = useNavigate();

  const { data: lesson, isLoading: lessonLoading } = useLesson(id);
  const { data: user } = useCurrentUser();
  const { data: userCourseProgress, isLoading: userCourseProgressLoading } =
    useCourseProgress(user?.currentCourseId);

  const circleRef = useRef<HTMLButtonElement | null>(null);

  const [open, setOpen] = useState(false);

  const isCurrentLesson = lesson?.id == userCourseProgress?.currentLessonId;
  const isPassed = lesson?.isPassed;
  const isPassedOrCurrent = isPassed || isCurrentLesson;
  const isFirstLessonOfUnit = lesson?.orderIndex == 1;
  const isFirstLessonOfSection = isFirstLessonOfUnit && unitOrderIndex == 1;
  const isLocked = !(isPassedOrCurrent || isFirstLessonOfUnit);
  const shouldShowBottomPopover = isPassedOrCurrent || !isFirstLessonOfUnit;
  const shouldOpenTopPopover = isCurrentLesson && open ? false : true;

  const containerRef = isCurrentLesson ? currentLessonButtonRef : null;

  const shouldShowTopPopover = getShouldShowTopPopover(
    isFirstLessonOfSection,
    isFirstLessonOfUnit,
    !!isPassed,
    isCurrentLesson
  );
  const lessonStatus = getLessonStatus(
    lesson?.lessonType,
    !!isPassed,
    isCurrentLesson
  );

  const isReview = lesson?.lessonType == "Review" && lesson?.isPassed;

  const popoverStatus = getPopoverStatus(isCurrentLesson)

  const buttonStyleState = getLessonButtonStyleState(
    unitColor,
    isLocked,
    isPassedOrCurrent,
    isCurrentLesson,
    isFirstLessonOfSection,
    lesson
  );


  const lessonButtonState: LessonButtonState = {
    isCurrent: isCurrentLesson,
    isPassedOrCurrent: isPassedOrCurrent,
    isReview: isReview,
    lessonStatus: lessonStatus,
    popoverStatus: popoverStatus,
    shouldShowBottomPopover: shouldShowBottomPopover,
    shouldShowTopPopover: shouldShowTopPopover,
    shouldOpenTopPopover: shouldOpenTopPopover,
  };

  const handleButtonClick = useCallback(() => {
    if (shouldShowBottomPopover) {
      setOpen(true);
    } else {
      navigate(`lessons/${id}/0`);
    }
  }, [navigate, setOpen]);

  const handleChangeOpen = useCallback(
    (open: boolean) => {
      setOpen(open);
    },
    [setOpen]
  );

  const isLoading = lessonLoading || userCourseProgressLoading;

  return {
    lesson: lesson,
    isLoading: isLoading,
    open: open,
    buttonState: lessonButtonState,
    styleState: buttonStyleState,
    containerRef: containerRef,
    circleRef: circleRef,
    handleButtonClick: handleButtonClick,
    handleChangeOpen: handleChangeOpen,
  };
}
