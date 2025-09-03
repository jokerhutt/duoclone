import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GET_EXERCISES_BY_LESSON, SUBMIT_ATTEMPT } from "../../../util/paths";
import type { Exercise, ExerciseOption } from "../../../Types/ExerciseType";
import { ExerciseComponent } from "../molecules/ExerciseComponent";
import { Header } from "../../../components/Header/Header";
import { XIcon } from "../../../components/atoms/Icons/XIcon";
import { HeartIcon } from "../../../components/atoms/Icons/HeartIcon";
import type { ExerciseAttemptType } from "../../../Types/ExerciseAttemptType";
import type { ExerciseAttemptResponse } from "../../../Types/ExerciseAttemptResponse";
import type { LessonCompleteType } from "../../../Types/LessonCompleteType";

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { position } = useParams<{ position: string }>();

  const [exercises, setExercises] = useState<Exercise[]>();
  const [selectedOption, setSelectedOption] = useState<ExerciseOption | null>(
    null
  );

  const navigate = useNavigate();

  const checkButtonStyle = selectedOption
    ? "active:shadow-none active:translate-y-[5px] shadow-duoGreenShadow bg-duoGreen"
    : "bg-duoGrayBorder";

  const isSelectedOption = (option: ExerciseOption) => {
    return selectedOption != null && selectedOption.id == option.id;
  };
  useEffect(() => {
    if (!lessonId) return;
    fetch(GET_EXERCISES_BY_LESSON(Number(lessonId)))
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA: " + JSON.stringify(data));
        setExercises(data);
      });
  }, [lessonId]);

  const goToNextExercise = () => {
    console.log("POS: " + position + " EXERCISES LEN: " + exercises?.length);
    if (selectedOption && position && exercises) {
      if (Number(position) < exercises.length - 1) {
        const next = Number(position) + 1;

        setSelectedOption(null);
        navigate(`/lessons/${lessonId}/${next}`);
      } else if (Number(position) == exercises.length - 1) {
        setSelectedOption(null);
        navigate("/");
      }
    }
  };

  function endLesson() {
    // placeholder
    setSelectedOption(null);
    navigate("/");
  }

  async function handleAfterSubmit() {
    if (!exercises || position == null) return;
    const ok = await submitAnswer();
    if (!ok) return;

    const idx = Number(position);
    const isLast = idx >= exercises.length - 1;
    setSelectedOption(null);

    if (isLast) {
      await GetLessonComplete();
      endLesson();
    } else {
      navigate(`/lessons/${lessonId}/${idx + 1}`);
    }
  }

  async function GetLessonComplete() {
    const data = {
      lessonId: lessonId,
      userId: 1,
      courseId: 1,
    };

    try {
      const response = await fetch(SUBMIT_ATTEMPT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exerciseAttemptRequest: data }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const result: LessonCompleteType = await response.json();
      console.log(JSON.stringify(response));
    } catch (error) {
      console.log(error);
    }
  }

  async function submitAnswer() {
    if (!exercises || !selectedOption) return;

    const attempt: ExerciseAttemptType = {
      exerciseId: exercises[Number(position)].id,
      optionId: selectedOption.id,
      userId: 1,
    };

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
        onClick={handleAfterSubmit}
        className={`w-full rounded-2xl h-14 justify-center items-center ${checkButtonStyle} flex text-xl`}
      >
        <p className="text-duoGrayButtonText">Check</p>
      </div>
    </div>
  );
}
("");
