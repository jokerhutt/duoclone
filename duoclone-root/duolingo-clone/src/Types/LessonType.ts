export type LessonType = {

    id: number;
    unitId: number;
    type: "Lesson" | "Exercise"
}

export const mockLessons: LessonType[] = [
  // Unit 1
  { id: 1, unitId: 1, type: "Lesson" },
  { id: 2, unitId: 1, type: "Lesson" },
  { id: 3, unitId: 1, type: "Exercise" },
  { id: 4, unitId: 1, type: "Lesson" },
  { id: 5, unitId: 1, type: "Lesson" },
  { id: 6, unitId: 1, type: "Lesson" },
  { id: 7, unitId: 1, type: "Lesson" },
  { id: 8, unitId: 1, type: "Lesson" },

  // Unit 2
  { id: 9, unitId: 2, type: "Lesson" },
  { id: 10, unitId: 2, type: "Lesson" },
  { id: 11, unitId: 2, type: "Exercise" },
  { id: 12, unitId: 2, type: "Lesson" },
  { id: 13, unitId: 2, type: "Lesson" },
  { id: 14, unitId: 2, type: "Lesson" },
  { id: 15, unitId: 2, type: "Lesson" },
  { id: 16, unitId: 2, type: "Lesson" },

  // Unit 3
  { id: 17, unitId: 3, type: "Lesson" },
  { id: 18, unitId: 3, type: "Lesson" },
  { id: 19, unitId: 3, type: "Exercise" },
  { id: 20, unitId: 3, type: "Lesson" },
  { id: 21, unitId: 3, type: "Lesson" },
  { id: 22, unitId: 3, type: "Lesson" },
  { id: 23, unitId: 3, type: "Lesson" },
  { id: 24, unitId: 3, type: "Lesson" },

  // Unit 4
  { id: 25, unitId: 4, type: "Lesson" },
  { id: 26, unitId: 4, type: "Lesson" },
  { id: 27, unitId: 4, type: "Exercise" },
  { id: 28, unitId: 4, type: "Lesson" },
  { id: 29, unitId: 4, type: "Lesson" },
  { id: 30, unitId: 4, type: "Lesson" },
  { id: 31, unitId: 4, type: "Lesson" },
  { id: 32, unitId: 4, type: "Lesson" },

  // Unit 5
  { id: 33, unitId: 5, type: "Lesson" },
  { id: 34, unitId: 5, type: "Lesson" },
  { id: 35, unitId: 5, type: "Exercise" },
  { id: 36, unitId: 5, type: "Lesson" },
  { id: 37, unitId: 5, type: "Lesson" },
  { id: 38, unitId: 5, type: "Lesson" },
  { id: 39, unitId: 5, type: "Lesson" },
  { id: 40, unitId: 5, type: "Lesson" },

  // Unit 6
  { id: 41, unitId: 6, type: "Lesson" },
  { id: 42, unitId: 6, type: "Lesson" },
  { id: 43, unitId: 6, type: "Exercise" },
  { id: 44, unitId: 6, type: "Lesson" },
  { id: 45, unitId: 6, type: "Lesson" },
  { id: 46, unitId: 6, type: "Lesson" },
  { id: 47, unitId: 6, type: "Lesson" },
  { id: 48, unitId: 6, type: "Lesson" },
];