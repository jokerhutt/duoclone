import type { Exercise, ExerciseOption } from "../Types/ExerciseType";

export const splitPromptGaps = (exercise: Exercise, blankField: string) => {
  return exercise.prompt.split(blankField);
};

export const getLongestOptionLength = (exercise: Exercise) => {
  return Math.max(
    0,
    ...exercise.options.map((option) =>
      option.content ? option.content.length : 0
    )
  );
};

export const calculateBlankFieldWidth = (widthCh: number) => {
  return `calc(${widthCh}ch + 2.5rem)`;
};

export const splitAnswerFieldIntoRows = (
  items: ExerciseOption[],
  charsPerLine: number
) => {
  const rows: ExerciseOption[][] = [];
  let row: ExerciseOption[] = [];
  let len = 0;
  for (const it of items) {
    if (it.content == null) continue;
    const w = it.content.length + (row.length ? 1 : 0);
    if (row.length && len + w > charsPerLine) {
      rows.push(row);
      row = [it];
      len = it.content.length;
    } else {
      row.push(it);
      len += w;
    }
  }
  if (row.length) rows.push(row);
  return rows;
};

export const getRowsForAnswerField = (exercise: Exercise, charsPerLine: number) => {
    return Math.max(1, splitAnswerFieldIntoRows(exercise.options, charsPerLine).length)
}
