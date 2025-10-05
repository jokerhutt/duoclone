import { useCallback, useState } from "react";
import type { Exercise } from "../Types/ExerciseType";
import type { ExerciseAttemptResponse } from "../Types/ExerciseAttemptResponse";
import { useOptions, type useOptionsReturn } from "./useOptions";
import {
  useSubmitLesson,
} from "./useSubmitLesson";

type useLessonFlowProps = {
  lessonId: string | undefined;
  position: string | undefined;
  exercises?: Exercise[];
};

type useLessonFlowReturn = {
  lessonResponse: ExerciseAttemptResponse | null;
  submitAnswer: () => void;
  optsState: useOptionsReturn;
};

export function useLessonFlow({
  lessonId,
  position,
  exercises = [],
}: useLessonFlowProps): useLessonFlowReturn {
  const [lessonResponse, setLessonResponse] =
    useState<ExerciseAttemptResponse | null>(null);

  const optsState = useOptions({ enabled: !lessonResponse });

  const clearLessonResponse = useCallback(function clearLessonResponse() {
    setLessonResponse(null);
  }, []);

  const changeLessonResponse = useCallback(function changeLessonResponse(
    result: ExerciseAttemptResponse
  ) {
    setLessonResponse(result);
  },
  []);

  const { submitAnswer } = useSubmitLesson({
    enabled: !lessonResponse,
    lessonId: lessonId,
    position: position,
    optsState: optsState,
    changeLessonResponse: changeLessonResponse,
    clearLessonResponse: clearLessonResponse,
    exercises: exercises,
  });

  return { lessonResponse, optsState, submitAnswer };
}
