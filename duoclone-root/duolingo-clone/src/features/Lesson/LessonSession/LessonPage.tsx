import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SUBMIT_EXERCISE_ATTEMPT } from "../../../constants/paths.ts";
import type { ExerciseOption } from "../../../Types/ExerciseType.ts";
import { ExerciseComponent } from "../../Exercise/ExerciseComponent.tsx";
import type { ExerciseAttemptResponse } from "../../../Types/ExerciseAttemptResponse.ts";
import { useExercises } from "../../../queries/useQuery/useExercises.tsx";
import { SpinnerPage } from "../../../components/layouts/SpinnerPage.tsx";
import { WideActionButton } from "../../../components/atoms/Button/WideActionButton.tsx";
import { LessonHeader } from "../LessonHeader.tsx";
import { LessonResult } from "./LessonResult.tsx";
import { BottomSheet } from "../../../effects/ModalSheet/BottomSheet.tsx";
import { ExitConfirmationSheet } from "../ExitConfirmationSheet.tsx";

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { position } = useParams<{ position: string }>();

  const id = Number(lessonId);
  const { data: exercises, isLoading } = useExercises(id);

  const correctSound = new Audio("/audio/correct.mp3");
  const incorrectSound = new Audio("/audio/incorrect.mp3");

  const [currentSelectedOptions, setCurrentSelectedOptions] = useState<
    ExerciseOption[]
  >([]);

  const [intendsToExit, setIntendsToExit] = useState(false);

  const [lessonResponse, setLessonResponse] =
    useState<ExerciseAttemptResponse | null>(null);

  const navigate = useNavigate();

  function endLesson() {
    navigate(`/lessons/${lessonId}/complete`);
  }

  useEffect(() => {
    if (!lessonResponse) return;
  }, [lessonResponse]);

  const removeOption = (option: ExerciseOption) => {
    if (lessonResponse) return;
    setCurrentSelectedOptions((prev) =>
      prev.filter((opt) => opt.id !== option.id)
    );
  };

  const addOption = (option: ExerciseOption) => {
    if (lessonResponse) return;
    setCurrentSelectedOptions((prev) =>
      prev.some((opt) => opt.id === option.id) ? prev : [...prev, option]
    );
  };

  async function submitAnswer() {
    if (!exercises) return;
    if (!lessonResponse) {
      if (position == null || currentSelectedOptions.length < 1) return;

      try {
        const response = await fetch(SUBMIT_EXERCISE_ATTEMPT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            exerciseId: exercises[Number(position)].id,
            optionIds: currentSelectedOptions.map((option) => option.id),
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

        setLessonResponse(result);
        if (result.correct) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      const idx = Number(position);
      const isLast = idx >= exercises.length - 1;
      setCurrentSelectedOptions([]);
      setLessonResponse(null);

      if (isLast) {
        endLesson();
      } else {
        navigate(`/lessons/${lessonId}/${idx + 1}`);
      }
    }
  }

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
