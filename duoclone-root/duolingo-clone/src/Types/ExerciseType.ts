export type ExerciseOption = {
  id: number;
  exerciseId: number;
  content: string | null;
  imageUrl: string | null;
  isCorrect: boolean;
};

export type Exercise = {
  id: number;
  lessonId: number;
  prompt: string;
  type: string;
  orderIndex: number;
  options: ExerciseOption[];
};