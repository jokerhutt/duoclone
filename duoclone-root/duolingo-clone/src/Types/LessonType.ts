export type LessonType = {
  id: number;
  unitId: number;
  lessonType: TypeOfLesson;
  orderIndex: number;
  title: string;
  isPassed: boolean;
};

export type TypeOfLesson = "Lesson" | "Exercise";
