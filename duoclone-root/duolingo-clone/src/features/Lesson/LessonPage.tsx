import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SUBMIT_ATTEMPT } from "../../util/paths";
import type { ExerciseOption } from "../../Types/ExerciseType";
import { ExerciseComponent } from "../Exercise/ExerciseComponent";
import type { ExerciseAttemptResponse } from "../../Types/ExerciseAttemptResponse";
import { useExercises } from "../../queries/useQuery/useExercises";
import { SpinnerPage } from "../Section/SpinnerPage";
import { WideActionButton } from "../Common/WideActionButton";
import { LessonHeader } from "./LessonHeader";

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { position } = useParams<{ position: string }>();

  const id = Number(lessonId); // convert
  const { data: exercises, isLoading } = useExercises(id, 1);

  const [selectedOptions, setSelectedOptions] = useState<ExerciseOption | null>(
    null
  );

  const [currentSelectedOptions, setCurrentSelectedOptions] = useState<
    ExerciseOption[]
  >([]);

  const navigate = useNavigate();

  const isSelectedOption = (option: ExerciseOption) => {
    return currentSelectedOptions.some(
      (selectedOption) => selectedOption.id == option.id
    );
  };

  function endLesson() {
    navigate(`/lessons/${lessonId}/complete`);
  }

  async function submitAttempt() {
    if (!exercises || position == null) return;
    const ok = await submitAnswer();
    if (!ok) return;

    const idx = Number(position);
    const isLast = idx >= exercises.length - 1;
    setCurrentSelectedOptions([]);

    if (isLast) {
      endLesson();
    } else {
      navigate(`/lessons/${lessonId}/${idx + 1}`);
    }
  }

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
    if (!exercises || currentSelectedOptions.length < 1) return;

    try {
      const response = await fetch(SUBMIT_ATTEMPT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId: exercises[Number(position)].id,
          optionId: currentSelectedOptions,
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result: ExerciseAttemptResponse = await response.json();
      if (result.correct) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading || !exercises) {
    return <SpinnerPage />;
  }

  return (
    <div className="w-full h-full relative flex flex-col px-3 py-6 items-center">
      <LessonHeader />
      <div className="my-14 flex w-full h-full pt-4">
        <ExerciseComponent
          exercise={exercises[Number(position)]}
          selectedOptions={selectedOptions}
          currentSelectedOptions={currentSelectedOptions}
          addOption={addOption}
          removeOption={removeOption}
          isSelectedOption={isSelectedOption}
        />
      </div>
      <WideActionButton
        text="Check"
        onSubmit={() => submitAttempt()}
        isActive={currentSelectedOptions.length > 0}
      />
    </div>
  );
}
("");
