import type { Exercise, ExerciseOption } from "../Types/ExerciseType";

export const splitPromptGaps = (exercise: Exercise, blankField: string) => {
  return exercise.prompt.split(blankField);
};

export const getLongestOptionLength = (exercise: Exercise) => {
  return Math.max(
    0,
    ...exercise.options.map((option) => (option.content ? option.content.length : 0))
  );
};

export const calculateBlankFieldWidth = (widthCh: number) => {
    return `calc(${widthCh}ch + 2.5rem)`
}
