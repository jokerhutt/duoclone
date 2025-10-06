import type { ButtonStyleState } from "../hooks/useLessonButton";
import type { ColorType } from "../Types/ColorType";
import type { LessonType, TypeOfLesson } from "../Types/LessonType";
import { colorMap } from "./colorMap";
import { chooseLessonImage } from "./lessonUtils";

export const getLessonIconOpacity = (isLocked: boolean) =>
  !isLocked ? "" : "brightness-50";

export const getLessonStatus = (
  lessonType: TypeOfLesson | undefined,
  isPassed: boolean,
  isCurrent: boolean
) => {
  if (lessonType == "Review" && isPassed) {
    return "REVIEW";
  } else if (isCurrent) {
    return "CURRENT";
  } else if (isPassed) {
    return "PASSED";
  } else {
    return "LOCKED";
  }
};

export const getPopoverStatus = (isCurrent: boolean) =>
  isCurrent ? "CURRENT" : "JUMP";

export const getShouldShowTopPopover = (
  isFirstInSection: boolean,
  isFirstInUnit: boolean,
  isPassed: boolean,
  isCurrent: boolean
) => {
  if (isFirstInSection || isPassed) return false;
  if (isFirstInUnit || isCurrent) return true;
  return false;
};

export const getLessonButtonStyle = (unitColor?: ColorType) =>
  unitColor ? colorMap[unitColor] : colorMap["LOCKED"];

export const getLessonButtonColor = (isLocked?: boolean, unitColor?: ColorType) => !isLocked ? unitColor : "LOCKED";

export const getLessonButtonStyleState = (unitColor: ColorType | undefined, isLocked: boolean, isPassedOrCurrent: boolean, isCurrent: boolean, isFirstInSection: boolean, lesson?: LessonType): ButtonStyleState => {
    const iconOpacity = getLessonIconOpacity(isLocked);
    const lessonImage = chooseLessonImage(lesson, isPassedOrCurrent, isCurrent, isFirstInSection)
    const unitColorToShow = getLessonButtonColor(isLocked, unitColor);
    const style = getLessonButtonStyle(unitColor);

    return {lessonImage, unitColorToShow, iconOpacity, style}


}