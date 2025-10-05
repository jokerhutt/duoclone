import { useNavigate } from "react-router";
import type { useOptionsReturn } from "./useOptions";
import type { Exercise } from "../Types/ExerciseType";
import type { ExerciseAttemptResponse } from "../Types/ExerciseAttemptResponse";
import { SUBMIT_EXERCISE_ATTEMPT } from "../constants/paths";
import { useCallback } from "react";

type Args = {
  enabled: boolean;
  lessonId: string | undefined;
  position: string | undefined;
  optsState: useOptionsReturn;
  changeLessonResponse: (res: ExerciseAttemptResponse) => void;
  clearLessonResponse: () => void;
  exercises: Exercise[];
};

export type useSubmitLessonResponse = {
  submitAnswer: () => void;
};

export function useSubmitLesson({
  enabled,
  lessonId,
  position,
  optsState,
  changeLessonResponse,
  clearLessonResponse,
  exercises,
}: Args): useSubmitLessonResponse {
  const navigate = useNavigate();

  function endLesson() {
    navigate(`/lessons/${lessonId}/complete`);
  }

  function goToNextLesson(idx: number) {
    navigate(`/lessons/${lessonId}/${idx + 1}`);
  }

  const correctSound = new Audio("/audio/correct.mp3");
  const incorrectSound = new Audio("/audio/incorrect.mp3");

  const submitAnswer = useCallback(async () => {
    if (enabled) {
      if (!exercises) return;
      if (lessonId == null) return;
      if (position == null || optsState.currentSelectedOptions.length < 1) return;

      try {
        const response = await fetch(SUBMIT_EXERCISE_ATTEMPT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            exerciseId: exercises[Number(position)].id,
            optionIds: optsState.currentSelectedOptions.map(
              (option) => option.id
            ),
          }),
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result: ExerciseAttemptResponse = await response.json();

        if (result.correct) {
          correctSound.play();
        } else {
          incorrectSound.play();
        }

        changeLessonResponse(result);

      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      const idx = Number(position);
      const isLast = idx >= exercises.length - 1;
      optsState.clearOptions();
      clearLessonResponse();

      if (isLast) {
        endLesson();
      } else {
        goToNextLesson(idx);
      }

    }
  }, [
    enabled,
    exercises,
    position,
    optsState.currentSelectedOptions,
    optsState.clearOptions,
    changeLessonResponse,
    clearLessonResponse,
    correctSound,
    incorrectSound,
    endLesson,
    goToNextLesson,
  ]);

  return { submitAnswer };
}
