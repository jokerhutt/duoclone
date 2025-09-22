import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SUBMIT_ATTEMPT } from "../../util/paths";
import type { ExerciseOption } from "../../Types/ExerciseType";
import { ExerciseComponent } from "../Exercise/ExerciseComponent";
import type { ExerciseAttemptResponse } from "../../Types/ExerciseAttemptResponse";
import { useExercises } from "../../queries/useQuery/useExercises";
import { SpinnerPage } from "../Section/SpinnerPage";
import { WideActionButton } from "../Common/WideActionButton";
import { LessonHeader } from "./LessonHeader";
import { LessonResult } from "./LessonResult";
import { bottomUpSpringAnimation } from "../../animations/BottomUpSpringAnimation";
import { BottomSheet } from "./BottomSheet";
import { ExitConfirmationSheet } from "./ExitConfirmationSheet";

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { position } = useParams<{ position: string }>();

  const id = Number(lessonId);
  const { data: exercises, isLoading } = useExercises(id, 1);

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
    setCurrentSelectedOptions((prev) =>
      prev.filter((opt) => opt.id !== option.id)
    );
  };

  const addOption = (option: ExerciseOption) => {
    setCurrentSelectedOptions((prev) =>
      prev.some((opt) => opt.id === option.id) ? prev : [...prev, option]
    );
  };

  async function submitAnswer() {
    if (!exercises) return;
    if (!lessonResponse) {
      if (position == null || currentSelectedOptions.length < 1) return;

      try {
        const response = await fetch(SUBMIT_ATTEMPT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            exerciseId: exercises[Number(position)].id,
            optionIds: currentSelectedOptions.map((option) => option.id),
            userId: 1,
          }),
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result: ExerciseAttemptResponse = await response.json();
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

  return (
    <>
      <div className="w-full h-full relative flex flex-col px-3 py-6 items-center">
        <LessonHeader handleExitClick={() => setIntendsToExit(true)} />
        <div className="my-14 flex w-full h-full pt-4">
          <ExerciseComponent
            exercise={exercises[Number(position)]}
            currentSelectedOptions={currentSelectedOptions}
            addOption={addOption}
            removeOption={removeOption}
          />
        </div>
        <WideActionButton
          text="Check"
          onSubmit={() => submitAnswer()}
          isActive={!intendsToExit && currentSelectedOptions.length > 0}
          isIncorrect={!intendsToExit && lessonResponse?.correct == false}
        />
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
        <ExitConfirmationSheet setIntendsToExit={() => setIntendsToExit(false)}/>
      </BottomSheet>
    </>
  );
}
("");
