import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SUBMIT_ATTEMPT } from "../../../util/paths";
import type { ExerciseOption } from "../../../Types/ExerciseType";
import { ExerciseComponent } from "../molecules/ExerciseComponent";
import { Header } from "../../../components/Header/Header";
import { XIcon } from "../../../components/atoms/Icons/XIcon";
import { HeartIcon } from "../../../components/atoms/Icons/HeartIcon";
import type { ExerciseAttemptType } from "../../../Types/ExerciseAttemptType";
import type { ExerciseAttemptResponse } from "../../../Types/ExerciseAttemptResponse";
import type { LessonCompleteType } from "../../../Types/LessonCompleteType";
import { useExercises } from "../../../queries/useQuery/useExercises";
import { checkButtonStyle } from "../../../util/lessonUtils";

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { position } = useParams<{ position: string }>();

  const id = Number(lessonId); // convert
  const { data: exercises, isLoading } = useExercises(id, 1);

  const [selectedOption, setSelectedOption] = useState<ExerciseOption | null>(
    null
  );

  const navigate = useNavigate();

  const isSelectedOption = (option: ExerciseOption) => {
    return selectedOption != null && selectedOption.id == option.id;
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
    setSelectedOption(null);

    if (isLast) {
      endLesson();
    } else {
      navigate(`/lessons/${lessonId}/${idx + 1}`);
    }
  }



  async function submitAnswer() {
    if (!exercises || !selectedOption) return;

    try {
      const response = await fetch(SUBMIT_ATTEMPT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId: exercises[Number(position)].id,
          optionId: selectedOption.id,
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

  if (!lessonId || !position || !exercises || exercises.length < 1)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-duoGreen border-t-transparent"></div>
      </div>
    );

  return (
    <div className="w-full h-full relative flex flex-col px-3 py-6 items-center">
      <Header padding="px-4" height="">
        <XIcon />
        <div className="w-full h-7 px-6 py-1">
          <div className="w-full bg-duoGrayBorder rounded-4xl h-full border"></div>
        </div>
        <HeartIcon />
      </Header>
      <div className="my-14 flex w-full h-full pt-4">
        <ExerciseComponent
          exercise={exercises[Number(position)]}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          isSelectedOption={isSelectedOption}
        />
      </div>
      <div
        onClick={submitAttempt}
        className={`w-full rounded-2xl h-14 justify-center items-center ${  selectedOption
    ? "active:shadow-none active:translate-y-[5px] shadow-duoGreenShadow bg-duoGreen"
    : "bg-duoGrayBorder"} flex text-xl`}
      >
        <p className="text-duoGrayButtonText">Check</p>
      </div>
    </div>
  );
}
("");
