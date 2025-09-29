import type { CourseProgressType } from "./CourseProgressType";
import type { LessonType } from "./LessonType";
import type { NewStreakCount } from "./NewStreakCount";

export type LessonCompleteType = {
  userId: number;
  totalScore: number;
  newUserScore: number;
  accuracy: number;
  lessonId: number;
  updatedLesson: LessonType;
  updatedUserCourseProgress: CourseProgressType;
  newStreakCount: NewStreakCount;
  message: string;
};
