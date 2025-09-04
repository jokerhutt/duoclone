import type { CourseProgressType } from "./CourseProgressType";
import type { LessonType } from "./LessonType";

export type LessonCompleteType = {
    totalScore: number;
    lessonId: number;
    updatedLesson: LessonType,
    updatedUserCourseProgress: CourseProgressType,
    message: string;
}