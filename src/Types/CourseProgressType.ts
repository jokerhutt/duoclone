export type CourseProgressType = {
  id: number;
  userId: number;
  courseId: number;
  sectionId: number;
  isComplete: boolean;
  currentLessonId: number;
  completedLessons: number;
};
