export type LessonType = {

    id: number;
    unitId: number;
    lessonType: TypeOfLesson;
    orderIndex: number;
    title: string;
}

export type TypeOfLesson = "Lesson" | "Exercise"