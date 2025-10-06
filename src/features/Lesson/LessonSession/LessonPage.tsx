import { useState } from "react";
import { useParams } from "react-router-dom";

import { ExerciseComponent } from "../../Exercise/ExerciseComponent.tsx";
import { useExercises } from "../../../queries/useQuery/useExercises.tsx";
import { SpinnerPage } from "../../../components/layouts/SpinnerPage.tsx";
import { WideActionButton } from "../../../components/atoms/Button/WideActionButton.tsx";
import { LessonHeader } from "../LessonHeader.tsx";
import { LessonResult } from "./LessonResult.tsx";
import { BottomSheet } from "../../../effects/ModalSheet/BottomSheet.tsx";
import { ExitConfirmationSheet } from "../ExitConfirmationSheet.tsx";
import { useLessonFlow } from "../../../hooks/useLessonFlow.tsx";

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { position } = useParams<{ position: string }>();
  const id = Number(lessonId);

  const { data: exercises, isLoading } = useExercises(id);

  const { lessonResponse, submitAnswer, optsState } = useLessonFlow({
    lessonId: lessonId,
    position,
    exercises,
  });
  const { currentSelectedOptions, addOption, removeOption } = optsState;

  const [intendsToExit, setIntendsToExit] = useState(false);

  if (isLoading || !exercises) {
    return <SpinnerPage />;
  }

  const numPosition = Number(position);
  const completed = lessonResponse ? numPosition + 1 : numPosition;

  return (
    <>
      <div className="w-full lg:px-40 lg:py-10 h-full relative flex flex-col px-3 py-6 items-center">
        <LessonHeader
          completed={completed}
          total={exercises.length}
          handleExitClick={() => setIntendsToExit(true)}
        />
        <div className="my-6 flex w-full lg:px-40 h-full pt-4">
          <ExerciseComponent
            exercise={exercises[Number(position)]}
            currentSelectedOptions={currentSelectedOptions}
            addOption={addOption}
            removeOption={removeOption}
          />
        </div>
        <div className="w-full flex lg:justify-end lg:px-40">
          <WideActionButton
            height={"h-14 lg:w-40"}
            text="Check"
            onSubmit={() => submitAnswer()}
            isActive={!intendsToExit && currentSelectedOptions.length > 0}
            isIncorrect={!intendsToExit && lessonResponse?.correct == false}
          />
        </div>
      </div>

      <BottomSheet
        isActive={!!lessonResponse && !intendsToExit}
        key={`result-${Number(position)}-${lessonResponse?.correct}`}
      >
        {!!lessonResponse && (
          <LessonResult
            correctAnswer={lessonResponse.correctAnswer}
            isCorrect={lessonResponse.correct}
          />
        )}
      </BottomSheet>

      <BottomSheet
        isActive={intendsToExit}
        onClose={() => setIntendsToExit(false)}
        isFullScreen={true}
        key={1}
        bgColor="bg-duoDarkGrayAlt"
      >
        <ExitConfirmationSheet
          setIntendsToExit={() => setIntendsToExit(false)}
        />
      </BottomSheet>
    </>
  );
}
("");
