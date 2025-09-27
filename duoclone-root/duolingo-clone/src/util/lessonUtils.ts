import type { LessonType } from "../Types/LessonType";

export const checkButtonStyle = (isSelected: boolean) => {
  isSelected
    ? "active:shadow-none active:translate-y-[5px] shadow-duoGreenShadow bg-duoGreen"
    : "bg-duoGrayBorder";
};

export const chooseLessonImage = (lesson: LessonType | undefined, isPassed: boolean, isCurrent: boolean) => {
    if (!lesson || !lesson.lessonType || !lesson.orderIndex || !lesson.id)
      return "";

    if (lesson.orderIndex == 1 && !isPassed) {
      return "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/5e4203031e39fc43d94371565fd0d369.svg";
    }

    if (lesson.lessonType == "Lesson" && isPassed) {
      return "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/bfa591f6854b4de08e1656b3e8ca084f.svg";
    } else if (lesson.lessonType == "Lesson" && !isPassed) {
      return "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/cbb0e971ac10030a120848c71c419892.svg"
    }


    if (lesson.lessonType == "Review" && isCurrent) {
      return "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/44fdc5acd4cc2644f6c8329939446b42.svg";
    } else if (lesson.lessonType == "Review" && !lesson.isPassed) {
      return "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/f4b1c683214cf55f5ddea4535b983745.svg";
    } else if (lesson.lessonType == "Review") {
      return "https://d35aaqx5ub95lt.cloudfront.net/images/path/trophies/49d034cef4f32ed000c8a343425e0497.svg";
    }

    return "https://d35aaqx5ub95lt.cloudfront.net/images/path/icons/7aa61c3f60bd961a60a46fb36e76c72f.svg";
}

