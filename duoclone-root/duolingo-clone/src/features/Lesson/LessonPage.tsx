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
import { AnimatePresence, motion } from "framer-motion";
import { bottomUpSpringAnimation } from "../../animations/BottomUpSpringAnimation";

export function LessonPage() {
  const { lessonId } = useParams<{ lessonId: string }>();
  const { position } = useParams<{ position: string }>();

  const id = Number(lessonId); // convert
  const { data: exercises, isLoading } = useExercises(id, 1);

  const [currentSelectedOptions, setCurrentSelectedOptions] = useState<
    ExerciseOption[]
  >([]);

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
        <LessonHeader />
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
          isActive={currentSelectedOptions.length > 0}
          isIncorrect={lessonResponse?.correct == false}
        />
      </div>
      <AnimatePresence>
        {lessonResponse && (
          <motion.div
            key={`result-${Number(position)}-${lessonResponse.correct}`}
            variants={bottomUpSpringAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ transformOrigin: "bottom center" }}
          >
            <LessonResult
              correctAnswer={lessonResponse.correctAnswer}
              isCorrect={lessonResponse.correct}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
("");
